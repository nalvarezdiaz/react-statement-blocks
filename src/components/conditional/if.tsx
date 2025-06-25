import { Branch, type BranchProps } from "./branch";

export const If = <T,>(props: Omit<BranchProps<T>, "branchType">) => {
  return <Branch branchType="If" {...props} />;
};
If.displayName = "If";
