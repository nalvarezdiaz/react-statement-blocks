import {
  Children,
  type FC,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import type { BranchProps } from "./if-else.types";

const validateBranch = (
  type: BranchProps["branchType"] | (string & {}),
  prevBranch: BranchProps["branchType"] | (string & {}) | null
): void => {
  if (type === "Unknown") {
    throw new Error(
      `Invalid branch type: ${type}. Expected one of: <If/>, <ElseIf/>, <Else/>.`
    );
  }

  if (!prevBranch && type !== "If") {
    throw new Error(`First branch must be <If/>. Found: <${type}/>.`);
  }

  if (prevBranch === "If" && type !== "ElseIf" && type !== "Else") {
    throw new Error("<If/> branch must be followed by <ElseIf/> or <Else/>.");
  } else if (prevBranch === "ElseIf" && type !== "ElseIf" && type !== "Else") {
    throw new Error(
      "<ElseIf/> branch must be followed by <ElseIf/> or <Else/>."
    );
  } else if (prevBranch === "Else") {
    throw new Error("<Else/> branch cannot be followed by another branch.");
  }
};

/**
 * Condition is a component to delimit the scope of conditional branches.
 * It allows for nested conditional logic using If, ElseIf, and Else components.
 * It validates the structure of the branches to ensure they follow the correct order.
 *
 * @example
 * ```tsx
 * <Condition>
 *   <If condition={count > 0}>
 *     <div>Count is greater than 0</div>
 *   </If>
 *   <ElseIf condition={count === 0}>
 *    <div>Count is exactly 0</div>
 *   </ElseIf>
 *   <Else>
 *     <div>Count is less than 0</div>
 *   </Else>
 * </Condition>
 * ```
 */
export const Condition: FC<{ children: ReactNode }> = ({ children }) => {
  let prevBranch: BranchProps["branchType"] | (string & {}) | null = null;
  const childArray = Children.toArray(children);

  const currentChildren: {
    type: BranchProps["branchType"];
    element: ReactElement<BranchProps>;
  }[] = [];

  for (const child of childArray) {
    if (!isValidElement(child)) {
      continue;
    }
    const branchType = (child.type as FC<BranchProps>).displayName ?? "Unknown";
    validateBranch(branchType, prevBranch);
    prevBranch = branchType;
    currentChildren.push({
      type: branchType as BranchProps["branchType"],
      element: child as ReactElement<BranchProps>,
    });
  }

  for (const child of currentChildren) {
    const { condition, children: branchChildren } = child.element.props;
    const branchType = child.type;

    if (branchType === "If" || branchType === "ElseIf") {
      if (condition) {
        return (
          <>
            {typeof branchChildren === "function"
              ? branchChildren(condition)
              : child.element}
          </>
        );
      }
    } else {
      return child.element;
    }
  }

  return null;
};
