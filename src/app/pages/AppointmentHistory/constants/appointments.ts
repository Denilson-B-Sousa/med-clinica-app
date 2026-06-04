export type AppointmentHistoryItem = {
  date: string;
  weekday: string;
  time: string;
  doctorName: string;
  doctorImage: string;
  crm: string;
  specialty: string;
  city: string;
  address: string;
  status: "Agendada" | "Realizada" | "Cancelada";
};

export const APPOINTMENT_HISTORY: AppointmentHistoryItem[] = [
  {
    date: "15/07/2026",
    weekday: "quarta-feira",
    time: "10:30",
    doctorName: "Dra. Ana Carolina Souza",
    doctorImage: "https://i.pravatar.cc/40?img=12",
    crm: "CRM 123456-GO",
    specialty: "Cardiologia",
    city: "Goiânia",
    address: "Rua das Flores, 123",
    status: "Agendada",
  },
  {
    date: "10/06/2026",
    weekday: "segunda-feira",
    time: "14:00",
    doctorName: "Dra. Ana Carolina Souza",
    doctorImage: "https://i.pravatar.cc/40?img=12",
    crm: "CRM 123456-GO",
    specialty: "Cardiologia",
    city: "Goiânia",
    address: "Rua das Flores, 123",
    status: "Realizada",
  },
  {
    date: "20/05/2026",
    weekday: "segunda-feira",
    time: "09:00",
    doctorName: "Dra. Ana Carolina Souza",
    doctorImage: "https://i.pravatar.cc/40?img=12",
    crm: "CRM 123456-GO",
    specialty: "Cardiologia",
    city: "Goiânia",
    address: "Rua das Flores, 123",
    status: "Cancelada",
  },
];
