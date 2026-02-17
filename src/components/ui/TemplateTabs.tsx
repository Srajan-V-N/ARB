import { useTemplate } from "@/context/TemplateContext";
import type { TemplateName } from "@/types/template";

const tabs: { value: TemplateName; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
];

export default function TemplateTabs() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-0.5 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setTemplate(tab.value)}
          className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
            template === tab.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
