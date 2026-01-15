import { Clock, Info, Wrench } from "lucide-preact";
import { Button } from "../components/button";

export function HomePage() {
  return (
    <div class="grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr_auto] w-screen h-screen ">
      <Button variant="ghost" size="icon">
        <Wrench />
      </Button>
      <div></div>
      <div></div>
      <div></div>
      <a
        href="/products"
        class="gap-2 flex items-center justify-center flex-col"
      >
        <h1 class="text-5xl font-semibold">Marco Prime</h1>
      </a>
      <div></div>
      <Button variant="ghost" size="icon">
        <Info />
      </Button>
      <div></div>
      <Button variant="ghost" size="icon">
        <Clock />
      </Button>
    </div>
  );
}
