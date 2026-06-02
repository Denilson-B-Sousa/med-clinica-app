import type { ViaCepResponse } from "@/types/ViaCepResponse";
import axios from "axios";


const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});


export async function getAddressByCep(cep: string) : Promise<ViaCepResponse> {

    const sanitizedCep = cep.replace(/\D/g, "");

    const { data } = await viacep.get<ViaCepResponse>(`/${sanitizedCep}/json/`);

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    return data;
}
