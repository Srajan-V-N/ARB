import { useState, useEffect, useCallback, useMemo } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useResume } from "@/context/ResumeContext";
import {
  BUILD_STEPS,
  CHECKLIST_ITEMS,
  computeSteps,
  loadChecklist,
  saveChecklist,
  loadSubmission,
  saveSubmission,
  isValidUrl,
  isShipped,
  buildSubmissionText,
  type FinalSubmission,
} from "@/lib/proofStatus";

export default function ProofPage() {
  const { resume } = useResume();

  const steps = useMemo(() => computeSteps(resume), [resume]);

  const [checklist, setChecklist] = useState(loadChecklist);
  const [submission, setSubmission] = useState<FinalSubmission>(loadSubmission);
  const [copied, setCopied] = useState(false);

  useEffect(() => saveChecklist(checklist), [checklist]);
  useEffect(() => saveSubmission(submission), [submission]);

  const toggleCheck = useCallback((i: number) => {
    setChecklist((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }, []);

  const updateLink = useCallback(
    (key: keyof FinalSubmission, value: string) => {
      setSubmission((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const shipped = isShipped(steps, checklist, submission);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildSubmissionText(submission));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepsComplete = steps.filter(Boolean).length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* ── Status Badge ──────────────────────────── */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-text-primary">
          Proof of Work
        </h1>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            shipped
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {shipped ? "Shipped" : "In Progress"}
        </span>
      </div>

      {shipped && (
        <p className="mb-6 text-sm text-gray-600">
          Project 3 Shipped Successfully.
        </p>
      )}

      {/* ── Build Steps ───────────────────────────── */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-text-primary">
          Build Steps
          <span className="ml-2 text-sm font-normal text-gray-400">
            {stepsComplete}/{BUILD_STEPS.length}
          </span>
        </h2>

        <ul className="mt-4 space-y-3">
          {BUILD_STEPS.map((label, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              {steps[i] ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              ) : (
                <span className="h-5 w-5 rounded-full border-2 border-gray-300" />
              )}
              <span className="text-gray-700">
                {i + 1}. {label}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── Verification Checklist ─────────────────── */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-text-primary">
          Verification Checklist
          <span className="ml-2 text-sm font-normal text-gray-400">
            {checklist.filter(Boolean).length}/{CHECKLIST_ITEMS.length}
          </span>
        </h2>

        <ul className="mt-4 space-y-3">
          {CHECKLIST_ITEMS.map((label, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={checklist[i]}
                onChange={() => toggleCheck(i)}
                className="h-4 w-4 rounded border-gray-300 accent-accent"
              />
              <span className="text-gray-700">
                {i + 1}. {label}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ── Proof Artifacts ────────────────────────── */}
      <Card className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Proof Artifacts
        </h2>

        {(
          [
            ["lovableLink", "Lovable Project Link"],
            ["githubLink", "GitHub Repository Link"],
            ["deployedLink", "Deployed URL"],
          ] as const
        ).map(([key, label]) => {
          const value = submission[key];
          const invalid = value.length > 0 && !isValidUrl(value);
          return (
            <div key={key} className="mb-4 last:mb-0">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="url"
                value={value}
                onChange={(e) => updateLink(key, e.target.value)}
                placeholder="https://..."
                className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-text-primary placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                  invalid
                    ? "border-red-400 focus:border-red-400"
                    : "border-border focus:border-accent"
                }`}
              />
              {invalid && (
                <p className="mt-1 text-xs text-red-500">
                  Please enter a valid URL
                </p>
              )}
            </div>
          );
        })}
      </Card>

      {/* ── Copy Final Submission ──────────────────── */}
      <div className="flex justify-end">
        <Button disabled={!shipped} onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Final Submission"}
        </Button>
      </div>
    </div>
  );
}
