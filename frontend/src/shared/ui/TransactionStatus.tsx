import { AppIcon } from "./AppIcon";

type TransactionTone = "neutral" | "progress" | "success" | "danger";

type Props = {
  tone: TransactionTone;
  title: string;
  description: string;
  compact?: boolean;
};

const toneIcon: Record<TransactionTone, "sync" | "progress" | "success" | "warning"> = {
  neutral: "sync",
  progress: "progress",
  success: "success",
  danger: "warning",
};

export function TransactionStatus({
  tone,
  title,
  description,
  compact = false,
}: Props) {
  return (
    <div
      className={`transaction-status transaction-status--${tone}${
        compact ? " transaction-status--compact" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="transaction-status__icon" aria-hidden="true">
        <AppIcon name={toneIcon[tone]} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}
