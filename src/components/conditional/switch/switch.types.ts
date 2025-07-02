import type { ReactNode } from "react";

export interface SwitchProps<T> {
  /**
   * The value to match against the cases.
   */
  value: T;
  /**
   * The children of the Switch component, which should be Case or Default components.
   */
  children: ReactNode;
  /**
   * Optional function to determine if two values are considered equal.
   * If not provided, strict equality (===) is used.
   */
  is?: (a: T, b: T) => boolean;
}

export interface CaseProps<T> {
  /**
   * The value or array of values to match against the Switch value.
   * If an array is provided, the case matches if the Switch value is included in the array.
   */
  value: T | T[];
  /**
   * The children to render if this case matches.
   */
  children: ReactNode;
}

export interface DefaultProps {
  /**
   * The children to render if no Case matches.
   */
  children: ReactNode;
}
