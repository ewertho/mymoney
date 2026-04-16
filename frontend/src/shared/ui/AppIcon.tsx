import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BellDot,
  CalendarRange,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Eye,
  EyeOff,
  FolderSync,
  HandCoins,
  Languages,
  LayoutDashboard,
  LogOut,
  MoonStar,
  PanelLeftClose,
  PanelLeftOpen,
  ReceiptText,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SunMedium,
  TrendingUp,
  TriangleAlert,
  Wallet,
  Zap,
} from "lucide-react";

export type IconName =
  | "dashboard"
  | "cycles"
  | "controls"
  | "collapse"
  | "expand"
  | "eye"
  | "eyeOff"
  | "theme"
  | "themeLight"
  | "language"
  | "bell"
  | "spark"
  | "trend"
  | "flash"
  | "logout"
  | "search"
  | "success"
  | "progress"
  | "warning"
  | "wallet"
  | "income"
  | "expense"
  | "security"
  | "sync"
  | "calendar"
  | "arrowUpRight";

const icons: Record<IconName, LucideIcon> = {
  dashboard: LayoutDashboard,
  cycles: CalendarRange,
  controls: SlidersHorizontal,
  collapse: PanelLeftClose,
  expand: PanelLeftOpen,
  eye: Eye,
  eyeOff: EyeOff,
  theme: MoonStar,
  themeLight: SunMedium,
  language: Languages,
  bell: BellDot,
  spark: Sparkles,
  trend: TrendingUp,
  flash: Zap,
  logout: LogOut,
  search: Search,
  success: CheckCircle2,
  progress: Clock3,
  warning: TriangleAlert,
  wallet: Wallet,
  income: HandCoins,
  expense: ReceiptText,
  security: ShieldCheck,
  sync: FolderSync,
  calendar: CalendarRange,
  arrowUpRight: ArrowUpRight,
};

type AppIconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

export function AppIcon({
  name,
  className,
  strokeWidth = 1.85,
}: AppIconProps) {
  const Icon = icons[name] ?? CircleDollarSign;

  return <Icon aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
