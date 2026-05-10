import { MapPin, CheckCircle, Trash} from "phosphor-react";
import { Button } from "../Button/Button";

export function DoctorCard() {
  return (
    <div className="rounded-xl flex flex-col justify-between bg-white space-y-6 p-8">
      <div className="flex items-start gap-5">
        <img
          src="https://miro.medium.com/1*XpwkAEH2JiVWqDB_0MhWwQ.png"
          alt="Dr. Andrew"
          className="w-24 h-24 rounded-full"
        />

        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold text-slate-900">Dr. Andrew</h2>

          <span className="mt-1 text-lg text-slate-600">Oftalmologista</span>

          <small className="mt-3 w-fit rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            CRM 123456/SP
          </small>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3">
        <MapPin size={32} className="mt-1 text-slate-500" />

        <div>
          <h4 className="text-lg font-semibold text-slate-900">
            Med-Clínica - Unidade Centro
          </h4>

          <p>Rua Exemplo, 123 - Centro</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button primary size="lg">
          <CheckCircle size={24} />
          Confirmar presença
        </Button>

        <Button error size="lg">
          <Trash size={24} />
          Cancelar
        </Button>
      </div>
    </div>
  );
}