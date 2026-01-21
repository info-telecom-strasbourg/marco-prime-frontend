import { LocationProvider } from "preact-iso";
import type { PropsWithChildren } from "preact/compat";
import { MemberProvider } from "../contexts/member-context";

export function Providers({ children }: PropsWithChildren) {
  return (
    <LocationProvider>
      <MemberProvider>{children}</MemberProvider>
    </LocationProvider>
  );
}
