import { router } from "@/Router";
import "@/styles/app.css";
import { RouterProvider } from "react-router-dom";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
