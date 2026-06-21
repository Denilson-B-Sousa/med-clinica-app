import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";

export function Header() {
  return (
    <header className="bg-transparent text-[#0094CB] py-4 px-6 grid grid-cols-3 items-center">
      <div className="justify-self-start">
        <Link to="/" className="flex items-center gap-2 pl-8 py-4">
          <h1 className="text-[28px] font-semibold">
            <span className="text-black">Med</span>Clínica
          </h1>
        </Link>
      </div>

      <div className="justify-self-center">
        <Navbar />
      </div>

      <div className="justify-self-end">
        <ProfileMenu name="Denilson Silva" />
      </div>
    </header>
  );
}
