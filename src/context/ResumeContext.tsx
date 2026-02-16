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
  type ResumeLinks,
  createEmptyResume,
} from "@/types/resume";
import { SAMPLE_RESUME } from "@/data/sampleResume";

const STORAGE_KEY = "arb-resume-data";

// --- Actions ---

type Action =
  | { type: "SET_PERSONAL_INFO"; payload: PersonalInfo }
  | { type: "SET_SUMMARY"; payload: string }
  | { type: "SET_SKILLS"; payload: string }
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

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ResumeData;
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
