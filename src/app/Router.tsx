// src/app/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Login }  from "@/pages/Login/Login";
import { Register } from "@/pages/Register/Register";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { PatientArea } from "@/pages/Home/PatientArea";
import { AppointmentHistory } from "./pages/AppointmentHistory/AppointmentHistory";
import { ScheduleAppointment } from "./pages/ScheduleAppointment/ScheduleAppointment";

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
      {
        path: "/historico-consultas",
        element: <AppointmentHistory/>
      },
      {
        path: "/agendar-consulta",
        element: <ScheduleAppointment/>
      }
     
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
