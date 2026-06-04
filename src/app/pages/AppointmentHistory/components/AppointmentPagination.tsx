export function AppointmentPagination() {
  return (
    <div className="mt-8 flex items-center justify-between">
      <p className="text-sm text-slate-500">
        Mostrando <strong>1</strong> a <strong>3</strong> de{" "}
        <strong>12</strong> consultas
      </p>

      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50">
          ‹
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={
              page === 1
                ? "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white"
                : "flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-semibold text-slate-600 transition hover:bg-slate-50"
            }
          >
            {page}
          </button>
        ))}

        <span className="px-2 text-slate-400">...</span>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-semibold text-slate-600 transition hover:bg-slate-50">
          4
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50">
          ›
        </button>
      </div>
    </div>
  );
}
