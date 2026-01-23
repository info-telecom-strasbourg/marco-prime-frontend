import { createContext } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import type z from "zod";
import { useApi } from "../hooks/use-api";
import { useRfid } from "../hooks/use-rfid";
import { memberSchema } from "../schemas/member.schema";

const MemberContext = createContext<{
  data: z.infer<typeof memberSchema> | null;
  loading: boolean;
  paused: boolean;
  clear: () => void;
  pause: () => void;
  resume: () => void;
} | null>(null);

export function useMember() {
  const context = useContext(MemberContext);
  if (!context)
    throw new Error("useMember should be used inside a MemberProvider");
  return context;
}

export function MemberProvider({ children }: PropsWithChildren) {
  const [paused, setPaused] = useState(false);
  const { value: memberCardId, clear } = useRfid({ disabled: paused });
  const { data, loading, refetch } = useApi(
    memberSchema,
    `http://localhost:3000/api/v1/member/${memberCardId}`,
    { immediate: false },
  );

  useEffect(() => {
    if (memberCardId) refetch();
  }, [memberCardId]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <MemberContext.Provider value={{ data, loading, paused, clear, pause, resume }}>
      {children}
    </MemberContext.Provider>
  );
}
