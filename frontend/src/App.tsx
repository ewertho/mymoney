import { useEffect, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { AuthPanel } from "./features/auth/components/AuthPanel";
import { BillingCyclePanel } from "./features/billing/components/BillingCyclePanel";
import { ControlsPanel } from "./features/dashboard/components/ControlsPanel";
import {
  getMetrics,
  getNavItems,
  type ShellSection,
} from "./features/dashboard/model/dashboardContent";
import { OverviewPanel } from "./features/dashboard/components/OverviewPanel";
import { AppSidebar } from "./layout/shell/AppSidebar";
import { AppTopbar } from "./layout/shell/AppTopbar";
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
        userName={user.name}
      />

      <section className="shell-main">
        <AppTopbar
          title={t("appTitle")}
          subtitle={t("subtitle")}
          searchPlaceholder={t("searchPlaceholder")}
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
