# Requisitos de backend para a area administrativa

Este contrato cobre UC05, UC06 e UC07.

## UC05 - Gerenciar agenda da clinica

- `GET /admin/consultas`: listar consultas com filtros por `doctorId`, `patientName` ou `patientId`, `date`, `period`, `status`, `page` e `size`.
- `GET /admin/agenda/medicos`: listar agendas de todos os medicos ativos, com duracao padrao da consulta, horarios de funcionamento e bloqueios.
- `GET /admin/medicos/{doctorId}/horarios-disponiveis?date=YYYY-MM-DD&period=DAY`: retornar horarios livres calculados pelo backend.
- Tela principal: o resumo de horarios disponiveis deve consumir medicos ativos, data e periodo para exibir apenas os horarios livres do medico selecionado.
- Pagina `/admin/agenda`: deve consumir agenda completa por medico e data, retornando horarios livres, ocupados, realizados e cancelados em uma unica resposta.
- A API deve bloquear conflitos de horario por medico, respeitar duracao da consulta e considerar consultas `SCHEDULED` e `CONFIRMED` como horarios ocupados.
- Consultas historicas devem retornar dados resumidos de medico, paciente e especialidade para evitar muitas chamadas no frontend.
- 

## UC06 - Cancelar consulta medica

- `PATCH /admin/consultas/{appointmentId}/cancelar`: alterar status para `CANCELED`, sem excluir o registro.
- A API deve impedir cancelamento quando o status for `COMPLETED` ou `CANCELED`.
- O cancelamento deve registrar auditoria: administrador responsavel, data/hora e motivo opcional.
- Depois do cancelamento, o horario do medico deve voltar a aparecer em horarios disponiveis.

## UC07 - Gerenciar usuarios da clinica

- `GET /admin/pacientes` e `GET /admin/medicos`: listar usuarios com filtros por nome, CPF, e-mail, status, pagina e tamanho.
- `POST /admin/pacientes` e `POST /admin/medicos`: cadastrar novos usuarios vinculados aos perfis operacionais.
- `PUT /admin/pacientes/{id}` e `PUT /admin/medicos/{id}`: atualizar dados cadastrais.
- `PATCH /admin/usuarios/{id}/ativar` e `PATCH /admin/usuarios/{id}/desativar`: controlar acesso sem apagar historico.
- `DELETE /admin/usuarios/{id}`: exclusao definitiva restrita ao administrador, validando dependencias historicas antes de apagar.
- Usuarios desativados nao devem autenticar e nao devem aparecer nas listagens operacionais padrao, mas devem permanecer visiveis nas telas administrativas e em registros historicos.

## Requisitos transversais

- Autenticacao e autorizacao por perfil `ADMIN`.
- Paginacao, ordenacao e busca textual para tabelas administrativas.
- Campos `createdAt`, `updatedAt`, `deletedAt` ou `active`, e trilha de auditoria para acoes administrativas.
- Respostas padronizadas de erro para conflito de agenda, regra de negocio e permissao negada.
- Historico de consultas preservado mesmo quando paciente, medico ou usuario for desativado.
