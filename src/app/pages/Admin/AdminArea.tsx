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
  adminAppointments,
  adminAuditLogs,
  adminDoctorOptions,
  adminDoctors,
  adminPatients,
  availableTimes,
} from "./data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AdminUserKind } from "./types";

function handlePendingAction() {
  return undefined;
}

export function AdminArea() {
  const [activeUserKind, setActiveUserKind] =
    useState<AdminUserKind>("patients");
  const navigate = useNavigate();
  const users = activeUserKind === "patients" ? adminPatients : adminDoctors;

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
              onFilter={handlePendingAction}
              onClear={handlePendingAction}
            />
          </div>

          <div className="mt-5 grid min-w-0 gap-4">
            <AppointmentsManagementTable
              appointments={adminAppointments}
              onCancelAppointment={handlePendingAction}
            />
            <AdminNotice>
              Ao cancelar uma consulta, o status deve ser alterado para
              CANCELADA e o horario do medico liberado para novos agendamentos.
            </AdminNotice>
          </div>
        </section>

        <section className="mt-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <AvailableTimesPanel
            schedule={availableTimes}
            doctors={adminDoctorOptions}
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
