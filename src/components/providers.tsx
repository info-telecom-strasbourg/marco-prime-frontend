import type { PropsWithChildren } from "preact/compat";
import { CardProvider } from "../contexts/card_number";

export function Providers({ children }: PropsWithChildren) {
  return <CardProvider>{children}</CardProvider>;
}
