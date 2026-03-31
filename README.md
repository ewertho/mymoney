# MyMoney Modern (TypeScript + Docker)

Aplicacao full stack para controle financeiro por ciclos de pagamento.

## Stack Atualizada

- Backend: Node.js 22, Express 5, Mongoose 8, JWT, TypeScript
- Frontend: React 19, Vite 7, TypeScript, Zustand, React Query, i18next
- Banco: MongoDB 8 em container Docker com volume persistente

## Principais Features

- Autenticacao com cadastro e login (JWT)
- CRUD de ciclos de pagamento
- Resumo financeiro com:
  - total de entradas
  - total de saidas
  - saldo liquido
  - debitos em atraso
  - taxa de poupanca
- Nova UX/UI responsiva
- Botao para tema claro/escuro no header
- Botao para troca de idioma PT-BR/EN-US no header
- Botao para esconder/exibir valores no header

## Estrutura

- backend/: API em TypeScript
- frontend/: UI em React + TypeScript
- docker-compose.yml: sobe MongoDB + backend + frontend

## Rodando com Docker (recomendado)

1. Subir tudo:

```bash
docker compose up -d --build
```

2. Acessar:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/doc

3. Parar:

```bash
docker compose down
```

4. Parar e remover volume do MongoDB:

```bash
docker compose down -v
```

## Rodando localmente (sem Docker)

### Backend

1. Copie `backend/.env.example` para `backend/.env` e ajuste se necessario.
2. Instale e rode:

```bash
npm --prefix backend install
npm --prefix backend run dev
```

### Frontend

1. Copie `frontend/.env.example` para `frontend/.env`.
2. Instale e rode:

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

## Scripts uteis

- Backend type-check: `npm --prefix backend run check`
- Frontend build: `npm --prefix frontend run build`

## Observacao

O codigo legado em JavaScript foi removido para manter o projeto ativo 100% em TypeScript.
