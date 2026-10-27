import { Eye, EyeOff, Languages, LogOut, SunMoon } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "./i18n";
import { api, useStore, type User } from "./lib";
import { Month } from "./Month";

export function Money({ cents }: { cents: number }) {
  const { hideValues, language } = useStore();
  if (hideValues) return <span aria-label="•••">R$ •••••</span>;
  return <>{(cents / 100).toLocaleString(language, { style: "currency", currency: "BRL" })}</>;
}

function Toolbar({ children }: { children?: ReactNode }) {
  const { t } = useTranslation();
  const { hideValues, theme, language, user, set, setSession } = useStore();
  const dark = theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <header className="bar">
      <span className="brand">MyMoney</span>
      {children}
      <div className="bar-actions">
        {user && (
          <button type="button" className="icon" onClick={() => set({ hideValues: !hideValues })} title={t(hideValues ? "showValues" : "hideValues")}>
            {hideValues ? <EyeOff /> : <Eye />}
          </button>
        )}
        <button type="button" className="icon" onClick={() => set({ theme: dark ? "light" : "dark" })} title={t("theme")}>
          <SunMoon />
        </button>
        <button type="button" className="icon" onClick={() => set({ language: language === "pt-BR" ? "en-US" : "pt-BR" })} title={t("language")}>
          <Languages />
        </button>
        {user && (
          <button type="button" className="icon" onClick={() => setSession(null, null)} title={t("logout")}>
            <LogOut />
          </button>
        )}
      </div>
    </header>
  );
}

function Auth() {
  const { t } = useTranslation();
  const setSession = useStore((s) => s.setSession);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const body = Object.fromEntries(new FormData(event.currentTarget));
      const { token, user } = await api<{ token: string; user: User }>(`/auth/${mode}`, { method: "POST", body });
      setSession(token, user);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth-pitch">
        <h1>MyMoney</h1>
        <p>{t("tagline")}</p>
      </div>
      <form className="sheet auth-form" onSubmit={submit}>
        <h2>{t(mode)}</h2>
        {mode === "signup" && (
          <label>
            {t("name")}
            <input name="name" autoComplete="name" required minLength={2} />
          </label>
        )}
        <label>
          {t("email")}
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          {t("password")}
          <input name="password" type="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} />
          {mode === "signup" && <small>{t("passwordHint")}</small>}
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary" disabled={busy}>{t(mode)}</button>
        <button type="button" className="link" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
          {t(mode === "login" ? "noAccount" : "haveAccount")}
        </button>
      </form>
    </main>
  );
}

export function App() {
  const { user, theme, language } = useStore();

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  if (!user) {
    return (
      <>
        <Toolbar />
        <Auth />
      </>
    );
  }
  return <Month toolbar={(nav) => <Toolbar>{nav}</Toolbar>} />;
}
