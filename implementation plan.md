# Modernização do Projeto MyMoney

Este plano detalha a modernização completa e reestruturação da sua aplicação MERN legada. O objetivo é atualizar todas as bibliotecas, migrar integralmente para TypeScript, implementar um ambiente de desenvolvimento limpo usando Docker (já que você não tem mais acesso ao MongoDB Atlas), e renovar completamente o UI/UX do Frontend com novas funcionalidades.

## User Review Required

> [!IMPORTANT]
> **Decisões Arquiteturais Principais**:
> 1. **Frontend**: Substituiremos o `create-react-app` antigo por **Vite + React + TypeScript** para uma performance muito superior.
> 2. **Gerenciamento de Estado**: O Redux clássico será substituído por soluções modernas: **Zustand** (para estado global como tema escuro, modo de ocultar valores e idioma) e **React Query** (para gerenciar o ciclo de vida dos dados da API, cache e loading states).
> 3. **Estilização**: Utilizarei Vanilla CSS avançado (com variáveis CSS dinâmicas) e componentes visuais ricos (Glassmorphism, gradientes e animações suaves). *Se você tiver preferência por TailwindCSS, por favor, me avise agora.*
> 4. **Backend em TypeScript**: O Express será totalmente tipado e reestruturado em uma arquitetura limpa (Routes -> Controllers -> Services -> Models).
> 
> *Você concorda com essa stack (Vite, Zustand, React Query)?*

## Proposed Changes

### 1. Infraestrutura Docker
A aplicação passará a rodar via containers, simplificando o processo de iniciar o projeto e eliminando dependências externas.
#### [NEW] [docker-compose.yml](file:///c:/Users/ewert/Projetos/mymoney/docker-compose.yml)
#### [NEW] [backend/Dockerfile](file:///c:/Users/ewert/Projetos/mymoney/backend/Dockerfile)
#### [NEW] [frontend/Dockerfile](file:///c:/Users/ewert/Projetos/mymoney/frontend/Dockerfile)

### 2. Backend (Node.js + Express + TypeScript)
Todo o backend será recriado no padrão TypeScript, atualizando a versão do Mongoose, Express e JWT.
- **Estrutura**: Separação clara de responsabilidades.
- **Lógica Financeira**: Refs de *Credits* e *Debts* dentro dos Ciclos de Pagamento (`BillingCycles`) utilizando boas práticas de validação.
- **Renomeação**: A pasta `backend` antiga terá seus scripts e estrutura atualizados, convertendo os `.js` em `.ts`.

#### [MODIFY] [backend/package.json](file:///c:/Users/ewert/Projetos/mymoney/backend/package.json)
#### [NEW] [backend/tsconfig.json](file:///c:/Users/ewert/Projetos/mymoney/backend/tsconfig.json)

### 3. Frontend (Vite + React + TypeScript)
A pasta `frontend-old` permanecerá intacta por segurança até termos a nova versão rodando. Criaremos uma nova pasta `frontend` limpa.
- **Novas Features**: Botões no Navbar superior para:
  - 🌓 Modo Escuro (CSS Variables).
  - 🌐 Troca de Idioma (PT-BR / EN-US via `react-i18next`).
  - 👁️ Ocultar Valores (Substitui os números reais por `*****`).
- **Dashboard e UI**: Design premium com gráficos, cards resumidos e tabelas responsivas para gerenciar Ciclos de Pagamento.

#### [NEW] [frontend/package.json](file:///c:/Users/ewert/Projetos/mymoney/frontend/package.json)
#### [NEW] [frontend/src/App.tsx](file:///c:/Users/ewert/Projetos/mymoney/frontend/src/App.tsx)
#### [NEW] [frontend/src/store/uiStore.ts](file:///c:/Users/ewert/Projetos/mymoney/frontend/src/store/uiStore.ts)
*(e o restante dos componentes estruturais TSX e CSS)*

## Open Questions

> [!WARNING]
> Tenho três curtas perguntas para alinharmos perfeitamente:
> 1. Podemos criar uma pasta chamada `frontend` e manter a `frontend-old` intocada como backup temporário durante a migração?
> 2. Posso usar **TailwindCSS** no Frontend (o que vai acelerar e deixar o projeto lindíssimo mais rápido) ou você exige **Vanilla CSS purista**?
> 3. Você possui alguma regra de negócio muito específica sobre os ciclos de pagamentos (Ex: Débitos podem ser parcelados ou são sempre valores fixos mensais) ou posso focar no padrão de Entradas/Saídas simples já modelado antigamente?

## Verification Plan

### Testes Manuais
- Executar `docker-compose up -d` para verificar se App, API e Banco se conectam adequadamente na mesma rede.
- Testar registro e login de usuário (verificando criptografia bcrypt do backend em TS).
- Navegar pelo frontend, alternando Modo Escuro, Idioma e Ocultar Valores e verificar persistência.
- Criar/Editar/Excluir um Ciclo de Pagamento e observar os dados fluindo via React Query até o MongoDB containerizado.
