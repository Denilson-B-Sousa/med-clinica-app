// schemas/settingsSchema.ts

import { z } from "zod";

export const settingsSchema = z.object({
  fullName: z.string().min(3, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  institution: z.string().min(1, "Instituição obrigatória"),

  email: z.email("Email inválido"),

  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),

  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
