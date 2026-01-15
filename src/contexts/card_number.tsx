import { createContext } from "preact";
import { useContext, useEffect, type PropsWithChildren } from "preact/compat";
import { useFetch } from "../hooks/use-fetch";
import { useRfidInput } from "../hooks/use-rfid";

const CardContext = createContext<{
  admin: { firstName: string; lastName: string; balance: string } | null;
  member: { firstName: string; lastName: string; balance: string } | null;
}>({
  admin: null,
  member: null,
});

export function useCardContext() {
  return useContext(CardContext);
}

export function CardProvider({ children }: PropsWithChildren) {
  const { value } = useRfidInput();
  const cardNumber = value.trim();
  const { response, fetchData, error } = useFetch(
    `/api/v1/member/${cardNumber}`,
    {
      method: "GET",
    },
  );

  useEffect(() => {
    if (cardNumber) {
      fetchData();
    }
  }, [cardNumber]);

  if (error) console.error(error);

  return (
    <CardContext.Provider
      value={{
        member: response as {
          firstName: string;
          lastName: string;
          balance: string;
        },
        admin: null,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
