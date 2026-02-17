import { useResume } from "@/context/ResumeContext";
import { computeAtsScore } from "@/lib/atsScore";
import Card from "@/components/ui/Card";

function scoreColor(score: number): string {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

export default function AtsScorePanel() {
  const { resume } = useResume();
  const { score, suggestions } = computeAtsScore(resume);

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
    </Card>
  );
}
