import type { ResumeData } from "@/types/resume";

export function getExportWarning(resume: ResumeData): string | null {
  if (!resume.personalInfo.fullName.trim()) {
    return "Your resume may look incomplete.";
  }
  if (resume.experience.length === 0 && resume.projects.length === 0) {
    return "Your resume may look incomplete.";
  }
  return null;
}
