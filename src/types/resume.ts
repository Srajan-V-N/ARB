export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeLinks {
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string;
  links: ResumeLinks;
}

export function createEmptyResume(): ResumeData {
  return {
    personalInfo: { fullName: "", email: "", phone: "", location: "" },
    summary: "",
    education: [],
    experience: [],
    projects: [],
    skills: "",
    links: { linkedin: "", github: "", portfolio: "" },
  };
}
