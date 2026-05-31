// src/app/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Login }  from "@/pages/Login/Login";
import { Register } from "@/pages/Register/Register";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { PatientArea } from "@/pages/Home/PatientArea";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cadastro",
        element: <Register />,
      },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <PatientArea />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
