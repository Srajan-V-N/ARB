import { RouterProvider } from "react-router";
import { router } from "@/router";
import { ResumeProvider } from "@/context/ResumeContext";

export default function App() {
  return (
    <ResumeProvider>
      <RouterProvider router={router} />
    </ResumeProvider>
  );
}
