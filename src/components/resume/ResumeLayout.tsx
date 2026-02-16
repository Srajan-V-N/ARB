import type { ResumeData } from "@/types/resume";

interface ResumeLayoutProps {
  resume: ResumeData;
  compact?: boolean;
}

export default function ResumeLayout({ resume, compact = false }: ResumeLayoutProps) {
  const { personalInfo, summary, education, experience, projects, skills, links } = resume;
  const hasContent =
    personalInfo.fullName || summary || education.length || experience.length || projects.length || skills || links.linkedin || links.github || links.portfolio;

  const heading = compact ? "text-sm font-bold uppercase tracking-wide" : "text-base font-bold uppercase tracking-wide";
  const body = compact ? "text-xs" : "text-sm";
  const nameSize = compact ? "text-lg" : "text-2xl";
  const sectionGap = compact ? "mt-3" : "mt-5";
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
    <div className={`${wrapper} font-sans text-black`}>
      {/* Name & Contact */}
      {personalInfo.fullName && (
        <h1 className={`${nameSize} font-serif font-bold`}>{personalInfo.fullName}</h1>
      )}
      {contactParts.length > 0 && (
        <p className={`${body} mt-1 text-gray-600`}>{contactParts.join(" · ")}</p>
      )}

      {/* Summary */}
      {summary && (
        <Section title="Summary" heading={heading} gap={sectionGap}>
          <p className={body}>{summary}</p>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" heading={heading} gap={sectionGap}>
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
        <Section title="Experience" heading={heading} gap={sectionGap}>
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
        <Section title="Projects" heading={heading} gap={sectionGap}>
          {projects.map((proj) => (
            <div key={proj.id} className={`${body} mt-2 first:mt-0`}>
              <span className="font-medium">{proj.name}</span>
              {proj.technologies && <span className="text-gray-500"> — {proj.technologies}</span>}
              {proj.description && <p className="mt-0.5 text-gray-700">{proj.description}</p>}
              {proj.link && <p className="text-gray-500 break-all">{proj.link}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills && (
        <Section title="Skills" heading={heading} gap={sectionGap}>
          <p className={body}>{skills}</p>
        </Section>
      )}

      {/* Links */}
      {(links.linkedin || links.github || links.portfolio) && (
        <Section title="Links" heading={heading} gap={sectionGap}>
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
  children,
}: {
  title: string;
  heading: string;
  gap: string;
  children: React.ReactNode;
}) {
  return (
    <div className={gap}>
      <h2 className={`${heading} border-b border-gray-300 pb-1 mb-2`}>{title}</h2>
      {children}
    </div>
  );
}
