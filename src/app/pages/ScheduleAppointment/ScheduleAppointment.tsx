import { useMemo, useState } from "react";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { useScheduleAppointment } from "@/hooks/appointment/useScheduleAppointment";
import { useDoctors } from "@/hooks/doctor/useDoctors";
import { usePatients } from "@/hooks/patient/usePatients";
import { toast } from "sonner";
import { AppointmentSummary, ScheduleAppointmentForm } from "./components";
import { useNavigate } from "react-router-dom";


export function ScheduleAppointment() {
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();


  const { data: doctors = [], isLoading: isLoadingDoctors } = useDoctors();
  const { data: patients = [] } = usePatients();
  const scheduleAppointment = useScheduleAppointment();

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor.id === selectedDoctorId),
    [doctors, selectedDoctorId],
  );

  function handleSpecialityChange(speciality: string) {
    setSelectedSpeciality(speciality);
    setSelectedDoctorId("");
  }

  function resetForm() {
    setSelectedSpeciality("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
  }

  async function handleSubmit(data: {
    doctorId: string;
    date: string;
    time: string;
    notes: string;
  }) {
    const patient = patients[0];

    if (!patient) {
      toast.error("Nenhum paciente foi encontrado no json-server.");
      return;
    }

    try {
      await scheduleAppointment.mutateAsync({
        patientId: patient.id,
        doctorId: data.doctorId,
        scheduleAt: `${data.date}T${data.time}:00`,
        status: "SCHEDULED",
        durationInMinutes: 30,
        notes: data.notes.trim() || undefined,
      });

      resetForm();
      toast.success("Consulta agendada com sucesso.");
      navigate("/home");

    } catch {
      toast.error(
        "Não foi possível agendar a consulta. Verifique se o json-server está rodando na porta 3001.",
      );
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
          Não foi possível agendar a consulta. Verifique se o json-server está
          rodando na porta 3001.
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
          notes={notes}
          onSpecialityChange={handleSpecialityChange}
          onDoctorChange={setSelectedDoctorId}
          onDateChange={setSelectedDate}
          onTimeChange={setSelectedTime}
          onNotesChange={setNotes}
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
