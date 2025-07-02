import { Branch } from "./branch";
import type { IfProps } from "./if-else.types";

export const If = <T,>(props: IfProps<T>) => {
  return <Branch branchType="If" {...props} />;
};
If.displayName = "If";
