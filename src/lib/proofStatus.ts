import type { ResumeData } from "@/types/resume";
import { computeAtsScore } from "@/lib/atsScore";

/* ── 8 Build Steps ─────────────────────────────────────────── */

export const BUILD_STEPS = [
  "Personal Info section completed",
  "Professional Summary written",
  "Education details added",
  "Work Experience added",
  "Projects showcased",
  "Skills organized",
  "Links & Profiles connected",
  "ATS Score optimized (score >= 71)",
] as const;

export function computeSteps(resume: ResumeData): boolean[] {
  const { personalInfo, summary, education, experience, projects, skills, links } = resume;

  return [
    /* 1 */ !!(personalInfo.fullName && personalInfo.email),
    /* 2 */ summary.trim().length > 0,
    /* 3 */ education.length > 0 && education.some((e) => e.institution && e.degree),
    /* 4 */ experience.length > 0 && experience.some((e) => e.company && e.role),
    /* 5 */ projects.length > 0 && projects.some((p) => p.name && p.description),
    /* 6 */ skills.technical.length + skills.soft.length + skills.tools.length > 0,
    /* 7 */ !!(links.linkedin || links.github || links.portfolio),
    /* 8 */ computeAtsScore(resume).score >= 71,
  ];
}

/* ── 10 Verification Checklist ─────────────────────────────── */

export const CHECKLIST_ITEMS = [
  "All form sections save to localStorage",
  "Live preview updates in real-time",
  "Template switching preserves data",
  "Color theme persists after refresh",
  "ATS score calculates correctly",
  "Score updates live on edit",
  "Export buttons work (copy/download)",
  "Empty states handled gracefully",
  "Mobile responsive layout works",
  "No console errors on any page",
] as const;

const CHECKLIST_KEY = "rb_checklist";

export function loadChecklist(): boolean[] {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) return parsed;
    }
  } catch {
    /* ignore */
  }
  return Array(CHECKLIST_ITEMS.length).fill(false);
}

export function saveChecklist(checklist: boolean[]): void {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
}

/* ── Artifact Links / Final Submission ─────────────────────── */

export interface FinalSubmission {
  lovableLink: string;
  githubLink: string;
  deployedLink: string;
}

const SUBMISSION_KEY = "rb_final_submission";

export function loadSubmission(): FinalSubmission {
  try {
    const raw = localStorage.getItem(SUBMISSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { lovableLink: "", githubLink: "", deployedLink: "" };
}

export function saveSubmission(submission: FinalSubmission): void {
  localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
}

/* ── URL Validation ────────────────────────────────────────── */

export function isValidUrl(url: string): boolean {
  return url.startsWith("https://") && url.slice(8).includes(".");
}

/* ── Shipped Logic ─────────────────────────────────────────── */

export function isShipped(
  steps: boolean[],
  checklist: boolean[],
  submission: FinalSubmission,
): boolean {
  return (
    steps.every(Boolean) &&
    checklist.every(Boolean) &&
    isValidUrl(submission.lovableLink) &&
    isValidUrl(submission.githubLink) &&
    isValidUrl(submission.deployedLink)
  );
}

/* ── Copy Final Submission ─────────────────────────────────── */

export function buildSubmissionText(submission: FinalSubmission): string {
  return [
    "Project 3 — Resume Builder: Shipped",
    "",
    `Lovable Project Link: ${submission.lovableLink}`,
    `GitHub Repository: ${submission.githubLink}`,
    `Deployed URL: ${submission.deployedLink}`,
  ].join("\n");
}
