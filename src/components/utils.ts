import { Children, Fragment, isValidElement, type ReactNode } from "react";

export function unwrapFragment(children: ReactNode): ReactNode[] {
  const result: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Fragment) {
      const fragChildren = Children.toArray(
        (child.props as { children: ReactNode }).children
      );
      result.push(...fragChildren);
    } else {
      result.push(child);
    }
  });

  return result;
}
