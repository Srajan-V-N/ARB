import type { ResumeData } from "@/types/resume";

export interface AtsResult {
  score: number;
  suggestions: string[];
}

const ACTION_VERBS = /\b(built|led|designed|improved|developed|managed|created|implemented|optimized|launched|delivered|reduced|increased|achieved|streamlined)\b/i;

export function computeAtsScore(resume: ResumeData): AtsResult {
  let score = 0;
  const suggestions: string[] = [];

  // +10 fullName
  if (resume.personalInfo.fullName.trim()) {
    score += 10;
  } else {
    suggestions.push("Add your full name (+10 points)");
  }

  // +10 email
  if (resume.personalInfo.email.trim()) {
    score += 10;
  } else {
    suggestions.push("Add your email address (+10 points)");
  }

  // +10 summary > 50 chars
  if (resume.summary.length > 50) {
    score += 10;
  } else {
    suggestions.push("Add a professional summary with more than 50 characters (+10 points)");
  }

  // +15 at least 1 experience with non-empty description
  if (resume.experience.some((e) => e.description.trim())) {
    score += 15;
  } else {
    suggestions.push("Add at least one work experience with a description (+15 points)");
  }

  // +10 at least 1 education entry
  if (resume.education.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least one education entry (+10 points)");
  }

  // +10 total skills >= 5
  const skillsCount =
    resume.skills.technical.length +
    resume.skills.soft.length +
    resume.skills.tools.length;
  if (skillsCount >= 5) {
    score += 10;
  } else {
    suggestions.push("Add at least 5 skills across technical, soft, and tools (+10 points)");
  }

  // +10 at least 1 project
  if (resume.projects.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least one project (+10 points)");
  }

  // +5 phone
  if (resume.personalInfo.phone.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your phone number (+5 points)");
  }

  // +5 linkedin
  if (resume.links.linkedin.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your LinkedIn profile link (+5 points)");
  }

  // +5 github
  if (resume.links.github.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your GitHub profile link (+5 points)");
  }

  // +10 action verbs in summary
  if (ACTION_VERBS.test(resume.summary)) {
    score += 10;
  } else {
    suggestions.push("Use action verbs in your summary like built, led, designed, improved (+10 points)");
  }

  return { score: Math.min(score, 100), suggestions };
}
