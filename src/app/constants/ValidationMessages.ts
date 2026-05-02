// src/app/constants/validationMessages.ts

export const validationMessages = {
  common: {
    required: "*Este campo é obrigatório.",
    invalid: "*Valor inválido.",
  },

  name: {
    required: "*Informe seu nome completo.",
    min: "*O nome deve ter pelo menos 3 caracteres.",
  },

  email: {
    required: "*O email é obrigatório.",
    invalid: "*Informe um email válido.",
  },

  password: {
    required: "*A senha é obrigatória.",
    min: "*A senha deve ter no mínimo 8 caracteres.",
    max: "*A senha deve ter no máximo 20 caracteres.",
    uppercase: "*A senha deve conter pelo menos uma letra maiúscula.",
    lowercase: "*A senha deve conter pelo menos uma letra minúscula.",
    number: "*A senha deve conter pelo menos um número.",
    special:
      "*A senha deve conter pelo menos um caractere especial (!@#$%^&*).",
    mismatch: "*As senhas não coincidem.",
    confirmRequired: "*Confirme sua senha.",
  },

  cpf: {
    required: "*O CPF é obrigatório.",
    invalid: "*Informe um CPF válido.",
  },

  phone: {
    required: "*O telefone é obrigatório.",
    invalid: "*Informe um telefone válido.",
  },

  address: {
    zipcode: {
      required: "*O CEP é obrigatório.",
      invalid: "*Informe um CEP válido.",
    },
    street: {
      required: "*Informe a rua.",
    },
    district: {
      required: "*Informe o bairro.",
    },
    city: {
      required: "*Informe a cidade.",
    },
    state: {
      required: "*Selecione um estado.",
    },
    number: {
      required: "*Informe o número.",
    },
  },

  birthDate: {
    required: "*Informe sua data de nascimento.",
  },

  gender: {
    required: "*Selecione o sexo biológico.",
  },
} as const;
