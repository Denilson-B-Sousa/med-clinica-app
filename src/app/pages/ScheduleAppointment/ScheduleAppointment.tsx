import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { useScheduleAppointment } from "@/hooks/appointment/useScheduleAppointment";
import { useDoctors } from "@/hooks/doctor/useDoctors";
import { usePatients } from "@/hooks/patient/usePatients";
import { useMe } from "@/hooks/useMe";
import { clinicUnitService } from "@/services/clinicUnit/clinicUnitService";
import type { MedicalSpeciality } from "@/types/Doctor";
import {
  getAppointmentApiErrorMessage,
  type ApiErrorResponse,
} from "@/utils/appointmentApiError";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { AppointmentSummary, ScheduleAppointmentForm } from "./components";

type AuthenticatedPatient = {
  id?: string;
  patientId?: string;
};

function showAppointmentWarnings(warnings?: string[]) {
  warnings?.forEach((warning) => toast.warning(warning));
}

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

  return error ?? "Não foi possível agendar a consulta. Verifique os dados e tente novamente.";
}

export function ScheduleAppointment() {
  const [selectedClinicUnitId, setSelectedClinicUnitId] = useState("");
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
  const { data: clinicUnits = [], isLoading: isLoadingClinicUnits } = useQuery({
    queryKey: ["clinic-units"],
    queryFn: clinicUnitService.findAll,
  });
  const { data: patients = [] } = usePatients();
  const { data: me } = useMe();
  const scheduleAppointment = useScheduleAppointment();

  const filteredDoctors = useMemo(() => {
    if (!selectedClinicUnitId) {
      return doctors;
    }

    return doctors.filter(
      (doctor) =>
        !doctor.clinicUnitId || doctor.clinicUnitId === selectedClinicUnitId,
    );
  }, [doctors, selectedClinicUnitId]);

  const selectedDoctor = useMemo(
    () => filteredDoctors.find((doctor) => doctor.id === selectedDoctorId),
    [filteredDoctors, selectedDoctorId],
  );

  const selectedClinicUnit = useMemo(
    () => clinicUnits.find((clinicUnit) => clinicUnit.id === selectedClinicUnitId),
    [clinicUnits, selectedClinicUnitId],
  );

  function handleClinicUnitChange(clinicUnitId: string) {
    setSelectedClinicUnitId(clinicUnitId);
    setSelectedDoctorId("");
  }

  function handleSpecialityChange(speciality: string) {
    setSelectedSpeciality(speciality as MedicalSpeciality | "");
    setSelectedDoctorId("");
  }

  function resetForm() {
    setSelectedClinicUnitId("");
    setSelectedSpeciality("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
  }

  async function handleSubmit(data: {
    clinicUnitId: string;
    doctorId: string;
    date: string;
    time: string;
  }) {
    const authenticatedPatient = me as AuthenticatedPatient | undefined;
    const patientId =
      authenticatedPatient?.patientId ?? authenticatedPatient?.id ?? patients[0]?.id;

    if (!patientId) {
      toast.error("Não foi possível identificar o paciente da consulta.");
      return;
    }

    try {
      const appointment = await scheduleAppointment.mutateAsync({
        patientId,
        doctorId: data.doctorId,
        clinicUnitId: data.clinicUnitId,
        scheduleAt: `${data.date}T${data.time}:00`,
        status: "SCHEDULED",
        durationInMinutes: 30,
      });

      resetForm();
      toast.success("Consulta agendada com sucesso.");
      showAppointmentWarnings(appointment.warnings);
      navigate("/home");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      const response = apiError.response?.data;

      toast.error(getAppointmentApiErrorMessage(
        response,
        getScheduleErrorMessage(response?.message ?? response?.error),
      ));
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
          Não foi possível agendar a consulta. Verifique os dados e tente
          novamente.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <ScheduleAppointmentForm
          clinicUnits={clinicUnits}
          doctors={filteredDoctors}
          isLoadingClinicUnits={isLoadingClinicUnits}
          isLoadingDoctors={isLoadingDoctors}
          isSubmitting={scheduleAppointment.isPending}
          onSubmit={handleSubmit}
          selectedClinicUnitId={selectedClinicUnitId}
          selectedSpeciality={selectedSpeciality}
          selectedDoctorId={selectedDoctorId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onClinicUnitChange={handleClinicUnitChange}
          onSpecialityChange={handleSpecialityChange}
          onDoctorChange={setSelectedDoctorId}
          onDateChange={setSelectedDate}
          onTimeChange={setSelectedTime}
        />

        <AppointmentSummary
          clinicUnit={selectedClinicUnit}
          doctor={selectedDoctor}
          date={selectedDate}
          time={selectedTime}
          speciality={selectedSpeciality}
        />
      </div>
    </section>
  );
}
