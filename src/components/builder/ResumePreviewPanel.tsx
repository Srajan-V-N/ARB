import { useResume } from "@/context/ResumeContext";
import ResumeLayout from "@/components/resume/ResumeLayout";
import AtsScorePanel from "@/components/builder/AtsScorePanel";

export default function ResumePreviewPanel() {
  const { resume } = useResume();
  return (
    <>
      <AtsScorePanel />
      <ResumeLayout resume={resume} compact />
    </>
  );
}
