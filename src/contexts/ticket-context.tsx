import { signal } from "@preact/signals";
import type { PurchaseResponse } from "../schemas/purchase.schema";
import type { ProductInCart } from "./shopping-context";

export type TicketData = {
  transactions: PurchaseResponse["transaction"][];
  products: ProductInCart[];
  totalPrice: number;
  memberName: string;
  newBalance: string;
  date: string;
};

export const ticketSignal = signal<TicketData | null>(null);

export function setTicket(data: TicketData) {
  ticketSignal.value = data;
}

export function clearTicket() {
  ticketSignal.value = null;
}
