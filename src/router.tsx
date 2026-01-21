import { ErrorBoundary, Router as NativeRouter, Route } from "preact-iso";
import { Layout } from "./layout";
import { BILL_ROUTE_URL, BillPage } from "./pages/bill";
import { CONFIG_ROUTE_URL, ConfigPage } from "./pages/config";
import { CREDITS_ROUTE_URL, CreditsPage } from "./pages/credits";
import { HOME_ROUTE_URL, HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { ORDERS_ROUTE_URL, OrdersPage } from "./pages/orders";
import { PURCHASE_ROUTE_URL, PurchasePage } from "./pages/purchase";
import { RECHARGE_ROUTE_URL, RechargePage } from "./pages/recharge";
import { WIFI_ROUTE_URL, WifiPage } from "./pages/wifi";

export function Router() {
  return (
    <Layout>
      <ErrorBoundary onError={(e) => console.error(e)}>
        <NativeRouter>
          <Route path={PURCHASE_ROUTE_URL} component={PurchasePage} />
          <Route path={RECHARGE_ROUTE_URL} component={RechargePage} />
          <Route path={HOME_ROUTE_URL} component={HomePage} />
          <Route path={WIFI_ROUTE_URL} component={WifiPage} />
          <Route path={ORDERS_ROUTE_URL} component={OrdersPage} />
          <Route path={CREDITS_ROUTE_URL} component={CreditsPage} />
          <Route path={CONFIG_ROUTE_URL} component={ConfigPage} />
          <Route path={BILL_ROUTE_URL} component={BillPage} />
          <Route default component={NotFoundPage} />
        </NativeRouter>
      </ErrorBoundary>
    </Layout>
  );
}
