import { Button } from "@/components/Button/Button";
import type { FormEvent } from "react";
import { Info } from "phosphor-react";

const AVAILABLE_TIMES = ["08:00", "09:30", "14:00", "16:30"];

type RescheduleFormProps = {
  date: string;
  time: string;
  isSubmitting: boolean;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onSubmit: () => void;
};

export function RescheduleForm({
  date,
  time,
  isSubmitting,
  onDateChange,
  onTimeChange,
  onSubmit,
}: RescheduleFormProps) {
  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  const isSubmitDisabled = isSubmitting || !date || !time;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-lg font-bold">2. Nova data e horário</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold">Nova data</label>

          <input
            type="date"
            min={today}
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            required
            className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Horário disponível
          </label>

          <select
            value={time}
            onChange={(event) => onTimeChange(event.target.value)}
            required
            className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Selecione o novo horário</option>
            {AVAILABLE_TIMES.map((availableTime) => (
              <option key={availableTime} value={availableTime}>
                {availableTime}
              </option>
            ))}
          </select>
        </div>

        <div className="inline-flex items-center gap-4 rounded-xl bg-blue-50 p-5 text-sm text-slate-600">
          <Info size={32} />
          Ao confirmar, sua consulta será reagendada para a nova data e horário
          selecionados.
        </div>

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          size="full"
          variant="primary"
        >
          {isSubmitting ? "Reagendando..." : "Confirmar reagendamento"}
        </Button>
      </div>
    </form>
  );
}
