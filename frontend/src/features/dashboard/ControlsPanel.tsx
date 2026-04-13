import { useTranslation } from "react-i18next";

type ControlsPanelProps = {
  hideValues: boolean;
  theme: "light" | "dark";
  language: "pt-BR" | "en-US";
  onToggleValues: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

export function ControlsPanel({
  hideValues,
  theme,
  language,
  onToggleValues,
  onToggleTheme,
  onToggleLanguage,
}: ControlsPanelProps) {
  const { t } = useTranslation();

  return (
    <section className="dashboard-grid">
      <div className="operations-strip">
        <article className="glass operations-card">
          <span className="section-kicker">{t("language")}</span>
          <strong>{language}</strong>
          <p>{t("authReadyTitle")}</p>
        </article>
        <article className="glass operations-card">
          <span className="section-kicker">{t("hideValues")}</span>
          <strong>{hideValues ? t("showValues") : t("hideValues")}</strong>
          <p>{t("transactionReadyDescription")}</p>
        </article>
        <article className="glass operations-card">
          <span className="section-kicker">{t("darkMode")}</span>
          <strong>{theme === "dark" ? t("lightMode") : t("darkMode")}</strong>
          <p>{t("syncReadyDescription", { count: 1 })}</p>
        </article>
      </div>

      <article className="glass panel controls-panel">
        <header className="panel-header">
          <span className="section-kicker">Configuracoes</span>
          <h3 className="section-title">Centro de personalizacao</h3>
          <p className="section-description">
            Altere preferencia de idioma, privacidade dos valores e tema visual
            em um unico lugar.
          </p>
        </header>
        <div className="shortcut-grid">
          <button onClick={onToggleValues} className="primary-btn" type="button">
            {hideValues ? t("showValues") : t("hideValues")}
          </button>
          <button onClick={onToggleTheme} className="ghost-btn" type="button">
            {theme === "dark" ? t("lightMode") : t("darkMode")}
          </button>
          <button onClick={onToggleLanguage} className="ghost-btn" type="button">
            {t("language")}: {language}
          </button>
        </div>
      </article>
    </section>
  );
}
