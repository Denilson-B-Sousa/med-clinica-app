import { PencilSimple, Plus, Power, Trash } from "phosphor-react";
import { AdminNotice } from "./AdminNotice";
import { AdminStatusBadge } from "./AdminStatusBadge";
import type { AdminUserKind, AdminUserRow } from "../types";
import { useState } from "react";

type UserManagementTableProps = {
  activeKind: AdminUserKind;
  users: AdminUserRow[];
  isLoading?: boolean;
  updatingUserId?: string;
  deletingUserId?: string;
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
  isLoading,
  updatingUserId,
  deletingUserId,
  onChangeUserKind,
  onEditUser,
  onToggleUserStatus,
  onDeleteUser,
  onCreateUser,
}: UserManagementTableProps) {
  const [userToDelete, setUserToDelete] = useState<AdminUserRow | null>(null);

  function handleConfirmDelete() {
    if (!userToDelete) {
      return;
    }

    onDeleteUser?.(userToDelete.id);
    setUserToDelete(null);
  }

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
              {activeKind === "doctors" && (
                <th className="px-4 py-3">Unidade</th>
              )}
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Acoes</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-sm text-[#20375F]">
            {isLoading && (
              <tr>
                <td
                  className="px-4 py-8 text-center text-slate-500"
                  colSpan={activeKind === "doctors" ? 7 : 6}
                >
                  Carregando usuarios...
                </td>
              </tr>
            )}

            {!isLoading && users.length === 0 && (
              <tr>
                <td
                  className="px-4 py-8 text-center text-slate-500"
                  colSpan={activeKind === "doctors" ? 7 : 6}
                >
                  Nenhum usuario encontrado.
                </td>
              </tr>
            )}

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
                {activeKind === "doctors" && (
                  <td className="px-4 py-3">{user.clinicUnitName ?? "-"}</td>
                )}
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
                      disabled={updatingUserId === user.id}
                      className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-blue-300 px-4 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
                    >
                      <Power size={15} />
                      {updatingUserId === user.id
                        ? "Salvando..."
                        : user.status === "ACTIVE"
                          ? "Desativar"
                          : "Ativar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setUserToDelete(user)}
                      disabled={deletingUserId === user.id}
                      className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-red-300 px-4 text-xs font-bold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash size={15} />
                      {deletingUserId === user.id ? "Excluindo..." : "Excluir Perfil"}
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

      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#0B1F4D]">
              Excluir perfil?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Esta acao removera o perfil de{" "}
              <strong>{userToDelete.name}</strong>.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="h-11 cursor-pointer rounded-md px-5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <Trash size={16} />
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
