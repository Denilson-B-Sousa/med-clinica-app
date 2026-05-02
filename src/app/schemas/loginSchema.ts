// src/schemas/loginSchema.ts

import { z } from "zod";
import { validationMessages } from "@/constants/ValidationMessages";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email(validationMessages.email.invalid)),

  password: z
    .string()
    .min(8, { message: validationMessages.password.min })
    .max(20, { message: validationMessages.password.max })
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
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
