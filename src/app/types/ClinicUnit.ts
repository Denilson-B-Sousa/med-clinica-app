import type { Address } from "./Address";

export type ClinicUnit = {
  id: string;
  name: string;
  phone: string;
  address: Address;
};

export type CreateClinicUnitPayload = Omit<ClinicUnit, "id">;
