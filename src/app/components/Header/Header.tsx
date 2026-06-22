import { Link } from "react-router-dom";
import { useMe } from "@/hooks/useMe";
import { getAuthenticatedFirstName } from "@/utils/user/getAuthenticatedFirstName";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";

export function Header() {
  const { data: me } = useMe();
  const firstName = getAuthenticatedFirstName(me, "Perfil");

  return (
    <header className="flex items-center justify-between bg-transparent px-6 py-4 text-[#0094CB]">
      <div>
        <Link to="/" className="flex items-center gap-2 pl-8 py-4">
          <h1 className="text-[28px] font-semibold">
            <span className="text-black">Med</span>Clínica
          </h1>
        </Link>
      </div>

      <div className="ml-auto">
        <ProfileMenu name={firstName} />
      </div>
    </header>
  );
}
