import { useTranslation } from "react-i18next";
import { AppIcon } from "../../../shared/ui/AppIcon";
import type { MetricCard } from "../model/dashboardContent";

type OverviewPanelProps = {
  metrics: MetricCard[];
};

export function OverviewPanel({ metrics }: OverviewPanelProps) {
  const { t } = useTranslation();

  return (
    <section className="dashboard-grid">
      <section className="overview-hero glass-panel">
        <div className="overview-hero__copy">
          <span className="section-kicker">{t("overviewHeroKicker")}</span>
          <h2>{t("overviewHeroTitle")}</h2>
          <p>{t("overviewHeroDescription")}</p>
          <div className="hero-actions">
            <button type="button" className="primary-btn">
              {t("overviewPrimaryAction")}
            </button>
            <button type="button" className="ghost-btn inline-icon-btn">
              <AppIcon name="arrowUpRight" />
              <span>{t("overviewSecondaryAction")}</span>
            </button>
          </div>
        </div>

        <div className="overview-hero__summary">
          <article className="hero-score-card">
            <span className="section-kicker">{t("healthScoreLabel")}</span>
            <strong>84%</strong>
            <p>{t("healthScoreDescription")}</p>
          </article>
          <article className="hero-mini-card">
            <span className="hero-mini-card__label">{t("syncStatusLabel")}</span>
            <strong>{t("overviewMiniCardTitle")}</strong>
            <p>{t("overviewMiniCardDescription")}</p>
          </article>
        </div>
      </section>

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
        <article className="glass-panel panel chart-panel">
          <header className="panel-header panel-header-inline">
            <div>
              <span className="section-kicker">{t("overviewChartKicker")}</span>
              <h3 className="section-title">{t("overviewChartTitle")}</h3>
            </div>
            <span className="chart-badge">{t("overviewUpdatedLabel")}</span>
          </header>
          <div className="mock-chart" aria-hidden="true">
            <div className="chart-grid" />
            <div className="line line-a" />
            <div className="line line-b" />
            <div className="line line-c" />
          </div>
        </article>

        <article className="glass-panel panel insight-panel">
          <header className="panel-header">
            <span className="section-kicker">{t("insightsTitle")}</span>
            <h3 className="section-title">{t("insightsHeading")}</h3>
          </header>
          <div className="insight-list">
            <div className="insight-item">
              <span className="insight-item__icon">
                <AppIcon name="trend" />
              </span>
              <div>
                <strong>{t("insightRevenueTitle")}</strong>
                <p>{t("insightRevenueDescription")}</p>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-item__icon">
                <AppIcon name="security" />
              </span>
              <div>
                <strong>{t("insightSafetyTitle")}</strong>
                <p>{t("insightSafetyDescription")}</p>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-item__icon">
                <AppIcon name="spark" />
              </span>
              <div>
                <strong>{t("insightFocusTitle")}</strong>
                <p>{t("insightFocusDescription")}</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="overview-layout overview-layout-bottom">
        <article className="glass-panel panel feed-panel">
          <header className="panel-header">
            <span className="section-kicker">{t("activityTitle")}</span>
            <h3 className="section-title">{t("activityHeading")}</h3>
          </header>
          <ul className="activity-list">
            <li>
              <strong>{t("activitySupplierPaidTitle")}</strong>
              <span>{t("activitySupplierPaidTime")}</span>
            </li>
            <li>
              <strong>{t("activityCycleCreatedTitle")}</strong>
              <span>{t("activityCycleCreatedTime")}</span>
            </li>
            <li>
              <strong>{t("activityReconciliationTitle")}</strong>
              <span>{t("activityReconciliationTime")}</span>
            </li>
          </ul>
        </article>

        <article className="glass-panel panel shortcuts-panel">
          <header className="panel-header">
            <span className="section-kicker">{t("quickActionsTitle")}</span>
            <h3 className="section-title">{t("quickActionsHeading")}</h3>
          </header>
          <div className="shortcut-grid">
            <button type="button" className="ghost-btn shortcut-btn">
              {t("quickActionExport")}
            </button>
            <button type="button" className="ghost-btn shortcut-btn">
              {t("quickActionFiscal")}
            </button>
            <button type="button" className="ghost-btn shortcut-btn">
              {t("quickActionAlerts")}
            </button>
            <button type="button" className="ghost-btn shortcut-btn">
              {t("quickActionPlanning")}
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
