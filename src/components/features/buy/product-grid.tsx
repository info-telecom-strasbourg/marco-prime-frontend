import { useMemo } from "preact/hooks";
import { PRODUCT_PAGE_SIZE } from "../../../constants";
import { shopping } from "../../../contexts/shopping-context";
import { useApi } from "../../../hooks/use-api";
import { useSafeSearchParams } from "../../../hooks/use-safe-search-params";
import { buySearchParamsSchema } from "../../../schemas/pagination.schema";
import { productListResponseSchema } from "../../../schemas/product.schema";
import { ProductSkeleton } from "../../shared/loading/product-skeleton";
import { ProductItem } from "./product-item";

export function ProductGrid() {
  const { searchParams } = useSafeSearchParams(buySearchParamsSchema);
  const { data, loading } = useApi(
    productListResponseSchema,
    `http://localhost:3000/api/v1/products/${searchParams.categoryId}?page=${searchParams.page}&limit=${PRODUCT_PAGE_SIZE}`,
  );

  // O(1) lookup map for product amounts
  const amountMap = useMemo(() => {
    const map = new Map<number, number>();
    shopping.selected.value.forEach((product) => {
      map.set(product.id, product.amount);
    });
    return map;
  }, [shopping.selected.value]);

  if (loading || !data) {
    return (
      <main class="flex-1 grid grid-cols-3 grid-rows-3 gap-2">
        {new Array(PRODUCT_PAGE_SIZE).fill(null).map((_, id) => (
          <ProductSkeleton key={id} />
        ))}
      </main>
    );
  }

  return (
    <main class="flex-1 grid grid-cols-3 grid-rows-3 gap-2">
      {data.data.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          amount={amountMap.get(product.id) ?? 0}
          onClick={() => shopping.append(product)}
        />
      ))}
    </main>
  );
}
