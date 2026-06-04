import { Calendar, ShieldCheck, User } from "phosphor-react";
import type { ReactNode } from "react";

const BENEFITS = [
  {
    icon: <Calendar className="h-8 w-8 shrink-0" />,
    title: "Agendamento fácil e rápido",
    description: "Marque sua consulta em poucos cliques!",
  },
  {
    icon: <User className="h-8 w-8 shrink-0" />,
    title: "Acompanhamento Completo",
    description: "Tenha acesso ao seu histórico de saúde!",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 shrink-0" />,
    title: "Segurança e Privacidade",
    description: "Seus dados são protegidos com tecnologia de ponta!",
  },
];

type BenefitItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex items-start gap-4">
      {icon}
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
    </div>
  );
}

export function LoginBenefitsPanel() {
  return (
    <aside className="relative flex items-center justify-center bg-[url('/bg-login.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-[#0094CB]/60" />

      <div className="relative z-10 flex max-w-md flex-col gap-8 px-10 text-white">
        {BENEFITS.map((benefit) => (
          <BenefitItem key={benefit.title} {...benefit} />
        ))}
      </div>
    </aside>
  );
}
