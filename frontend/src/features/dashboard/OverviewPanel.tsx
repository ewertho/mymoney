import { AppIcon } from "../../components/AppIcon";
import type { MetricCard } from "./dashboardContent";

type OverviewPanelProps = {
  metrics: MetricCard[];
};

export function OverviewPanel({ metrics }: OverviewPanelProps) {
  return (
    <section className="dashboard-grid">
      <div className="kpi-strip">
        {metrics.map((metric) => (
          <article
            key={metric.title}
            className={`metric-card metric-${metric.tone}`}
          >
            <div className="metric-head">
              <span>{metric.title}</span>
              <span className="metric-icon" aria-hidden="true">
                <AppIcon name={metric.icon} />
              </span>
            </div>
            <strong>{metric.value}</strong>
            <small>{metric.trend}</small>
          </article>
        ))}
      </div>

      <div className="overview-layout">
        <article className="glass panel chart-panel">
          <header className="panel-header panel-header-inline">
            <div>
              <span className="section-kicker">Painel Financeiro</span>
              <h3 className="section-title">Fluxo de receitas e custos</h3>
            </div>
            <span className="chart-badge">Atualizado agora</span>
          </header>
          <div className="mock-chart" aria-hidden="true">
            <div className="chart-grid" />
            <div className="line line-a" />
            <div className="line line-b" />
            <div className="line line-c" />
          </div>
        </article>

        <article className="glass panel score-panel">
          <span className="section-kicker">Saude financeira</span>
          <h3 className="section-title">Risco operacional</h3>
          <div className="risk-ring" aria-hidden="true">
            <span>84%</span>
          </div>
          <p className="section-description">
            Performance estavel com boa margem para acelerar investimentos de
            curto prazo.
          </p>
          <button type="button" className="primary-btn">
            Ver recomendacoes
          </button>
        </article>
      </div>

      <div className="overview-layout overview-layout-bottom">
        <article className="glass panel feed-panel">
          <header className="panel-header">
            <span className="section-kicker">Atividade recente</span>
            <h3 className="section-title">Timeline de movimentacoes</h3>
          </header>
          <ul className="activity-list">
            <li>
              <strong>Pagamento de fornecedor confirmado</strong>
              <span>ha 12 minutos</span>
            </li>
            <li>
              <strong>Novo ciclo mensal criado com sucesso</strong>
              <span>ha 39 minutos</span>
            </li>
            <li>
              <strong>Conciliacao bancaria iniciada</strong>
              <span>ha 1 hora</span>
            </li>
          </ul>
        </article>

        <article className="glass panel shortcuts-panel">
          <header className="panel-header">
            <span className="section-kicker">Acoes rapidas</span>
            <h3 className="section-title">Comandos de operacao</h3>
          </header>
          <div className="shortcut-grid">
            <button type="button" className="ghost-btn shortcut-btn">
              Exportar relatorio
            </button>
            <button type="button" className="ghost-btn shortcut-btn">
              Abrir centro fiscal
            </button>
            <button type="button" className="ghost-btn shortcut-btn">
              Revisar alertas
            </button>
            <button type="button" className="ghost-btn shortcut-btn">
              Criar planejamento
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
