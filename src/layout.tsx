import type { PropsWithChildren } from "preact/compat";
import { NavBar } from "./components/layout/navbar";

type LayoutProps = PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <div class="w-screen h-screen grid grid-rows-[1fr_auto]">
      <>{children}</>
      <NavBar />
    </div>
  );
}
