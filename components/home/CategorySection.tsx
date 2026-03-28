import { fetcher } from '@/lib/fetcher';
import {
  parseCategoriesResponse,
  type CategoriesApiResponse,
} from '@/lib/schemas/category';
import CategoryCarousel from '@/components/home/CategoryCarousel';

export default async function CategorySection() {
  const raw = await fetcher<unknown>('/categories', {}, 180, false);
  const parsed: CategoriesApiResponse | null = parseCategoriesResponse(raw);

  if (!parsed?.data?.length) {
    return null;
  }

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMG_URL ?? '';

  return (
    <section className="bg-white px-4 py-2 rounded-sm border-border md:px-3 md:py-3">
      <CategoryCarousel
        categories={parsed.data}
        imageBaseUrl={imageBaseUrl}
      />
    </section>
  );
}
