import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { useScheduleAppointment } from "@/hooks/appointment/useScheduleAppointment";
import { useDoctors } from "@/hooks/doctor/useDoctors";
import { usePatients } from "@/hooks/patient/usePatients";
import { useMe } from "@/hooks/useMe";
import type { MedicalSpeciality } from "@/types/Doctor";
import { AxiosError } from "axios";
import { AppointmentSummary, ScheduleAppointmentForm } from "./components";

type AuthenticatedPatient = {
  id?: string;
  patientId?: string;
};

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

function getScheduleErrorMessage(error?: string) {
  const normalizedError = error
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (
    normalizedError?.includes("data") &&
    normalizedError.includes("futura")
  ) {
    return "Escolha uma data futura para agendar a consulta.";
  }

  return error ?? "Nao foi possivel agendar a consulta. Verifique os dados e tente novamente.";
}

export function ScheduleAppointment() {
  const [selectedSpeciality, setSelectedSpeciality] = useState<
    MedicalSpeciality | ""
  >("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const { data: doctors = [], isLoading: isLoadingDoctors } = useDoctors(
    selectedSpeciality || undefined,
  );
  const { data: patients = [] } = usePatients();
  const { data: me } = useMe();
  const scheduleAppointment = useScheduleAppointment();

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor.id === selectedDoctorId),
    [doctors, selectedDoctorId],
  );

  function handleSpecialityChange(speciality: string) {
    setSelectedSpeciality(speciality as MedicalSpeciality | "");
    setSelectedDoctorId("");
  }

  function resetForm() {
    setSelectedSpeciality("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
  }

  async function handleSubmit(data: {
    doctorId: string;
    date: string;
    time: string;
  }) {
    const authenticatedPatient = me as AuthenticatedPatient | undefined;
    const patientId =
      authenticatedPatient?.patientId ?? authenticatedPatient?.id ?? patients[0]?.id;

    if (!patientId) {
      toast.error("Nao foi possivel identificar o paciente da consulta.");
      return;
    }

    try {
      await scheduleAppointment.mutateAsync({
        patientId,
        doctorId: data.doctorId,
        scheduleAt: `${data.date}T${data.time}:00`,
        status: "SCHEDULED",
        durationInMinutes: 30,
      });

      resetForm();
      toast.success("Consulta agendada com sucesso.");
      navigate("/home");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        apiError.response?.data?.message ?? apiError.response?.data?.error;

      toast.error(getScheduleErrorMessage(errorMessage));
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-5">
        <BackLink to="/home" />
      </div>

      <PageHeader
        title="Agendar consulta"
        description="Preencha os dados abaixo para agendar sua consulta."
      />

      {scheduleAppointment.isError && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Nao foi possivel agendar a consulta. Verifique os dados e tente
          novamente.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <ScheduleAppointmentForm
          doctors={doctors}
          isLoadingDoctors={isLoadingDoctors}
          isSubmitting={scheduleAppointment.isPending}
          onSubmit={handleSubmit}
          selectedSpeciality={selectedSpeciality}
          selectedDoctorId={selectedDoctorId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSpecialityChange={handleSpecialityChange}
          onDoctorChange={setSelectedDoctorId}
          onDateChange={setSelectedDate}
          onTimeChange={setSelectedTime}
        />

        <AppointmentSummary
          doctor={selectedDoctor}
          date={selectedDate}
          time={selectedTime}
          speciality={selectedSpeciality}
        />
      </div>
    </section>
  );
}
