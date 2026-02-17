import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import type { Skills } from "@/types/resume";
import TagInput from "@/components/ui/TagInput";
import Button from "@/components/ui/Button";

const SUGGESTED_SKILLS: Skills = {
  technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
  soft: ["Team Leadership", "Problem Solving"],
  tools: ["Git", "Docker", "AWS"],
};

export default function SkillsSection() {
  const { resume, dispatch } = useResume();
  const { skills } = resume;
  const [suggesting, setSuggesting] = useState(false);

  function update(category: keyof Skills, tags: string[]) {
    dispatch({ type: "SET_SKILLS", payload: { ...skills, [category]: tags } });
  }

  function suggestSkills() {
    setSuggesting(true);
    setTimeout(() => {
      const merged: Skills = { ...skills };
      for (const key of ["technical", "soft", "tools"] as const) {
        const existing = new Set(merged[key].map((s) => s.toLowerCase()));
        const toAdd = SUGGESTED_SKILLS[key].filter((s) => !existing.has(s.toLowerCase()));
        merged[key] = [...merged[key], ...toAdd];
      }
      dispatch({ type: "SET_SKILLS", payload: merged });
      setSuggesting(false);
    }, 1000);
  }

  const categories: { key: keyof Skills; label: string }[] = [
    { key: "technical", label: "Technical Skills" },
    { key: "soft", label: "Soft Skills" },
    { key: "tools", label: "Tools & Technologies" },
  ];

  return (
    <div className="space-y-4">
      {categories.map(({ key, label }) => (
        <div key={key}>
          <span className="text-sm font-medium text-text-primary">
            {label} ({skills[key].length})
          </span>
          <div className="mt-1">
            <TagInput
              tags={skills[key]}
              onChange={(tags) => update(key, tags)}
              placeholder={`Add ${label.toLowerCase()}...`}
            />
          </div>
        </div>
      ))}
      <Button
        variant="secondary"
        className="text-xs"
        onClick={suggestSkills}
        disabled={suggesting}
      >
        {suggesting ? (
          <>
            <svg className="mr-1.5 inline h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
            </svg>
            Suggesting...
          </>
        ) : (
          <>
            <svg className="mr-1.5 inline h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            Suggest Skills
          </>
        )}
      </Button>
    </div>
  );
}
