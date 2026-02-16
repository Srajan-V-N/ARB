import { useResume } from "@/context/ResumeContext";
import FormInput from "@/components/ui/FormInput";

export default function PersonalInfoSection() {
  const { resume, dispatch } = useResume();
  const { personalInfo } = resume;

  function update(field: string, value: string) {
    dispatch({
      type: "SET_PERSONAL_INFO",
      payload: { ...personalInfo, [field]: value },
    });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormInput label="Full Name" value={personalInfo.fullName} onChange={(v) => update("fullName", v)} placeholder="Jane Doe" />
      <FormInput label="Email" value={personalInfo.email} onChange={(v) => update("email", v)} type="email" placeholder="jane@example.com" />
      <FormInput label="Phone" value={personalInfo.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
      <FormInput label="Location" value={personalInfo.location} onChange={(v) => update("location", v)} placeholder="Bengaluru, India" />
    </div>
  );
}
