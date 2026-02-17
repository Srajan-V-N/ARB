import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import type { Project } from "@/types/resume";
import FormInput from "@/components/ui/FormInput";
import TagInput from "@/components/ui/TagInput";
import Button from "@/components/ui/Button";

const DESC_MAX = 200;

export default function ProjectsSection() {
  const { resume, dispatch } = useResume();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function add() {
    const id = crypto.randomUUID();
    const entry: Project = {
      id,
      name: "",
      description: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
    };
    dispatch({ type: "ADD_PROJECT", payload: entry });
    setExpandedIds((prev) => new Set(prev).add(id));
  }

  function update(entry: Project, field: string, value: unknown) {
    dispatch({ type: "UPDATE_PROJECT", payload: { ...entry, [field]: value } });
  }

  function remove(id: string) {
    dispatch({ type: "REMOVE_PROJECT", payload: id });
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      <Button variant="secondary" onClick={add}>Add Project</Button>
      {resume.projects.map((proj) => {
        const isOpen = expandedIds.has(proj.id);
        const title = proj.name || "Untitled Project";
        return (
          <div key={proj.id} className="rounded-lg border border-border bg-surface overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(proj.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-text-primary hover:bg-surface transition-colors"
            >
              <span>{title}</span>
              <svg
                className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="space-y-3 px-4 pb-4">
                <FormInput
                  label="Project Title"
                  value={proj.name}
                  onChange={(v) => update(proj, "name", v)}
                  placeholder="My Awesome Project"
                />
                <div>
                  <label className="block">
                    <span className="text-sm font-medium text-text-primary">Description</span>
                    <textarea
                      rows={3}
                      maxLength={DESC_MAX}
                      value={proj.description}
                      onChange={(e) => update(proj, "description", e.target.value)}
                      placeholder="What does this project do?"
                      className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors resize-y"
                    />
                  </label>
                  <p className={`mt-1 text-xs ${proj.description.length >= DESC_MAX ? "text-red-500" : "text-gray-400"}`}>
                    {proj.description.length}/{DESC_MAX}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-text-primary">Tech Stack</span>
                  <div className="mt-1">
                    <TagInput
                      tags={proj.technologies}
                      onChange={(tags) => update(proj, "technologies", tags)}
                      placeholder="Add technologies..."
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormInput
                    label="Live URL"
                    value={proj.liveUrl}
                    onChange={(v) => update(proj, "liveUrl", v)}
                    placeholder="https://myproject.com"
                  />
                  <FormInput
                    label="GitHub URL"
                    value={proj.githubUrl}
                    onChange={(v) => update(proj, "githubUrl", v)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <Button variant="ghost" className="text-xs text-red-500 hover:bg-red-50" onClick={() => remove(proj.id)}>
                  Delete Project
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
