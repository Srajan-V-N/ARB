import BuilderForm from "@/components/builder/BuilderForm";
import ResumePreviewPanel from "@/components/builder/ResumePreviewPanel";

export default function BuilderPage() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="w-1/2 overflow-y-auto border-r border-border p-6">
        <BuilderForm />
      </div>
      <div className="w-1/2 overflow-y-auto bg-white p-6">
        <ResumePreviewPanel />
      </div>
    </div>
  );
}
