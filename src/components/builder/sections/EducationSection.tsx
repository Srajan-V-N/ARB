import { useResume } from "@/context/ResumeContext";
import type { Education } from "@/types/resume";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

export default function EducationSection() {
  const { resume, dispatch } = useResume();

  function add() {
    const entry: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    dispatch({ type: "ADD_EDUCATION", payload: entry });
  }

  function update(entry: Education, field: string, value: string) {
    dispatch({ type: "UPDATE_EDUCATION", payload: { ...entry, [field]: value } });
  }

  function remove(id: string) {
    dispatch({ type: "REMOVE_EDUCATION", payload: id });
  }

  return (
    <div className="space-y-4">
      {resume.education.map((edu) => (
        <div key={edu.id} className="space-y-3 rounded-lg border border-border bg-surface p-4">
          <FormInput label="Institution" value={edu.institution} onChange={(v) => update(edu, "institution", v)} placeholder="University name" />
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="Degree" value={edu.degree} onChange={(v) => update(edu, "degree", v)} placeholder="B.Tech" />
            <FormInput label="Field of Study" value={edu.field} onChange={(v) => update(edu, "field", v)} placeholder="Computer Science" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="Start Date" value={edu.startDate} onChange={(v) => update(edu, "startDate", v)} placeholder="2016" />
            <FormInput label="End Date" value={edu.endDate} onChange={(v) => update(edu, "endDate", v)} placeholder="2020" />
          </div>
          <Button variant="ghost" className="text-xs" onClick={() => remove(edu.id)}>Remove</Button>
        </div>
      ))}
      <Button variant="secondary" onClick={add}>Add Education</Button>
    </div>
  );
}
