// src/app/schemas/registerSchema.ts

import { z } from "zod";
import { validationMessages } from "@/constants/ValidationMessages";

const passwordSchema = z
  .string()
  .min(8, validationMessages.password.min)
  .max(20, validationMessages.password.max)
  .refine((password) => /[A-Z]/.test(password), {
    message: validationMessages.password.uppercase,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: validationMessages.password.lowercase,
  })
  .refine((password) => /[0-9]/.test(password), {
    message: validationMessages.password.number,
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: validationMessages.password.special,
  });

export const registerSchema = z
  .object({
    name: z.string().trim().min(3, validationMessages.name.min),

    cpf: z.string().min(14, validationMessages.cpf.required),

    phone: z.string().min(15, validationMessages.phone.required),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email(validationMessages.email.invalid)),

    birthDate: z.string().min(1, validationMessages.common.required),

    gender: z.enum(["MASCULINO", "FEMININO"], {
      message: validationMessages.common.required,
    }),

    address: z.object({
      zipcode: z.string().min(9, validationMessages.address.zipcode.required),
      street: z.string().trim().min(1, validationMessages.address.street.required),
      district: z.string().trim().min(1, validationMessages.address.district.required),
      city: z.string().trim().min(1, validationMessages.address.city.required),

      state: z.enum(
        [
          "AC",
          "AL",
          "AP",
          "AM",
          "BA",
          "CE",
          "DF",
          "ES",
          "GO",
          "MA",
          "MT",
          "MS",
          "MG",
          "PA",
          "PB",
          "PR",
          "PE",
          "PI",
          "RJ",
          "RN",
          "RS",
          "RO",
          "RR",
          "SC",
          "SP",
          "SE",
          "TO",
        ],
        {
          message: validationMessages.address.state.required,
        },
      ),

      number: z.string().trim().min(1, validationMessages.address.number.required),
    }),

    password: passwordSchema,

    confirmPassword: z.string().min(1, validationMessages.password.confirmRequired),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validationMessages.password.mismatch,
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
