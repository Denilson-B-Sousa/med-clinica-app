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
  APPOINTMENT_TIME_UNAVAILABLE: "Este horário não está mais disponível. Escolha outro horário.",
  APPOINTMENT_NOT_ACTIVE: "Esta consulta não está mais ativa e não pode ser alterada.",
  APPOINTMENT_NOT_OWNED_BY_PATIENT: "Esta consulta não pertence ao seu cadastro.",
  DOCTOR_NOT_AVAILABLE: "O médico não está disponível nesse horário. Escolha outra opção.",
  DOCTOR_NOT_ASSIGNED_TO_CLINIC_UNIT: "Este médico não atende na unidade selecionada. Escolha outra combinação.",
  APPOINTMENT_OUTSIDE_BUSINESS_HOURS: "Escolha um horário entre 08:00 e 18:00.",
  APPOINTMENT_DATE_MUST_BE_FUTURE: "Escolha uma data e um horário futuros.",
  APPOINTMENT_CANCELLATION_DEADLINE_EXCEEDED: "O prazo para cancelamento desta consulta expirou.",
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

  return defaultMessage;
}
