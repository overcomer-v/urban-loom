import { Product } from "@/types/products";
import Image from "next/image";

export function BaseProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full relative aspect-square">
        <Image
          src={product.image_url}
          alt=""
          objectFit="cover"
          fill
          unoptimized
          className="w-full h-full top-0 left-0 object-cover rounded-2xl"
        />
      </div>

      <div className="space-y-1">
        <p className="opacity-40 text-xs">{product.sex.toUpperCase()}</p>
        <p className="font-medium">{product.name}</p>
        <p className="opacity-80">{`$${product.price}`}</p>
      </div>
    </div>
  );
}
