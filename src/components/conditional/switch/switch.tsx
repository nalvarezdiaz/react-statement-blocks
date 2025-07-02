import {
  Children,
  type FC,
  isValidElement,
  memo,
  type ReactElement,
  type ReactNode,
} from "react";

import { unwrapFragment } from "@/components/utils";

import type { CaseProps, DefaultProps, SwitchProps } from "./switch.types";

function validateChildren(children: ReactNode): void {
  let hasDefault = false;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const branchType = (child.type as FC).displayName;

    if (branchType === "Case") {
      return;
    } else if (branchType === "Default") {
      if (hasDefault) {
        throw new Error("<Switch> can only have one <Default>.");
      }
      hasDefault = true;
    } else {
      throw new Error(
        "<Switch> can only contain <Case> or <Default> components."
      );
    }
  });
}

function sortChildren(children: ReactNode): ReactNode[] {
  const childArray = Children.toArray(children);
  return childArray.sort((a, b) => {
    if (!isValidElement(a) || !isValidElement(b)) {
      return 0;
    }
    const aType = (a.type as FC).displayName;
    const bType = (b.type as FC).displayName;
    if (aType === "Case" && bType === "Default") {
      return -1;
    } else if (aType === "Default" && bType === "Case") {
      return 1;
    }
    return 0;
  });
}

const strictEquality = <T,>(a: T, b: T): boolean => {
  return a === b;
};

/**
 * Switch component that renders the first matching Case or Default component
 * based on the provided value. It supports strict equality by default,
 * but can accept a custom equality function.
 *
 * @example This will render "Case 1" if the value is "option1",
 * "Case 2" if the value is "option2", or "Default Case"
 * if neither case matches.
 * ```tsx
 * <Switch value="option1">
 *   <Case value="option1">Case 1</Case>
 *   <Case value="option2">Case 2</Case>
 *   <Default>Default Case</Default>
 * </Switch>
 * ```
 *
 * For performance, the Switch children could be wrapped in a Fragment
 * to avoid unnecessary re-renders if the parent component re-renders.
 *
 * @example
 * ```tsx
 * const switchContent = (
 *  <Fragment>
 *    <Case value="option1">Case 1</Case>
 *    <Case value="option2">Case 2</Case>
 *    <Default>Default Case</Default>
 *  </Fragment>
 * );
 *
 * const MyComponent = () => {
 *   return <Switch value="option1">{switchContent}</Switch>;
 * };
 * ```
 */
const SwitchBase = <T,>({
  value,
  children,
  is = strictEquality,
}: SwitchProps<T>) => {
  const unwrappedChildren = unwrapFragment(children);
  validateChildren(unwrappedChildren);
  const sortedChildren = sortChildren(unwrappedChildren);

  for (const child of sortedChildren) {
    if (!isValidElement(child)) {
      continue;
    }
    const branchType = (child.type as FC).displayName;
    if (branchType === "Case") {
      const { value: caseValue } = (child as ReactElement<CaseProps<T>>).props;
      const values = Array.isArray(caseValue) ? caseValue : [caseValue];
      if (values.some((v) => is(value, v))) {
        return child;
      }
    } else {
      return child as ReactElement<DefaultProps>;
    }
  }

  return null;
};

export const Switch = memo(SwitchBase, (prev, next) => {
  if (prev.children === next.children) {
    return true;
  }
  return false;
}) as unknown as (<T>(props: SwitchProps<T>) => ReactElement | null) & {
  displayName: string;
};
Switch.displayName = "Switch";
