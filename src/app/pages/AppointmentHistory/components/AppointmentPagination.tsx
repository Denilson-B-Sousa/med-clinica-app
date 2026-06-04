type AppointmentPaginationProps = {
  total: number;
};

export function AppointmentPagination({ total }: AppointmentPaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <p className="text-sm text-slate-500">
        Mostrando <strong>{total}</strong> de <strong>{total}</strong>{" "}
        consultas
      </p>

      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50">
          ‹
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
          1
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50">
          ›
        </button>
      </div>
    </div>
  );
}
