type TransactionTone = "neutral" | "progress" | "success" | "danger";

type Props = {
  tone: TransactionTone;
  title: string;
  description: string;
  compact?: boolean;
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
      <span className="transaction-status__dot" aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}
