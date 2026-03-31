import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthPanel } from "./features/auth/AuthPanel";
import { BillingCyclePanel } from "./features/billing/BillingCyclePanel";
import { useAuthStore } from "./store/authStore";
import { useUiStore } from "./store/uiStore";

type ShellSection = "overview" | "cycles" | "controls";

type IconName =
  | "dashboard"
  | "cycles"
  | "controls"
  | "collapse"
  | "eye"
  | "theme"
  | "language";

type NavItem = {
  id: ShellSection;
  label: string;
  detail: string;
  icon: IconName;
};

function Icon({ name }: { name: IconName }) {
  if (name === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 3h8v8H3V3Zm10 0h8v5h-8V3ZM3 13h5v8H3v-8Zm7 0h11v8H10v-8Z" />
      </svg>
    );
  }

  if (name === "cycles") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4a8 8 0 1 1-7.75 10h2.1A6 6 0 1 0 8 7.9V10H3V5h2v1.48A7.97 7.97 0 0 1 12 4Zm-1 4h2v5h4v2h-6V8Z" />
      </svg>
    );
  }

  if (name === "controls") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.7 3.3 9.8 5.5a7.7 7.7 0 0 0-1.5.9L6 5.5 4.5 7l.9 2.3a7.7 7.7 0 0 0-.9 1.5l-2.2.9v2.1l2.2.9a7.7 7.7 0 0 0 .9 1.5L4.5 19 6 20.5l2.3-.9a7.7 7.7 0 0 0 1.5.9l.9 2.2h2.1l.9-2.2a7.7 7.7 0 0 0 1.5-.9l2.3.9L19.5 19l-.9-2.3a7.7 7.7 0 0 0 .9-1.5l2.2-.9v-2.1l-2.2-.9a7.7 7.7 0 0 0-.9-1.5l.9-2.3L18 5.5l-2.3.9a7.7 7.7 0 0 0-1.5-.9l-.9-2.2h-2.1Zm1.3 5a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4Z" />
      </svg>
    );
  }

  if (name === "eye") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5c4.9 0 8.8 3 10.2 7-1.4 4-5.3 7-10.2 7S3.2 16 1.8 12C3.2 8 7.1 5 12 5Zm0 2C8.3 7 5.3 9 4 12c1.3 3 4.3 5 8 5s6.7-2 8-5c-1.3-3-4.3-5-8-5Zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
      </svg>
    );
  }

  if (name === "theme") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.7 3.1A9 9 0 1 0 20.9 15 7 7 0 1 1 12.7 3.1Z" />
      </svg>
    );
  }

  if (name === "language") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4c-4.4 0-8 3.6-8 8 0 4.1 3.1 7.5 7 8v-5H7v-2h4v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2H14.8c-1 0-1.3.6-1.3 1.3V13h2.2l-.4 2h-1.8v5a8 8 0 0 0-1.5-15.9Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h12v2H7V5Zm0 6h12v2H7v-2Zm0 6h12v2H7v-2ZM3 5h2v14H3V5Z" />
    </svg>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<ShellSection>("overview");
  const {
    hideValues,
    theme,
    language,
    toggleHideValues,
    toggleTheme,
    toggleLanguage,
  } = useUiStore();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        id: "overview",
        label: t("summary"),
        detail: t("subtitle"),
        icon: "dashboard",
      },
      {
        id: "cycles",
        label: t("cycles"),
        detail: t("cyclesWorkspaceDescription"),
        icon: "cycles",
      },
      {
        id: "controls",
        label: t("language"),
        detail: t("authWorkspaceTitle"),
        icon: "controls",
      },
    ],
    [t],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleLanguage = (): void => {
    toggleLanguage();
    i18n.changeLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
  };

  const renderSection = () => {
    if (activeSection === "controls") {
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
        </section>
      );
    }

    return <BillingCyclePanel />;
  };

  if (!user) {
    return (
      <main className="app-shell app-shell--guest">
        <AuthPanel />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside
        className={`app-sidebar glass ${isSidebarCollapsed ? "is-collapsed" : ""}`}
      >
        <div className="sidebar-brand">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setIsSidebarCollapsed((current) => !current)}
            aria-label={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            <Icon name="collapse" />
          </button>
          {!isSidebarCollapsed ? <strong>{t("appTitle")}</strong> : null}
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = item.id === activeSection;

            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveSection(item.id)}
                aria-label={item.label}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span className="nav-item__icon">
                  <Icon name={item.icon} />
                </span>
                {!isSidebarCollapsed ? (
                  <span className="nav-item__content">
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <button onClick={clearSession} className="danger-btn sidebar-signout" type="button">
          <span className="nav-item__icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 4h6v16h-6v-2h4V6h-4V4Zm-2 4 1.4 1.4L11.8 11H4v2h7.8l1.6 1.6L12 16l-4-4 4-4Z" />
            </svg>
          </span>
          {!isSidebarCollapsed ? <span>{t("logout")}</span> : null}
        </button>
      </aside>

      <section className="shell-main">
        <header className="shell-topbar glass">
          <div>
            <h1>{t("appTitle")}</h1>
            <p>{t("subtitle")}</p>
          </div>

          <div className="topbar-actions">
            <button
              onClick={toggleHideValues}
              className="ghost-btn icon-btn"
              type="button"
              aria-label={hideValues ? t("showValues") : t("hideValues")}
              title={hideValues ? t("showValues") : t("hideValues")}
            >
              <span aria-hidden="true">
                <Icon name="eye" />
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="ghost-btn icon-btn"
              type="button"
              aria-label={theme === "dark" ? t("lightMode") : t("darkMode")}
              title={theme === "dark" ? t("lightMode") : t("darkMode")}
            >
              <span aria-hidden="true">
                <Icon name="theme" />
              </span>
            </button>
            <button
              onClick={handleLanguage}
              className="ghost-btn icon-btn"
              type="button"
              aria-label={`${t("language")}: ${language}`}
              title={`${t("language")}: ${language}`}
            >
              <span aria-hidden="true">
                <Icon name="language" />
              </span>
            </button>
            <span className="user-avatar" aria-label={user.name} title={user.name}>
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </header>

        <div className="shell-content">{renderSection()}</div>
      </section>
    </main>
  );
}

export default App;
