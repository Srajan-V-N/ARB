import { useResume } from "@/context/ResumeContext";
import ResumeLayout from "@/components/resume/ResumeLayout";

export default function ResumePreviewPanel() {
  const { resume } = useResume();
  return <ResumeLayout resume={resume} compact />;
}
