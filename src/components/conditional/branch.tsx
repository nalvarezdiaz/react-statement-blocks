import { type ReactNode } from "react";

type BranchType = "If" | "ElseIf" | "Else";

export interface BranchProps<T = unknown> {
  branchType: BranchType;
  condition?: T | null | undefined | false;
  children: ((v: T) => ReactNode) | ReactNode;
}

export const Branch = <T,>({ children }: BranchProps<T>) => {
  return <>{children}</>;
};
