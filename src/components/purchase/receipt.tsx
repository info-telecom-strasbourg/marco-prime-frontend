import { RotateCcw } from "lucide-preact";
import { MAX_RECEIPT_PRODUCTS } from "../../constants";
import { useMember } from "../../contexts/member-context";
import { useShopping } from "../../contexts/shopping-context";
import { Button } from "../ui/button";
import { MemberCard } from "./member-card";

export function Receipt() {
  const { selected } = useShopping();

  return (
    <div class="border-l bg-card px-7 py-5 flex flex-col gap-5">
      <div class="flex items-center">
        <h2 class="text-xl font-semibold flex-1">Commande</h2>
        <ResetButton />
      </div>
      <MemberCard />
      <ul class="flex-1 space-y-2">
        {selected.slice(0, MAX_RECEIPT_PRODUCTS).map((product) => (
          <ReceiptProduct product={product} />
        ))}
        <MoreReceiptProduct count={selected.length - MAX_RECEIPT_PRODUCTS} />
      </ul>
      <SubmitButton />
    </div>
  );
}

function ResetButton() {
  const { selected, reset } = useShopping();

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={reset}
      type="reset"
      disabled={selected.length === 0}
    >
      <RotateCcw class="size-5" />
    </Button>
  );
}

function SubmitButton() {
  const { total } = useShopping();
  const { data } = useMember();
  const memberHasEnoughMoney = total <= Number(data?.balance ?? 0);
  return (
    <Button
      disabled={!total || !data || !memberHasEnoughMoney}
      variant={memberHasEnoughMoney ? "default" : "destructive"}
    >
      Payer {total.toFixed(2)}€
    </Button>
  );
}

function ReceiptProduct({
  product,
}: {
  product: {
    name: string;
    price: string;
    amount: number;
  };
}) {
  return (
    <li class="w-full flex items-center gap-2">
      <span class="font-semibold flex-1 line-clamp-1">{product.name}</span>
      <span class="text-muted-foreground">
        {product.amount} x {product.price}€
      </span>
    </li>
  );
}

function MoreReceiptProduct({ count }: { count: number }) {
  if (count <= 0) return;

  return (
    <li class="w-full font-semibold text-muted-foreground">
      {count} en plus...
    </li>
  );
}
