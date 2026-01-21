import { ArrowLeft, ArrowRight } from "lucide-preact";
import type { ComponentProps } from "preact";
import z from "zod";
import { useSafeLocation } from "../../hooks/use-search-params";
import { Button } from "../ui/button";

const pageSearchParamsValidator = z.object({
  page: z.coerce.number().min(1).default(1),
});

export function PrevPageButton(props: ComponentProps<typeof Button>) {
  const { route, url, searchParams } = useSafeLocation(
    pageSearchParamsValidator,
  );

  const prevPage = new URL(url, window.location.origin);
  prevPage.searchParams.set("page", (searchParams.page - 1).toString());

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => route(prevPage.toString())}
      {...props}
    >
      <ArrowLeft />
    </Button>
  );
}

export function NextPageButton(props: ComponentProps<typeof Button>) {
  const { searchParams, route, url } = useSafeLocation(
    pageSearchParamsValidator,
  );

  const nextPage = new URL(url, window.location.origin);
  nextPage.searchParams.set("page", (searchParams.page + 1).toString());

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => route(nextPage.toString())}
      {...props}
    >
      <ArrowRight />
    </Button>
  );
}
