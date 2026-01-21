import z from "zod";
import { PRODUCT_PAGE_SIZE, PRODUCT_TYPE_COUNT } from "../../constants";
import { cn } from "../../helpers/cn";
import { capitalize } from "../../helpers/string";
import { useFetch } from "../../hooks/use-fetch";
import { useSafeLocation } from "../../hooks/use-search-params";
import { PURCHASE_ROUTE_URL } from "../../pages/purchase";
import {
  productTypeSchema,
  purchaseSearchParams,
} from "../../validators/purchase.validator";
import { NextPageButton, PrevPageButton } from "../layout/page-buttons";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function ProductHeader() {
  const { data } = useFetch(
    z.array(productTypeSchema),
    "http://localhost:3000/api/v1/product-types",
  );
  const { searchParams } = useSafeLocation(purchaseSearchParams);

  if (!data)
    return (
      <header class="flex">
        <div class="flex-1 flex gap-2">
          {new Array(PRODUCT_TYPE_COUNT).fill(null).map((_, id) => (
            <LoadingTab key={id} />
          ))}
        </div>
        <PrevPageButton disabled />
        <NextPageButton disabled />
      </header>
    );

  const [currentTab] = data?.filter(
    (tab) => tab.id === searchParams.categoryId,
  );

  return (
    <header class="flex">
      <div class="flex-1">
        {data.map((productType) => (
          <Tab
            key={productType.id}
            label={productType.type}
            category={productType.id}
          />
        ))}
      </div>
      <PrevPageButton disabled={searchParams.page === 1} />
      <NextPageButton
        disabled={
          searchParams.page * PRODUCT_PAGE_SIZE >= currentTab.productCount
        }
      />
    </header>
  );
}

function Tab({ label, category }: { label: string; category: number }) {
  const { searchParams, route } = useSafeLocation(purchaseSearchParams);
  const isActive = category === searchParams.categoryId;

  return (
    <Button
      class={cn(isActive && "text-primary hover:text-primary")}
      variant="ghost"
      onClick={() => route(`${PURCHASE_ROUTE_URL}?categoryId=${category}`)}
      size="sm"
    >
      {capitalize(label)}
    </Button>
  );
}

function LoadingTab() {
  return (
    <div class="py-3">
      <Skeleton class="h-7 w-20" />
    </div>
  );
}
