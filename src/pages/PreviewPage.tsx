import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { useTemplate, ACCENT_COLORS } from "@/context/TemplateContext";
import ResumeLayout from "@/components/resume/ResumeLayout";
import TemplateTabs from "@/components/ui/TemplateTabs";
import Button from "@/components/ui/Button";
import { resumeToText } from "@/lib/resumeToText";
import { getExportWarning } from "@/lib/exportWarning";
import { computeAtsScore } from "@/lib/atsScore";

function scoreLabel(score: number): { text: string; color: string } {
  if (score >= 71) return { text: "Strong Resume", color: "#10b981" };
  if (score >= 41) return { text: "Getting There", color: "#f59e0b" };
  return { text: "Needs Work", color: "#ef4444" };
}

export default function PreviewPage() {
  const { resume } = useResume();
  const { template, accentColor } = useTemplate();
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);

  const warning = getExportWarning(resume);
  const { score, suggestions } = computeAtsScore(resume);
  const { text: label, color } = scoreLabel(score);

  // SVG circle parameters
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  function handlePrint() {
    window.print();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  function handleCopy() {
    navigator.clipboard.writeText(resumeToText(resume));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white px-8 py-12 print:min-h-0 print:p-0">
      <div className="mx-auto max-w-[800px]">
        <div className="print:hidden">
          <TemplateTabs />
        </div>

        <div className="print:hidden mt-4 flex items-center gap-3">
          <Button variant="secondary" onClick={handlePrint}>
            Print / Save as PDF
          </Button>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy as Text"}
          </Button>
        </div>

        {warning && (
          <p className="print:hidden mt-2 text-xs text-amber-600">{warning}</p>
        )}

        {/* ATS Score Section */}
        <div className="print:hidden mt-6 flex flex-col items-center sm:flex-row sm:items-start gap-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
          {/* Circular progress */}
          <div className="flex flex-col items-center shrink-0">
            <svg width="128" height="128" className="-rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-500"
              />
            </svg>
            <span
              className="text-3xl font-bold -mt-[82px] mb-[42px]"
              style={{ color }}
            >
              {score}
            </span>
            <span className="text-sm font-medium" style={{ color }}>
              {label}
            </span>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Suggestions
              </h3>
              <ul className="space-y-1.5">
                {suggestions.map((s) => (
                  <li key={s} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-amber-500 mt-0.5">&#8226;</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ResumeLayout resume={resume} template={template} accentColor={ACCENT_COLORS[accentColor]} />

      {/* Toast notification */}
      {toast && (
        <div className="print:hidden fixed bottom-6 right-6 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg transition-opacity">
          PDF export ready! Check your downloads.
        </div>
      )}
    </div>
  );
}
