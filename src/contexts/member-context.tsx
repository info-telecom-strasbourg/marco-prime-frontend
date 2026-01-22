import { createContext } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useContext, useEffect } from "preact/hooks";
import type z from "zod";
import { useApi } from "../hooks/use-api";
import { useRfid } from "../hooks/use-rfid";
import { memberSchema } from "../schemas/member.schema";

const MemberContext = createContext<{
  data: z.infer<typeof memberSchema> | null;
  loading: boolean;
  clear: () => void;
} | null>(null);

export function useMember() {
  const context = useContext(MemberContext);
  if (!context)
    throw new Error("useMember should be used inside a MemberProvider");
  return context;
}

export function MemberProvider({ children }: PropsWithChildren) {
  const { value: memberCardId, clear } = useRfid();
  const { data, loading, refetch } = useApi(
    memberSchema,
    `http://localhost:3000/api/v1/member/${memberCardId}`,
    { immediate: false },
  );

  useEffect(() => {
    if (memberCardId) refetch();
  }, [memberCardId]);

  return (
    <MemberContext.Provider value={{ data, loading, clear }}>
      {children}
    </MemberContext.Provider>
  );
}
