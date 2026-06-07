import { router } from "@/Router";
import "@/styles/app.css";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

export function App() {
  useEffect(() => {
    function enableKeyboardNavigation(event: KeyboardEvent) {
      if (event.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
      }
    }

    function disableKeyboardNavigation() {
      document.body.classList.remove("keyboard-navigation");
    }

    window.addEventListener("keydown", enableKeyboardNavigation);
    window.addEventListener("mousedown", disableKeyboardNavigation);
    window.addEventListener("touchstart", disableKeyboardNavigation);

    return () => {
      window.removeEventListener("keydown", enableKeyboardNavigation);
      window.removeEventListener("mousedown", disableKeyboardNavigation);
      window.removeEventListener("touchstart", disableKeyboardNavigation);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
