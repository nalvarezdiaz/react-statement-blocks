import { Branch } from "./branch";
import type { ElseProps } from "./if-else.types";

export const Else = <T,>(props: ElseProps<T>) => {
  return <Branch branchType="Else" {...props} />;
};
Else.displayName = "Else";
