export interface RBStep {
  step: number;
  slug: string;
  title: string;
  description: string;
}

export const RB_STEPS: RBStep[] = [
  { step: 1, slug: "01-problem", title: "Problem Statement", description: "Define the core problem your resume builder solves." },
  { step: 2, slug: "02-market", title: "Market Research", description: "Research existing solutions and identify gaps." },
  { step: 3, slug: "03-architecture", title: "Architecture", description: "Design the system architecture and data flow." },
  { step: 4, slug: "04-hld", title: "High-Level Design", description: "Create the high-level design document." },
  { step: 5, slug: "05-lld", title: "Low-Level Design", description: "Detail the low-level design and component specs." },
  { step: 6, slug: "06-build", title: "Build", description: "Build the core product features." },
  { step: 7, slug: "07-test", title: "Test", description: "Test all functionality and edge cases." },
  { step: 8, slug: "08-ship", title: "Ship", description: "Deploy and ship the final product." },
];

export function getStepArtifactKey(step: number): string {
  return `rb_step_${step}_artifact`;
}

export function isStepComplete(step: number): boolean {
  return localStorage.getItem(getStepArtifactKey(step)) !== null;
}

export function getCompletedCount(): number {
  return RB_STEPS.filter((s) => isStepComplete(s.step)).length;
}

export function getEarliestIncompleteStep(): number {
  for (const s of RB_STEPS) {
    if (!isStepComplete(s.step)) return s.step;
  }
  return RB_STEPS.length + 1;
}
