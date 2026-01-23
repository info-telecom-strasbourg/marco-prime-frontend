import { ORDER_PAGE_SIZE } from "../../../constants";
import type { OrderSchema } from "../../../schemas/order.schema";
import { Card } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { OrderItem } from "./order-item";

function OrderListSkeleton() {
  return (
    <Card class="min-h-0 gap-0 py-0 overflow-auto">
      {new Array(ORDER_PAGE_SIZE).fill(null).map((_, index) => (
        <div
          key={index}
          class="flex items-center gap-10 py-3 px-3 border-b last:border-b-0"
        >
          <Skeleton class="h-3 w-32" />
          <Skeleton class="h-3 w-24" />
          <Skeleton class="h-3 w-20 ml-auto" />
          <Skeleton class="h-3 w-20" />
        </div>
      ))}
    </Card>
  );
}

interface OrderListProps {
  orders: OrderSchema[] | null;
  loading: boolean;
}

export function OrderList({ orders, loading }: OrderListProps) {
  if (loading || !orders) {
    return <OrderListSkeleton />;
  }

  return (
    <Card class="min-h-0 gap-0 py-0 overflow-auto">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </Card>
  );
}
