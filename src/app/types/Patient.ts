import type { Address } from "./Address";

export type CreatePatientPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: "MASCULINO" | "FEMININO";
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipcode: string;
  };
};


export type Gender = "MASCULINO" | "FEMININO" | "OUTRO";

export type Patient = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: Address;
  birthDate: string;
  gender: Gender;
}