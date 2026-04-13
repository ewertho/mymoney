import type {
  NavItem,
  ShellSection,
} from "../features/dashboard/dashboardContent";
import { AppIcon } from "./AppIcon";

type AppSidebarProps = {
  isCollapsed: boolean;
  navItems: NavItem[];
  activeSection: ShellSection;
  onToggleCollapsed: () => void;
  onSelectSection: (section: ShellSection) => void;
  onSignOut: () => void;
  logoutLabel: string;
};

export function AppSidebar({
  isCollapsed,
  navItems,
  activeSection,
  onToggleCollapsed,
  onSelectSection,
  onSignOut,
  logoutLabel,
}: AppSidebarProps) {
  return (
    <aside className={`app-sidebar glass ${isCollapsed ? "is-collapsed" : ""}`}>
      <div className="sidebar-brand">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggleCollapsed}
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          <AppIcon name="collapse" />
        </button>
        {!isCollapsed ? (
          <div className="brand-copy">
            <strong>MyMoney</strong>
            <small>Finance Command Center</small>
          </div>
        ) : null}
      </div>

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
              {!isCollapsed ? (
                <span className="nav-item__content">
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onSignOut}
        className="danger-btn sidebar-signout"
        type="button"
      >
        <span className="nav-item__icon">
          <AppIcon name="logout" />
        </span>
        {!isCollapsed ? <span>{logoutLabel}</span> : null}
      </button>
    </aside>
  );
}
