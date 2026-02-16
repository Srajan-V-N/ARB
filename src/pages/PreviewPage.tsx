import { useResume } from "@/context/ResumeContext";
import ResumeLayout from "@/components/resume/ResumeLayout";

export default function PreviewPage() {
  const { resume } = useResume();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white px-8 py-12">
      <ResumeLayout resume={resume} />
    </div>
  );
}
