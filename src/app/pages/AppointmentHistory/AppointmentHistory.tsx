import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { Button } from "@/components/Button/Button";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { useAppointments } from "@/hooks/appointment/useAppoinments";
import { useCancelAppointment } from "@/hooks/appointment/useCancelAppointment";
import { toast } from "sonner";
import {
  AppointmentFilters,
  AppointmentPagination,
  AppointmentsTable,
  type AppointmentHistoryFilter,
} from "./components";

const PAGE_SIZE = 5;

export function AppointmentHistory() {
  const [activeFilter, setActiveFilter] =
    useState<AppointmentHistoryFilter>("ALL");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState("");

  const { data: appointmentsPage, isLoading } = useAppointments({
    page: currentPage - 1,
    size: PAGE_SIZE,
    status: activeFilter === "ALL" ? undefined : activeFilter,
    search,
  });
  const cancelAppointment = useCancelAppointment();

  const appointments = appointmentsPage?.content ?? [];
  const totalAppointments = appointmentsPage?.totalElements ?? 0;

  function handleFilterChange(filter: AppointmentHistoryFilter) {
    setActiveFilter(filter);
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setActiveFilter("ALL");
    setSearch("");
    setCurrentPage(1);
  }

  async function handleCancel(appointmentId: string) {
    setCancellingAppointmentId(appointmentId);

    try {
      await cancelAppointment.mutateAsync(appointmentId);
      toast.success("Consulta cancelada com sucesso.");
    } catch {
      toast.error("Não foi possível cancelar a consulta.");
    } finally {
      setCancellingAppointmentId("");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-8">
      <BackLink to="/home" />

      <PageHeader
        title="Histórico de consultas"
        description="Veja aqui todas as suas consultas realizadas e agendadas."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <AppointmentFilters
          activeFilter={activeFilter}
          search={search}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          onClear={handleClearFilters}
        />

        {isLoading && <p className="py-8 text-slate-500">Carregando...</p>}

        {!isLoading &&
          appointments.length === 0 &&
          !search &&
          activeFilter === "ALL" && (
            <EmptyState
              title="Nenhuma consulta encontrada"
              description="Assim que você agendar uma consulta, ela aparecerá aqui."
              primaryAction={
                <Button to="/agendar-consulta" size="md" primary>
                  Agendar consulta
                </Button>
              }
            />
          )}

        {!isLoading &&
          appointments.length === 0 &&
          (search || activeFilter !== "ALL") && (
            <EmptyState
              title="Nenhum resultado encontrado"
              description="Altere os filtros ou busque por outro termo."
            />
          )}

        {!isLoading && appointments.length > 0 && (
          <>
            <AppointmentsTable
              appointments={appointments}
              cancellingAppointmentId={cancellingAppointmentId}
              onCancel={handleCancel}
            />
            <AppointmentPagination
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              total={totalAppointments}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
