interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: FormInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
      />
    </label>
  );
}
