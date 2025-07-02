import type { ReactNode } from "react";

export type BranchType = "If" | "ElseIf" | "Else";

export interface BranchProps<T = unknown> {
  /**
   * The type of branch, which can be "If", "ElseIf", or "Else".
   * This is used to determine the rendering logic.
   */
  branchType: BranchType;
  /**
   * The condition to evaluate for the branch.
   * If the condition is true, the branch will render its children.
   * If false or undefined, it will not render.
   */
  condition?: T | null | undefined | false;
  /**
   * The children to render if the condition is true.
   * Can be a function that receives the evaluated condition value,
   * or a static ReactNode.
   */
  children: ((v: T) => ReactNode) | ReactNode;
}

export type IfProps<T = unknown> = Omit<BranchProps<T>, "branchType">;
export type ElseIfProps<T = unknown> = Omit<BranchProps<T>, "branchType">;
export type ElseProps<T = unknown> = Omit<BranchProps<T>, "branchType">;
