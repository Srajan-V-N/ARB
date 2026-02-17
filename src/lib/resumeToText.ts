import type { ResumeData } from "@/types/resume";

export function resumeToText(resume: ResumeData): string {
  const { personalInfo, summary, education, experience, projects, skills, links } = resume;
  const sections: string[] = [];

  // Name & contact
  if (personalInfo.fullName) {
    const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean);
    sections.push(
      personalInfo.fullName + (contactParts.length ? "\n" + contactParts.join(" · ") : ""),
    );
  }

  if (summary) {
    sections.push("SUMMARY\n" + summary);
  }

  if (education.length > 0) {
    const lines = education.map((edu) => {
      const degree = edu.degree + (edu.field ? ` in ${edu.field}` : "");
      const dates = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
      return `${degree} — ${edu.institution}` + (dates ? ` (${dates})` : "");
    });
    sections.push("EDUCATION\n" + lines.join("\n"));
  }

  if (experience.length > 0) {
    const blocks = experience.map((exp) => {
      const where = [exp.company, exp.location].filter(Boolean).join(", ");
      const dates = [exp.startDate, exp.endDate].filter(Boolean).join(" – ");
      let line = exp.role + (where ? ` — ${where}` : "");
      if (dates) line += ` (${dates})`;
      if (exp.description) line += "\n" + exp.description;
      return line;
    });
    sections.push("EXPERIENCE\n" + blocks.join("\n\n"));
  }

  if (projects.length > 0) {
    const blocks = projects.map((proj) => {
      let line = proj.name;
      if (proj.technologies.length > 0) line += ` — ${proj.technologies.join(", ")}`;
      if (proj.description) line += "\n" + proj.description;
      if (proj.liveUrl) line += "\n" + proj.liveUrl;
      if (proj.githubUrl) line += "\n" + proj.githubUrl;
      return line;
    });
    sections.push("PROJECTS\n" + blocks.join("\n\n"));
  }

  const allSkills = [...skills.technical, ...skills.soft, ...skills.tools];
  if (allSkills.length > 0) {
    const parts: string[] = [];
    if (skills.technical.length > 0) parts.push("Technical: " + skills.technical.join(", "));
    if (skills.soft.length > 0) parts.push("Soft Skills: " + skills.soft.join(", "));
    if (skills.tools.length > 0) parts.push("Tools: " + skills.tools.join(", "));
    sections.push("SKILLS\n" + parts.join("\n"));
  }

  const linkLines = [links.linkedin, links.github, links.portfolio].filter(Boolean);
  if (linkLines.length > 0) {
    sections.push("LINKS\n" + linkLines.join("\n"));
  }

  return sections.join("\n\n") + "\n";
}
