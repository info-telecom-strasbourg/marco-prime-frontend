import { useLocation } from "preact-iso";
import type z from "zod";

export function useSafeLocation<T>(validator: z.ZodType<T>) {
  const { query, ...values } = useLocation();
  const { data, error } = validator.safeParse(query);
  if (error) throw error;

  return { searchParams: data, ...values };
}
