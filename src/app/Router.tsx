import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import {
  AdminArea,
  AdminClinicUnits,
  AdminDoctorRegister,
  AdminFullSchedule,
  AdminProfile,
} from "@/pages/Admin";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppointmentHistory } from "@/pages/AppointmentHistory";
import { PatientArea } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { RescheduleAppointment } from "@/pages/RescheduleAppointment";
import { ScheduleAppointment } from "@/pages/ScheduleAppointment";
import { ProfileSettings } from "@/pages/ProfileSettings";
import { OAuthSuccess } from "./pages/OauthSuccess/OauthSuccess";

export const router = createBrowserRouter([
  {
    path: "/administracao",
    element: <AdminArea />,
  },
  {
    path: "/administracao/agenda",
    element: <AdminFullSchedule />,
  },
  {
    path: "/administracao/unidades",
    element: <AdminClinicUnits />,
  },
  {
    path: "/administracao/perfil",
    element: <AdminProfile />,
  },
  {
    path: "/administracao/medicos/novo",
    element: <AdminDoctorRegister />,
  },
  {
    path: "/admin",
    element: <AdminArea />,
  },
  {
    path: "/admin/agenda",
    element: <Navigate to="/administracao/agenda" replace />,
  },
  {
    path: "/admin/unidades",
    element: <Navigate to="/administracao/unidades" replace />,
  },
  {
    path: "/admin/perfil",
    element: <Navigate to="/administracao/perfil" replace />,
  },
  {
    path: "/admin/medicos/novo",
    element: <Navigate to="/administracao/medicos/novo" replace />,
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
        path: "/meu-perfil",
        element: <ProfileSettings />,
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
