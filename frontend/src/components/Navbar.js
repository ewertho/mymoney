import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";
export function Navbar({ onLogout }) {
    const { t, i18n } = useTranslation();
    const { hideValues, theme, language, toggleHideValues, toggleTheme, toggleLanguage, } = useUiStore();
    const user = useAuthStore((state) => state.user);
    const handleLanguage = () => {
        toggleLanguage();
        i18n.changeLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
    };
    return (_jsxs("header", { className: "navbar glass", children: [_jsxs("div", { children: [_jsx("h1", { children: t("appTitle") }), _jsx("p", { children: t("subtitle") })] }), _jsxs("div", { className: "navbar-actions", children: [_jsx("span", { className: "user-chip", children: user?.name }), _jsx("button", { onClick: toggleTheme, className: "ghost-btn", type: "button", children: theme === "dark" ? t("lightMode") : t("darkMode") }), _jsxs("button", { onClick: handleLanguage, className: "ghost-btn", type: "button", children: [t("language"), ": ", language] }), _jsx("button", { onClick: toggleHideValues, className: "ghost-btn", type: "button", children: hideValues ? t("showValues") : t("hideValues") }), _jsx("button", { onClick: onLogout, className: "danger-btn", type: "button", children: t("logout") })] })] }));
}
