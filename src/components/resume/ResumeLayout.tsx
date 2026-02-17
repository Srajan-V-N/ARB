import type { ResumeData } from "@/types/resume";
import type { TemplateName } from "@/types/template";

interface ResumeLayoutProps {
  resume: ResumeData;
  compact?: boolean;
  template?: TemplateName;
}

// --- Style maps per template ---

interface TemplateStyles {
  nameFont: string;
  bodyFont: string;
  headingStyle: (compact: boolean) => string;
  sectionBorder: string;
  sectionSpacing: (compact: boolean) => string;
}

const templateStyles: Record<TemplateName, TemplateStyles> = {
  classic: {
    nameFont: "font-serif",
    bodyFont: "font-sans",
    headingStyle: (compact) =>
      compact
        ? "text-sm font-bold uppercase tracking-wide"
        : "text-base font-bold uppercase tracking-wide",
    sectionBorder: "border-b border-gray-300 pb-1 mb-2",
    sectionSpacing: (compact) => (compact ? "mt-3" : "mt-5"),
  },
  modern: {
    nameFont: "font-sans",
    bodyFont: "font-sans",
    headingStyle: (compact) =>
      compact
        ? "text-sm font-semibold tracking-wide"
        : "text-base font-semibold tracking-wide",
    sectionBorder: "border-b-2 border-gray-400 pb-0.5 mb-2",
    sectionSpacing: (compact) => (compact ? "mt-2.5" : "mt-4"),
  },
  minimal: {
    nameFont: "font-sans",
    bodyFont: "font-sans",
    headingStyle: (compact) =>
      compact
        ? "text-[11px] font-medium uppercase tracking-widest text-gray-500"
        : "text-xs font-medium uppercase tracking-widest text-gray-500",
    sectionBorder: "mb-2",
    sectionSpacing: (compact) => (compact ? "mt-4" : "mt-6"),
  },
};

export default function ResumeLayout({
  resume,
  compact = false,
  template = "classic",
}: ResumeLayoutProps) {
  const { personalInfo, summary, education, experience, projects, skills, links } = resume;

  const skillCategories = [
    { key: "technical" as const, label: "Technical" },
    { key: "soft" as const, label: "Soft Skills" },
    { key: "tools" as const, label: "Tools" },
  ];
  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0;

  const hasContent =
    personalInfo.fullName || summary || education.length || experience.length || projects.length || hasSkills || links.linkedin || links.github || links.portfolio;

  const styles = templateStyles[template];
  const heading = styles.headingStyle(compact);
  const body = compact ? "text-xs" : "text-sm";
  const nameSize = compact ? "text-lg" : "text-2xl";
  const sectionGap = styles.sectionSpacing(compact);
  const wrapper = compact ? "" : "mx-auto max-w-[800px]";

  if (!hasContent) {
    return (
      <div className={`${wrapper} flex items-center justify-center py-20`}>
        <p className="text-gray-400 text-sm">
          Start filling in your details to see a live preview here.
        </p>
      </div>
    );
  }

  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean);

  return (
    <div className={`${wrapper} ${styles.bodyFont} text-black`}>
      {/* Name & Contact */}
      {personalInfo.fullName && (
        <h1 className={`${nameSize} ${styles.nameFont} font-bold`}>{personalInfo.fullName}</h1>
      )}
      {contactParts.length > 0 && (
        <p className={`${body} mt-1 text-gray-600`}>{contactParts.join(" · ")}</p>
      )}

      {/* Summary */}
      {summary && (
        <Section title="Summary" heading={heading} gap={sectionGap} border={styles.sectionBorder}>
          <p className={body}>{summary}</p>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" heading={heading} gap={sectionGap} border={styles.sectionBorder}>
          {education.map((edu) => (
            <div key={edu.id} className={`${body} mt-1`}>
              <div className="flex justify-between">
                <span className="font-medium">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</span>
                <span className="text-gray-500">{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</span>
              </div>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience" heading={heading} gap={sectionGap} border={styles.sectionBorder}>
          {experience.map((exp) => (
            <div key={exp.id} className={`${body} mt-2 first:mt-0`}>
              <div className="flex justify-between">
                <span className="font-medium">{exp.role}</span>
                <span className="text-gray-500">{[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}</span>
              </div>
              <p className="text-gray-600">{[exp.company, exp.location].filter(Boolean).join(", ")}</p>
              {exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects" heading={heading} gap={sectionGap} border={styles.sectionBorder}>
          {projects.map((proj) => (
            <div key={proj.id} className={`${body} mt-2 first:mt-0`}>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{proj.name}</span>
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
              {proj.technologies.length > 0 && (
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {proj.technologies.map((tech) => (
                    <span key={tech} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">{tech}</span>
                  ))}
                </div>
              )}
              {proj.description && <p className="mt-0.5 text-gray-700">{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {hasSkills && (
        <Section title="Skills" heading={heading} gap={sectionGap} border={styles.sectionBorder}>
          {skillCategories.map(({ key, label }) =>
            skills[key].length > 0 ? (
              <div key={key} className={`${body} mt-1.5 first:mt-0`}>
                <span className="font-medium text-gray-700">{label}: </span>
                <span className="inline-flex flex-wrap gap-1">
                  {skills[key].map((skill) => (
                    <span key={skill} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">{skill}</span>
                  ))}
                </span>
              </div>
            ) : null
          )}
        </Section>
      )}

      {/* Links */}
      {(links.linkedin || links.github || links.portfolio) && (
        <Section title="Links" heading={heading} gap={sectionGap} border={styles.sectionBorder}>
          <div className={`${body} flex flex-wrap gap-x-4`}>
            {links.linkedin && <span>{links.linkedin}</span>}
            {links.github && <span>{links.github}</span>}
            {links.portfolio && <span>{links.portfolio}</span>}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  heading,
  gap,
  border,
  children,
}: {
  title: string;
  heading: string;
  gap: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <div className={gap} data-section>
      <h2 className={`${heading} ${border}`}>{title}</h2>
      {children}
    </div>
  );
}
