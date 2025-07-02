import type { BranchProps } from "./if-else.types";

export const Branch = <T,>({ children }: BranchProps<T>) => {
  return <>{children}</>;
};
