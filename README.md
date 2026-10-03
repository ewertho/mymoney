# MyMoney

Controle financeiro pessoal organizado por mês: o que entra, o que vence e o que sobra.

## O que faz

- **Lançamentos por mês**: entradas e contas com categoria, vencimento e marcação de pago.
- **Recorrência e virada de mês**: itens marcados como recorrentes são levados para o mês seguinte com as contas reabertas e o vencimento avançado (31/01 vira 28/02).
- **Orçamento por categoria**: limite mensal opcional, com aviso de quanto passou.
- **Vencidos**: contas em aberto de qualquer mês aparecem enquanto não forem pagas.
- **Histórico**: entradas e gastos dos últimos 6 meses.
- Tema claro/escuro, português/inglês e ocultar valores.

## Stack

| Camada | Tecnologia |
|---|---|
| API | Node 24 executando TypeScript direto (sem build), Express 5, Mongoose 9, Zod 4 |
| Web | React 19, Vite 8, TanStack Query 5, Zustand 5, CSS moderno (`light-dark()`, `color-mix()`) |
| Tipos | TypeScript 7 (compilador nativo) nos dois lados |
| Infra | Docker Compose: MongoDB 8, API e Caddy servindo o build e repassando `/api` |

## Decisões

- **Dinheiro em centavos inteiros.** Float só existe na formatação da tela.
- **Regras de negócio puras** em [`backend/src/domain.ts`](backend/src/domain.ts), sem Express nem Mongo, cobertas por [`domain.test.ts`](backend/src/domain.test.ts) com o test runner do próprio Node.
- **Toda entrada passa por Zod.** O corpo da requisição nunca chega cru ao banco, então não há como sobrescrever `userId`.
- **Um ciclo por mês por usuário** é garantido por índice único no banco, que também resolve a corrida entre duas viradas simultâneas.
- **Status de conta é derivado** (`pago`, `vencida`, `em aberto`) a partir de `paidAt` e `dueDate`, não armazenado.
- Login e cadastro têm rate limit; a mensagem de erro não revela se o e-mail existe.

## Rodando

Desenvolvimento:

```bash
docker compose up -d mongodb
cd backend && cp .env.example .env && npm install && npm run dev    # :4007
cd frontend && npm install && npm run dev                            # :5173
```

Produção (tudo em Docker, uma porta só):

```bash
cp .env.example .env    # preencha JWT_SECRET e MONGO_PASSWORD
docker compose up -d --build
```

A aplicação sobe em `http://<host>:8101` (mude com `WEB_PORT`).

## Testes

```bash
cd backend && npm test && npm run check
```

## API

Todas as rotas abaixo de `/api`; exceto `/auth/*`, exigem `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/signup`, `/auth/login` | Retorna `{ token, user }` |
| GET / PUT / DELETE | `/cycles/:year/:month` | Lê, salva ou apaga o mês |
| POST | `/cycles/:year/:month/rollover` | Cria o mês seguinte com os recorrentes (409 se já existir) |
| GET | `/summary/:year/:month` | Totais, categorias com orçamento, vencidos e série de 6 meses |
| GET / PUT | `/budgets` | Limites por categoria, em centavos |
