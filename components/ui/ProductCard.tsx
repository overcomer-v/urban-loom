import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/products";

export function BaseProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product-overview/${product.id}`}
      className="group block"
    >
      <article>
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          {/* View Product */}
          <div className="absolute bottom-3 left-3 right-3 hidden items-center justify-between bg-black px-4 py-3 text-xs font-medium tracking-wide text-white opacity-0 transition-all duration-300 group-hover:opacity-100 md:flex">
            <span>VIEW PIECE</span>

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Product Information */}
        <div className="pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                {product.sex} · {product.category}
              </p>

              <h3 className="mt-1.5 line-clamp-2 font-heading text-lg font-semibold leading-tight text-neutral-900">
                {product.name}
              </h3> 
              <p className="shrink-0 pt-0.5 text-sm font-medium tracking-wide text-[#5C4033]">
              ₦{Number(product.price).toLocaleString()}
            </p>
            </div>

           
          </div>
        </div>
      </article>
    </Link>
  );
}

export function SecondaryProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Link
      href={`/product-overview/${product.id}`}
      className="group block"
    >
      <article className="flex h-48 gap-4 border-b border-neutral-200 pb-4">
        {/* Image */}
        <div className="relative h-full w-32 shrink-0 overflow-hidden bg-neutral-100 sm:w-36">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="144px"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              {product.sex} · {product.category}
            </p>

            <h3 className="mt-1 font-heading text-xl font-semibold leading-tight text-neutral-900">
              {product.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium tracking-wide text-[#5C4033]">
              ₦{Number(product.price).toLocaleString()}
            </p>

            <div className="flex h-8 w-8 items-center justify-center border border-neutral-200 transition group-hover:border-black group-hover:bg-black group-hover:text-white">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
