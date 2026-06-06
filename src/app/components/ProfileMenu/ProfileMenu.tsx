import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { Button } from "@/components/Button/Button";
import { CaretDown, SignOut, User } from "phosphor-react";

interface ProfileMenuProps {
  name: string;
  avatarUrl: string;
}

export function ProfileMenu({ name, avatarUrl }: ProfileMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button type="button" size="profile" variant="profile">
          <Avatar src={avatarUrl} fallback={name[0]} radius="full" size="3" />

          <span className="font-medium text-[#0094CB]">{name}</span>

          <CaretDown size={14} className="text-[#0094CB]" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-50 bg-white rounded-md p-2 shadow-lg!">
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
