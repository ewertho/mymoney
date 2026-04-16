import { type FormEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getRequestMessage } from "../../../lib/errors";
import { TransactionStatus } from "../../../shared/ui/TransactionStatus";
import { ValueText } from "../../../shared/ui/ValueText";
import type { BillingCycle } from "../../../types/domain";
import { useBillingCycles } from "../hooks/useBillingCycles";
import { useCreateCycle } from "../hooks/useCreateCycle";
import { useDeleteCycle } from "../hooks/useDeleteCycle";

export function BillingCyclePanel() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [recurrence, setRecurrence] = useState<"MONTHLY" | "ONE_TIME">(
    "MONTHLY",
  );
  const [creditValue, setCreditValue] = useState(0);
  const [debtValue, setDebtValue] = useState(0);
  const [notes, setNotes] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    tone: "neutral" | "progress" | "success" | "danger";
    title: string;
    description: string;
  } | null>(null);

  const {
    cycles,
    summary,
    isLoading: isSyncLoading,
    isError: hasSyncError,
  } = useBillingCycles();
  const createMutation = useCreateCycle();
  const deleteMutation = useDeleteCycle();

  const isMutating = createMutation.isPending || deleteMutation.isPending;

  const savingsColor = useMemo(() => {
    if (summary.savingsRate >= 20) return "good";
    if (summary.savingsRate >= 0) return "neutral";
    return "bad";
  }, [summary.savingsRate]);

  const transactionDelta = creditValue - debtValue;
  const projectedBalance = summary.net + transactionDelta;
  const activeFeedback =
    feedback ??
    (hasSyncError
      ? {
          tone: "danger" as const,
          title: t("syncErrorTitle"),
          description: t("syncErrorDescription"),
        }
      : isSyncLoading
        ? {
            tone: "progress" as const,
            title: t("syncLoadingTitle"),
            description: t("syncLoadingDescription"),
          }
        : {
            tone: "neutral" as const,
            title: t("transactionReadyTitle"),
            description: t("transactionReadyDescription"),
          });

  const syncCard = hasSyncError
    ? {
        title: t("syncErrorTitle"),
        description: t("syncErrorDescription"),
      }
    : isSyncLoading
      ? {
          title: t("syncLoadingTitle"),
          description: t("syncLoadingDescription"),
        }
      : {
          title: t("syncReadyTitle"),
          description: t("syncReadyDescription", { count: cycles.length }),
        };

  const taskCard = createMutation.isPending
    ? {
        title: t("createPendingTitle"),
        description: t("createPendingDescription"),
      }
    : deleteMutation.isPending
      ? {
          title: t("deletePendingTitle"),
          description: t("deletePendingShortDescription"),
        }
      : {
          title: t("noActiveTaskTitle"),
          description: t("noActiveTaskDescription"),
        };

  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setFeedback({
      tone: "progress",
      title: t("createPendingTitle"),
      description: t("createPendingDescription"),
    });

    try {
      await createMutation.mutateAsync({
        name,
        month,
        year,
        recurrence,
        notes,
        credits: [{ name: t("credits"), value: Number(creditValue) }],
        debts: [{ name: t("debts"), value: Number(debtValue) }],
      });
      setName("");
      setCreditValue(0);
      setDebtValue(0);
      setNotes("");
      setFeedback({
        tone: "success",
        title: t("createSuccessTitle"),
        description: t("createSuccessDescription"),
      });
    } catch (error) {
      setFeedback({
        tone: "danger",
        title: t("createErrorTitle"),
        description: getRequestMessage(error, t("genericOperationError")),
      });
    }
  };

  const handleDelete = (cycle: BillingCycle): void => {
    setDeletingId(cycle._id);
    setFeedback({
      tone: "progress",
      title: t("deletePendingTitle"),
      description: t("deletePendingDescription", { name: cycle.name }),
    });

    deleteMutation.mutate(cycle, {
      onSuccess: () => {
        setFeedback({
          tone: "success",
          title: t("deleteSuccessTitle"),
          description: t("deleteSuccessDescription", { name: cycle.name }),
        });
      },
      onError: (error) => {
        setFeedback({
          tone: "danger",
          title: t("deleteErrorTitle"),
          description: getRequestMessage(error, t("genericOperationError")),
        });
      },
      onSettled: () => setDeletingId(null),
    });
  };

  return (
    <section className="dashboard-grid">
      <div className="operations-strip">
        <article className="glass-panel operations-card">
          <span className="section-kicker">{t("syncStatusLabel")}</span>
          <strong>{syncCard.title}</strong>
          <p>{syncCard.description}</p>
        </article>
        <article className="glass-panel operations-card">
          <span className="section-kicker">{t("activeTaskLabel")}</span>
          <strong>{taskCard.title}</strong>
          <p>{taskCard.description}</p>
        </article>
        <article className="glass-panel operations-card">
          <span className="section-kicker">{t("impactPreviewLabel")}</span>
          <strong>{t("projectedBalanceTitle")}</strong>
          <p>
            <ValueText value={projectedBalance} />
          </p>
        </article>
      </div>

      <div className="summary-grid">
        <article className="stat-card glow-a">
          <h3>{t("totalCredit")}</h3>
          <p>
            <ValueText value={summary.totalCredit} />
          </p>
        </article>
        <article className="stat-card glow-b">
          <h3>{t("totalDebt")}</h3>
          <p>
            <ValueText value={summary.totalDebt} />
          </p>
        </article>
        <article className="stat-card glow-c">
          <h3>{t("balance")}</h3>
          <p>
            <ValueText value={summary.net} />
          </p>
        </article>
        <article className={`stat-card ${savingsColor}`}>
          <h3>{t("savingsRate")}</h3>
          <p>{summary.savingsRate}%</p>
          <small>
            {t("overdueDebts")}: {summary.overdueDebts}
          </small>
        </article>
      </div>

      <div className="content-grid">
        <form
          onSubmit={submit}
          className="glass-panel form-panel transactional-panel"
        >
          <div className="panel-header">
            <span className="section-kicker">{t("billingWorkspaceTitle")}</span>
            <h3 className="section-title">{t("addCycle")}</h3>
            <p className="section-description">
              {t("billingWorkspaceDescription")}
            </p>
          </div>

          <TransactionStatus
            tone={activeFeedback.tone}
            title={activeFeedback.title}
            description={activeFeedback.description}
          />

          <fieldset className="form-fieldset">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("cycleName")}
              required
              disabled={isMutating}
            />
            <div className="inline-fields">
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                placeholder={t("month")}
                required
                disabled={isMutating}
              />
              <input
                type="number"
                min={2000}
                max={2100}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                placeholder={t("year")}
                required
                disabled={isMutating}
              />
            </div>
            <select
              aria-label={t("recurrence")}
              value={recurrence}
              onChange={(e) =>
                setRecurrence(e.target.value as "MONTHLY" | "ONE_TIME")
              }
              disabled={isMutating}
            >
              <option value="MONTHLY">{t("monthly")}</option>
              <option value="ONE_TIME">{t("oneTime")}</option>
            </select>
            <div className="inline-fields">
              <input
                type="number"
                step="0.01"
                value={creditValue}
                onChange={(e) => setCreditValue(Number(e.target.value))}
                placeholder={t("credits")}
                required
                disabled={isMutating}
              />
              <input
                type="number"
                step="0.01"
                value={debtValue}
                onChange={(e) => setDebtValue(Number(e.target.value))}
                placeholder={t("debts")}
                required
                disabled={isMutating}
              />
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("notes")}
              rows={4}
              disabled={isMutating}
            />
          </fieldset>

          <div className="review-card">
            <span className="section-kicker">{t("impactPreviewLabel")}</span>
            <h4>{t("transactionReviewTitle")}</h4>
            <div className="review-grid">
              <div>
                <span>{t("transactionDeltaLabel")}</span>
                <strong>
                  <ValueText value={transactionDelta} />
                </strong>
              </div>
              <div>
                <span>{t("currentBalanceLabel")}</span>
                <strong>
                  <ValueText value={summary.net} />
                </strong>
              </div>
              <div>
                <span>{t("projectedBalanceLabel")}</span>
                <strong>
                  <ValueText value={projectedBalance} />
                </strong>
              </div>
            </div>
          </div>

          <button className="primary-btn" type="submit" disabled={isMutating}>
            {createMutation.isPending ? t("createPendingButton") : t("create")}
          </button>
        </form>

        <div className="glass-panel table-panel transactional-panel">
          <div className="panel-header">
            <span className="section-kicker">{t("cycles")}</span>
            <h3 className="section-title">{t("cyclesTableTitle")}</h3>
            <p className="section-description">
              {t("cyclesWorkspaceDescription")}
            </p>
          </div>

          {isSyncLoading ? (
            <div className="table-empty-state">
              <TransactionStatus
                tone="progress"
                title={t("syncLoadingTitle")}
                description={t("syncLoadingDescription")}
                compact
              />
            </div>
          ) : hasSyncError ? (
            <div className="table-empty-state">
              <TransactionStatus
                tone="danger"
                title={t("syncErrorTitle")}
                description={t("syncErrorDescription")}
                compact
              />
            </div>
          ) : cycles.length === 0 ? (
            <div className="table-empty-state">
              <TransactionStatus
                tone="neutral"
                title={t("noCyclesTitle")}
                description={t("noCyclesDescription")}
                compact
              />
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("cycleName")}</th>
                    <th>
                      {t("month")}/{t("year")}
                    </th>
                    <th>{t("credits")}</th>
                    <th>{t("debts")}</th>
                    <th>{t("actionsLabel")}</th>
                  </tr>
                </thead>
                <tbody>
                  {cycles.map((cycle) => (
                    <tr
                      key={cycle._id}
                      className={
                        deletingId === cycle._id ? "pending-row" : undefined
                      }
                    >
                      <td>{cycle.name}</td>
                      <td>
                        {String(cycle.month).padStart(2, "0")}/{cycle.year}
                      </td>
                      <td>
                        <ValueText
                          value={cycle.credits.reduce(
                            (sum, credit) => sum + credit.value,
                            0,
                          )}
                        />
                      </td>
                      <td>
                        <ValueText
                          value={cycle.debts.reduce(
                            (sum, debt) => sum + debt.value,
                            0,
                          )}
                        />
                      </td>
                      <td>
                        <button
                          className="danger-btn"
                          type="button"
                          onClick={() => handleDelete(cycle)}
                          disabled={isMutating}
                        >
                          {deletingId === cycle._id
                            ? t("deletePendingButton")
                            : t("delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
