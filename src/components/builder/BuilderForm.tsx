import { useResume } from "@/context/ResumeContext";
import Button from "@/components/ui/Button";
import AccordionCard from "@/components/ui/AccordionCard";
import PersonalInfoSection from "@/components/builder/sections/PersonalInfoSection";
import SummarySection from "@/components/builder/sections/SummarySection";
import EducationSection from "@/components/builder/sections/EducationSection";
import ExperienceSection from "@/components/builder/sections/ExperienceSection";
import ProjectsSection from "@/components/builder/sections/ProjectsSection";
import SkillsSection from "@/components/builder/sections/SkillsSection";
import LinksSection from "@/components/builder/sections/LinksSection";

export default function BuilderForm() {
  const { dispatch } = useResume();

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={() => dispatch({ type: "LOAD_SAMPLE" })}>
        Load Sample Data
      </Button>

      <AccordionCard title="Personal Info" defaultOpen>
        <PersonalInfoSection />
      </AccordionCard>

      <AccordionCard title="Summary">
        <SummarySection />
      </AccordionCard>

      <AccordionCard title="Education">
        <EducationSection />
      </AccordionCard>

      <AccordionCard title="Experience">
        <ExperienceSection />
      </AccordionCard>

      <AccordionCard title="Projects">
        <ProjectsSection />
      </AccordionCard>

      <AccordionCard title="Skills">
        <SkillsSection />
      </AccordionCard>

      <AccordionCard title="Links">
        <LinksSection />
      </AccordionCard>
    </div>
  );
}
