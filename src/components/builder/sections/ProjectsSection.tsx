import { useResume } from "@/context/ResumeContext";
import type { Project } from "@/types/resume";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Button from "@/components/ui/Button";

export default function ProjectsSection() {
  const { resume, dispatch } = useResume();

  function add() {
    const entry: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    };
    dispatch({ type: "ADD_PROJECT", payload: entry });
  }

  function update(entry: Project, field: string, value: string) {
    dispatch({ type: "UPDATE_PROJECT", payload: { ...entry, [field]: value } });
  }

  function remove(id: string) {
    dispatch({ type: "REMOVE_PROJECT", payload: id });
  }

  return (
    <div className="space-y-4">
      {resume.projects.map((proj) => (
        <div key={proj.id} className="space-y-3 rounded-lg border border-border bg-surface p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput label="Project Name" value={proj.name} onChange={(v) => update(proj, "name", v)} placeholder="My Awesome Project" />
            <FormInput label="Technologies" value={proj.technologies} onChange={(v) => update(proj, "technologies", v)} placeholder="React, Node.js, PostgreSQL" />
          </div>
          <FormTextarea label="Description" value={proj.description} onChange={(v) => update(proj, "description", v)} placeholder="What does this project do?" />
          <FormInput label="Link" value={proj.link} onChange={(v) => update(proj, "link", v)} placeholder="https://github.com/..." />
          <Button variant="ghost" className="text-xs" onClick={() => remove(proj.id)}>Remove</Button>
        </div>
      ))}
      <Button variant="secondary" onClick={add}>Add Project</Button>
    </div>
  );
}
