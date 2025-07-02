import type { CaseProps } from "./switch.types";

export function Case<T>(props: CaseProps<T>) {
  return <>{props.children}</>;
}
Case.displayName = "Case";
