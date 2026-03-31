import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUiStore } from "../store/uiStore";
export function ValueText({ value, prefix = "R$ ", children }) {
    const hideValues = useUiStore((state) => state.hideValues);
    if (children) {
        return _jsx(_Fragment, { children: children });
    }
    if (hideValues) {
        return _jsx(_Fragment, { children: "*****" });
    }
    return (_jsxs(_Fragment, { children: [prefix, (value ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })] }));
}
