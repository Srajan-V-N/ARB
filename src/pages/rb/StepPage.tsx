import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Button from "@/components/ui/Button";
import {
  RB_STEPS,
  isStepComplete,
  getEarliestIncompleteStep,
} from "@/pages/rb/rbSteps";

interface StepPageProps {
  step: number;
}

export default function StepPage({ step }: StepPageProps) {
  const navigate = useNavigate();
  const config = RB_STEPS[step - 1];
  const prevStep = step > 1 ? RB_STEPS[step - 2] : null;
  const nextStep = step < 8 ? RB_STEPS[step] : null;
  const canProceed = isStepComplete(step);

  useEffect(() => {
    // Gate: check all previous steps are complete
    for (let i = 1; i < step; i++) {
      if (!isStepComplete(i)) {
        const earliest = getEarliestIncompleteStep();
        const target = RB_STEPS[earliest - 1];
        navigate(`/rb/${target.slug}`, { replace: true });
        return;
      }
    }
  }, [step, navigate]);

  return (
    <div className="max-w-[720px]">
      <h2 className="font-serif text-xl font-bold mb-4">
        Step {config.step} — {config.title}
      </h2>
      <p className="text-gray-500 leading-relaxed mb-8">
        Content for this step will be added later.
      </p>

      <div className="flex gap-3">
        {prevStep ? (
          <Link to={`/rb/${prevStep.slug}`}>
            <Button variant="secondary">Previous</Button>
          </Link>
        ) : (
          <Button variant="secondary" disabled>
            Previous
          </Button>
        )}

        {nextStep ? (
          <Link
            to={canProceed ? `/rb/${nextStep.slug}` : "#"}
            onClick={(e) => !canProceed && e.preventDefault()}
          >
            <Button variant="primary" disabled={!canProceed}>
              Next
            </Button>
          </Link>
        ) : (
          <Link
            to={canProceed ? "/rb/proof" : "#"}
            onClick={(e) => !canProceed && e.preventDefault()}
          >
            <Button variant="primary" disabled={!canProceed}>
              View Proof
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
