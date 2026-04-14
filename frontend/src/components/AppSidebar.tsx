import { useSidebar } from "../context/SidebarContext";
import type {
  NavItem,
  ShellSection,
} from "../features/dashboard/dashboardContent";
import { AppIcon } from "./AppIcon";

type AppSidebarProps = {
  navItems: NavItem[];
  activeSection: ShellSection;
  onSelectSection: (section: ShellSection) => void;
  onSignOut: () => void;
  logoutLabel: string;
};

export function AppSidebar({
  navItems,
  activeSection,
  onSelectSection,
  onSignOut,
  logoutLabel,
}: AppSidebarProps) {
  const { isCollapsed } = useSidebar();

  return (
    <aside className={`app-sidebar glass ${isCollapsed ? "is-collapsed" : ""}`}>
      <div className="sidebar-brand">
        {!isCollapsed ? (
          <div className="brand-copy">
            <strong>MyMoney</strong>
            <small>Finance Command Center</small>
          </div>
        ) : (
          <div className="brand-copy">
            <strong>MM</strong>
          </div>
        )}
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
