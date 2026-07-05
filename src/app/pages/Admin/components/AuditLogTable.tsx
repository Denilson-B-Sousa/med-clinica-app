import { useMemo, useState } from "react";
import { ClockCounterClockwise, Funnel, MagnifyingGlass, X } from "phosphor-react";
import type { AdminAuditAction, AdminAuditLogRow } from "../types";

type AuditLogTableProps = {
  logs: AdminAuditLogRow[];
};

type AuditRoleFilter = "ALL" | AdminAuditLogRow["userRole"];
type AuditActionFilter = "ALL" | AdminAuditAction;

const actionLabels: Record<AdminAuditAction, string> = {
  LOGIN: "Login",
  LOGOUT: "Logout",
  SCHEDULE_APPOINTMENT: "Agendamento",
  RESCHEDULE_APPOINTMENT: "Reagendamento",
  CANCEL_APPOINTMENT: "Cancelamento",
  CREATE_DOCTOR: "Cadastro de medico",
  UPDATE_DOCTOR: "Alteracao de medico",
  UPDATE_USER_STATUS: "Alteracao de status",
  DELETE_USER: "Exclusao de usuario",
};

const roleLabels: Record<AdminAuditLogRow["userRole"], string> = {
  ADMIN: "Admin",
  PATIENT: "Paciente",
  DOCTOR: "Médico",
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const [roleFilter, setRoleFilter] = useState<AuditRoleFilter>("ALL");
  const [actionFilter, setActionFilter] = useState<AuditActionFilter>("ALL");
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesRole = roleFilter === "ALL" || log.userRole === roleFilter;
      const matchesAction =
        actionFilter === "ALL" || log.action === actionFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        log.userName.toLowerCase().includes(normalizedSearch) ||
        log.target.toLowerCase().includes(normalizedSearch);

      return matchesRole && matchesAction && matchesSearch;
    });
  }, [actionFilter, logs, roleFilter, search]);

  function handleClearFilters() {
    setRoleFilter("ALL");
    setActionFilter("ALL");
    setSearch("");
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <ClockCounterClockwise
            className="text-[#20375F]"
            size={22}
            weight="bold"
          />
          <h3 className="text-base font-bold text-[#0B1F4D]">
            Registro de auditoria
          </h3>
        </div>
      </div>

      <div className="grid gap-4 border-b border-slate-200 px-4 py-4 lg:grid-cols-[1fr_220px_260px_auto] lg:items-end">
        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Buscar
          <span className="relative">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Usuário ou alvo da ação"
              className="h-12 w-full rounded-md border border-slate-300 px-4 pr-11 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <MagnifyingGlass
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
          </span>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Perfil
          <select
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value as AuditRoleFilter)
            }
            className="h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="ALL">Todos</option>
            <option value="ADMIN">Admin</option>
            <option value="PATIENT">Paciente</option>
            <option value="DOCTOR">Médico</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Acao
          <select
            value={actionFilter}
            onChange={(event) =>
              setActionFilter(event.target.value as AuditActionFilter)
            }
            className="h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="ALL">Todas</option>
            {Object.entries(actionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleClearFilters}
          className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          <X size={16} />
          Limpar
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-500">
        <Funnel size={18} />
        Mostrando {filteredLogs.length} de {logs.length} registros
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-bold text-[#20375F]">
            <tr>
              <th className="px-4 py-3">Acao</th>
              <th className="px-4 py-3">Usuário</th>
              <th className="px-4 py-3">Perfil</th>
              <th className="px-4 py-3">Alvo</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Horário</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-sm text-[#20375F]">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">
                  {actionLabels[log.action]}
                </td>
                <td className="px-4 py-3">{log.userName}</td>
                <td className="px-4 py-3">{roleLabels[log.userRole]}</td>
                <td className="px-4 py-3">{log.target}</td>
                <td className="px-4 py-3">{log.date}</td>
                <td className="px-4 py-3">{log.time}</td>
              </tr>
            ))}

            {filteredLogs.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={6}>
                  Nenhum registro encontrado para os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 text-sm text-slate-500">
        Registros devem armazenar a ação, o usuário executor, a data e o
        horario da operacao.
      </div>
    </div>
  );
}
