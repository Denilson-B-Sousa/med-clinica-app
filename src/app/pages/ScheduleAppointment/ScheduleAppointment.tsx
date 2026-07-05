import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { useScheduleAppointment } from "@/hooks/appointment/useScheduleAppointment";
import { useAppointmentAvailability } from "@/hooks/appointment/useAppointmentAvailability";
import { useDoctors } from "@/hooks/doctor/useDoctors";
import { clinicUnitService } from "@/services/clinicUnit/clinicUnitService";
import type { MedicalSpeciality } from "@/types/Doctor";
import {
  getAppointmentApiErrorMessage,
  type ApiErrorResponse,
} from "@/utils/appointmentApiError";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { AppointmentSummary, ScheduleAppointmentForm } from "./components";

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
  const scheduleAppointment = useScheduleAppointment();
  const availability = useAppointmentAvailability({
    doctorId: selectedDoctorId,
    clinicUnitId: selectedClinicUnitId,
    date: selectedDate,
  });

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
    setSelectedTime("");
  }

  function handleSpecialityChange(speciality: string) {
    setSelectedSpeciality(speciality as MedicalSpeciality | "");
    setSelectedDoctorId("");
    setSelectedTime("");
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
    try {
      const appointment = await scheduleAppointment.mutateAsync({
        doctorId: data.doctorId,
        clinicUnitId: data.clinicUnitId,
        scheduleAt: `${data.date}T${data.time}:00`,
        durationInMinutes: 30,
      });

      resetForm();
      toast.success("Consulta agendada com sucesso.");
      showAppointmentWarnings(appointment.warnings);
      navigate("/home");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      const response = apiError.response?.data;

      if (response?.code === "APPOINTMENT_TIME_UNAVAILABLE") {
        setSelectedTime("");
        void availability.refetch();
      }

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
          availableTimes={availability.data?.availableTimes ?? []}
          isLoadingAvailability={availability.isFetching}
          onSubmit={handleSubmit}
          selectedClinicUnitId={selectedClinicUnitId}
          selectedSpeciality={selectedSpeciality}
          selectedDoctorId={selectedDoctorId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onClinicUnitChange={handleClinicUnitChange}
          onSpecialityChange={handleSpecialityChange}
          onDoctorChange={(doctorId) => {
            setSelectedDoctorId(doctorId);
            setSelectedTime("");
          }}
          onDateChange={(date) => {
            setSelectedDate(date);
            setSelectedTime("");
          }}
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
