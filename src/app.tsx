import { LocationProvider, Route, Router } from "preact-iso";
import { Providers } from "./components/providers";
import { HomePage } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { ProductsPage } from "./pages/products";

export function App() {
  return (
    <Providers>
      <LocationProvider>
        <Router>
          <Route path="/" component={HomePage} />
          <Route path="/products" component={ProductsPage} />
          <Route default component={NotFound} />
        </Router>
      </LocationProvider>
    </Providers>
  );
}
