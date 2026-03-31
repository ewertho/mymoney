import { PropsWithChildren } from "react";
import { useUiStore } from "../store/uiStore";

type Props = PropsWithChildren<{ value?: number; prefix?: string }>;

export function ValueText({ value, prefix = "R$ ", children }: Props) {
  const hideValues = useUiStore((state) => state.hideValues);

  if (children) {
    return <>{children}</>;
  }

  if (hideValues) {
    return <>*****</>;
  }

  return (
    <>
      {prefix}
      {(value ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
    </>
  );
}
