import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

export function BaseProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product-overview/${product.id}`}>
      {" "}
      <div className="flex flex-col gap-4 items-start shadow-md hover:shadow-2xl p-4 group transition-all duration-300">
        <div className="w-full bg-neutral-100 relative aspect-square rounded overflow-hidden">
          <Image
            src={product.images[0]}
            alt=""
            fill
            className="w-full h-full top-0 left-0 object-cover group-hover:scale-105 transition-all duration-300"
          />
        </div>

        <div className="">
          <p className="opacity-40 text-xs">{product.sex.toUpperCase()}</p>
          <p className="font-bold text-lg font-heading">{product.name}</p>
          <p className="opacity-80 text-sm">{`$${product.price}`}</p>
        </div>
      </div>
    </Link>
  );
}

export function SecondaryProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product-overview/${product.id}`}>
      <div className="flex gap-4 items-start h-48 shadow-md p-4 rounded-lg">
        <div className="md:h-40 md:w-40 h-36 w-36 shrink-0 bg-gray-400 relative rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-6 h-full py-3">
          <div>
            <div>
              <p className="opacity-40 text-xs mb-1.5">{product.sex.toUpperCase()}</p>
              <p className="font-bold text-lg leading-5 md:leading-normal font-heading">{product.name}</p>
            </div>
            <p className="text-xs mt-2 opacity-50 line-clamp-2">
              {product.description}
            </p>
          </div>
          <p className="opacity-100">{`$${product.price}`}</p>
        </div>
      </div>
    </Link>
  );
}
