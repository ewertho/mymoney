import type { TFunction } from "i18next";
import type { IconName } from "../../components/AppIcon";

export type ShellSection = "overview" | "cycles" | "controls";

export type NavItem = {
  id: ShellSection;
  label: string;
  detail: string;
  icon: IconName;
};

export type MetricCard = {
  title: string;
  value: string;
  trend: string;
  tone: "teal" | "cyan" | "orange" | "rose";
  icon: IconName;
};

export function getNavItems(t: TFunction): NavItem[] {
  return [
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
  ];
}

export function getMetrics(hideValues: boolean): MetricCard[] {
  return [
    {
      title: "Receita Total",
      value: hideValues ? "R$ ....." : "R$ 52.480",
      trend: "+12.4% vs mes anterior",
      tone: "teal",
      icon: "trend",
    },
    {
      title: "Despesas",
      value: hideValues ? "R$ ....." : "R$ 34.910",
      trend: "-4.1% de reducao",
      tone: "orange",
      icon: "flash",
    },
    {
      title: "Saldo Liquido",
      value: hideValues ? "R$ ....." : "R$ 17.570",
      trend: "+8.7% de crescimento",
      tone: "cyan",
      icon: "spark",
    },
    {
      title: "Transacoes Hoje",
      value: hideValues ? ".." : "28",
      trend: "7 pendentes de conciliacao",
      tone: "rose",
      icon: "bell",
    },
  ];
}
