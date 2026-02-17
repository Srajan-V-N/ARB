import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import {
  type ResumeData,
  type PersonalInfo,
  type Education,
  type Experience,
  type Project,
  type Skills,
  type ResumeLinks,
  createEmptyResume,
} from "@/types/resume";
import { SAMPLE_RESUME } from "@/data/sampleResume";

const STORAGE_KEY = "resumeBuilderData";
const OLD_STORAGE_KEY = "arb-resume-data";

// --- Actions ---

type Action =
  | { type: "SET_PERSONAL_INFO"; payload: PersonalInfo }
  | { type: "SET_SUMMARY"; payload: string }
  | { type: "SET_SKILLS"; payload: Skills }
  | { type: "SET_LINKS"; payload: ResumeLinks }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: Education }
  | { type: "REMOVE_EDUCATION"; payload: string }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | { type: "UPDATE_EXPERIENCE"; payload: Experience }
  | { type: "REMOVE_EXPERIENCE"; payload: string }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: Project }
  | { type: "REMOVE_PROJECT"; payload: string }
  | { type: "LOAD_SAMPLE" }
  | { type: "RESET" };

function reducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case "SET_PERSONAL_INFO":
      return { ...state, personalInfo: action.payload };
    case "SET_SUMMARY":
      return { ...state, summary: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "SET_LINKS":
      return { ...state, links: action.payload };
    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload] };
    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((e) => e.id !== action.payload),
      };
    case "ADD_EXPERIENCE":
      return { ...state, experience: [...state.experience, action.payload] };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter((e) => e.id !== action.payload),
      };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
      };
    case "LOAD_SAMPLE":
      return { ...SAMPLE_RESUME };
    case "RESET":
      return createEmptyResume();
    default:
      return state;
  }
}

// --- Context ---

interface ResumeContextValue {
  resume: ResumeData;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

function migrateSkills(data: ResumeData): ResumeData {
  const skills = data.skills as unknown;
  if (typeof skills === "string") {
    const parts = (skills as string).split(",").map((s) => s.trim()).filter(Boolean);
    data.skills = { technical: parts, soft: [], tools: [] };
  } else if (!skills || typeof skills !== "object") {
    data.skills = { technical: [], soft: [], tools: [] };
  }
  // Migrate projects: string technologies → string[], link → liveUrl/githubUrl
  if (data.projects) {
    data.projects = data.projects.map((p) => {
      const proj = { ...p } as Record<string, unknown>;
      if (typeof proj.technologies === "string") {
        proj.technologies = (proj.technologies as string).split(",").map((s) => (s as string).trim()).filter(Boolean);
      }
      if (!Array.isArray(proj.technologies)) {
        proj.technologies = [];
      }
      if (proj.liveUrl === undefined) proj.liveUrl = (proj.link as string) || "";
      if (proj.githubUrl === undefined) proj.githubUrl = "";
      return proj as unknown as Project;
    });
  }
  return data;
}

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migrateSkills(JSON.parse(raw) as ResumeData);

    // One-time migration from old key
    const old = localStorage.getItem(OLD_STORAGE_KEY);
    if (old) {
      localStorage.setItem(STORAGE_KEY, old);
      localStorage.removeItem(OLD_STORAGE_KEY);
      return migrateSkills(JSON.parse(old) as ResumeData);
    }
  } catch {
    // ignore corrupt data
  }
  return createEmptyResume();
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, dispatch] = useReducer(reducer, null, loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  }, [resume]);

  return (
    <ResumeContext.Provider value={{ resume, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
