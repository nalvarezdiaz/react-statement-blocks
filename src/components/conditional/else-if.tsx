import { Branch, type BranchProps } from "./branch";

export const ElseIf = <T,>(props: Omit<BranchProps<T>, "branchType">) => {
  return <Branch branchType="ElseIf" {...props} />;
};
ElseIf.displayName = "ElseIf";
