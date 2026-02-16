import { useState, useEffect } from "react";
import { Link } from "react-router";
import { CheckCircle, Circle, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { RB_STEPS, isStepComplete } from "@/pages/rb/rbSteps";

interface Submission {
  lovableUrl: string;
  githubUrl: string;
  deployUrl: string;
}

const STORAGE_KEY = "rb_final_submission";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function RBProof() {
  const [submission, setSubmission] = useState<Submission>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return { lovableUrl: "", githubUrl: "", deployUrl: "" };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Submission, string>>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submission));
  }, [submission]);

  function handleChange(field: keyof Submission, value: string) {
    setSubmission((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (submission.lovableUrl && !isValidUrl(submission.lovableUrl))
      newErrors.lovableUrl = "Enter a valid URL";
    if (submission.githubUrl && !isValidUrl(submission.githubUrl))
      newErrors.githubUrl = "Enter a valid URL";
    if (submission.deployUrl && !isValidUrl(submission.deployUrl))
      newErrors.deployUrl = "Enter a valid URL";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleCopySubmission() {
    if (!validate()) return;
    const text = [
      "AI Resume Builder — Final Submission",
      "=====================================",
      ...RB_STEPS.map(
        (s) => `Step ${s.step} (${s.title}): ${isStepComplete(s.step) ? "Complete" : "Incomplete"}`
      ),
      "",
      `Lovable Project: ${submission.lovableUrl || "N/A"}`,
      `GitHub Repo: ${submission.githubUrl || "N/A"}`,
      `Deploy Link: ${submission.deployUrl || "N/A"}`,
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const fields: { key: keyof Submission; label: string }[] = [
    { key: "lovableUrl", label: "Lovable Project URL" },
    { key: "githubUrl", label: "GitHub Repo URL" },
    { key: "deployUrl", label: "Deploy Link" },
  ];

  return (
    <div className="max-w-[720px]">
      <h2 className="font-serif text-xl font-bold mb-6">Proof of Work</h2>

      {/* Step status overview */}
      <Card className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Step Completion</h3>
        <div className="grid grid-cols-2 gap-2">
          {RB_STEPS.map((s) => {
            const complete = isStepComplete(s.step);
            return (
              <Link
                key={s.step}
                to={`/rb/${s.slug}`}
                className="flex items-center gap-2 text-sm py-1 hover:text-accent"
              >
                {complete ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
                <span className={complete ? "text-text-primary" : "text-gray-400"}>
                  Step {s.step}: {s.title}
                </span>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* URL inputs */}
      <Card className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Submission Links</h3>
        <div className="flex flex-col gap-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                {label}
              </label>
              <input
                type="url"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent ${
                  errors[key] ? "border-red-400" : "border-border"
                }`}
                placeholder="https://..."
                value={submission[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
              {errors[key] && (
                <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="primary" onClick={handleCopySubmission}>
          {copied ? (
            <>
              <Check className="inline w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="inline w-4 h-4 mr-1" />
              Copy Final Submission
            </>
          )}
        </Button>
        <Link to={`/rb/${RB_STEPS[0].slug}`}>
          <Button variant="secondary">Back to Steps</Button>
        </Link>
      </div>
    </div>
  );
}
