import { type BranchProps, Branch } from "./branch";

export const If = <T,>(props: Omit<BranchProps<T>, "branchType">) => {
  return <Branch branchType="If" {...props} />;
};
If.displayName = "If";
