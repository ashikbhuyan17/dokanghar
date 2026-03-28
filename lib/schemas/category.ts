import { z } from 'zod';

/** Single category from `/categories` (and similar) responses */
export const categorySchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  status: z.union([z.string(), z.number()]).optional(),
});

export type Category = z.infer<typeof categorySchema>;

export const categoriesApiResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  data: z.array(categorySchema),
});

export type CategoriesApiResponse = z.infer<typeof categoriesApiResponseSchema>;

export function parseCategoriesResponse(
  input: unknown,
): CategoriesApiResponse | null {
  const r = categoriesApiResponseSchema.safeParse(input);
  return r.success ? r.data : null;
}
