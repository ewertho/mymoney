import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Repeat, X } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "./i18n";
import { Money } from "./App";
import {
  api,
  CATEGORIES,
  parseCents,
  shift,
  today,
  useStore,
  type Budgets,
  type Credit,
  type Cycle,
  type Debt,
  type Period,
  type Summary,
} from "./lib";

const now = new Date();

export function Month({ toolbar }: { toolbar: (nav: ReactNode) => ReactNode }) {
  const { t } = useTranslation();
  const language = useStore((s) => s.language);
  const queryClient = useQueryClient();
  const [period, setPeriod] = useState<Period>({ year: now.getFullYear(), month: now.getMonth() + 1 });
  const [notice, setNotice] = useState("");
  const path = `${period.year}/${period.month}`;
  const cycleKey = ["cycle", period.year, period.month];

  const monthName = (p: Period, year = true) =>
    new Date(p.year, p.month - 1).toLocaleDateString(language, { month: "long", ...(year && { year: "numeric" }) });

  const cycle = useQuery({ queryKey: cycleKey, queryFn: () => api<Cycle>(`/cycles/${path}`) });
  const summary = useQuery({ queryKey: ["summary", period.year, period.month], queryFn: () => api<Summary>(`/summary/${path}`) });

  const save = useMutation({
    mutationFn: (next: Cycle) => api<Cycle>(`/cycles/${path}`, { method: "PUT", body: next }),
    // Otimista: a linha aparece na hora; se o servidor recusar, volta ao que estava.
    onMutate: (next) => {
      const previous = queryClient.getQueryData<Cycle>(cycleKey);
      queryClient.setQueryData(cycleKey, next);
      return { previous };
    },
    onError: (error, _next, context) => {
      queryClient.setQueryData(cycleKey, context?.previous);
      setNotice(error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["summary"] }),
  });

  const rollover = useMutation({
    mutationFn: () => api<Cycle>(`/cycles/${path}/rollover`, { method: "POST" }),
    onSuccess: () => {
      const next = shift(period, 1);
      queryClient.invalidateQueries();
      setPeriod(next);
      setNotice(t("rolloverDone", { month: monthName(next) }));
    },
    onError: (error) => setNotice(error.message),
  });

  const go = (by: number) => {
    setNotice("");
    setPeriod(shift(period, by));
  };

  const nav = (
    <nav className="month-nav" aria-label={monthName(period)}>
      <button type="button" className="icon" onClick={() => go(-1)} title={t("prevMonth")}><ChevronLeft /></button>
      <h1>{monthName(period)}</h1>
      <button type="button" className="icon" onClick={() => go(1)} title={t("nextMonth")}><ChevronRight /></button>
    </nav>
  );

  const data = cycle.data;
  const update = (patch: Partial<Cycle>) => data && save.mutate({ ...data, ...patch });
  const hasRecurring = data && [...data.credits, ...data.debts].some((item) => item.recurring);

  return (
    <>
      {toolbar(nav)}
      <main className="month">
        {notice && <p className="notice" role="status">{notice}</p>}
        {cycle.isError && (
          <p className="notice error" role="alert">
            {t("loadError")} <button type="button" className="link" onClick={() => cycle.refetch()}>{t("retry")}</button>
          </p>
        )}

        <SummaryPanel summary={summary.data} />

        {data && (
          <div className="ledger">
            <section className="sheet">
              <h2>{t("income")}</h2>
              {data.credits.length === 0 && <p className="empty">{t("emptyIncome")}</p>}
              <ul className="rows">
                {data.credits.map((credit, i) => (
                  <li key={i} className="row">
                    <span className="row-name">{credit.name}</span>
                    <span className="leader" />
                    <span className="amount in"><Money cents={credit.cents} /></span>
                    <RowActions
                      item={credit}
                      onToggle={() => update({ credits: data.credits.with(i, { ...credit, recurring: !credit.recurring }) })}
                      onRemove={() => update({ credits: data.credits.toSpliced(i, 1) })}
                    />
                  </li>
                ))}
              </ul>
              <EntryForm label={t("addIncome")} onAdd={(entry) => update({ credits: [...data.credits, entry] })} />
            </section>

            <section className="sheet">
              <h2>{t("expenses")}</h2>
              {data.debts.length === 0 && <p className="empty">{t("emptyExpenses")}</p>}
              <ul className="rows">
                {data.debts.map((debt, i) => {
                  const status = debt.paidAt ? "paid" : debt.dueDate && debt.dueDate < today() ? "overdue" : "pending";
                  return (
                    <li key={i} className={`row ${status}`}>
                      <input
                        type="checkbox"
                        checked={!!debt.paidAt}
                        aria-label={t("markPaid", { name: debt.name })}
                        onChange={() => update({ debts: data.debts.with(i, { ...debt, paidAt: debt.paidAt ? null : today() }) })}
                      />
                      <span className="row-name">
                        {debt.name}
                        <small>
                          {t(`cat.${debt.category}`)}
                          {debt.dueDate && `, ${t("dueOn", { date: new Date(`${debt.dueDate}T12:00`).toLocaleDateString(language, { day: "2-digit", month: "2-digit" }) })}`}
                        </small>
                      </span>
                      <span className="leader" />
                      {status !== "pending" && <span className={`stamp ${status}`}>{t(status)}</span>}
                      <span className="amount out"><Money cents={debt.cents} /></span>
                      <RowActions
                        item={debt}
                        onToggle={() => update({ debts: data.debts.with(i, { ...debt, recurring: !debt.recurring }) })}
                        onRemove={() => update({ debts: data.debts.toSpliced(i, 1) })}
                      />
                    </li>
                  );
                })}
              </ul>
              <EntryForm debt label={t("addExpense")} onAdd={(entry) => update({ debts: [...data.debts, entry as Debt] })} />
            </section>

            <section className="sheet notes">
              <label>
                {t("notes")}
                <textarea
                  key={path}
                  rows={3}
                  maxLength={2000}
                  defaultValue={data.notes}
                  onBlur={(e) => e.target.value !== data.notes && update({ notes: e.target.value })}
                />
              </label>
              {hasRecurring && (
                <button type="button" className="secondary" disabled={rollover.isPending} onClick={() => rollover.mutate()}>
                  <Repeat /> {t("rollover", { month: monthName(shift(period, 1), false) })}
                </button>
              )}
            </section>
          </div>
        )}
      </main>
    </>
  );
}

function RowActions({ item, onToggle, onRemove }: { item: Credit; onToggle: () => void; onRemove: () => void }) {
  const { t } = useTranslation();
  return (
    <span className="row-actions">
      <button type="button" className="icon" aria-pressed={item.recurring} onClick={onToggle} title={t("recurring")}><Repeat /></button>
      <button type="button" className="icon" onClick={onRemove} title={t("remove", { name: item.name })}><X /></button>
    </span>
  );
}

function EntryForm({ debt, label, onAdd }: { debt?: boolean; label: string; onAdd: (entry: Credit | Debt) => void }) {
  const { t } = useTranslation();
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const cents = parseCents(String(fields.get("amount")));
    if (cents === null) return setError(t("invalidAmount"));
    setError("");
    const base = { name: String(fields.get("name")).trim(), cents, recurring: fields.has("recurring") };
    onAdd(debt ? { ...base, category: fields.get("category") as Debt["category"], dueDate: (fields.get("dueDate") as string) || null, paidAt: null } : base);
    form.reset();
    form.querySelector("input")?.focus();
  }

  return (
    <form className={`entry ${debt ? "entry-debt" : ""}`} onSubmit={submit}>
      <label className="grow">{t("description")}<input name="name" required maxLength={80} /></label>
      <label>{t("amount")}<input name="amount" inputMode="decimal" required placeholder="0,00" aria-invalid={!!error} /></label>
      {debt && (
        <>
          <label>
            {t("category")}
            <select name="category" defaultValue="other">
              {CATEGORIES.map((c) => <option key={c} value={c}>{t(`cat.${c}`)}</option>)}
            </select>
          </label>
          <label>{t("dueDate")}<input name="dueDate" type="date" /></label>
        </>
      )}
      <label className="check"><input name="recurring" type="checkbox" /> {t("recurring")}</label>
      <button className="primary">{label}</button>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}

function SummaryPanel({ summary }: { summary?: Summary }) {
  const { t } = useTranslation();
  const language = useStore((s) => s.language);
  const queryClient = useQueryClient();
  const dialog = useRef<HTMLDialogElement>(null);

  const saveBudgets = useMutation({
    mutationFn: (budgets: Budgets) => api("/budgets", { method: "PUT", body: budgets }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      dialog.current?.close();
    },
  });

  if (!summary) return <aside className="summary" aria-busy="true" />;

  const peak = Math.max(1, ...summary.series.flatMap((p) => [p.income, p.expense]));
  const budgetOf = (category: string) => summary.categories.find((c) => c.category === category)?.budget;

  function submitBudgets(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const budgets: Budgets = {};
    for (const [category, value] of new FormData(event.currentTarget)) {
      const cents = parseCents(String(value));
      if (cents) budgets[category as keyof Budgets] = cents;
    }
    saveBudgets.mutate(budgets);
  }

  return (
    <aside className="summary">
      <section className={`balance ${summary.balance < 0 ? "negative" : ""}`}>
        <h2>{t(summary.balance < 0 ? "balanceNegative" : "balance")}</h2>
        <p className="figure"><Money cents={Math.abs(summary.balance)} /></p>
        {summary.income > 0 && summary.balance >= 0 && <p>{t("ofIncome", { rate: summary.savingsRate })}</p>}
        <dl>
          <div><dt>{t("income")}</dt><dd><Money cents={summary.income} /></dd></div>
          <div><dt>{t("expenses")}</dt><dd><Money cents={summary.expense} /></dd></div>
          <div><dt>{t("open")}</dt><dd><Money cents={summary.open} /></dd></div>
        </dl>
      </section>

      {summary.overdue.length > 0 && (
        <section className="sheet overdue-list">
          <h2>{t("overdueTitle")}</h2>
          <ul className="rows">
            {summary.overdue.map((item, i) => (
              <li key={i} className="row">
                <span className="row-name">
                  {item.name}
                  <small>{new Date(`${item.dueDate}T12:00`).toLocaleDateString(language)}</small>
                </span>
                <span className="leader" />
                <span className="amount out"><Money cents={item.cents} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="sheet">
        <div className="sheet-head">
          <h2>{t("byCategory")}</h2>
          <button type="button" className="link" onClick={() => dialog.current?.showModal()}>{t("budgets")}</button>
        </div>
        {summary.categories.length === 0 && <p className="empty">{t("noCategories")}</p>}
        <ul className="cats">
          {summary.categories.map((c) => (
            <li key={c.category} className={c.over ? "over" : ""}>
              <span>{t(`cat.${c.category}`)}</span>
              <span className="amount"><Money cents={c.spent} /></span>
              <meter min={0} max={c.budget ?? Math.max(summary.expense, 1)} value={Math.min(c.spent, c.budget ?? c.spent)} />
              {c.budget !== null && (
                <small>
                  {c.over
                    ? <>{t("over", { value: "" })}<Money cents={c.spent - c.budget} /></>
                    : <>{t("limit", { value: "" })}<Money cents={c.budget} /></>}
                </small>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet">
        <h2>{t("lastMonths")}</h2>
        <svg className="chart" viewBox="0 0 240 110" role="img" aria-label={t("chartSummary")}>
          {summary.series.map((p, i) => {
            const x = i * 40 + 6;
            const h = (v: number) => (v / peak) * 84;
            return (
              <g key={i}>
                <rect className="bar-in" x={x} y={88 - h(p.income)} width="12" height={h(p.income)} rx="2" />
                <rect className="bar-out" x={x + 14} y={88 - h(p.expense)} width="12" height={h(p.expense)} rx="2" />
                <text x={x + 13} y="104" textAnchor="middle">
                  {new Date(p.year, p.month - 1).toLocaleDateString(language, { month: "short" }).replace(".", "")}
                </text>
              </g>
            );
          })}
          <line x1="0" x2="240" y1="88.5" y2="88.5" />
        </svg>
        <p className="legend"><span className="key in" /> {t("income")} <span className="key out" /> {t("expenses")}</p>
      </section>

      <dialog ref={dialog} className="sheet" closedby="any">
        <form onSubmit={submitBudgets}>
          <h2>{t("budgetsTitle")}</h2>
          <p>{t("budgetsHint")}</p>
          {CATEGORIES.map((c) => (
            <label key={c} className="inline">
              {t(`cat.${c}`)}
              <input name={c} inputMode="decimal" placeholder="0,00" defaultValue={budgetOf(c) ? (budgetOf(c)! / 100).toFixed(2).replace(".", ",") : ""} />
            </label>
          ))}
          {saveBudgets.isError && <p className="error" role="alert">{saveBudgets.error.message}</p>}
          <div className="dialog-actions">
            <button type="button" className="secondary" onClick={() => dialog.current?.close()}>{t("cancel")}</button>
            <button className="primary" disabled={saveBudgets.isPending}>{t("save")}</button>
          </div>
        </form>
      </dialog>
    </aside>
  );
}
