import { useTranslation } from "react-i18next";
import { useSidebar } from "../../context/SidebarContext";
import { AppIcon } from "../../shared/ui/AppIcon";

type AppTopbarProps = {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  hideValuesLabel: string;
  themeLabel: string;
  languageLabel: string;
  language: string;
  userName: string;
  onToggleValues: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

export function AppTopbar({
  title,
  subtitle,
  searchPlaceholder,
  hideValuesLabel,
  themeLabel,
  languageLabel,
  language,
  userName,
  onToggleValues,
  onToggleTheme,
  onToggleLanguage,
}: AppTopbarProps) {
  const { t } = useTranslation();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const isShowingValues = hideValuesLabel !== t("showValues");
  const isDarkTheme = themeLabel === t("lightMode");

  return (
    <header className="shell-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? t("expandSidebar") : t("collapseSidebar")}
          aria-expanded={!isCollapsed}
        >
          <AppIcon name={isCollapsed ? "expand" : "collapse"} />
        </button>

        <div className="topbar-heading">
          <span className="section-kicker">{t("workspaceLabel")}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <label className="topbar-search" aria-label={t("quickSearchLabel")}>
        <AppIcon name="search" />
        <input type="search" placeholder={searchPlaceholder} />
      </label>

      <div className="topbar-actions">
        <button
          onClick={onToggleValues}
          className="ghost-btn icon-btn"
          type="button"
          aria-label={hideValuesLabel}
          title={hideValuesLabel}
        >
          <AppIcon name={isShowingValues ? "eye" : "eyeOff"} />
        </button>
        <button
          onClick={onToggleTheme}
          className="ghost-btn icon-btn"
          type="button"
          aria-label={themeLabel}
          title={themeLabel}
        >
          <AppIcon name={isDarkTheme ? "theme" : "themeLight"} />
        </button>
        <button
          onClick={onToggleLanguage}
          className="ghost-btn topbar-pill"
          type="button"
          aria-label={`${languageLabel}: ${language}`}
          title={`${languageLabel}: ${language}`}
        >
          <AppIcon name="language" />
          <span>{language}</span>
        </button>
        <div className="topbar-user">
          <span className="user-avatar" aria-label={userName} title={userName}>
            {userName.charAt(0).toUpperCase()}
          </span>
          <div className="topbar-user-copy">
            <strong>{userName}</strong>
            <small>{t("topbarStatus")}</small>
          </div>
        </div>
      </div>
    </header>
  );
}
