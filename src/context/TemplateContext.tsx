import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { TemplateName } from "@/types/template";

export type AccentColor = "teal" | "navy" | "burgundy" | "forest" | "charcoal";

export const ACCENT_COLORS: Record<AccentColor, string> = {
  teal: "hsl(168, 60%, 40%)",
  navy: "hsl(220, 60%, 35%)",
  burgundy: "hsl(345, 60%, 35%)",
  forest: "hsl(150, 50%, 30%)",
  charcoal: "hsl(0, 0%, 25%)",
};

const TEMPLATE_KEY = "arb-template";
const ACCENT_KEY = "arb-accent";

interface TemplateContextValue {
  template: TemplateName;
  setTemplate: (t: TemplateName) => void;
  accentColor: AccentColor;
  setAccentColor: (c: AccentColor) => void;
}

const TemplateContext = createContext<TemplateContextValue | null>(null);

function loadTemplate(): TemplateName {
  try {
    const raw = localStorage.getItem(TEMPLATE_KEY);
    if (raw === "classic" || raw === "modern" || raw === "minimal") return raw;
  } catch {
    // ignore
  }
  return "classic";
}

function loadAccent(): AccentColor {
  try {
    const raw = localStorage.getItem(ACCENT_KEY);
    if (raw && raw in ACCENT_COLORS) return raw as AccentColor;
  } catch {
    // ignore
  }
  return "teal";
}

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplate] = useState<TemplateName>(loadTemplate);
  const [accentColor, setAccentColor] = useState<AccentColor>(loadAccent);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem(ACCENT_KEY, accentColor);
  }, [accentColor]);

  return (
    <TemplateContext.Provider value={{ template, setTemplate, accentColor, setAccentColor }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate(): TemplateContextValue {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error("useTemplate must be used within TemplateProvider");
  return ctx;
}
