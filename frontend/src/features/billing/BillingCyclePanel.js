import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TransactionStatus } from "../../components/TransactionStatus";
import { ValueText } from "../../components/ValueText";
import { getRequestMessage } from "../../lib/errors";
import { useBillingCycles } from "./hooks/useBillingCycles";
import { useCreateCycle } from "./hooks/useCreateCycle";
import { useDeleteCycle } from "./hooks/useDeleteCycle";
export function BillingCyclePanel() {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [recurrence, setRecurrence] = useState("MONTHLY");
    const [creditValue, setCreditValue] = useState(0);
    const [debtValue, setDebtValue] = useState(0);
    const [notes, setNotes] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const { cycles, summary, isLoading: isSyncLoading, isError: hasSyncError, } = useBillingCycles();
    const createMutation = useCreateCycle();
    const deleteMutation = useDeleteCycle();
    const isMutating = createMutation.isPending || deleteMutation.isPending;
    const savingsColor = useMemo(() => {
        if (summary.savingsRate >= 20)
            return "good";
        if (summary.savingsRate >= 0)
            return "neutral";
        return "bad";
    }, [summary.savingsRate]);
    const transactionDelta = creditValue - debtValue;
    const projectedBalance = summary.net + transactionDelta;
    const activeFeedback = feedback ??
        (hasSyncError
            ? {
                tone: "danger",
                title: t("syncErrorTitle"),
                description: t("syncErrorDescription"),
            }
            : isSyncLoading
                ? {
                    tone: "progress",
                    title: t("syncLoadingTitle"),
                    description: t("syncLoadingDescription"),
                }
                : {
                    tone: "neutral",
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
    const submit = async (event) => {
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
        }
        catch (error) {
            setFeedback({
                tone: "danger",
                title: t("createErrorTitle"),
                description: getRequestMessage(error, t("genericOperationError")),
            });
        }
    };
    const handleDelete = (cycle) => {
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
    return (_jsxs("section", { className: "dashboard-grid", children: [_jsxs("div", { className: "operations-strip", children: [_jsxs("article", { className: "glass operations-card", children: [_jsx("span", { className: "section-kicker", children: t("syncStatusLabel") }), _jsx("strong", { children: syncCard.title }), _jsx("p", { children: syncCard.description })] }), _jsxs("article", { className: "glass operations-card", children: [_jsx("span", { className: "section-kicker", children: t("activeTaskLabel") }), _jsx("strong", { children: taskCard.title }), _jsx("p", { children: taskCard.description })] }), _jsxs("article", { className: "glass operations-card", children: [_jsx("span", { className: "section-kicker", children: t("impactPreviewLabel") }), _jsx("strong", { children: t("projectedBalanceTitle") }), _jsx("p", { children: _jsx(ValueText, { value: projectedBalance }) })] })] }), _jsxs("div", { className: "summary-grid", children: [_jsxs("article", { className: "stat-card glow-a", children: [_jsx("h3", { children: t("totalCredit") }), _jsx("p", { children: _jsx(ValueText, { value: summary.totalCredit }) })] }), _jsxs("article", { className: "stat-card glow-b", children: [_jsx("h3", { children: t("totalDebt") }), _jsx("p", { children: _jsx(ValueText, { value: summary.totalDebt }) })] }), _jsxs("article", { className: "stat-card glow-c", children: [_jsx("h3", { children: t("balance") }), _jsx("p", { children: _jsx(ValueText, { value: summary.net }) })] }), _jsxs("article", { className: `stat-card ${savingsColor}`, children: [_jsx("h3", { children: t("savingsRate") }), _jsxs("p", { children: [summary.savingsRate, "%"] }), _jsxs("small", { children: [t("overdueDebts"), ": ", summary.overdueDebts] })] })] }), _jsxs("div", { className: "content-grid", children: [_jsxs("form", { onSubmit: submit, className: "glass form-panel transactional-panel", children: [_jsxs("div", { className: "panel-header", children: [_jsx("span", { className: "section-kicker", children: t("billingWorkspaceTitle") }), _jsx("h3", { className: "section-title", children: t("addCycle") }), _jsx("p", { className: "section-description", children: t("billingWorkspaceDescription") })] }), _jsx(TransactionStatus, { tone: activeFeedback.tone, title: activeFeedback.title, description: activeFeedback.description }), _jsxs("fieldset", { className: "form-fieldset", children: [_jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: t("cycleName"), required: true, disabled: isMutating }), _jsxs("div", { className: "inline-fields", children: [_jsx("input", { type: "number", min: 1, max: 12, value: month, onChange: (e) => setMonth(Number(e.target.value)), placeholder: t("month"), required: true, disabled: isMutating }), _jsx("input", { type: "number", min: 2000, max: 2100, value: year, onChange: (e) => setYear(Number(e.target.value)), placeholder: t("year"), required: true, disabled: isMutating })] }), _jsxs("select", { "aria-label": t("recurrence"), value: recurrence, onChange: (e) => setRecurrence(e.target.value), disabled: isMutating, children: [_jsx("option", { value: "MONTHLY", children: t("monthly") }), _jsx("option", { value: "ONE_TIME", children: t("oneTime") })] }), _jsxs("div", { className: "inline-fields", children: [_jsx("input", { type: "number", step: "0.01", value: creditValue, onChange: (e) => setCreditValue(Number(e.target.value)), placeholder: t("credits"), required: true, disabled: isMutating }), _jsx("input", { type: "number", step: "0.01", value: debtValue, onChange: (e) => setDebtValue(Number(e.target.value)), placeholder: t("debts"), required: true, disabled: isMutating })] }), _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: t("notes"), rows: 3, disabled: isMutating })] }), _jsxs("div", { className: "review-card", children: [_jsx("span", { className: "section-kicker", children: t("impactPreviewLabel") }), _jsx("h4", { children: t("transactionReviewTitle") }), _jsxs("div", { className: "review-grid", children: [_jsxs("div", { children: [_jsx("span", { children: t("transactionDeltaLabel") }), _jsx("strong", { children: _jsx(ValueText, { value: transactionDelta }) })] }), _jsxs("div", { children: [_jsx("span", { children: t("currentBalanceLabel") }), _jsx("strong", { children: _jsx(ValueText, { value: summary.net }) })] }), _jsxs("div", { children: [_jsx("span", { children: t("projectedBalanceLabel") }), _jsx("strong", { children: _jsx(ValueText, { value: projectedBalance }) })] })] })] }), _jsx("button", { className: "primary-btn", type: "submit", disabled: isMutating, children: createMutation.isPending ? t("createPendingButton") : t("create") })] }), _jsxs("div", { className: "glass table-panel transactional-panel", children: [_jsxs("div", { className: "panel-header", children: [_jsx("span", { className: "section-kicker", children: t("cycles") }), _jsx("h3", { className: "section-title", children: t("cycles") }), _jsx("p", { className: "section-description", children: t("cyclesWorkspaceDescription") })] }), isSyncLoading ? (_jsx("div", { className: "table-empty-state", children: _jsx(TransactionStatus, { tone: "progress", title: t("syncLoadingTitle"), description: t("syncLoadingDescription"), compact: true }) })) : hasSyncError ? (_jsx("div", { className: "table-empty-state", children: _jsx(TransactionStatus, { tone: "danger", title: t("syncErrorTitle"), description: t("syncErrorDescription"), compact: true }) })) : cycles.length === 0 ? (_jsx("div", { className: "table-empty-state", children: _jsx(TransactionStatus, { tone: "neutral", title: t("noCyclesTitle"), description: t("noCyclesDescription"), compact: true }) })) : (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: t("cycleName") }), _jsxs("th", { children: [t("month"), "/", t("year")] }), _jsx("th", { children: t("credits") }), _jsx("th", { children: t("debts") }), _jsx("th", {})] }) }), _jsx("tbody", { children: cycles.map((cycle) => (_jsxs("tr", { className: deletingId === cycle._id ? "pending-row" : undefined, children: [_jsx("td", { children: cycle.name }), _jsxs("td", { children: [String(cycle.month).padStart(2, "0"), "/", cycle.year] }), _jsx("td", { children: _jsx(ValueText, { value: cycle.credits.reduce((sum, c) => sum + c.value, 0) }) }), _jsx("td", { children: _jsx(ValueText, { value: cycle.debts.reduce((sum, d) => sum + d.value, 0) }) }), _jsx("td", { children: _jsx("button", { className: "danger-btn", type: "button", onClick: () => handleDelete(cycle), disabled: isMutating, children: deletingId === cycle._id
                                                            ? t("deletePendingButton")
                                                            : t("delete") }) })] }, cycle._id))) })] }))] })] })] }));
}
