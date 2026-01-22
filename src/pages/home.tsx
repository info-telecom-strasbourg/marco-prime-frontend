import { useLocation } from "preact-iso";
import { BUY_ROUTE_URL } from "./buy";

export const HOME_ROUTE_URL = "/";

export function HomePage() {
  const { route } = useLocation();
  return (
    <div
      class="flex-1 flex justify-center items-center cursor-pointer"
      onClick={() => route(BUY_ROUTE_URL)}
    >
      <h1 class="text-5xl font-semibold">Marco Prime</h1>
    </div>
  );
}
