import z from "zod";
import { PRODUCT_PAGE_SIZE, PRODUCT_TYPE_COUNT } from "../../../constants";
import { cn } from "../../../utils/cn";
import { capitalize } from "../../../utils/string";
import { useApi } from "../../../hooks/use-api";
import { useSafeSearchParams } from "../../../hooks/use-safe-search-params";
import { BUY_ROUTE_URL } from "../../../pages/buy";
import { buySearchParamsSchema } from "../../../schemas/pagination.schema";
import { productTypeSchema } from "../../../schemas/product.schema";
import { NextPageButton, PrevPageButton } from "../../layout/page-buttons";
import { Button } from "../../ui/button";
import { TabSkeleton } from "../../shared/loading/tab-skeleton";

export function ProductTabs() {
  const { data, loading } = useApi(
    z.array(productTypeSchema),
    "http://localhost:3000/api/v1/product-types",
  );
  const { searchParams } = useSafeSearchParams(buySearchParamsSchema);

  if (loading || !data) {
    return (
      <header class="flex items-center gap-2">
        <div class="flex-1 min-w-0 flex gap-2 overflow-x-auto">
          {new Array(PRODUCT_TYPE_COUNT).fill(null).map((_, id) => (
            <TabSkeleton key={id} />
          ))}
        </div>
        <PrevPageButton disabled />
        <NextPageButton disabled />
      </header>
    );
  }

  const [currentTab] = data?.filter(
    (tab) => tab.id === searchParams.categoryId,
  );

  return (
    <header class="flex items-center gap-2">
      <div class="flex-1 min-w-0 flex overflow-x-auto">
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
  const { searchParams, route } = useSafeSearchParams(buySearchParamsSchema);
  const isActive = category === searchParams.categoryId;

  return (
    <Button
      class={cn(isActive && "text-primary hover:text-primary")}
      variant="ghost"
      onClick={() => route(`${BUY_ROUTE_URL}?categoryId=${category}`)}
      size="sm"
    >
      {capitalize(label)}
    </Button>
  );
}
