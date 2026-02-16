import { useState, useCallback } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Copy, Check, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  RB_STEPS,
  isStepComplete,
  getCompletedCount,
  getStepArtifactKey,
} from "@/pages/rb/rbSteps";

function getCurrentStep(pathname: string) {
  const match = RB_STEPS.find((s) => pathname.includes(s.slug));
  return match ?? null;
}

export default function RBLayout() {
  const location = useLocation();
  const currentStep = getCurrentStep(location.pathname);
  const isProofPage = location.pathname.includes("/proof");
  const completedCount = getCompletedCount();

  const stepNum = currentStep?.step ?? 0;
  const stepComplete = stepNum > 0 && isStepComplete(stepNum);

  const [copied, setCopied] = useState(false);
  const [, setTick] = useState(0);

  const handleCopy = useCallback(() => {
    const prompt = currentStep
      ? `Prompt for Step ${currentStep.step}: ${currentStep.title}`
      : "";
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [currentStep]);

  const handleItWorked = useCallback(() => {
    if (stepNum > 0) {
      localStorage.setItem(getStepArtifactKey(stepNum), "true");
      setTick((t) => t + 1);
    }
  }, [stepNum]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-text-primary font-sans">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-white flex items-center px-6 shrink-0">
        <div className="font-serif font-bold text-lg">AI Resume Builder</div>
        <div className="flex-1 text-center text-sm text-gray-500">
          {currentStep
            ? `Project 3 — Step ${currentStep.step} of 8`
            : isProofPage
              ? "Project 3 — Proof of Work"
              : "Project 3"}
        </div>
        <div>
          {currentStep && (
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                stepComplete
                  ? "bg-success-light text-success"
                  : "bg-warning-light text-warning"
              }`}
            >
              {stepComplete ? "Completed" : "In Progress"}
            </span>
          )}
        </div>
      </header>

      {/* Context Header */}
      {currentStep && (
        <div className="py-6 px-6 border-b border-border bg-white">
          <h1 className="font-serif text-2xl font-bold">
            Step {currentStep.step} — {currentStep.title}
          </h1>
          <p className="text-gray-500 mt-1 text-sm max-w-[720px]">
            {currentStep.description}
          </p>
        </div>
      )}

      {/* Main Content: 70/30 split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Primary Workspace — 70% */}
        <main className="w-[70%] overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Secondary Panel — 30% */}
        <aside className="w-[30%] border-l border-border bg-white overflow-y-auto p-6 flex flex-col gap-4">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Copy This Into Lovable
          </label>
          <textarea
            readOnly
            className="w-full h-32 border border-border rounded-lg p-3 text-sm bg-surface resize-none focus:outline-none"
            value={
              currentStep
                ? `Prompt for Step ${currentStep.step}: ${currentStep.title}\n\n${currentStep.description}`
                : ""
            }
          />

          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="inline w-4 h-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="inline w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
            <a
              href="https://lovable.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="primary" className="w-full">
                <ExternalLink className="inline w-4 h-4 mr-1" />
                Build in Lovable
              </Button>
            </a>
          </div>

          <hr className="border-border" />

          <div className="flex flex-col gap-2">
            <Button variant="primary" onClick={handleItWorked}>
              It Worked
            </Button>
            <Button variant="secondary" onClick={() => {}}>
              Error
            </Button>
            <Button variant="ghost" onClick={() => {}}>
              Add Screenshot
            </Button>
          </div>
        </aside>
      </div>

      {/* Proof Footer */}
      <footer className="h-12 border-t border-border bg-white flex items-center px-6 shrink-0 text-sm">
        <Link
          to="/rb/proof"
          className="text-accent hover:underline font-medium"
        >
          Proof of Work
        </Link>
        <div className="flex-1 text-center text-gray-500">
          {completedCount} of 8 completed
        </div>
        <div className="flex gap-1">
          {RB_STEPS.map((s) => (
            <div
              key={s.step}
              className={`w-2.5 h-2.5 rounded-full ${
                isStepComplete(s.step) ? "bg-success" : "bg-gray-300"
              }`}
              title={`Step ${s.step}: ${s.title}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
