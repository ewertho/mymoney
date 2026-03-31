import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";

type Props = {
  onLogout: () => void;
};

export function Navbar({ onLogout }: Props) {
  const { t, i18n } = useTranslation();
  const {
    hideValues,
    theme,
    language,
    toggleHideValues,
    toggleTheme,
    toggleLanguage,
  } = useUiStore();
  const user = useAuthStore((state) => state.user);

  const handleLanguage = (): void => {
    toggleLanguage();
    i18n.changeLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
  };

  return (
    <header className="navbar glass">
      <div>
        <h1>{t("appTitle")}</h1>
        <p>{t("subtitle")}</p>
      </div>

      <div className="navbar-actions">
        <span className="user-chip">{user?.name}</span>
        <button onClick={toggleTheme} className="ghost-btn" type="button">
          {theme === "dark" ? t("lightMode") : t("darkMode")}
        </button>
        <button onClick={handleLanguage} className="ghost-btn" type="button">
          {t("language")}: {language}
        </button>
        <button onClick={toggleHideValues} className="ghost-btn" type="button">
          {hideValues ? t("showValues") : t("hideValues")}
        </button>
        <button onClick={onLogout} className="danger-btn" type="button">
          {t("logout")}
        </button>
      </div>
    </header>
  );
}
