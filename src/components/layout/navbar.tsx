import {
  ArrowLeftRight,
  Home,
  Info,
  ReceiptText,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-preact";
import { useLocation } from "preact-iso";
import { cn } from "../../helpers/cn";
import { CONFIG_ROUTE_URL } from "../../pages/config";
import { CREDITS_ROUTE_URL } from "../../pages/credits";
import { HOME_ROUTE_URL } from "../../pages/home";
import { ORDERS_ROUTE_URL } from "../../pages/orders";
import { PURCHASE_ROUTE_URL } from "../../pages/purchase";
import { RECHARGE_ROUTE_URL } from "../../pages/recharge";
import { Button } from "../ui/button";

export function NavBar() {
  return (
    <nav class="flex items-center gap-3 w-full border-t bg-card">
      <NavIcon href={HOME_ROUTE_URL} icon={Home} />
      <NavLink href={PURCHASE_ROUTE_URL} label="Achats" icon={ShoppingCart} />
      <NavLink
        href={RECHARGE_ROUTE_URL}
        label="Rechargement"
        icon={ArrowLeftRight}
      />
      <NavLink href={ORDERS_ROUTE_URL} label="Historique" icon={ReceiptText} />
      <NavLink href={CONFIG_ROUTE_URL} label="Config" icon={Wrench} />
      <NavIcon href={CREDITS_ROUTE_URL} icon={Info} />
    </nav>
  );
}

function NavLink({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) {
  const { path, route } = useLocation();
  const isActive = path === href;
  return (
    <Button
      class={cn("flex-1", isActive && "text-primary hover:text-primary")}
      variant="ghost"
      size="lg"
      onClick={() => route(href)}
    >
      <Icon />
      {label}
    </Button>
  );
}

function NavIcon({ icon: Icon, href }: { icon: LucideIcon; href: string }) {
  const { path, route } = useLocation();
  const isActive = path === href;
  return (
    <Button
      class={cn(isActive && "text-primary hover:text-primary")}
      variant="ghost"
      size="lg"
      onClick={() => route(href)}
    >
      <Icon />
    </Button>
  );
}
