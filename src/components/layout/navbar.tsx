import {
  ArrowLeftRight,
  Home,
  Info,
  ReceiptText,
  ShoppingCart,
  Wrench,
} from "lucide-preact";
import { CONFIG_ROUTE_URL } from "../../pages/config";
import { CREDITS_ROUTE_URL } from "../../pages/credits";
import { HOME_ROUTE_URL } from "../../pages/home";
import { ORDERS_ROUTE_URL } from "../../pages/orders";
import { BUY_ROUTE_URL } from "../../pages/buy";
import { RECHARGE_ROUTE_URL } from "../../pages/recharge";
import { NavButton } from "../shared/navigation/nav-button";

export function NavBar() {
  return (
    <nav class="flex items-center gap-3 w-full border-t bg-card">
      <NavButton href={HOME_ROUTE_URL} icon={Home} />
      <NavButton href={BUY_ROUTE_URL} label="Achats" icon={ShoppingCart} />
      <NavButton
        href={RECHARGE_ROUTE_URL}
        label="Rechargement"
        icon={ArrowLeftRight}
      />
      <NavButton href={ORDERS_ROUTE_URL} label="Historique" icon={ReceiptText} />
      <NavButton href={CONFIG_ROUTE_URL} label="Config" icon={Wrench} />
      <NavButton href={CREDITS_ROUTE_URL} icon={Info} />
    </nav>
  );
}
