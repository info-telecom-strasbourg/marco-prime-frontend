import { ArrowLeft, ArrowRight, Home, Trash2, Wrench } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/button";
import { useCardContext } from "../contexts/card_number";
import { mokeProducts } from "../data/products.data";
import { mokeProductTypes } from "../data/products_types.data";

export function ProductsPage() {
  const [page, setPage] = useState<number>(1);
  const [selectedProductType, setSelectedProductType] = useState<string>(
    mokeProductTypes[0].id,
  );

  const { member } = useCardContext();

  if (!member) return null;

  const currentData = mokeProducts
    .filter((product) => product.product_type_id === selectedProductType)
    .slice(8 * (page - 1), 8 * page);

  useEffect(() => {
    setPage(1);
  }, [selectedProductType]);

  return (
    <div class="w-screen h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr] gap-1">
      <div class="flex gap-1">
        <a href="/">
          <Button size="icon" variant="secondary">
            <Home />
          </Button>
        </a>
        <a href="/settings">
          <Button size="icon" variant="secondary">
            <Wrench />
          </Button>
        </a>
      </div>
      <header class="flex gap-1">
        <div class="flex-1 bg-secondary text-secondary-foreground flex flex-col justify-center px-7">
          {member ? (
            <>
              <h1 class="font-semibold text-xl">
                {member.firstName} {member.lastName}
              </h1>
              <span>15.00€</span>
            </>
          ) : (
            <h1 class="font-semibold text-xl">Veuillez scanner votre carte</h1>
          )}
        </div>
        <Button variant="primary">Rechargement</Button>
      </header>
      <aside class="row-span-2 grid grid-rows-6 gap-1">
        {mokeProductTypes.map((productType) => (
          <Button
            variant={
              productType.id === selectedProductType ? "selected" : "secondary"
            }
            onClick={() => setSelectedProductType(productType.id)}
          >
            {productType.type}
          </Button>
        ))}
      </aside>
      <main class="grid grid-cols-4 grid-rows-2 gap-1">
        {currentData.map((product) => (
          <Button class="flex flex-col gap-3">
            <h2 class="text-xl font-semibold text-wrap line-clamp-2">
              {product.name}
            </h2>
            <span>{product.price}€</span>
          </Button>
        ))}
      </main>
      <footer class="flex gap-1">
        <Button
          size="icon"
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ArrowLeft />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          disabled={currentData.length < 8}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <ArrowRight />
        </Button>
        <Button size="icon" variant="destructive" disabled>
          <Trash2 />
        </Button>
        <Button variant="success" class="flex-1 justify-between" disabled>
          <span class="font-semibold text-xl">Payer</span>
          {/*<span>1000€</span>*/}
        </Button>
      </footer>
    </div>
  );
}
