import { createBrowserRouter } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/HomePage";
import BuilderPage from "@/pages/BuilderPage";
import PreviewPage from "@/pages/PreviewPage";
import ProofPage from "@/pages/ProofPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "builder", element: <BuilderPage /> },
      { path: "preview", element: <PreviewPage /> },
      { path: "proof", element: <ProofPage /> },
    ],
  },
]);
