import { useResume } from "@/context/ResumeContext";
import type { Experience } from "@/types/resume";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Button from "@/components/ui/Button";

export default function ExperienceSection() {
  const { resume, dispatch } = useResume();

  function add() {
    const entry: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    dispatch({ type: "ADD_EXPERIENCE", payload: entry });
  }

  function update(entry: Experience, field: string, value: string) {
    dispatch({ type: "UPDATE_EXPERIENCE", payload: { ...entry, [field]: value } });
  }

  function remove(id: string) {
    dispatch({ type: "REMOVE_EXPERIENCE", payload: id });
  }

  return (
    <div className="space-y-4">
      {resume.experience.map((exp) => (
        <div key={exp.id} className="space-y-3 rounded-lg border border-border bg-surface p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="Company" value={exp.company} onChange={(v) => update(exp, "company", v)} placeholder="Company name" />
            <FormInput label="Role" value={exp.role} onChange={(v) => update(exp, "role", v)} placeholder="Software Engineer" />
          </div>
          <FormInput label="Location" value={exp.location} onChange={(v) => update(exp, "location", v)} placeholder="City, Country" />
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="Start Date" value={exp.startDate} onChange={(v) => update(exp, "startDate", v)} placeholder="Jan 2022" />
            <FormInput label="End Date" value={exp.endDate} onChange={(v) => update(exp, "endDate", v)} placeholder="Present" />
          </div>
          <FormTextarea label="Description" value={exp.description} onChange={(v) => update(exp, "description", v)} placeholder="What you did, achieved, and learned..." />
          <Button variant="ghost" className="text-xs" onClick={() => remove(exp.id)}>Remove</Button>
        </div>
      ))}
      <Button variant="secondary" onClick={add}>Add Experience</Button>
    </div>
  );
}
