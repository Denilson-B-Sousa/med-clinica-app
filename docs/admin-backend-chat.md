# Chat para implementacao backend da area Admin

Use este texto como pedido para o time/agente de backend implementar tudo que a pagina `/admin` e a pagina `/admin/agenda` precisam para funcionar com dados reais.

## Contexto

O frontend da Med Clinica possui uma area administrativa em React nas rotas:

- `/admin`: painel administrativo com metricas, filtros de consultas, tabela de consultas, horarios disponiveis e gestao de usuarios.
- `/admin/agenda`: agenda completa por medico, data, visualizacao e status.

Hoje essas telas usam mocks em `src/app/pages/Admin/data.ts` e handlers vazios. O backend precisa expor APIs reais para substituir esses dados fixos.

Base URL usada pelo frontend: `VITE_API_URL`, com fallback para `http://localhost:8080/`.

Autenticacao: o Axios esta configurado com `withCredentials: true`, entao o backend deve aceitar credenciais/cookies e proteger as rotas administrativas. Apenas usuarios admin devem acessar estes endpoints.

## Status e enums esperados

Consultas:

- `SCHEDULED`: agendada.
- `CONFIRMED`: confirmada, caso o backend ja use esse status.
- `COMPLETED`: realizada.
- `CANCELED`: cancelada.

Slots da agenda:

- `AVAILABLE`: horario livre.
- `SCHEDULED`: horario com consulta agendada.
- `COMPLETED`: consulta realizada.
- `CANCELED`: consulta cancelada.

Usuarios:

- `ACTIVE`: ativo.
- `INACTIVE`: inativo.

Periodos:

- `DAY`: dia inteiro.
- `MORNING`: manha.
- `AFTERNOON`: tarde.
- `EVENING`: noite.

Especialidades medicas usadas no frontend:

- `ORTOPEDIA`
- `CARDIOLOGIA`
- `DERMATOLOGIA`
- `ENDOCRINOLOGIA`
- `GASTROENTEROLOGIA`
- `GERIATRIA`
- `HEMATOLOGIA`
- `INFECTOLOGIA`
- `NEUROLOGIA`
- `OFTALMOLOGIA`
- `ONCOLOGIA`
- `PEDIATRIA`
- `PNEUMOLOGIA`
- `GINECOLOGIA`
- `REUMATOLOGIA`
- `UROLOGIA`
- `PSICOLOGIA`
- `PSIQUIATRIA`

## 1. Metricas do painel Admin

Criar endpoint:

`GET /admin/metrics`

Parametros opcionais:

- `date`: data base no formato `YYYY-MM-DD`. Se nao vier, usar a data atual do servidor.

Resposta esperada:

```json
{
  "metrics": [
    {
      "id": "today",
      "label": "Consultas hoje",
      "value": "24",
      "helper": "Total do dia",
      "tone": "blue"
    },
    {
      "id": "scheduled",
      "label": "Agendadas",
      "value": "14",
      "helper": "em relacao a ontem",
      "tone": "cyan",
      "trend": {
        "value": "16%",
        "tone": "positive"
      }
    },
    {
      "id": "completed",
      "label": "Realizadas",
      "value": "7",
      "helper": "em relacao a ontem",
      "tone": "violet",
      "trend": {
        "value": "8%",
        "tone": "positive"
      }
    },
    {
      "id": "canceled",
      "label": "Canceladas",
      "value": "3",
      "helper": "em relacao a ontem",
      "tone": "red",
      "trend": {
        "value": "50%",
        "tone": "negative"
      }
    }
  ]
}
```

Regras:

- `today`: total de consultas da data.
- `scheduled`: consultas com status `SCHEDULED` ou `CONFIRMED` na data.
- `completed`: consultas com status `COMPLETED` na data.
- `canceled`: consultas com status `CANCELED` na data.
- `trend` deve comparar com o dia anterior. Pode retornar `neutral` quando nao houver base para comparacao.

## 2. Listagem administrativa de consultas

Criar endpoint:

`GET /admin/appointments`

Parametros:

- `page`: numero da pagina, iniciando em 0.
- `size`: quantidade por pagina.
- `doctorId`: opcional.
- `patientSearch`: opcional, busca por nome, CPF ou email do paciente.
- `status`: opcional, um dos status de consulta.
- `date`: opcional, `YYYY-MM-DD`.
- `period`: opcional, `DAY`, `MORNING`, `AFTERNOON` ou `EVENING`.
- `speciality`: opcional, especialidade medica.

Resposta esperada:

```json
{
  "content": [
    {
      "id": "appointment-1",
      "date": "26/05/2026",
      "time": "08:30",
      "scheduleAt": "2026-05-26T08:30:00",
      "doctorId": "doctor-1",
      "doctorName": "Dra. Ana Carolina Souza",
      "patientId": "patient-1",
      "patientName": "Joao Pedro Silva",
      "speciality": "CARDIOLOGIA",
      "status": "SCHEDULED",
      "canCancel": true
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 24,
  "totalPages": 3
}
```

Regras:

- Ordenar por `scheduleAt` crescente por padrao.
- `date` e `time` podem vir prontos para exibicao, mas `scheduleAt` tambem deve ser enviado para permitir formatacao no frontend.
- `canCancel` deve ser `true` apenas para consultas que ainda podem ser canceladas.
- Consultas `COMPLETED` e `CANCELED` nao podem ser canceladas.

## 3. Cancelamento de consulta pelo Admin

Criar endpoint:

`PATCH /admin/appointments/{appointmentId}/cancel`

Body opcional:

```json
{
  "reason": "Cancelado pela administracao"
}
```

Resposta esperada:

```json
{
  "id": "appointment-1",
  "status": "CANCELED",
  "scheduleAt": "2026-05-26T08:30:00",
  "doctorId": "doctor-1",
  "patientId": "patient-1"
}
```

Regras obrigatorias:

- Ao cancelar, alterar o status para `CANCELED`.
- Liberar o horario do medico para novos agendamentos.
- Nao permitir cancelamento de consulta `COMPLETED` ou ja `CANCELED`.
- Retornar erro 409 quando a consulta nao puder mais ser cancelada.
- Registrar auditoria basica: usuario admin que cancelou, data/hora e motivo, se houver.

## 4. Horarios disponiveis

Criar endpoint:

`GET /admin/available-times`

Parametros:

- `doctorId`: obrigatorio.
- `date`: obrigatorio, `YYYY-MM-DD`.
- `period`: opcional, `DAY`, `MORNING`, `AFTERNOON` ou `EVENING`.

Resposta esperada:

```json
{
  "doctorId": "doctor-1",
  "doctorName": "Dra. Ana Carolina Souza",
  "selectedDate": "2026-05-26",
  "selectedPeriod": "DAY",
  "dateLabel": "26/05/2026",
  "times": ["07:30", "08:00", "09:45", "11:15", "14:00"]
}
```

Regras:

- Retornar somente horarios livres.
- Nao retornar horarios ocupados por consultas `SCHEDULED`, `CONFIRMED` ou `COMPLETED`.
- Horarios de consultas `CANCELED` devem voltar a ficar disponiveis.
- Respeitar jornada de atendimento, duracao padrao da consulta e bloqueios do medico, se existirem.
- Filtrar por periodo quando informado.

## 5. Agenda completa

Criar endpoint:

`GET /admin/schedule`

Parametros:

- `doctorId`: obrigatorio.
- `date`: obrigatorio quando `view=DAY`.
- `startDate`: obrigatorio quando `view=WEEK`.
- `endDate`: obrigatorio quando `view=WEEK`.
- `view`: `DAY` ou `WEEK`.
- `status`: opcional, `AVAILABLE`, `SCHEDULED`, `COMPLETED`, `CANCELED` ou `ALL`.

Resposta esperada para visao diaria:

```json
{
  "doctorId": "doctor-1",
  "doctorName": "Dra. Ana Carolina Souza",
  "selectedDate": "2026-05-26",
  "dateLabel": "26/05/2026",
  "slots": [
    {
      "id": "slot-2026-05-26-0730",
      "time": "07:30",
      "scheduleAt": "2026-05-26T07:30:00",
      "status": "AVAILABLE"
    },
    {
      "id": "slot-2026-05-26-0830",
      "time": "08:30",
      "scheduleAt": "2026-05-26T08:30:00",
      "status": "SCHEDULED",
      "patientName": "Joao Pedro Silva",
      "appointmentId": "appointment-1",
      "canCancel": true
    }
  ]
}
```

Regras:

- A agenda deve conter horarios livres e ocupados.
- `AVAILABLE` nao deve ter `appointmentId`.
- Slots com consulta devem conter `appointmentId`, `patientName` e `canCancel`.
- O filtro de status deve funcionar tambem para `AVAILABLE`.
- Quando a consulta for cancelada pelo admin, o slot deve mudar para `AVAILABLE` em novas consultas da agenda.

## 6. Listagem de medicos para filtros

Criar ou garantir endpoint:

`GET /admin/doctors`

Parametros opcionais:

- `speciality`: filtrar por especialidade.
- `status`: `ACTIVE` ou `INACTIVE`.
- `includeInactive`: booleano.

Resposta esperada:

```json
{
  "content": [
    {
      "id": "doctor-1",
      "name": "Dra. Ana Carolina Souza",
      "cpf": "234.567.891-10",
      "email": "ana.souza@medclinica.com.br",
      "phone": "(62) 99111-2020",
      "crm": "CRM-GO 12345",
      "speciality": "CARDIOLOGIA",
      "status": "ACTIVE"
    }
  ]
}
```

Regras:

- Para filtros operacionais, o frontend usara medicos `ACTIVE`.
- Para gestao de usuarios, o admin precisa ver ativos e inativos.

## 7. Gestao de pacientes

Criar endpoint:

`GET /admin/patients`

Parametros:

- `page`
- `size`
- `search`: opcional, por nome, CPF, email ou telefone.
- `status`: opcional, `ACTIVE` ou `INACTIVE`.

Resposta esperada:

```json
{
  "content": [
    {
      "id": "patient-1",
      "initials": "JS",
      "name": "Joao Pedro Silva",
      "cpf": "123.456.789-01",
      "email": "joaopedro.silva@email.com",
      "phone": "(62) 98111-2233",
      "status": "ACTIVE"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 42,
  "totalPages": 5
}
```

Criar endpoints de acao:

- `PATCH /admin/patients/{patientId}/status`
- `DELETE /admin/patients/{patientId}`

Body para status:

```json
{
  "status": "INACTIVE"
}
```

Regras:

- Usuario inativo nao pode acessar o sistema.
- Preferir exclusao logica em vez de apagar fisicamente, para preservar historico de consultas.
- Se houver historico vinculado, `DELETE` deve inativar ou retornar erro de conflito com mensagem clara.

## 8. Gestao de medicos

Criar endpoint:

`GET /admin/doctors/users`

Parametros:

- `page`
- `size`
- `search`: opcional, por nome, CPF, CRM, email ou telefone.
- `status`: opcional, `ACTIVE` ou `INACTIVE`.
- `speciality`: opcional.

Resposta esperada:

```json
{
  "content": [
    {
      "id": "doctor-1",
      "initials": "AS",
      "name": "Dra. Ana Carolina Souza",
      "cpf": "234.567.891-10",
      "email": "ana.souza@medclinica.com.br",
      "phone": "(62) 99111-2020",
      "crm": "CRM-GO 12345",
      "speciality": "CARDIOLOGIA",
      "status": "ACTIVE"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 12,
  "totalPages": 2
}
```

Criar endpoints de acao:

- `POST /admin/doctors`
- `PUT /admin/doctors/{doctorId}`
- `PATCH /admin/doctors/{doctorId}/status`
- `DELETE /admin/doctors/{doctorId}`

Body para criacao/edicao:

```json
{
  "name": "Dra. Ana Carolina Souza",
  "cpf": "234.567.891-10",
  "email": "ana.souza@medclinica.com.br",
  "phone": "(62) 99111-2020",
  "crm": "CRM-GO 12345",
  "speciality": "CARDIOLOGIA",
  "password": "senha-inicial-opcional"
}
```

Body para status:

```json
{
  "status": "INACTIVE"
}
```

Regras:

- Ao desativar medico, ele nao deve aparecer em filtros operacionais nem receber novos agendamentos.
- Nao apagar fisicamente medico com historico de consultas.
- Validar CPF, email unico e CRM unico.
- Se medico tiver consultas futuras, o backend deve impedir exclusao/desativacao ou exigir uma estrategia clara. Retornar erro 409 com mensagem para o frontend exibir.

## 9. Regras gerais de validacao e erro

Formato de erro recomendado:

```json
{
  "message": "Nao foi possivel cancelar a consulta.",
  "code": "APPOINTMENT_CANNOT_BE_CANCELED",
  "details": {
    "appointmentId": "appointment-1"
  }
}
```

Codigos HTTP esperados:

- 200: consulta/listagem/alteracao bem sucedida.
- 201: criacao bem sucedida.
- 204: exclusao/inativacao sem corpo, se preferirem.
- 400: parametros invalidos.
- 401: nao autenticado.
- 403: usuario sem permissao admin.
- 404: recurso nao encontrado.
- 409: conflito de regra de negocio.
- 422: erro de validacao de campos.

## 10. Criterios de aceite

- `/admin` nao deve depender de dados mockados.
- O admin consegue ver metricas reais do dia.
- O admin consegue filtrar consultas por medico, paciente, status, data e periodo.
- A tabela de consultas possui paginacao real.
- O admin consegue cancelar consulta permitida.
- Ao cancelar consulta, o horario fica disponivel novamente.
- O painel de horarios disponiveis muda ao trocar especialidade, medico, data ou periodo.
- `/admin/agenda` mostra slots livres, agendados, realizados e cancelados.
- `/admin/agenda` permite filtrar por medico, data, visualizacao e status.
- O admin consegue alternar entre pacientes e medicos.
- O admin consegue listar usuarios ativos e inativos.
- O admin consegue ativar/desativar usuarios.
- O admin consegue cadastrar, editar e remover/inativar medicos.
- Rotas administrativas sao protegidas para usuario admin.
- Todos os endpoints retornam dados em JSON e respeitam cookies/credenciais CORS.

## Observacao para integracao frontend

O frontend atualmente espera estes formatos em `src/app/pages/Admin/types.ts`:

- `AdminAppointmentRow`
- `AdminMetric`
- `AdminAvailableTimes`
- `AdminDoctorOption`
- `AdminScheduleSlot`
- `AdminUserRow`

Se o backend preferir nomes diferentes, avisar o frontend para criar normalizadores. O ideal e manter os nomes acima para reduzir retrabalho.
