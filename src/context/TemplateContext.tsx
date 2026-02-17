import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { TemplateName } from "@/types/template";

const STORAGE_KEY = "arb-template";

interface TemplateContextValue {
  template: TemplateName;
  setTemplate: (t: TemplateName) => void;
}

const TemplateContext = createContext<TemplateContextValue | null>(null);

function loadTemplate(): TemplateName {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "classic" || raw === "modern" || raw === "minimal") return raw;
  } catch {
    // ignore
  }
  return "classic";
}

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplate] = useState<TemplateName>(loadTemplate);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, template);
  }, [template]);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate(): TemplateContextValue {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error("useTemplate must be used within TemplateProvider");
  return ctx;
}
