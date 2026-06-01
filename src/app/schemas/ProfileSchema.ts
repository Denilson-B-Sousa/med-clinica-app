// schemas/profileSchema.ts

import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(3, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  institution: z.string().min(3, "Instituição obrigatória"),

  email: z.email("Email inválido"),

  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),

  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
