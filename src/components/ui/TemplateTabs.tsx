import { useTemplate, ACCENT_COLORS, type AccentColor } from "@/context/TemplateContext";
import type { TemplateName } from "@/types/template";

const templates: { value: TemplateName; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
];

const accentKeys = Object.keys(ACCENT_COLORS) as AccentColor[];

function ClassicIcon() {
  return (
    <div className="flex flex-col gap-1.5 p-2 w-full h-full">
      <div className="h-2.5 w-3/4 rounded-sm bg-current opacity-60" />
      <div className="h-1 w-1/2 rounded-sm bg-current opacity-30" />
      <div className="mt-1 border-b border-current opacity-30" />
      <div className="h-1 w-full rounded-sm bg-current opacity-20" />
      <div className="h-1 w-5/6 rounded-sm bg-current opacity-20" />
      <div className="mt-0.5 border-b border-current opacity-30" />
      <div className="h-1 w-full rounded-sm bg-current opacity-20" />
      <div className="h-1 w-4/5 rounded-sm bg-current opacity-20" />
      <div className="h-1 w-full rounded-sm bg-current opacity-20" />
    </div>
  );
}

function ModernIcon() {
  return (
    <div className="flex w-full h-full">
      <div className="w-[35%] rounded-l bg-current opacity-50 flex flex-col gap-1 p-1.5">
        <div className="h-1 w-full rounded-sm bg-white opacity-60" />
        <div className="h-1 w-3/4 rounded-sm bg-white opacity-40" />
        <div className="mt-1 h-1 w-full rounded-sm bg-white opacity-40" />
        <div className="h-1 w-2/3 rounded-sm bg-white opacity-40" />
      </div>
      <div className="w-[65%] flex flex-col gap-1 p-2">
        <div className="h-2 w-3/4 rounded-sm bg-current opacity-50" />
        <div className="h-1 w-full rounded-sm bg-current opacity-20" />
        <div className="h-1 w-5/6 rounded-sm bg-current opacity-20" />
        <div className="mt-0.5 h-1 w-full rounded-sm bg-current opacity-20" />
        <div className="h-1 w-4/5 rounded-sm bg-current opacity-20" />
      </div>
    </div>
  );
}

function MinimalIcon() {
  return (
    <div className="flex flex-col gap-2.5 p-2.5 w-full h-full">
      <div className="h-2 w-2/3 rounded-sm bg-current opacity-50" />
      <div className="h-1 w-1/3 rounded-sm bg-current opacity-20" />
      <div className="h-1 w-full rounded-sm bg-current opacity-15" />
      <div className="h-1 w-5/6 rounded-sm bg-current opacity-15" />
      <div className="mt-1 h-1 w-1/3 rounded-sm bg-current opacity-20" />
      <div className="h-1 w-4/5 rounded-sm bg-current opacity-15" />
    </div>
  );
}

const iconMap: Record<TemplateName, () => JSX.Element> = {
  classic: ClassicIcon,
  modern: ModernIcon,
  minimal: MinimalIcon,
};

export default function TemplateTabs() {
  const { template, setTemplate, accentColor, setAccentColor } = useTemplate();

  return (
    <div className="mb-4">
      {/* Template thumbnail cards */}
      <div className="flex gap-3">
        {templates.map((t) => {
          const Icon = iconMap[t.value];
          const isActive = template === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setTemplate(t.value)}
              className={`relative flex flex-col items-center rounded-lg border-2 transition-all ${
                isActive
                  ? "border-blue-500 shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ width: 120 }}
            >
              <div className="w-full h-[80px] text-gray-700 overflow-hidden rounded-t-md bg-white">
                <Icon />
              </div>
              <span className="py-1.5 text-[11px] font-medium text-gray-600">
                {t.label}
              </span>
              {isActive && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Color picker */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[11px] text-gray-500 mr-1">Accent:</span>
        {accentKeys.map((key) => {
          const isActive = accentColor === key;
          return (
            <button
              key={key}
              onClick={() => setAccentColor(key)}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              className={`rounded-full transition-all ${
                isActive ? "ring-2 ring-offset-2 ring-gray-400" : ""
              }`}
              style={{
                width: 28,
                height: 28,
                backgroundColor: ACCENT_COLORS[key],
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
