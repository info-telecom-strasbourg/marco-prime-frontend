import z from "zod";
import { PRODUCT_PAGE_SIZE } from "../../constants";
import { useMember } from "../../contexts/member-context";
import { useShopping } from "../../contexts/shopping-context";
import { cn } from "../../helpers/cn";
import { closestColor } from "../../helpers/colors";
import { useFetch } from "../../hooks/use-fetch";
import { useSafeLocation } from "../../hooks/use-search-params";
import {
  fetchResultSchema,
  productSchema,
  purchaseSearchParams,
} from "../../validators/purchase.validator";
import { Skeleton } from "../ui/skeleton";

export function Products() {
  const { searchParams } = useSafeLocation(purchaseSearchParams);
  const { data } = useFetch(
    fetchResultSchema,
    `http://localhost:3000/api/v1/products/${searchParams.categoryId}?page=${searchParams.page}&limit=${PRODUCT_PAGE_SIZE}`,
  );
  const { selected, append } = useShopping();

  if (!data)
    return (
      <main class="flex-1 grid grid-cols-3 grid-rows-3 gap-2">
        {new Array(PRODUCT_PAGE_SIZE).fill(null).map((_, id) => (
          <ProductItemLoading key={id} />
        ))}
      </main>
    );

  return (
    <main class="flex-1 grid grid-cols-3 grid-rows-3 gap-2">
      {data.data.map((product) => (
        <ProductItem
          product={product}
          amount={selected.find((prod) => prod.id === product.id)?.amount ?? 0}
          onClick={() => append(product)}
        />
      ))}
    </main>
  );
}

function ProductItem({
  onClick,
  product,
  amount,
}: {
  product: z.infer<typeof productSchema>;
  amount: number;
  onClick: () => void;
}) {
  const { data } = useMember();
  const color = closestColor(product.color);
  const selected = amount > 0;
  return (
    <button
      key={product.id}
      style={{
        borderColor: color,
        backgroundColor: selected ? `${color}30` : "var(--color-card)",
      }}
      class={cn(
        " border justify-center items-center disabled:cursor-default cursor-pointer flex flex-col gap-3 hover:brightness-90 select-none text-card-foreground disabled:opacity-50 disabled:border-border",
      )}
      onClick={onClick}
      disabled={!data}
    >
      <span class="text-xl font-semibold text-center line-clamp-2">
        {product.name}
      </span>
      {amount > 0 ? <span>x {amount}</span> : <span></span>}
      <span class={cn("text-lg", " text-muted-foreground")}>
        {product.price}€
      </span>
    </button>
  );
}

function ProductItemLoading() {
  return (
    <div class="text-card-foreground bg-card border flex flex-col justify-center items-center gap-3">
      <Skeleton class="h-6 w-24" />
      <Skeleton class="h-5 w-12" />
    </div>
  );
}
