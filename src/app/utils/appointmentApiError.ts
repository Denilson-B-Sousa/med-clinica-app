export type ApiErrorResponse = {
  code?: string | null;
  message?: string;
  error?: string;
};

const appointmentConflictMessages: Record<string, string> = {
  PATIENT_DAILY_APPOINTMENT_LIMIT:
    "Você já tem 3 consultas marcadas neste dia. Escolha outra data ou cancele uma delas para continuar.",
  PATIENT_APPOINTMENT_TIME_CONFLICT:
    "Você já tem uma consulta nesse horário. Escolha outro horário para continuar.",
};

export function getAppointmentApiErrorMessage(
  response: ApiErrorResponse | undefined,
  defaultMessage: string,
) {
  const conflictMessage = response?.code
    ? appointmentConflictMessages[response.code]
    : undefined;

  if (conflictMessage) {
    return conflictMessage;
  }

  return response?.message ?? response?.error ?? defaultMessage;
}
