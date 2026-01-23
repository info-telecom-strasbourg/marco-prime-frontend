import { OrderList } from "../components/features/orders/order-list";
import { OrderNavigation } from "../components/features/orders/order-navigation";
import { ORDER_PAGE_SIZE } from "../constants";
import { useApi } from "../hooks/use-api";
import { useSafeSearchParams } from "../hooks/use-safe-search-params";
import { orderListResponseSchema } from "../schemas/order.schema";
import { pageSearchParamsSchema } from "../schemas/pagination.schema";

export const ORDERS_ROUTE_URL = "/orders";

export function OrdersPage() {
  const { searchParams } = useSafeSearchParams(pageSearchParamsSchema);

  const { data, loading } = useApi(
    orderListResponseSchema,
    `http://localhost:3000/api/v1/history?page=${searchParams.page}&limit=${ORDER_PAGE_SIZE}`,
  );

  return (
    <div class="flex flex-col flex-1 min-h-0 gap-2 p-3">
      <OrderNavigation
        pagination={data?.pagination ?? null}
        loading={loading}
      />
      <OrderList orders={data?.data ?? null} loading={loading} />
    </div>
  );
}
