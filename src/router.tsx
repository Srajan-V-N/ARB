import { createBrowserRouter, Navigate } from "react-router";
import RBLayout from "@/layouts/RBLayout";
import Step01 from "@/pages/rb/Step01";
import Step02 from "@/pages/rb/Step02";
import Step03 from "@/pages/rb/Step03";
import Step04 from "@/pages/rb/Step04";
import Step05 from "@/pages/rb/Step05";
import Step06 from "@/pages/rb/Step06";
import Step07 from "@/pages/rb/Step07";
import Step08 from "@/pages/rb/Step08";
import RBProof from "@/pages/rb/RBProof";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/rb/01-problem" replace />,
  },
  {
    path: "/rb",
    element: <RBLayout />,
    children: [
      { path: "01-problem", element: <Step01 /> },
      { path: "02-market", element: <Step02 /> },
      { path: "03-architecture", element: <Step03 /> },
      { path: "04-hld", element: <Step04 /> },
      { path: "05-lld", element: <Step05 /> },
      { path: "06-build", element: <Step06 /> },
      { path: "07-test", element: <Step07 /> },
      { path: "08-ship", element: <Step08 /> },
      { path: "proof", element: <RBProof /> },
    ],
  },
]);
