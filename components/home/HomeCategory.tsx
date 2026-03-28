import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/lib/schemas/category';

const FALLBACK_IMAGE =
  'https://skybuybd.com/_next/static/media/sneakers.2f787ceb.jpg';

export type HomeCategoryProps = {
  category: Category;
  imageBaseUrl: string;
};

function buildImageSrc(imageBaseUrl: string, imagePath: string): string {
  const base = imageBaseUrl.replace(/\/$/, '');
  const path = imagePath.replace(/^\//, '');
  return `${base}/${path}`;
}

export default function HomeCategory({
  category,
  imageBaseUrl,
}: HomeCategoryProps) {
  const { name, slug, image } = category;
  const src = image ? buildImageSrc(imageBaseUrl, image) : FALLBACK_IMAGE;

  return (
    <Link
      href={`/category/${encodeURIComponent(slug)}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-xl"
    >
      <div className="flex flex-col items-center gap-2.5">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border-3 border-[#ff7f00] bg-white p-1 shadow-sm transition-transform">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 16vw, 12.5vw"
            className="object-contain p-1"
          />
        </div>
        <p className="line-clamp-2 min-h-10 w-full text-center text-sm font-bold leading-tight text-foreground md:text-base">
          {name}
        </p>
      </div>
    </Link>
  );
}
