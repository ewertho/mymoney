import { useEffect, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "./components/AppSidebar";
import { AppTopbar } from "./components/AppTopbar";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { AuthPanel } from "./features/auth/AuthPanel";
import { BillingCyclePanel } from "./features/billing/BillingCyclePanel";
import { ControlsPanel } from "./features/dashboard/ControlsPanel";
import {
  getMetrics,
  getNavItems,
  type ShellSection,
} from "./features/dashboard/dashboardContent";
import { OverviewPanel } from "./features/dashboard/OverviewPanel";
import { useAuthStore } from "./store/authStore";
import { useUiStore } from "./store/uiStore";

function AppContent() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState<ShellSection>("overview");
  const { sidebarWidth } = useSidebar();
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

  const navItems = getNavItems(t);
  const metrics = getMetrics(hideValues);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const renderSection = () => {
    if (activeSection === "cycles") {
      return <BillingCyclePanel />;
    }

    if (activeSection === "controls") {
      return (
        <ControlsPanel
          hideValues={hideValues}
          theme={theme}
          language={language}
          onToggleValues={toggleHideValues}
          onToggleTheme={toggleTheme}
          onToggleLanguage={toggleLanguage}
        />
      );
    }

    return <OverviewPanel metrics={metrics} />;
  };

  if (!user) {
    return (
      <main className="app-shell app-shell--guest">
        <AuthPanel />
      </main>
    );
  }

  return (
    <main
      className="app-shell"
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <AppSidebar
        navItems={navItems}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onSignOut={clearSession}
        logoutLabel={t("logout")}
      />

      <section className="shell-main">
        <AppTopbar
          title={t("appTitle")}
          subtitle={t("subtitle")}
          searchPlaceholder="Buscar por ciclos, contas ou tags"
          hideValuesLabel={hideValues ? t("showValues") : t("hideValues")}
          themeLabel={theme === "dark" ? t("lightMode") : t("darkMode")}
          languageLabel={t("language")}
          language={language}
          userName={user.name}
          onToggleValues={toggleHideValues}
          onToggleTheme={toggleTheme}
          onToggleLanguage={toggleLanguage}
        />

        <div className="shell-content">{renderSection()}</div>
      </section>
    </main>
  );
}

function App() {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
}

export default App;
