import { NavLink } from "react-router-dom";

const links = [
  { path: "/", label: "Início" },
  { path: "/sobre", label: "Sobre" },
  { path: "/servicos", label: "Serviços" },
  { path: "/depoimentos", label: "Depoimentos" },
];

export function Navbar() {
  return (
    <nav className="px-4 py-3">
      <ul className="flex items-center gap-8 text-[#0094CB]">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `transition-all duration-200 underline-offset-4 ${
                  isActive
                    ? "underline font-semibold"
                    : "hover:underline"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}