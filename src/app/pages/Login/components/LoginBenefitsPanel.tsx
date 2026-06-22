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
        <h3 className="text-base font-bold sm:text-lg">{title}</h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
    </div>
  );
}

export function LoginBenefitsPanel() {
  return (
    <aside className="relative flex min-h-80 items-center justify-center bg-[url('/bg-login.png')] bg-cover bg-center bg-no-repeat px-5 py-10 lg:min-h-screen lg:px-0 lg:py-0">
      <div className="absolute inset-0 bg-[#0094CB]/60" />

      <div className="relative z-10 flex w-full max-w-md flex-col gap-6 text-white sm:gap-8 sm:px-10">
        {BENEFITS.map((benefit) => (
          <BenefitItem key={benefit.title} {...benefit} />
        ))}
      </div>
    </aside>
  );
}
