import z from "zod";

// Schema pour les types de produits
export const productTypeSchema = z.object({
  id: z.coerce.number(),
  type: z.string(),
  productCount: z.coerce.number(),
});

// Schema pour un produit (réponse API)
export const productSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  name: z.string(),
  color: z.string(),
  price: z.string(),
  productTypeId: z.coerce.number(),
  available: z.coerce.boolean(),
});

// Schema pour la pagination dans les réponses
export const paginationSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  total: z.coerce.number(),
  totalPages: z.coerce.number(),
});

// Schema pour la réponse d'API paginée de produits
export const productListResponseSchema = z.object({
  data: z.array(productSchema),
  pagination: paginationSchema,
});

// Types exportés pour utilisation dans les composants
export type ProductSchema = z.infer<typeof productSchema>;
export type ProductTypeSchema = z.infer<typeof productTypeSchema>;
export type PaginationSchema = z.infer<typeof paginationSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
