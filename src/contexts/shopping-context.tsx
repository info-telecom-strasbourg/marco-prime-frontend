import { createContext } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useContext, useState } from "preact/hooks";

type ProductType = {
  id: number;
  name: string;
  price: string;
  amount: number;
  color: string;
};

const ShoppingContext = createContext<
  | {
      selected: Array<ProductType>;
      append: (product: Omit<ProductType, "amount">) => void;
      reset: () => void;
      total: number;
    }
  | undefined
>(undefined);

export function useShopping() {
  const value = useContext(ShoppingContext);
  if (!value) throw new Error("Please use ShoppingProvider to use useShopping");
  return value;
}

export function ShoppingProvider({ children }: PropsWithChildren) {
  const [selected, setSelected] = useState<Array<ProductType>>([]);

  const append = (product: Omit<ProductType, "amount">) => {
    setSelected((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);

      if (idx === -1) {
        return [...prev, { ...product, amount: 1 }];
      }

      return prev.map((p, i) =>
        i === idx ? { ...p, amount: p.amount + 1 } : p,
      );
    });
  };

  const reset = () => setSelected([]);

  const total = selected.reduce(
    (total, product) => total + Number(product.price) * product.amount,
    0,
  );

  return (
    <ShoppingContext.Provider
      value={{
        selected,
        append,
        reset,
        total,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}
