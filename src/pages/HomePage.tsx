import { useNavigate } from "react-router";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-5xl font-bold text-text-primary leading-tight">
        Build a Resume That Gets Read.
      </h1>
      <p className="mt-4 max-w-md text-lg text-gray-500">
        A calm, focused space for crafting your professional story.
      </p>
      <Button className="mt-8" onClick={() => navigate("/builder")}>
        Start Building
      </Button>
    </div>
  );
}
