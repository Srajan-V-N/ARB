import type { ResumeData } from "@/types/resume";

export const SAMPLE_RESUME: ResumeData = {
  personalInfo: {
    fullName: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
  },
  summary:
    "Full-stack software engineer with 4+ years of experience building scalable web applications. Passionate about clean architecture, developer tooling, and shipping products that solve real problems. Experienced in React, Node.js, and cloud-native development.",
  education: [
    {
      id: "edu-1",
      institution: "Indian Institute of Technology, Bombay",
      degree: "B.Tech",
      field: "Computer Science and Engineering",
      startDate: "2016",
      endDate: "2020",
    },
    {
      id: "edu-2",
      institution: "National Public School, Bengaluru",
      degree: "Higher Secondary",
      field: "Science (PCM)",
      startDate: "2014",
      endDate: "2016",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Razorpay",
      role: "Senior Software Engineer",
      location: "Bengaluru, India",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "Led the checkout experience team, reducing payment drop-offs by 18%. Built a micro-frontend architecture serving 50M+ monthly transactions. Mentored 3 junior engineers and drove adoption of TypeScript across the frontend org.",
    },
    {
      id: "exp-2",
      company: "Flipkart",
      role: "Software Engineer",
      location: "Bengaluru, India",
      startDate: "Jul 2020",
      endDate: "Dec 2021",
      description:
        "Developed the product listing service handling 10K+ requests/sec during Big Billion Days. Implemented server-side rendering with Next.js, improving LCP by 40%. Contributed to the internal component library used by 12 teams.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "DevDash",
      description:
        "An open-source developer dashboard that aggregates GitHub, Jira, and Slack notifications into a single feed. Built with React, Express, and Redis. 1.2K stars on GitHub.",
      technologies: ["React", "Express", "Redis", "WebSockets"],
      liveUrl: "https://devdash.io",
      githubUrl: "https://github.com/arjunmehta/devdash",
    },
    {
      id: "proj-2",
      name: "LintBot",
      description:
        "A GitHub Action that auto-fixes common code style issues and opens PRs with corrections. Supports JavaScript, TypeScript, and Python. Used by 200+ repositories.",
      technologies: ["TypeScript", "GitHub Actions", "AST Parsing"],
      liveUrl: "",
      githubUrl: "https://github.com/arjunmehta/lintbot",
    },
  ],
  skills: {
    technical: ["TypeScript", "React", "Node.js", "Next.js", "PostgreSQL", "GraphQL"],
    soft: ["Team Leadership", "Problem Solving", "Communication"],
    tools: ["Git", "Docker", "AWS", "Redis", "Tailwind CSS", "CI/CD"],
  },
  links: {
    linkedin: "https://linkedin.com/in/arjunmehta",
    github: "https://github.com/arjunmehta",
    portfolio: "https://arjunmehta.dev",
  },
};
