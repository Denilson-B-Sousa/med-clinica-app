import type {
  AdminAppointmentRow,
  AdminAvailableTimes,
  AdminDoctorOption,
  AdminMetric,
  AdminScheduleSlot,
  AdminUserRow,
} from "./types";

export const adminMetrics: AdminMetric[] = [
  {
    id: "today",
    label: "Consultas hoje",
    value: "24",
    helper: "Total do dia",
    tone: "blue",
  },
  {
    id: "scheduled",
    label: "Agendadas",
    value: "14",
    helper: "em relacao a ontem",
    tone: "cyan",
    trend: {
      value: "16%",
      tone: "positive",
    },
  },
  {
    id: "completed",
    label: "Realizadas",
    value: "7",
    helper: "em relacao a ontem",
    tone: "violet",
    trend: {
      value: "8%",
      tone: "positive",
    },
  },
  {
    id: "canceled",
    label: "Canceladas",
    value: "3",
    helper: "em relacao a ontem",
    tone: "red",
    trend: {
      value: "50%",
      tone: "negative",
    },
  },
];

export const adminAppointments: AdminAppointmentRow[] = [
  {
    id: "appointment-1",
    date: "26/05/2026",
    time: "08:30",
    doctorName: "Dra. Ana Carolina Souza",
    patientName: "Joao Pedro Silva",
    speciality: "Cardiologia",
    status: "SCHEDULED",
    canCancel: true,
  },
  {
    id: "appointment-2",
    date: "26/05/2026",
    time: "09:15",
    doctorName: "Dr. Ricardo Almeida",
    patientName: "Maria Fernanda Lima",
    speciality: "Ortopedia",
    status: "COMPLETED",
    canCancel: false,
  },
  {
    id: "appointment-3",
    date: "26/05/2026",
    time: "10:00",
    doctorName: "Dra. Ana Carolina Souza",
    patientName: "Carlos Eduardo M.",
    speciality: "Cardiologia",
    status: "CANCELED",
    canCancel: false,
  },
  {
    id: "appointment-4",
    date: "26/05/2026",
    time: "10:45",
    doctorName: "Dr. Ricardo Almeida",
    patientName: "Juliana Costa",
    speciality: "Ortopedia",
    status: "SCHEDULED",
    canCancel: true,
  },
  {
    id: "appointment-5",
    date: "26/05/2026",
    time: "11:30",
    doctorName: "Dra. Marina Nogueira",
    patientName: "Paulo Henrique Dias",
    speciality: "Dermatologia",
    status: "SCHEDULED",
    canCancel: true,
  },
];

export const availableTimes: AdminAvailableTimes = {
  doctorId: "doctor-1",
  doctorName: "Dra. Ana Carolina Souza",
  selectedDate: "2026-05-26",
  selectedPeriod: "DAY",
  dateLabel: "26/05/2026 (Hoje)",
  times: [
    "07:30",
    "08:00",
    "09:45",
    "11:15",
    "14:00",
    "14:30",
    "15:15",
    "16:00",
    "16:45",
    "17:30",
  ],
};

export const adminDoctorOptions: AdminDoctorOption[] = [
  {
    id: "doctor-1",
    name: "Dra. Ana Carolina Souza",
    speciality: "Cardiologia",
    status: "ACTIVE",
  },
  {
    id: "doctor-2",
    name: "Dr. Ricardo Almeida",
    speciality: "Ortopedia",
    status: "ACTIVE",
  },
  {
    id: "doctor-3",
    name: "Dra. Marina Nogueira",
    speciality: "Dermatologia",
    status: "INACTIVE",
  },
];

export const adminScheduleSlots: AdminScheduleSlot[] = [
  {
    id: "slot-0730",
    time: "07:30",
    status: "AVAILABLE",
  },
  {
    id: "slot-0800",
    time: "08:00",
    status: "AVAILABLE",
  },
  {
    id: "slot-0830",
    time: "08:30",
    status: "SCHEDULED",
    patientName: "Joao Pedro Silva",
    appointmentId: "appointment-1",
    canCancel: true,
  },
  {
    id: "slot-0915",
    time: "09:15",
    status: "COMPLETED",
    patientName: "Maria Fernanda Lima",
    appointmentId: "appointment-2",
    canCancel: false,
  },
  {
    id: "slot-1000",
    time: "10:00",
    status: "CANCELED",
    patientName: "Carlos Eduardo M.",
    appointmentId: "appointment-3",
    canCancel: false,
  },
  {
    id: "slot-1045",
    time: "10:45",
    status: "SCHEDULED",
    patientName: "Juliana Costa",
    appointmentId: "appointment-4",
    canCancel: true,
  },
  {
    id: "slot-1115",
    time: "11:15",
    status: "AVAILABLE",
  },
  {
    id: "slot-1400",
    time: "14:00",
    status: "AVAILABLE",
  },
  {
    id: "slot-1430",
    time: "14:30",
    status: "AVAILABLE",
  },
  {
    id: "slot-1515",
    time: "15:15",
    status: "AVAILABLE",
  },
  {
    id: "slot-1600",
    time: "16:00",
    status: "AVAILABLE",
  },
  {
    id: "slot-1645",
    time: "16:45",
    status: "AVAILABLE",
  },
];

export const adminPatients: AdminUserRow[] = [
  {
    id: "patient-1",
    initials: "JS",
    name: "Joao Pedro Silva",
    cpf: "123.456.789-01",
    email: "joaopedro.silva@email.com",
    phone: "(62) 98111-2233",
    status: "ACTIVE",
  },
  {
    id: "patient-2",
    initials: "MF",
    name: "Maria Fernanda Lima",
    cpf: "987.654.321-00",
    email: "maria.lima@email.com",
    phone: "(62) 98222-3344",
    status: "ACTIVE",
  },
  {
    id: "patient-3",
    initials: "AC",
    name: "Antonio Carlos Souza",
    cpf: "456.789.123-55",
    email: "antonio.souza@email.com",
    phone: "(62) 98333-4455",
    status: "INACTIVE",
  },
];

export const adminDoctors: AdminUserRow[] = [
  {
    id: "doctor-1",
    initials: "AS",
    name: "Dra. Ana Carolina Souza",
    cpf: "234.567.891-10",
    email: "ana.souza@medclinica.com.br",
    phone: "(62) 99111-2020",
    status: "ACTIVE",
  },
  {
    id: "doctor-2",
    initials: "RA",
    name: "Dr. Ricardo Almeida",
    cpf: "345.678.912-20",
    email: "ricardo.almeida@medclinica.com.br",
    phone: "(62) 99222-3030",
    status: "ACTIVE",
  },
  {
    id: "doctor-3",
    initials: "MN",
    name: "Dra. Marina Nogueira",
    cpf: "456.789.123-30",
    email: "marina.nogueira@medclinica.com.br",
    phone: "(62) 99333-4040",
    status: "INACTIVE",
  },
];
