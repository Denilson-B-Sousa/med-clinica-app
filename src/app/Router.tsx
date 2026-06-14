import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import { AdminArea, AdminFullSchedule } from "@/pages/Admin";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppointmentHistory } from "@/pages/AppointmentHistory";
import { PatientArea } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { RescheduleAppointment } from "@/pages/RescheduleAppointment";
import { ScheduleAppointment } from "@/pages/ScheduleAppointment";
import { OAuthSuccess } from "./pages/OauthSuccess/OauthSuccess";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminArea />,
  },
  {
    path: "/admin/agenda",
    element: <AdminFullSchedule />,
  },
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
      {
        path: "/cadastro/google",
        element: <Register />,
      },
      {
        path: "/oauth-success",
        element: <OAuthSuccess />,
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
        path: "/reagendar-consulta/:id",
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
