import { ArrowLeft, ArrowRight } from "phosphor-react";

type AppointmentPaginationProps = {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function AppointmentPagination({
  currentPage,
  pageSize,
  total,
  onPageChange,
}: AppointmentPaginationProps) {
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Mostrando <strong>{start}</strong> a <strong>{end}</strong> de{" "}
        <strong>{total}</strong> consultas
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft/>
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? "flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-blue-600 font-bold text-white"
                  : "flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-200 font-semibold text-slate-600 transition hover:bg-slate-50"
              }
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowRight/>
        </button>
      </div>
    </div>
  );
}
