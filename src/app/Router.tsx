import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppointmentHistory } from "@/pages/AppointmentHistory";
import { PatientArea } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { RescheduleAppointment } from "@/pages/RescheduleAppointment";
import { ScheduleAppointment } from "@/pages/ScheduleAppointment";

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
        element: <AppointmentHistory />,
      },
      {
        path: "/agendar-consulta",
        element: <ScheduleAppointment />,
      },
      {
        path: "/reagendar-consulta",
        element: <RescheduleAppointment />,
      },
      {
        path: "historico-consulta",
        element: <AppointmentHistory />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
