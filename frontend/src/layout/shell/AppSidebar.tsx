import { useTranslation } from "react-i18next";
import { useSidebar } from "../../context/SidebarContext";
import type {
  NavItem,
  ShellSection,
} from "../../features/dashboard/model/dashboardContent";
import { AppIcon } from "../../shared/ui/AppIcon";

type AppSidebarProps = {
  navItems: NavItem[];
  activeSection: ShellSection;
  onSelectSection: (section: ShellSection) => void;
  onSignOut: () => void;
  logoutLabel: string;
  userName: string;
};

export function AppSidebar({
  navItems,
  activeSection,
  onSelectSection,
  onSignOut,
  logoutLabel,
  userName,
}: AppSidebarProps) {
  const { isCollapsed } = useSidebar();
  const { t } = useTranslation();

  return (
    <aside className={`app-sidebar ${isCollapsed ? "is-collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          <AppIcon name="wallet" />
        </div>
        <div className="brand-copy">
          <strong>MyMoney</strong>
          <small>{t("sidebarTagline")}</small>
        </div>
      </div>

      <div className="sidebar-section-label">{t("workspaceLabel")}</div>

      <nav className="sidebar-nav" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = item.id === activeSection;

          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${isActive ? "is-active" : ""}`}
              onClick={() => onSelectSection(item.id)}
              aria-label={item.label}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="nav-item__icon">
                <AppIcon name={item.icon} />
              </span>
              <span className="nav-item__content">
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-user-card">
        <div className="user-avatar user-avatar--sidebar" aria-hidden="true">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="sidebar-user-copy">
          <strong>{userName}</strong>
          <small>{t("workspaceOwnerLabel")}</small>
        </div>
      </div>

      <button
        onClick={onSignOut}
        className="danger-btn sidebar-signout"
        type="button"
      >
        <span className="nav-item__icon">
          <AppIcon name="logout" />
        </span>
        <span>{logoutLabel}</span>
      </button>
    </aside>
  );
}
