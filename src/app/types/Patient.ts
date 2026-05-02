
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