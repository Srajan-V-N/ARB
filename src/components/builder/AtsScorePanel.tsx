import { useResume } from "@/context/ResumeContext";
import { computeAtsScore } from "@/lib/atsScore";
import type { ResumeData } from "@/types/resume";
import Card from "@/components/ui/Card";

const NUMBER_PATTERN = /\d+%?|[0-9]+[kKmM+]/;

function scoreColor(score: number): string {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function getImprovements(resume: ResumeData): string[] {
  const all: string[] = [];

  if (resume.projects.length < 2)
    all.push("Add another project to strengthen your portfolio.");

  const allBullets = [
    ...resume.experience.map((e) => e.description),
    ...resume.projects.map((p) => p.description),
  ];
  const hasAnyNumbers = allBullets.some((t) => NUMBER_PATTERN.test(t));
  if (!hasAnyNumbers)
    all.push("Include measurable impact (numbers, %, metrics) in your descriptions.");

  const summaryWords = resume.summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords < 40)
    all.push("Expand your professional summary to at least 40 words.");

  const skillsCount = resume.skills.split(",").map((s) => s.trim()).filter(Boolean).length;
  if (skillsCount < 8)
    all.push("Add more skills — aim for at least 8 relevant skills.");

  if (resume.experience.length === 0)
    all.push("Add at least one work experience or internship.");

  return all.slice(0, 3);
}

export default function AtsScorePanel() {
  const { resume } = useResume();
  const { score, suggestions } = computeAtsScore(resume);
  const improvements = getImprovements(resume);

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
          ATS Readiness Score
        </h3>
        <span className="text-2xl font-bold text-gray-900">{score}</span>
      </div>

      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${scoreColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="mt-3 space-y-1">
          {suggestions.map((s) => (
            <li key={s} className="text-xs text-gray-600 flex gap-1.5">
              <span className="text-amber-500 mt-px">&#9679;</span>
              {s}
            </li>
          ))}
        </ul>
      )}

      {improvements.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">
            Top 3 Improvements
          </h4>
          <ul className="space-y-1">
            {improvements.map((imp) => (
              <li key={imp} className="text-xs text-gray-600 flex gap-1.5">
                <span className="text-blue-500 mt-px">&#9679;</span>
                {imp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
