import { Button } from "@/components/Button/Button";
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
        <Button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="icon"
          variant="page"
        >
          <ArrowLeft />
        </Button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              size="icon"
              variant={page === currentPage ? "pageActive" : "page"}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          size="icon"
          variant="page"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
