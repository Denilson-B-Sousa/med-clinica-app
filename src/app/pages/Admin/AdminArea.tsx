import {
  AdminFilters,
  AdminHeader,
  AdminNotice,
  AppointmentsManagementTable,
  AuditLogTable,
  AvailableTimesPanel,
  UserManagementTable,
} from "./components";
import {
  adminAuditLogs,
  adminClinicUnits,
  adminDoctorOptions,
  adminDoctors,
  adminPatients,
  availableTimes,
} from "./data";
import { adminService } from "@/services/admin/adminService";
import { clinicUnitService } from "@/services/clinicUnit/clinicUnitService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type {
  AdminAppointmentsFilterValues,
  AdminAppointmentsParams,
  AdminUserKind,
} from "./types";

function handlePendingAction() {
  return undefined;
}

const APPOINTMENTS_PAGE_SIZE = 5;

const emptyAppointmentFilters: AdminAppointmentsFilterValues = {
  clinicUnitId: "",
  doctorId: "",
  patientName: "",
  status: "",
  date: "",
  period: "",
};

export function AdminArea() {
  const [activeUserKind, setActiveUserKind] =
    useState<AdminUserKind>("patients");
  const [appointmentFilters, setAppointmentFilters] =
    useState<AdminAppointmentsFilterValues>(emptyAppointmentFilters);
  const [appliedAppointmentFilters, setAppliedAppointmentFilters] =
    useState<AdminAppointmentsFilterValues>(emptyAppointmentFilters);
  const [appointmentsPage, setAppointmentsPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const users = activeUserKind === "patients" ? adminPatients : adminDoctors;
  const appointmentParams: AdminAppointmentsParams = {
    ...appliedAppointmentFilters,
    page: appointmentsPage - 1,
    size: APPOINTMENTS_PAGE_SIZE,
  };
  const { data: clinicUnits = adminClinicUnits } = useQuery({
    queryKey: ["clinic-units"],
    queryFn: clinicUnitService.findAll,
    select: (data) =>
      data.map((clinicUnit) => ({
        id: clinicUnit.id,
        name: clinicUnit.name,
      })),
    initialData: adminClinicUnits.map((clinicUnit) => ({
      id: clinicUnit.id,
      name: clinicUnit.name,
      phone: "",
      address: {
        street: "",
        number: "",
        district: "",
        city: "",
        state: "",
        zipcode: "",
      },
    })),
  });
  const {
    data: doctors = adminDoctorOptions,
    isLoading: isLoadingDoctors,
  } = useQuery({
    queryKey: ["admin-doctors", appointmentFilters.clinicUnitId],
    queryFn: () => adminService.findDoctors(appointmentFilters.clinicUnitId),
  });
  const doctorsBySelectedUnit = doctors.filter(
    (doctor) =>
      !appointmentFilters.clinicUnitId ||
      !doctor.clinicUnitId ||
      doctor.clinicUnitId === appointmentFilters.clinicUnitId,
  );
  const {
    data: appointments,
    isLoading: isLoadingAppointments,
  } = useQuery({
    queryKey: ["admin-appointments", appointmentParams],
    queryFn: () => adminService.findAppointments(appointmentParams),
  });
  const deleteAppointment = useMutation({
    mutationFn: adminService.deleteAppointment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast.success("Consulta excluida com sucesso.");
    },
    onError: (error) => {
      const apiError = error as AxiosError<{ message?: string; error?: string }>;
      const message =
        apiError.response?.status === 409
          ? (apiError.response.data?.message ??
            apiError.response.data?.error ??
            "Esta consulta nao pode ser excluida.")
          : "Nao foi possivel excluir a consulta.";

      toast.error(message);
    },
  });

  function handleFilterAppointments() {
    setAppliedAppointmentFilters(appointmentFilters);
    setAppointmentsPage(1);
  }

  function handleClearAppointmentFilters() {
    setAppointmentFilters(emptyAppointmentFilters);
    setAppliedAppointmentFilters(emptyAppointmentFilters);
    setAppointmentsPage(1);
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1560px]">
        <AdminHeader />

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#0B1F4D]">
            1. Gerenciar agenda da clinica
          </h2>

          <div className="mt-5">
            <AdminFilters
              clinicUnits={clinicUnits}
              doctors={doctorsBySelectedUnit}
              values={appointmentFilters}
              isLoadingDoctors={isLoadingDoctors}
              onChange={setAppointmentFilters}
              onFilter={handleFilterAppointments}
              onClear={handleClearAppointmentFilters}
            />
          </div>

          <div className="mt-5 grid min-w-0 gap-4">
            <AppointmentsManagementTable
              appointments={appointments?.content ?? []}
              currentPage={(appointments?.page ?? 0) + 1}
              pageSize={appointments?.size ?? APPOINTMENTS_PAGE_SIZE}
              total={appointments?.totalElements ?? 0}
              isLoading={isLoadingAppointments}
              deletingAppointmentId={deleteAppointment.variables}
              onPageChange={setAppointmentsPage}
              onDeleteAppointment={(appointmentId) =>
                deleteAppointment.mutate(appointmentId)
              }
            />
            <AdminNotice>
              Ao excluir uma consulta, o horario do medico deve ser liberado
              para novos agendamentos.
            </AdminNotice>
          </div>
        </section>

        <section className="mt-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <AvailableTimesPanel
            schedule={availableTimes}
            clinicUnits={adminClinicUnits}
            doctors={adminDoctorOptions}
            onClinicUnitChange={handlePendingAction}
            onDateChange={handlePendingAction}
            onDoctorChange={handlePendingAction}
            onPeriodChange={handlePendingAction}
            onSpecialityChange={handlePendingAction}
          />
        </section>

        <section className="mt-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#0B1F4D]">
            2. Gerenciar usuarios da clinica
          </h2>

          <div className="mt-4">
            <UserManagementTable
              activeKind={activeUserKind}
              users={users}
              onChangeUserKind={setActiveUserKind}
              onCreateUser={() => navigate("/administracao/medicos/novo")}
              onDeleteUser={handlePendingAction}
              onEditUser={handlePendingAction}
              onToggleUserStatus={handlePendingAction}
            />
          </div>
        </section>

        <section className="mt-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#0B1F4D]">
            3. Controle de auditoria
          </h2>

          <div className="mt-4">
            <AuditLogTable logs={adminAuditLogs} />
          </div>
        </section>
      </div>
    </section>
  );
}
