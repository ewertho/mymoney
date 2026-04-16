import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "pt-BR": {
    translation: {
      appTitle: "MyMoney Modern",
      subtitle: "Controle financeiro inteligente com um cockpit mais claro e operacional.",
      sidebarTagline: "Finance command center",
      workspaceLabel: "Workspace",
      workspaceOwnerLabel: "Responsavel pelo painel",
      topbarStatus: "Sessao ativa",
      searchPlaceholder: "Buscar ciclos, contas, observacoes ou tags",
      quickSearchLabel: "Busca rapida",
      expandSidebar: "Expandir menu lateral",
      collapseSidebar: "Recolher menu lateral",
      authWorkspaceTitle: "Acesso",
      authWorkspaceLoginDescription:
        "Entre para retomar seus ciclos com validacao imediata e estado de sessao visivel.",
      authWorkspaceSignupDescription:
        "Crie sua conta com um fluxo direto, sem ambiguidade sobre o que sera enviado.",
      authReadyTitle: "Pronto para autenticar",
      authReadyLoginDescription:
        "Informe suas credenciais para abrir a sessao e sincronizar seus dados.",
      authReadySignupDescription:
        "Preencha seus dados para criar a conta e iniciar o primeiro ciclo financeiro.",
      authProcessingTitle: "Validando transacao",
      authProcessingDescription:
        "Estamos enviando seus dados e aguardando a confirmacao do servidor.",
      authProcessingButton: "Processando...",
      authFailureTitle: "Nao foi possivel concluir",
      authSubmitLogin: "Entrar agora",
      authSubmitSignup: "Criar e acessar",
      authSwitchModeSignup: "Ainda nao tenho conta",
      authSwitchModeLogin: "Ja tenho conta",
      authNamePlaceholder: "Nome",
      authEmailPlaceholder: "Email",
      authPasswordPlaceholder: "Senha",
      passwordHint: "Use pelo menos 8 caracteres para a senha.",
      authGenericError:
        "Falha ao autenticar. Revise os dados e tente novamente.",
      authHeroTitle: "Fluxo financeiro com leitura rapida, menos atrito e mais confianca.",
      authHeroDescription:
        "Uma entrada mais limpa para acompanhar ciclos, saldo projetado e sinais operacionais em um unico ambiente.",
      authHeroStatOne: "monitoramento continuo",
      authHeroStatTwo: "mais previsibilidade de caixa",
      authHeroStatThree: "para abrir um novo ciclo",
      login: "Entrar",
      signup: "Criar conta",
      logout: "Sair",
      hideValues: "Ocultar valores",
      showValues: "Exibir valores",
      darkMode: "Tema escuro",
      lightMode: "Tema claro",
      language: "Idioma",
      summary: "Resumo",
      summaryNavDescription: "Leitura executiva do momento financeiro",
      controlsNavDescription: "Personalizacao, idioma e privacidade",
      settingsTitle: "Configuracoes",
      settingsHeading: "Centro de personalizacao",
      settingsDescription:
        "Ajuste privacidade, idioma e tema em um layout mais direto e profissional.",
      settingsPrivacyDescription:
        "Controle a exibicao dos valores sem perder contexto operacional.",
      settingsThemeDescription:
        "Alterne o ambiente visual para focar melhor no seu fluxo de trabalho.",
      settingsLanguageDescription:
        "Troque o idioma da interface mantendo as mesmas acoes e estrutura.",
      billingWorkspaceTitle: "Nova transacao",
      billingWorkspaceDescription:
        "Monte o ciclo, revise o impacto e confirme a gravacao com feedback imediato.",
      cyclesWorkspaceDescription:
        "Acompanhe os ciclos ativos e remova registros com retorno explicito da operacao.",
      cyclesTableTitle: "Ciclos ativos",
      syncStatusLabel: "Sincronizacao",
      syncReadyTitle: "Base sincronizada",
      syncReadyDescription: "{{count}} ciclos prontos para consulta e ajuste.",
      syncLoadingTitle: "Sincronizando dados",
      syncLoadingDescription:
        "Estamos consolidando resumo e ciclos antes de liberar novas acoes.",
      syncErrorTitle: "Sincronizacao com falha",
      syncErrorDescription:
        "Nao foi possivel carregar os dados agora. Tente novamente em instantes.",
      activeTaskLabel: "Operacao ativa",
      noActiveTaskTitle: "Nenhuma operacao pendente",
      noActiveTaskDescription:
        "Os dados estao estaveis e prontos para a proxima movimentacao.",
      impactPreviewLabel: "Impacto previsto",
      projectedBalanceTitle: "Saldo projetado",
      transactionReadyTitle: "Transacao pronta",
      transactionReadyDescription:
        "Revise os valores abaixo para gravar um novo ciclo com previsibilidade.",
      createPendingTitle: "Gravando ciclo",
      createPendingDescription:
        "Sua operacao esta sendo persistida e o resumo sera recalculado em seguida.",
      createPendingButton: "Gravando...",
      createSuccessTitle: "Ciclo registrado",
      createSuccessDescription:
        "O ciclo foi salvo e os indicadores ja estao sendo atualizados.",
      createErrorTitle: "Falha ao gravar ciclo",
      deletePendingTitle: "Removendo ciclo",
      deletePendingDescription:
        "Excluindo {{name}} e atualizando os totais para refletir a mudanca.",
      deletePendingShortDescription:
        "Uma exclusao esta em andamento e os totais serao recalculados.",
      deletePendingButton: "Excluindo...",
      deleteSuccessTitle: "Ciclo removido",
      deleteSuccessDescription:
        "{{name}} foi excluido e a visao consolidada foi atualizada.",
      deleteErrorTitle: "Falha ao excluir ciclo",
      transactionReviewTitle: "Revisao antes de confirmar",
      transactionDeltaLabel: "Impacto liquido",
      currentBalanceLabel: "Saldo atual",
      projectedBalanceLabel: "Saldo apos gravacao",
      noCyclesTitle: "Nenhum ciclo registrado",
      noCyclesDescription:
        "Crie o primeiro ciclo ao lado para iniciar o fluxo transacional do painel.",
      genericOperationError:
        "A operacao nao foi concluida. Revise os dados e tente novamente.",
      overviewHeroKicker: "Visao geral",
      overviewHeroTitle: "Cockpit financeiro com leitura priorizada e acoes rapidas.",
      overviewHeroDescription:
        "Os principais sinais do caixa ficam visiveis logo na entrada, com prioridade para fluxo, risco e proximas decisoes.",
      overviewPrimaryAction: "Abrir centro de ciclos",
      overviewSecondaryAction: "Ver tendencias",
      healthScoreLabel: "Saude financeira",
      healthScoreDescription:
        "Performance estavel com margem para acelerar decisoes de curto prazo.",
      overviewMiniCardTitle: "Operacao sob controle",
      overviewMiniCardDescription:
        "Alertas baixos, sincronizacao ativa e ritmo consistente de entradas.",
      overviewChartKicker: "Painel financeiro",
      overviewChartTitle: "Fluxo de receitas e custos",
      overviewUpdatedLabel: "Atualizado agora",
      insightsTitle: "Insights",
      insightsHeading: "Leituras do momento",
      insightRevenueTitle: "Receita em ritmo saudavel",
      insightRevenueDescription:
        "As entradas mantem cadencia positiva em relacao ao mes anterior.",
      insightSafetyTitle: "Exposicao controlada",
      insightSafetyDescription:
        "A taxa de poupanca segue positiva mesmo com os debitos correntes.",
      insightFocusTitle: "Janela boa para planejar",
      insightFocusDescription:
        "O saldo projetado abre espaco para previsao e revisao de metas.",
      activityTitle: "Atividade recente",
      activityHeading: "Timeline de movimentacoes",
      activitySupplierPaidTitle: "Pagamento de fornecedor confirmado",
      activitySupplierPaidTime: "ha 12 minutos",
      activityCycleCreatedTitle: "Novo ciclo mensal criado com sucesso",
      activityCycleCreatedTime: "ha 39 minutos",
      activityReconciliationTitle: "Conciliacao bancaria iniciada",
      activityReconciliationTime: "ha 1 hora",
      quickActionsTitle: "Acoes rapidas",
      quickActionsHeading: "Comandos de operacao",
      quickActionExport: "Exportar relatorio",
      quickActionFiscal: "Abrir centro fiscal",
      quickActionAlerts: "Revisar alertas",
      quickActionPlanning: "Criar planejamento",
      cycles: "Ciclos",
      addCycle: "Novo ciclo",
      totalCredit: "Entradas",
      totalDebt: "Saidas",
      balance: "Saldo",
      overdueDebts: "Debitos em atraso",
      savingsRate: "Taxa de poupanca",
      cycleName: "Nome do ciclo",
      month: "Mes",
      year: "Ano",
      recurrence: "Recorrencia",
      notes: "Observacoes",
      monthly: "Mensal",
      oneTime: "Pontual",
      credits: "Entradas",
      debts: "Saidas",
      value: "Valor",
      create: "Criar",
      delete: "Excluir",
      actionsLabel: "Acoes",
      loading: "Carregando...",
      noCycles: "Nenhum ciclo cadastrado ainda.",
    },
  },
  "en-US": {
    translation: {
      appTitle: "MyMoney Modern",
      subtitle: "Smart financial control with a clearer and more operational cockpit.",
      sidebarTagline: "Finance command center",
      workspaceLabel: "Workspace",
      workspaceOwnerLabel: "Dashboard owner",
      topbarStatus: "Session active",
      searchPlaceholder: "Search cycles, accounts, notes, or tags",
      quickSearchLabel: "Quick search",
      expandSidebar: "Expand sidebar",
      collapseSidebar: "Collapse sidebar",
      authWorkspaceTitle: "Access",
      authWorkspaceLoginDescription:
        "Sign in to resume your cycles with immediate validation and visible session state.",
      authWorkspaceSignupDescription:
        "Create your account with a direct flow and no ambiguity about what will be sent.",
      authReadyTitle: "Ready to authenticate",
      authReadyLoginDescription:
        "Enter your credentials to open the session and sync your data.",
      authReadySignupDescription:
        "Fill in your details to create the account and start your first billing cycle.",
      authProcessingTitle: "Validating transaction",
      authProcessingDescription:
        "We are sending your data and waiting for the server confirmation.",
      authProcessingButton: "Processing...",
      authFailureTitle: "Could not complete",
      authSubmitLogin: "Sign in now",
      authSubmitSignup: "Create and enter",
      authSwitchModeSignup: "I need an account",
      authSwitchModeLogin: "I already have an account",
      authNamePlaceholder: "Name",
      authEmailPlaceholder: "Email",
      authPasswordPlaceholder: "Password",
      passwordHint: "Use at least 8 characters for your password.",
      authGenericError:
        "Authentication failed. Please check your credentials and try again.",
      authHeroTitle: "Financial workflow with faster reading, less friction, and more confidence.",
      authHeroDescription:
        "A cleaner entry point to track cycles, projected balance, and operational signals in one environment.",
      authHeroStatOne: "continuous monitoring",
      authHeroStatTwo: "more cash-flow predictability",
      authHeroStatThree: "to open a new cycle",
      login: "Sign in",
      signup: "Create account",
      logout: "Sign out",
      hideValues: "Hide values",
      showValues: "Show values",
      darkMode: "Dark mode",
      lightMode: "Light mode",
      language: "Language",
      summary: "Summary",
      summaryNavDescription: "Executive read of the current financial state",
      controlsNavDescription: "Customization, language, and privacy",
      settingsTitle: "Settings",
      settingsHeading: "Customization center",
      settingsDescription:
        "Adjust privacy, language, and theme in a more direct and professional layout.",
      settingsPrivacyDescription:
        "Control value visibility without losing operational context.",
      settingsThemeDescription:
        "Switch the visual environment to better match your workflow.",
      settingsLanguageDescription:
        "Change the interface language while keeping the same actions and structure.",
      billingWorkspaceTitle: "New transaction",
      billingWorkspaceDescription:
        "Assemble the cycle, review the impact, and confirm the save with immediate feedback.",
      cyclesWorkspaceDescription:
        "Track active cycles and remove entries with explicit operational feedback.",
      cyclesTableTitle: "Active cycles",
      syncStatusLabel: "Sync",
      syncReadyTitle: "Data synced",
      syncReadyDescription: "{{count}} cycles ready for review and adjustment.",
      syncLoadingTitle: "Syncing data",
      syncLoadingDescription:
        "We are consolidating summary and cycles before releasing new actions.",
      syncErrorTitle: "Sync failed",
      syncErrorDescription:
        "Could not load your data right now. Please try again shortly.",
      activeTaskLabel: "Active operation",
      noActiveTaskTitle: "No pending operation",
      noActiveTaskDescription:
        "The data is stable and ready for the next financial move.",
      impactPreviewLabel: "Preview",
      projectedBalanceTitle: "Projected balance",
      transactionReadyTitle: "Transaction ready",
      transactionReadyDescription:
        "Review the values below to save a new cycle with predictable impact.",
      createPendingTitle: "Saving cycle",
      createPendingDescription:
        "Your operation is being persisted and the summary will be recalculated next.",
      createPendingButton: "Saving...",
      createSuccessTitle: "Cycle saved",
      createSuccessDescription:
        "The cycle was stored and the indicators are already being refreshed.",
      createErrorTitle: "Failed to save cycle",
      deletePendingTitle: "Deleting cycle",
      deletePendingDescription:
        "Deleting {{name}} and recalculating totals to reflect the change.",
      deletePendingShortDescription:
        "A deletion is in progress and totals will be recalculated.",
      deletePendingButton: "Deleting...",
      deleteSuccessTitle: "Cycle deleted",
      deleteSuccessDescription:
        "{{name}} was removed and the consolidated view has been updated.",
      deleteErrorTitle: "Failed to delete cycle",
      transactionReviewTitle: "Review before confirming",
      transactionDeltaLabel: "Net impact",
      currentBalanceLabel: "Current balance",
      projectedBalanceLabel: "Balance after save",
      noCyclesTitle: "No cycles registered",
      noCyclesDescription:
        "Create the first cycle on the left to start the panel transactional flow.",
      genericOperationError:
        "The operation could not be completed. Review the data and try again.",
      overviewHeroKicker: "Overview",
      overviewHeroTitle: "Financial cockpit with prioritized reading and quick actions.",
      overviewHeroDescription:
        "The main cash-flow signals are visible right away, with focus on flow, risk, and next decisions.",
      overviewPrimaryAction: "Open cycle center",
      overviewSecondaryAction: "View trends",
      healthScoreLabel: "Financial health",
      healthScoreDescription:
        "Stable performance with room to accelerate short-term decisions.",
      overviewMiniCardTitle: "Operation under control",
      overviewMiniCardDescription:
        "Low alerts, active sync, and consistent income rhythm.",
      overviewChartKicker: "Financial panel",
      overviewChartTitle: "Revenue and cost flow",
      overviewUpdatedLabel: "Updated now",
      insightsTitle: "Insights",
      insightsHeading: "Current reads",
      insightRevenueTitle: "Healthy revenue pace",
      insightRevenueDescription:
        "Income keeps a positive cadence compared with the previous month.",
      insightSafetyTitle: "Exposure under control",
      insightSafetyDescription:
        "Savings rate remains positive even with current debts.",
      insightFocusTitle: "Good planning window",
      insightFocusDescription:
        "Projected balance creates space for forecasting and goal review.",
      activityTitle: "Recent activity",
      activityHeading: "Movement timeline",
      activitySupplierPaidTitle: "Supplier payment confirmed",
      activitySupplierPaidTime: "12 minutes ago",
      activityCycleCreatedTitle: "New monthly cycle created successfully",
      activityCycleCreatedTime: "39 minutes ago",
      activityReconciliationTitle: "Bank reconciliation started",
      activityReconciliationTime: "1 hour ago",
      quickActionsTitle: "Quick actions",
      quickActionsHeading: "Operations commands",
      quickActionExport: "Export report",
      quickActionFiscal: "Open fiscal center",
      quickActionAlerts: "Review alerts",
      quickActionPlanning: "Create planning",
      cycles: "Cycles",
      addCycle: "New cycle",
      totalCredit: "Income",
      totalDebt: "Expenses",
      balance: "Balance",
      overdueDebts: "Overdue debts",
      savingsRate: "Savings rate",
      cycleName: "Cycle name",
      month: "Month",
      year: "Year",
      recurrence: "Recurrence",
      notes: "Notes",
      monthly: "Monthly",
      oneTime: "One-time",
      credits: "Income",
      debts: "Expenses",
      value: "Value",
      create: "Create",
      delete: "Delete",
      actionsLabel: "Actions",
      loading: "Loading...",
      noCycles: "No cycles registered yet.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR",
  fallbackLng: "pt-BR",
  interpolation: { escapeValue: false },
});

export default i18n;
