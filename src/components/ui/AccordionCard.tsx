import { useState, type ReactNode } from "react";
import Card from "@/components/ui/Card";

interface AccordionCardProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function AccordionCard({
  title,
  defaultOpen = false,
  children,
}: AccordionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className="p-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left font-serif text-lg font-bold text-text-primary hover:bg-surface transition-colors"
      >
        {title}
        <svg
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 pt-2">{children}</div>}
    </Card>
  );
}
