export type GooglePatientRegisterRequest = {
  cpf: string;
  phone: string;
  address: {
    street: string;
    number: string;
    district: string;
    state: string;
    city: string;
    zipcode: string;
  };
  birthDate: string;
  gender: string;
};
