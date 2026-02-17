import { useResume } from "@/context/ResumeContext";
import { useTemplate, ACCENT_COLORS } from "@/context/TemplateContext";
import ResumeLayout from "@/components/resume/ResumeLayout";
import AtsScorePanel from "@/components/builder/AtsScorePanel";
import TemplateTabs from "@/components/ui/TemplateTabs";

export default function ResumePreviewPanel() {
  const { resume } = useResume();
  const { template, accentColor } = useTemplate();
  return (
    <>
      <AtsScorePanel />
      <TemplateTabs />
      <ResumeLayout resume={resume} compact template={template} accentColor={ACCENT_COLORS[accentColor]} />
    </>
  );
}
