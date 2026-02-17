import { useResume } from "@/context/ResumeContext";
import { useTemplate } from "@/context/TemplateContext";
import ResumeLayout from "@/components/resume/ResumeLayout";
import TemplateTabs from "@/components/ui/TemplateTabs";

export default function PreviewPage() {
  const { resume } = useResume();
  const { template } = useTemplate();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white px-8 py-12">
      <div className="mx-auto max-w-[800px]">
        <TemplateTabs />
      </div>
      <ResumeLayout resume={resume} template={template} />
    </div>
  );
}
