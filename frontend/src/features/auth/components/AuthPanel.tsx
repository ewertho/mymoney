import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { getRequestMessage } from "../../../lib/errors";
import { TransactionStatus } from "../../../shared/ui/TransactionStatus";
import { useAuthStore } from "../../../store/authStore";
import { login, signup } from "../authService";

type AuthMode = "login" | "signup";

export function AuthPanel() {
  const { t } = useTranslation();
  const setSession = useAuthStore((state) => state.setSession);
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      mode === "login" ? login(email, password) : signup(name, email, password),
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

  const clearError = (): void => {
    if (mutation.isError) mutation.reset();
  };

  const handleModeChange = (): void => {
    setMode(mode === "login" ? "signup" : "login");
    mutation.reset();
  };

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <section className="auth-layout">
      <article className="auth-hero">
        <span className="section-kicker">{t("appTitle")}</span>
        <h1>{t("authHeroTitle")}</h1>
        <p>{t("authHeroDescription")}</p>
        <div className="auth-hero__stats">
          <div className="auth-hero__stat">
            <strong>24/7</strong>
            <span>{t("authHeroStatOne")}</span>
          </div>
          <div className="auth-hero__stat">
            <strong>+12%</strong>
            <span>{t("authHeroStatTwo")}</span>
          </div>
          <div className="auth-hero__stat">
            <strong>3 min</strong>
            <span>{t("authHeroStatThree")}</span>
          </div>
        </div>
      </article>

      <article className="auth-card glass-panel transactional-panel">
        <div className="panel-header">
          <span className="section-kicker">{t("authWorkspaceTitle")}</span>
          <h2 className="section-title">
            {mode === "login" ? t("login") : t("signup")}
          </h2>
          <p className="section-description">
            {mode === "login"
              ? t("authWorkspaceLoginDescription")
              : t("authWorkspaceSignupDescription")}
          </p>
        </div>

        <TransactionStatus
          tone={statusTone}
          title={statusTitle}
          description={statusDescription}
        />

        <form onSubmit={submit} className="auth-form">
          <fieldset className="auth-fieldset">
            {mode === "signup" && (
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  clearError();
                }}
                placeholder={t("authNamePlaceholder")}
                required
                disabled={mutation.isPending}
              />
            )}
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearError();
              }}
              type="email"
              placeholder={t("authEmailPlaceholder")}
              required
              disabled={mutation.isPending}
            />
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearError();
              }}
              type="password"
              placeholder={t("authPasswordPlaceholder")}
              required
              disabled={mutation.isPending}
            />
            {mode === "signup" && (
              <p className="helper-text">{t("passwordHint")}</p>
            )}
          </fieldset>

          <button
            type="submit"
            className="primary-btn"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? t("authProcessingButton")
              : mode === "login"
                ? t("authSubmitLogin")
                : t("authSubmitSignup")}
          </button>
        </form>

        <button
          className="link-btn"
          type="button"
          onClick={handleModeChange}
          disabled={mutation.isPending}
        >
          {mode === "login"
            ? t("authSwitchModeSignup")
            : t("authSwitchModeLogin")}
        </button>
      </article>
    </section>
  );
}
