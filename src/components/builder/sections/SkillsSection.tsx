import { useResume } from "@/context/ResumeContext";
import FormTextarea from "@/components/ui/FormTextarea";

export default function SkillsSection() {
  const { resume, dispatch } = useResume();

  return (
    <FormTextarea
      label="Skills"
      value={resume.skills}
      onChange={(v) => dispatch({ type: "SET_SKILLS", payload: v })}
      placeholder="TypeScript, React, Node.js, PostgreSQL, Docker..."
    />
  );
}
