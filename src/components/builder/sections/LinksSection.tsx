import { useResume } from "@/context/ResumeContext";
import FormInput from "@/components/ui/FormInput";

export default function LinksSection() {
  const { resume, dispatch } = useResume();
  const { links } = resume;

  function update(field: string, value: string) {
    dispatch({ type: "SET_LINKS", payload: { ...links, [field]: value } });
  }

  return (
    <div className="space-y-4">
      <FormInput label="LinkedIn" value={links.linkedin} onChange={(v) => update("linkedin", v)} placeholder="https://linkedin.com/in/yourname" />
      <FormInput label="GitHub" value={links.github} onChange={(v) => update("github", v)} placeholder="https://github.com/yourname" />
      <FormInput label="Portfolio" value={links.portfolio} onChange={(v) => update("portfolio", v)} placeholder="https://yoursite.dev" />
    </div>
  );
}
