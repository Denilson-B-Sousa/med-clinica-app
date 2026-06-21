import { useMe } from "@/hooks/useMe";
import { getAuthenticatedFirstName } from "@/utils/user/getAuthenticatedFirstName";

export function PatientWelcome() {
  const { data: me } = useMe();
  const firstName = getAuthenticatedFirstName(me);

  return (
    <section className="flex flex-col px-14">
      <span className="text-2xl">
        Ola, <strong>{firstName}!</strong>
      </span>
      <span>Acompanhe suas consultas e informacoes de saude.</span>
    </section>
  );
}
