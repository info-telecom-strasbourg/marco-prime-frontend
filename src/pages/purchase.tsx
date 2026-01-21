import { ProductHeader } from "../components/purchase/products-header";
import { Products } from "../components/purchase/products-main";
import { Receipt } from "../components/purchase/receipt";
import { ShoppingProvider } from "../contexts/shopping-context";

export const PURCHASE_ROUTE_URL = "/purchase";

export function PurchasePage() {
  return (
    <ShoppingProvider>
      <div class="grid grid-cols-[1fr_300px] flex-1">
        <div class="px-7 py-5 flex flex-col gap-5">
          <ProductHeader />
          <Products />
        </div>
        <Receipt />
      </div>
    </ShoppingProvider>
  );
}
