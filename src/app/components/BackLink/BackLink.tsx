import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";

type BackLinkProps = {
  to: string;
  label?: string;
};

export function BackLink({ to, label = "Voltar" }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sky-500 hover:underline"
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  );
}
