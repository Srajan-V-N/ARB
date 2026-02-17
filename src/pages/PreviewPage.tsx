import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { useTemplate } from "@/context/TemplateContext";
import ResumeLayout from "@/components/resume/ResumeLayout";
import TemplateTabs from "@/components/ui/TemplateTabs";
import Button from "@/components/ui/Button";
import { resumeToText } from "@/lib/resumeToText";
import { getExportWarning } from "@/lib/exportWarning";

export default function PreviewPage() {
  const { resume } = useResume();
  const { template } = useTemplate();
  const [copied, setCopied] = useState(false);

  const warning = getExportWarning(resume);

  function handlePrint() {
    window.print();
  }

  function handleCopy() {
    navigator.clipboard.writeText(resumeToText(resume));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white px-8 py-12 print:min-h-0 print:p-0">
      <div className="mx-auto max-w-[800px]">
        <div className="print:hidden">
          <TemplateTabs />
        </div>

        <div className="print:hidden mt-4 flex items-center gap-3">
          <Button variant="secondary" onClick={handlePrint}>
            Print / Save as PDF
          </Button>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy as Text"}
          </Button>
        </div>

        {warning && (
          <p className="print:hidden mt-2 text-xs text-amber-600">{warning}</p>
        )}
      </div>
      <ResumeLayout resume={resume} template={template} />
    </div>
  );
}
