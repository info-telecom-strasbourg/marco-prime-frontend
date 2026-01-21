import { useLocation } from "preact-iso";
import z from "zod";
import { NotFoundPage } from "./not-found";

export const ORDERS_ROUTE_URL = "/orders";

const OrdersPageSearchParams = z.object({
  page: z.coerce.number().min(1).default(1),
});

export function OrdersPage() {
  const { query } = useLocation();
  const safeQuery = OrdersPageSearchParams.safeParse(query);
  if (!safeQuery.success) return <NotFoundPage />;

  return (
    <div class="grid grid-rows-[auto_1fr] flex-1 gap-1">
      Orders Page (page={safeQuery.data.page})
    </div>
  );
}
