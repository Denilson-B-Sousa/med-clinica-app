import { DropdownMenu } from "@radix-ui/themes";
import { Button } from "@/components/Button/Button";
import { useLogoutUser } from "@/hooks/user/useLogoutUser";
import { CaretDown, SignOut, User } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProfileMenuProps {
  name: string;
}

export function ProfileMenu({ name }: ProfileMenuProps) {
  const navigate = useNavigate();
  const { mutateAsync: logout, isPending } = useLogoutUser();

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logout realizado com sucesso.");
    } catch (error) {
      toast.error("Sessão encerrada localmente.");
      console.error("Logout error:", error);
    } finally {
      navigate("/login", { replace: true });
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          type="button"
          size="profile"
          variant="profile"
          className="rounded-lg text-white hover:bg-white/10"
        >
          <span className="font-medium text-white">Olá, {name}</span>

          <CaretDown size={14} className="text-white" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-50 bg-white rounded-md p-2 shadow-lg!">
        <DropdownMenu.Label>Minha Conta</DropdownMenu.Label>

        <DropdownMenu.Separator />

        <DropdownMenu.Item
          className="cursor-pointer!"
          onSelect={() => navigate("/meu-perfil")}
        >
          <User size={16} />
          Meu Perfil
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item
          className="cursor-pointer!"
          color="red"
          disabled={isPending}
          onSelect={handleLogout}
        >
          <SignOut size={16} />
          {isPending ? "Saindo..." : "Sair"}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
