import z from "zod";

export const productTypeSchema = z.object({
  id: z.coerce.number(),
  type: z.string(),
  productCount: z.coerce.number(),
});

export const purchaseSearchParams = z.object({
  page: z.coerce.number().min(1).default(1),
  categoryId: z.coerce.number().min(1).default(1),
});

export const memberSchema = z.object({
  id: z.coerce.number(),
  lastName: z.string(),
  firstName: z.string(),
  cardNumber: z.coerce.number(),
  balance: z.string(),
  admin: z.coerce.boolean(),
});

export const productSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  name: z.string(),
  color: z.string(),
  price: z.string(),
  productTypeId: z.coerce.number(),
  available: z.coerce.boolean(),
});

export const fetchResultSchema = z.object({
  data: z.array(productSchema),
  pagination: z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
    total: z.coerce.number(),
    totalPages: z.coerce.number(),
  }),
});
