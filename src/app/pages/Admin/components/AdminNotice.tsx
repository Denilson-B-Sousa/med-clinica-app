import { Info } from "phosphor-react";

type AdminNoticeProps = {
  children: string;
};

export function AdminNotice({ children }: AdminNoticeProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
      <Info size={18} weight="fill" />
      <p>{children}</p>
    </div>
  );
}
