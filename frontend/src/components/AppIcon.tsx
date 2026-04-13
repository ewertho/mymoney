export type IconName =
  | "dashboard"
  | "cycles"
  | "controls"
  | "collapse"
  | "eye"
  | "theme"
  | "language"
  | "bell"
  | "spark"
  | "trend"
  | "flash"
  | "logout"
  | "search";

type AppIconProps = {
  name: IconName;
};

export function AppIcon({ name }: AppIconProps) {
  if (name === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 3h8v8H3V3Zm10 0h8v5h-8V3ZM3 13h5v8H3v-8Zm7 0h11v8H10v-8Z" />
      </svg>
    );
  }

  if (name === "cycles") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4a8 8 0 1 1-7.75 10h2.1A6 6 0 1 0 8 7.9V10H3V5h2v1.48A7.97 7.97 0 0 1 12 4Zm-1 4h2v5h4v2h-6V8Z" />
      </svg>
    );
  }

  if (name === "controls") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.7 3.3 9.8 5.5a7.7 7.7 0 0 0-1.5.9L6 5.5 4.5 7l.9 2.3a7.7 7.7 0 0 0-.9 1.5l-2.2.9v2.1l2.2.9a7.7 7.7 0 0 0 .9 1.5L4.5 19 6 20.5l2.3-.9a7.7 7.7 0 0 0 1.5.9l.9 2.2h2.1l.9-2.2a7.7 7.7 0 0 0 1.5-.9l2.3.9L19.5 19l-.9-2.3a7.7 7.7 0 0 0 .9-1.5l2.2-.9v-2.1l-2.2-.9a7.7 7.7 0 0 0-.9-1.5l.9-2.3L18 5.5l-2.3.9a7.7 7.7 0 0 0-1.5-.9l-.9-2.2h-2.1Zm1.3 5a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4Z" />
      </svg>
    );
  }

  if (name === "collapse") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h10v2H4V5Zm0 6h10v2H4v-2Zm0 6h10v2H4v-2Zm13.3-4.3L21 16.4 19.6 18l-5-5 5-5L21 9.6l-3.7 3.7Z" />
      </svg>
    );
  }

  if (name === "eye") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5c4.9 0 8.8 3 10.2 7-1.4 4-5.3 7-10.2 7S3.2 16 1.8 12C3.2 8 7.1 5 12 5Zm0 2C8.3 7 5.3 9 4 12c1.3 3 4.3 5 8 5s6.7-2 8-5c-1.3-3-4.3-5-8-5Zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
      </svg>
    );
  }

  if (name === "theme") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.7 3.1A9 9 0 1 0 20.9 15 7 7 0 1 1 12.7 3.1Z" />
      </svg>
    );
  }

  if (name === "language") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4c-4.4 0-8 3.6-8 8 0 4.1 3.1 7.5 7 8v-5H7v-2h4v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2H14.8c-1 0-1.3.6-1.3 1.3V13h2.2l-.4 2h-1.8v5a8 8 0 0 0-1.5-15.9Z" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a6 6 0 0 1 6 6v4.5l1.6 2.2V18H4.4v-2.3L6 13.5V9a6 6 0 0 1 6-6Zm2.8 17a2.8 2.8 0 0 1-5.6 0h5.6Z" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m11 2 1.7 4.3L17 8l-4.3 1.7L11 14l-1.7-4.3L5 8l4.3-1.7L11 2Zm8 10 1 2.5L22.5 15 20 16l-1 2.5L18 16l-2.5-1L18 14l1-2Zm-12 2 1.3 3.2L11.5 18l-3.2 1.3L7 22l-1.3-2.7L2.5 18l3.2-.8L7 14Z" />
      </svg>
    );
  }

  if (name === "trend") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 17.5 10 12l3.2 3.1L20 8.5V12h2V5h-7v2h3.5l-5.3 5.2L10 9 2 16.3 4 17.5Z" />
      </svg>
    );
  }

  if (name === "flash") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    );
  }

  if (name === "logout") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 4h6v16h-6v-2h4V6h-4V4Zm-2 4 1.4 1.4L11.8 11H4v2h7.8l1.6 1.6L12 16l-4-4 4-4Z" />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.5 3a7.5 7.5 0 0 1 5.96 12.05l4.25 4.24-1.42 1.42-4.24-4.25A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h12v2H7V5Zm0 6h12v2H7v-2Zm0 6h12v2H7v-2ZM3 5h2v14H3V5Z" />
    </svg>
  );
}
