import type { DefaultProps } from "./switch.types";

export function Default(props: DefaultProps) {
  return <>{props.children}</>;
}
Default.displayName = "Default";
