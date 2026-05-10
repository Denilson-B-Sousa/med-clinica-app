import { CalendarBlank, CalendarCheck } from "phosphor-react";
import { Button } from "../Button/Button";

export function NextAppointmentCard() {
  return (
    <div className="rounded-xl rounded-r-none bg-blue-500 text-white p-8">
      <span className="inline-block rounded-lg border border-white/30 px-4 py-2 text-sm font-medium">
        PRÓXIMA CONSULTA
      </span>

      <div className="mt-8 flex  items-center gap-3">
        <CalendarCheck size={48} />
        <span className="text-lg">Amanhã</span>
      </div>

      <div className="flex justify-center items-baseline-last mt-6">
        <h1 className="text-7xl font-bold leading-none">20</h1>
        <span className="text-4xl font-light uppercase">MAI</span>
      </div>

      <div className="mt-6 flex justify-center items-center gap-2">
        <span className="text-3xl font-semibold">às 08:00</span>
      </div>

      <div className="my-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/70" />
        <span>Faltam 1 dia</span>
        <div className="h-px flex-1 bg-white/70" />
      </div>

      <Button outlined size="xsm">
        <CalendarBlank size={24} />
        Adicionar ao calendário
      </Button>
    </div>
  );
}