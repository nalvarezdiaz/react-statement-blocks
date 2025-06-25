import { Branch, type BranchProps } from "./branch";

export const Else = <T,>(props: Omit<BranchProps<T>, "branchType">) => {
  return <Branch branchType="Else" {...props} />;
};
Else.displayName = "Else";
