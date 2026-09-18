import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/products";

export function BaseProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product-overview/${product.id}`} className="group block">
      <article className="rounded-xl border border-transparent bg-white p-2 transition duration-300 hover:border-neutral-200 hover:shadow-lg">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-700 backdrop-blur-sm">
            {product.category}
          </span>
          {/* <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-between rounded-md bg-black px-3 py-2.5 text-xs font-medium text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            View piece <ArrowUpRight className="h-4 w-4" />
          </div> */}
        </div>

        <div className="flex items-start justify-between gap-3 px-2 pb-2 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
              {product.sex}
            </p>
            <h3 className="mt-1 line-clamp-3 font-heading text-xl font-semibold leading-tight text-neutral-900">
              {product.name}
            </h3>{" "}
            <p className="shrink-0 pt-3 text-sm font-semibold text-neutral-900">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function SecondaryProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product-overview/${product.id}`} className="group block">
      <article className="flex h-48 gap-4 rounded-xl border border-neutral-100 bg-white p-3 transition hover:border-neutral-200 hover:shadow-md">
        <div className="relative h-full w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:w-36">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="144px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
              {product.category}
            </p>
            <h3 className="mt-1 font-heading text-xl font-semibold leading-tight text-neutral-900">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-semibold">
              ₦{Number(product.price).toLocaleString()}
            </p>
            <ArrowUpRight className="h-4 w-4 text-neutral-400 transition group-hover:text-black" />
          </div>
        </div>
      </article>
    </Link>
  );
}
