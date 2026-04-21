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

/** Light tile behind circular thumb — matches “Popular Categories” reference */
const CIRCLE_BG = '#F0F2F5';

export default function HomeCategory({
  category,
  imageBaseUrl,
}: HomeCategoryProps) {
  const { name, slug, image } = category;
  const src = image ? buildImageSrc(imageBaseUrl, image) : FALLBACK_IMAGE;

  return (
    <Link
      href={`/category/${encodeURIComponent(slug)}`}
      className="group flex w-30 min-w-0 flex-col items-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 sm:w-32"
    >
      <div
        className="relative h-22 w-22 shrink-0 rounded-full border-2 border-transparent transition-all duration-200 group-hover:scale-[1.04] group-hover:border-primary sm:h-26 sm:w-26"
      >
        <div
          className="absolute inset-[2px] overflow-hidden rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          style={{ backgroundColor: CIRCLE_BG }}
        >
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 640px) 88px, 104px"
            className="box-border object-contain p-3 sm:p-4"
          />
        </div>
      </div>
      <p
        className="mt-3 line-clamp-1 w-full min-w-0 text-center text-sm font-medium leading-tight text-[#1A1A1A] sm:mt-3.5 sm:text-base"
        title={name}
      >
        {name}
      </p>
    </Link>
  );
}
