import { Link } from "react-router-dom";

export function AppointmentHistory() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Histórico de Consultas</h1>
      <p>
        Nenhuma consulta encontrada no seu histórico.{" "}
        <Link to={"#"} className="text-[#0094CB] font-semibold">
          Agendar primeira consulta?
        </Link>
      </p>
    </div>
  );
}