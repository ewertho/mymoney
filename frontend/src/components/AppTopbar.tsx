import { useSidebar } from "../context/SidebarContext";
import { AppIcon } from "./AppIcon";

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
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <header className="shell-topbar glass">
      <div className="topbar-left">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          aria-expanded={!isCollapsed}
        >
          <AppIcon name="collapse" />
        </button>
      </div>

      <label className="topbar-search" aria-label="Busca rapida">
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
          <span aria-hidden="true">
            <AppIcon name="eye" />
          </span>
        </button>
        <button
          className="ghost-btn icon-btn"
          type="button"
          aria-label="Notificacoes"
          title="Notificacoes"
        >
          <span aria-hidden="true">
            <AppIcon name="bell" />
          </span>
        </button>
        <button
          onClick={onToggleTheme}
          className="ghost-btn icon-btn"
          type="button"
          aria-label={themeLabel}
          title={themeLabel}
        >
          <span aria-hidden="true">
            <AppIcon name="theme" />
          </span>
        </button>
        <button
          onClick={onToggleLanguage}
          className="ghost-btn icon-btn"
          type="button"
          aria-label={`${languageLabel}: ${language}`}
          title={`${languageLabel}: ${language}`}
        >
          <span aria-hidden="true">
            <AppIcon name="language" />
          </span>
        </button>
        <span className="user-avatar" aria-label={userName} title={userName}>
          {userName.charAt(0).toUpperCase()}
        </span>
      </div>
    </header>
  );
}
