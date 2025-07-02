import { Branch } from "./branch";
import type { ElseIfProps } from "./if-else.types";

export const ElseIf = <T,>(props: ElseIfProps<T>) => {
  return <Branch branchType="ElseIf" {...props} />;
};
ElseIf.displayName = "ElseIf";
