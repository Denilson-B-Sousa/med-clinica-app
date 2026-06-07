import {
  AdminFilters,
  AdminHeader,
  AdminNotice,
  AppointmentsManagementTable,
  AvailableTimesPanel,
  MetricCard,
  UserManagementTable,
} from "./components";
import {
  adminAppointments,
  adminDoctorOptions,
  adminDoctors,
  adminMetrics,
  adminPatients,
  availableTimes,
} from "./data";

function handlePendingAction() {
  return undefined;
}

export function AdminArea() {
  const activeUserKind = "patients";
  const users = activeUserKind === "patients" ? adminPatients : adminDoctors;

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1560px]">
        <AdminHeader />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {adminMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
              onChangeUserKind={handlePendingAction}
              onCreateUser={handlePendingAction}
              onDeleteUser={handlePendingAction}
              onEditUser={handlePendingAction}
              onToggleUserStatus={handlePendingAction}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
