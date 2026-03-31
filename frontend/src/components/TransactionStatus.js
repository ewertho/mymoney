import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TransactionStatus({ tone, title, description, compact = false, }) {
    return (_jsxs("div", { className: `transaction-status transaction-status--${tone}${compact ? " transaction-status--compact" : ""}`, role: "status", "aria-live": "polite", children: [_jsx("span", { className: "transaction-status__dot", "aria-hidden": "true" }), _jsxs("div", { children: [_jsx("strong", { children: title }), _jsx("p", { children: description })] })] }));
}
