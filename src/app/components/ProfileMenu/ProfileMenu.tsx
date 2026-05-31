import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { CaretDown, SignOut, User } from "phosphor-react";

interface ProfileMenuProps {
  name: string;
  avatarUrl: string;
}

export function ProfileMenu({ name, avatarUrl }: ProfileMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          className="flex items-center gap-3 pr-12 py-2 cursor-pointer outline-none
      focus:outline-none
      focus-visible:outline-none"
        >
          <Avatar src={avatarUrl} fallback={name[0]} radius="full" size="3" />

          <span className="font-medium text-[#0094CB]">{name}</span>

          <CaretDown size={14} className="text-[#0094CB]" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-[200px] bg-white rounded-md p-2 shadow-lg!">
        <DropdownMenu.Label>Minha Conta</DropdownMenu.Label>

        <DropdownMenu.Separator />

        <DropdownMenu.Item className="cursor-pointer!">
          <User size={16} />
          Meu Perfil
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item className="cursor-pointer!" color="red">
          <SignOut size={16} />
          Sair
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
