import { RouterProvider } from "react-router";
import { router } from "@/router";
import { ResumeProvider } from "@/context/ResumeContext";
import { TemplateProvider } from "@/context/TemplateContext";

export default function App() {
  return (
    <ResumeProvider>
      <TemplateProvider>
        <RouterProvider router={router} />
      </TemplateProvider>
    </ResumeProvider>
  );
}
