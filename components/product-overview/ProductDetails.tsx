"use client";
import { Product, Size } from "@/types/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SizePicker } from "./SizePicker";
import {
  ArrowRight,
  CalendarFold,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Subtitle from "../ui/Subtitle";
import { BaseProductCard } from "../ui/ProductCard";

export function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<Size>(
    product.sizes.find((item) => item.size === "S") ?? product.sizes[0],
  );
  const [quantitySelected, setQuantitySelected] = useState<number>(1);

  console.log(product);
  return (
    <div> <section className="grid md:grid-cols-[55%_40%] lg:grid-cols-2 gap-16 my-12 w-full">
      <div className="flex flex-col">
        <span className="opacity-40 text-xs mb-4">
          {product?.category.toUpperCase()}
        </span>
        <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={product.images[0]}
            alt=""
            fill
            sizes="w-200"
            loading="eager"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="opacity-40 text-xs">{product?.sex.toUpperCase()}</span>
        <h2 className="text-3xl font-semibold font-heading">{product.name}</h2>
        <p className="font-bold text-xl">${product?.price}</p>
        {product?.sizes && (
          <SizePicker
            sizes={product?.sizes}
            selectedSize={selectedSize}
            onSizeSelected={(size) => {
              setSelectedSize(size);
            }}
          />
        )}
        <QuantitySelector
          stock={selectedSize.stock}
          quantity={quantitySelected}
          setQuantitySelected={setQuantitySelected}
        />

        <div className="p-4 mt-3 border border-neutral-200 rounded-2xl space-y-2">
          <h3 className=" font-semibold font-body">Description & Fit</h3>
          <p className="text-sm opacity-60">{product.description}</p>
        </div>
        <ShippingSection />

        {/* {Order Buttons} */}

        <div className="flex items-center gap-3 justify-start mt-auto">
          <button className="rounded-full px-8 py-5 w-fit border gap-3 border-neutral-300 flex items-center">
            <p>Add to Cart</p>
            <ShoppingCart />
          </button>
          <button className="rounded-full px-8 py-5 w-fit gap-3 bg-black text-white flex items-center">
            <p>Buy Now</p>
            <ArrowRight />
          </button>
        </div>
      </div>
     
    </section>
     <MoreToLike categoryId={product.category_id} />
    </div>
   
  );
}

function ShippingSection() {
  return (
    <div className="rounded-xl border border-neutral-200 p-4 space-y-3">
      <h3 className=" font-semibold">Shipping</h3>

      <div className="flex items-center justify-between">
        {" "}
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-neutral-800 h-12 w-12 rounded-full">
            <CalendarFold stroke="white" />
          </div>
          <div>
            <span className="opacity-50 text-xs">Delivery Time</span>
            <div className="font-semibold text-sm">3-4 working days</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-neutral-800 h-12 w-12 rounded-full">
            <Package stroke="white" />
          </div>
          <div>
            <span className="opacity-50 text-xs">Package</span>
            <div className="font-semibold text-sm">Regular Package</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreToLike({ categoryId }: { categoryId: string }) {
  const [moreProducts, setMoreProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const res = await fetch(`/api/products?category_id=${categoryId}`);
      const data = await res.json();

      if (!cancelled) {
        setMoreProducts(data.products);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  return (
    <div className="w-full space-y-6">
      <Subtitle label="You Might Also Like" />
      <div className="flex items-start gap-2 overflow-x-scroll no-scrollbar">
        {moreProducts.map((item) => (
          <div key={item.id} className="w-60 shrink-0">
            <BaseProductCard  product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuantitySelector({
  quantity,
  setQuantitySelected,
  stock,
}: {
  quantity: number;
  stock: number;
  setQuantitySelected: (quantity: number) => void;
}) {
  return (
    <div className="flex items-center border h-12 gap-4 mt-4 pl-4 w-fit rounded-xl border-neutral-300 [&_button]:border-neutral-300 ">
      <span>Quantity</span>

      <button
        onClick={() => {
          if (quantity > 1) {
            setQuantitySelected(quantity - 1);
          }
        }}
        className="border-x w-12 hover:bg-neutral-200 flex items-center justify-center h-full"
      >
        <Minus size={18} />
      </button>
      <span className="w-5 flex items-center justify-center">{quantity}</span>
      <button
        onClick={() => {
          if (quantity < stock) {
            setQuantitySelected(quantity + 1);
          }
        }}
        className="border-l w-12 flex  hover:bg-neutral-200 items-center justify-center h-full"
      >
        <Plus size={18} className="" />
      </button>
    </div>
  );
}
