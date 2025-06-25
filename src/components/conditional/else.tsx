import { type BranchProps, Branch } from "./branch";

export const Else = <T,>(props: Omit<BranchProps<T>, "branchType">) => {
  return <Branch branchType="Else" {...props} />;
};
Else.displayName = "Else";
