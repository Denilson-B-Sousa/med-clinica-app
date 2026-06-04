import { router } from "@/Router";
import "@/styles/app.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
