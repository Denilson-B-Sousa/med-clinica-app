import { useEffect, useState } from "react";
import {
  CaretLeft,
  CaretRight,
  ClockCounterClockwise,
  Funnel,
  MagnifyingGlass,
  X,
} from "phosphor-react";
import type {
  AdminAuditAction,
  AdminAuditLogRow,
} from "../types";

type AuditLogTableProps = {
  logs: AdminAuditLogRow[];
  search: string;
  action?: AdminAuditAction;
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
  isLoading?: boolean;
  isError?: boolean;
  onSearchChange: (search: string) => void;
  onActionChange: (action?: AdminAuditAction) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
};

const actionLabels: Record<AdminAuditAction, string> = {
  LOGIN: "Login",
  LOGOUT: "Logout",
  SCHEDULE_APPOINTMENT: "Agendamento",
  RESCHEDULE_APPOINTMENT: "Reagendamento",
  CANCEL_APPOINTMENT: "Cancelamento",
  CREATE_DOCTOR: "Cadastro de médico",
  UPDATE_DOCTOR: "Alteração de médico",
  UPDATE_USER_STATUS: "Alteração de status",
  DELETE_USER: "Exclusão de usuário",
  ADMIN_ACCESS_DENIED: "Acesso administrativo negado",
};

function formatExecutedAt(executedAt: string) {
  const date = new Date(executedAt);

  if (Number.isNaN(date.getTime())) {
    return { date: "-", time: "-" };
  }

  return {
    date: new Intl.DateTimeFormat("pt-BR").format(date),
    time: new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date),
  };
}

function formatSchedule(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function getAuditDetails(log: AdminAuditLogRow) {
  if (!log.appointmentId) {
    return [];
  }

  const identifiers = [
    `Consulta: ${log.appointmentId}`,
    log.patientId && `Paciente: ${log.patientId}`,
    log.doctorId && `Médico: ${log.doctorId}`,
    log.clinicUnitId && `Unidade: ${log.clinicUnitId}`,
  ].filter(Boolean);
  const schedule = `Horário: ${formatSchedule(log.previousScheduleAt) ?? "-"} → ${formatSchedule(log.newScheduleAt) ?? "-"}`;

  return [...identifiers, schedule, log.reason && `Motivo: ${log.reason}`].filter(Boolean);
}

export function AuditLogTable({
  logs,
  search,
  action,
  currentPage,
  pageSize,
  total,
  totalPages,
  isLoading,
  isError,
  onSearchChange,
  onActionChange,
  onPageChange,
  onClearFilters,
}: AuditLogTableProps) {
  const [searchInput, setSearchInput] = useState(search);
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  const safeTotalPages = Math.max(totalPages, 1);
  const firstVisiblePage = Math.max(
    1,
    Math.min(currentPage - 2, safeTotalPages - 4),
  );
  const visiblePages = Array.from(
    { length: Math.min(5, safeTotalPages) },
    (_, index) => firstVisiblePage + index,
  );

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    if (searchInput.trim() === search) {
      return;
    }

    const timeout = window.setTimeout(() => onSearchChange(searchInput.trim()), 400);
    return () => window.clearTimeout(timeout);
  }, [onSearchChange, search, searchInput]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
        <ClockCounterClockwise className="text-[#20375F]" size={22} weight="bold" />
        <h3 className="text-base font-bold text-[#0B1F4D]">Registro de auditoria</h3>
      </div>

      <div className="grid gap-4 border-b border-slate-200 px-4 py-4 lg:grid-cols-[1fr_280px_auto] lg:items-end">
        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Buscar
          <span className="relative">
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Usuário ou alvo da ação"
              className="h-12 w-full rounded-md border border-slate-300 px-4 pr-11 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <MagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          </span>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Ação
          <select
            value={action ?? ""}
            onChange={(event) => onActionChange((event.target.value || undefined) as AdminAuditAction | undefined)}
            className="h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Todas</option>
            {Object.entries(actionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>

        <button type="button" onClick={onClearFilters} className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50">
          <X size={16} /> Limpar
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-500">
        <Funnel size={18} /> {isLoading ? "Consultando registros..." : `${total} registros encontrados`}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-bold text-[#20375F]">
            <tr>
              <th className="px-4 py-3">Ação</th><th className="px-4 py-3">Usuário</th>
              <th className="px-4 py-3">Detalhes</th>
              <th className="px-4 py-3">Data</th><th className="px-4 py-3">Horário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-[#20375F]">
            {isLoading && <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={5}>Carregando auditoria...</td></tr>}
            {!isLoading && isError && <tr><td className="px-4 py-8 text-center text-red-600" colSpan={5}>Não foi possível carregar os registros de auditoria.</td></tr>}
            {!isLoading && !isError && logs.length === 0 && <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={5}>Nenhum registro encontrado para os filtros selecionados.</td></tr>}
            {!isLoading && !isError && logs.map((log) => {
              const executedAt = formatExecutedAt(log.executedAt);
              const details = getAuditDetails(log);
              return (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold">{actionLabels[log.action] ?? log.action}</td>
                  <td className="px-4 py-3">{log.username}</td>
                  <td className="px-4 py-3">
                    {details.length > 0 ? details.map((detail) => <span key={detail} className="block">{detail}</span>) : "-"}
                    {log.appointmentId && log.requestId && <small className="mt-1 block text-xs text-slate-400">Request: {log.requestId}</small>}
                  </td>
                  <td className="px-4 py-3">{executedAt.date}</td>
                  <td className="px-4 py-3">{executedAt.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Mostrando {start} a {end} de {total} registros</p>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Página anterior" disabled={currentPage <= 1 || isLoading} onClick={() => onPageChange(currentPage - 1)} className="flex h-9 cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"><CaretLeft size={16} /> Anterior</button>
          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              aria-label={`Ir para a página ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              disabled={isLoading || totalPages === 0}
              onClick={() => onPageChange(page)}
              className={`h-9 min-w-9 cursor-pointer rounded-md border px-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                page === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button type="button" aria-label="Próxima página" disabled={currentPage >= totalPages || isLoading || totalPages === 0} onClick={() => onPageChange(currentPage + 1)} className="flex h-9 cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40">Próxima <CaretRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
