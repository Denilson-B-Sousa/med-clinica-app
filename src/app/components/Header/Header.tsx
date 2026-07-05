import { Link } from "react-router-dom";
import { useMe } from "@/hooks/useMe";
import { getAuthenticatedFirstName } from "@/utils/user/getAuthenticatedFirstName";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";

export function Header() {
  const { data: me } = useMe();
  const firstName = getAuthenticatedFirstName(me, "Perfil");

  return (
    <header className="flex items-center justify-between bg-[#0094CB]/80 px-6 py-4 text-white">
      <div>
        <Link to="/" className="flex items-center gap-2 pl-8 py-4">
          <h1 className="text-[28px] font-semibold text-white">
            <span className="text-black/85">Med</span>Clínica
          </h1>
        </Link>
      </div>

      <div className="ml-auto">
        <ProfileMenu name={firstName} />
      </div>
    </header>
  );
}
