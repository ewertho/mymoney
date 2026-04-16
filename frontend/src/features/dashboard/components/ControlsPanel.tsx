import { useTranslation } from "react-i18next";
import { AppIcon } from "../../../shared/ui/AppIcon";

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
        <article className="glass-panel operations-card">
          <span className="operations-icon">
            <AppIcon name="language" />
          </span>
          <span className="section-kicker">{t("language")}</span>
          <strong>{language}</strong>
          <p>{t("authReadyTitle")}</p>
        </article>
        <article className="glass-panel operations-card">
          <span className="operations-icon">
            <AppIcon name={hideValues ? "eyeOff" : "eye"} />
          </span>
          <span className="section-kicker">{t("hideValues")}</span>
          <strong>{hideValues ? t("showValues") : t("hideValues")}</strong>
          <p>{t("transactionReadyDescription")}</p>
        </article>
        <article className="glass-panel operations-card">
          <span className="operations-icon">
            <AppIcon name={theme === "dark" ? "themeLight" : "theme"} />
          </span>
          <span className="section-kicker">{t("darkMode")}</span>
          <strong>{theme === "dark" ? t("lightMode") : t("darkMode")}</strong>
          <p>{t("syncReadyDescription", { count: 1 })}</p>
        </article>
      </div>

      <article className="glass-panel panel controls-panel controls-panel--expanded">
        <header className="panel-header">
          <span className="section-kicker">{t("settingsTitle")}</span>
          <h3 className="section-title">{t("settingsHeading")}</h3>
          <p className="section-description">{t("settingsDescription")}</p>
        </header>
        <div className="settings-grid">
          <button onClick={onToggleValues} className="settings-card" type="button">
            <span className="settings-card__icon">
              <AppIcon name={hideValues ? "eyeOff" : "eye"} />
            </span>
            <strong>{hideValues ? t("showValues") : t("hideValues")}</strong>
            <p>{t("settingsPrivacyDescription")}</p>
          </button>
          <button onClick={onToggleTheme} className="settings-card" type="button">
            <span className="settings-card__icon">
              <AppIcon name={theme === "dark" ? "themeLight" : "theme"} />
            </span>
            <strong>{theme === "dark" ? t("lightMode") : t("darkMode")}</strong>
            <p>{t("settingsThemeDescription")}</p>
          </button>
          <button onClick={onToggleLanguage} className="settings-card" type="button">
            <span className="settings-card__icon">
              <AppIcon name="language" />
            </span>
            <strong>{t("language")}: {language}</strong>
            <p>{t("settingsLanguageDescription")}</p>
          </button>
        </div>
      </article>
    </section>
  );
}
