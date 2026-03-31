import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TransactionStatus } from "../../components/TransactionStatus";
import { getRequestMessage } from "../../lib/errors";
import { useAuthStore } from "../../store/authStore";
import { login, signup } from "./authService";
export function AuthPanel() {
    const { t } = useTranslation();
    const setSession = useAuthStore((state) => state.setSession);
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const mutation = useMutation({
        mutationFn: () => mode === "login" ? login(email, password) : signup(name, email, password),
        onSuccess: (data) => setSession(data.token, data.user),
    });
    const statusTone = mutation.isError
        ? "danger"
        : mutation.isPending
            ? "progress"
            : "neutral";
    const statusTitle = mutation.isError
        ? t("authFailureTitle")
        : mutation.isPending
            ? t("authProcessingTitle")
            : t("authReadyTitle");
    const statusDescription = mutation.isError
        ? getRequestMessage(mutation.error, t("authGenericError"))
        : mutation.isPending
            ? t("authProcessingDescription")
            : mode === "login"
                ? t("authReadyLoginDescription")
                : t("authReadySignupDescription");
    const clearError = () => {
        if (mutation.isError)
            mutation.reset();
    };
    const handleModeChange = () => {
        setMode(mode === "login" ? "signup" : "login");
        mutation.reset();
    };
    const submit = (event) => {
        event.preventDefault();
        mutation.mutate();
    };
    return (_jsxs("section", { className: "auth-card glass transactional-panel", children: [_jsxs("div", { className: "panel-header", children: [_jsx("span", { className: "section-kicker", children: t("authWorkspaceTitle") }), _jsx("h2", { className: "section-title", children: mode === "login" ? t("login") : t("signup") }), _jsx("p", { className: "section-description", children: mode === "login"
                            ? t("authWorkspaceLoginDescription")
                            : t("authWorkspaceSignupDescription") })] }), _jsx(TransactionStatus, { tone: statusTone, title: statusTitle, description: statusDescription }), _jsxs("form", { onSubmit: submit, className: "auth-form", children: [_jsxs("fieldset", { className: "auth-fieldset", children: [mode === "signup" && (_jsx("input", { value: name, onChange: (event) => {
                                    setName(event.target.value);
                                    clearError();
                                }, placeholder: t("authNamePlaceholder"), required: true, disabled: mutation.isPending })), _jsx("input", { value: email, onChange: (event) => {
                                    setEmail(event.target.value);
                                    clearError();
                                }, type: "email", placeholder: t("authEmailPlaceholder"), required: true, disabled: mutation.isPending }), _jsx("input", { value: password, onChange: (event) => {
                                    setPassword(event.target.value);
                                    clearError();
                                }, type: "password", placeholder: t("authPasswordPlaceholder"), required: true, disabled: mutation.isPending }), mode === "signup" && (_jsx("p", { className: "helper-text", children: t("passwordHint") }))] }), _jsx("button", { type: "submit", className: "primary-btn", disabled: mutation.isPending, children: mutation.isPending
                            ? t("authProcessingButton")
                            : mode === "login"
                                ? t("authSubmitLogin")
                                : t("authSubmitSignup") })] }), _jsx("button", { className: "link-btn", type: "button", onClick: handleModeChange, disabled: mutation.isPending, children: mode === "login"
                    ? t("authSwitchModeSignup")
                    : t("authSwitchModeLogin") })] }));
}
