import { PencilSimple, Plus, Power, Trash } from "phosphor-react";
import { AdminNotice } from "./AdminNotice";
import { AdminStatusBadge } from "./AdminStatusBadge";
import type { AdminUserKind, AdminUserRow } from "../types";

type UserManagementTableProps = {
  activeKind: AdminUserKind;
  users: AdminUserRow[];
  onChangeUserKind?: (kind: AdminUserKind) => void;
  onEditUser?: (userId: string) => void;
  onToggleUserStatus?: (userId: string) => void;
  onDeleteUser?: (userId: string) => void;
  onCreateUser?: () => void;
};

const userKindLabels: Record<AdminUserKind, string> = {
  patients: "paciente",
  doctors: "medico",
};

const avatarColors = [
  "bg-blue-600",
  "bg-violet-600",
  "bg-orange-500",
  "bg-emerald-600",
];

export function UserManagementTable({
  activeKind,
  users,
  onChangeUserKind,
  onEditUser,
  onToggleUserStatus,
  onDeleteUser,
  onCreateUser,
}: UserManagementTableProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => onChangeUserKind?.("patients")}
            className={`cursor-pointer border-b-2 px-4 pb-3 text-sm font-bold ${
              activeKind === "patients"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500"
            }`}
          >
            Pacientes
          </button>
          <button
            type="button"
            onClick={() => onChangeUserKind?.("doctors")}
            className={`cursor-pointer border-b-2 px-4 pb-3 text-sm font-bold ${
              activeKind === "doctors"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500"
            }`}
          >
            Medicos
          </button>
        </div>

        {activeKind === "doctors" && (
          <button
            type="button"
            onClick={onCreateUser}
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} weight="bold" />
            Cadastrar {userKindLabels[activeKind]}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-bold text-[#20375F]">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">CPF</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Acoes</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-sm text-[#20375F]">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                        avatarColors[index % avatarColors.length]
                      }`}
                    >
                      {user.initials}
                    </span>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{user.cpf}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">
                  <AdminStatusBadge type="user" status={user.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEditUser?.(user.id)}
                      className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-blue-300 px-4 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
                    >
                      <PencilSimple size={15} />
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleUserStatus?.(user.id)}
                      className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-blue-300 px-4 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
                    >
                      <Power size={15} />
                      {user.status === "ACTIVE" ? "Desativar" : "Ativar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteUser?.(user.id)}
                      className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-red-300 px-4 text-xs font-bold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash size={15} />
                      Excluir Perfil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3">
        <AdminNotice>
          Usuarios desativados nao podem acessar o sistema e ficam ocultos nas
          listas operacionais.
        </AdminNotice>
      </div>
    </div>
  );
}
