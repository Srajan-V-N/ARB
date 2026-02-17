import type { ResumeData } from "@/types/resume";

export interface AtsResult {
  score: number;
  suggestions: string[];
}

const NUMBER_PATTERN = /\d+%?|[0-9]+[kKmM+]/;

export function computeAtsScore(resume: ResumeData): AtsResult {
  let score = 0;

  // Summary: 0→40 words scales linearly to 15 pts; penalize if >120 (cap at 10)
  const summaryWords = resume.summary.trim().split(/\s+/).filter(Boolean).length;
  const summaryMax = summaryWords > 120 ? 10 : 15;
  const summaryScore = Math.min(summaryWords, 40) / 40 * summaryMax;
  score += summaryScore;

  // Projects: 1 project = 5 pts, 2+ = 10
  const projectsScore = Math.min(resume.projects.length, 2) / 2 * 10;
  score += projectsScore;

  // Experience: binary — at least one
  const experienceScore = resume.experience.length >= 1 ? 10 : 0;
  score += experienceScore;

  // Skills: scales linearly up to 8
  const skillsCount = resume.skills.technical.length + resume.skills.soft.length + resume.skills.tools.length;
  const skillsScore = Math.min(skillsCount, 8) / 8 * 10;
  score += skillsScore;

  // Links: 5 pts each for LinkedIn and GitHub
  const hasLinkedin = resume.links.linkedin.trim() !== "";
  const hasGithub = resume.links.github.trim() !== "";
  const linksScore = (hasLinkedin ? 5 : 0) + (hasGithub ? 5 : 0);
  score += linksScore;

  // Numbers in bullets: binary (15 pts)
  const hasNumbers = [
    ...resume.experience.map((e) => e.description),
    ...resume.projects.map((p) => p.description),
  ].some((text) => NUMBER_PATTERN.test(text));
  const numbersScore = hasNumbers ? 15 : 0;
  score += numbersScore;

  // Education: each of 5 fields = 2 pts (best entry)
  const educationScore = resume.education.reduce((best, e) => {
    let filled = 0;
    if (e.institution.trim() !== "") filled++;
    if (e.degree.trim() !== "") filled++;
    if (e.field.trim() !== "") filled++;
    if (e.startDate.trim() !== "") filled++;
    if (e.endDate.trim() !== "") filled++;
    return Math.max(best, filled / 5 * 10);
  }, 0);
  score += educationScore;

  // Cap at 100, round to nearest integer
  score = Math.min(Math.round(score), 100);

  // Suggestions (max 3, for categories not at full points)
  const suggestions: string[] = [];

  if (summaryScore < 15 && suggestions.length < 3)
    suggestions.push("Write a stronger summary (40–120 words).");
  if (projectsScore < 10 && suggestions.length < 3)
    suggestions.push("Add at least 2 projects.");
  if (experienceScore < 10 && suggestions.length < 3)
    suggestions.push("Add at least one work experience.");
  if (skillsScore < 10 && suggestions.length < 3)
    suggestions.push("Add more skills (target 8+).");
  if (linksScore < 10 && suggestions.length < 3)
    suggestions.push("Add a LinkedIn or GitHub link.");
  if (numbersScore < 15 && suggestions.length < 3)
    suggestions.push("Add measurable impact (numbers) in bullets.");
  if (educationScore < 10 && suggestions.length < 3)
    suggestions.push("Complete your education details.");

  return { score, suggestions };
}
