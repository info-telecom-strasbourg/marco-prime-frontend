import { useLocation } from "preact-iso";
import { PURCHASE_ROUTE_URL } from "./purchase";

export const HOME_ROUTE_URL = "/";

export function HomePage() {
  const { route } = useLocation();
  return (
    <div
      class="flex-1 flex justify-center items-center cursor-pointer"
      onClick={() => route(PURCHASE_ROUTE_URL)}
    >
      <h1 class="text-5xl font-semibold">Marco Prime</h1>
    </div>
  );
}
