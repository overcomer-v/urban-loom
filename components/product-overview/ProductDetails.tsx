
"use client";

import { Product, Size } from "@/types/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SizePicker } from "./SizePicker";
import {
  ArrowRight,
  CalendarFold,
  Loader2,
  Minus,
  Package,
  Plus,
  ShoppingBag,
} from "lucide-react";
import Subtitle from "../ui/Subtitle";
import { BaseProductCard } from "../ui/ProductCard";

export function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<Size>(
    product.sizes.find((item) => item.size === "S") ?? product.sizes[0]
  );

  const [quantitySelected, setQuantitySelected] = useState(1);
  const [loading, setLoading] = useState(false);

  async function addToCart(productSizeId: string, quantity: number) {
    try {
      setLoading(true);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productSizeId,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to add item to cart");
        return;
      }

      window.dispatchEvent(new Event("cart-updated"));

      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSizeChange(size: Size) {
    setSelectedSize(size);

    // Make sure quantity is valid for the newly selected size.
    setQuantitySelected((current) =>
      Math.min(current, size.stock)
    );
  }

  return (
    <div>
      <section className="grid gap-10 py-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14 lg:grid-cols-2 lg:gap-20 lg:py-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="text-[10px] font-medium tracking-[0.25em] text-black/40">
            {product.category.toUpperCase()}
          </div>

          <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col pt-2 md:pt-8">
          {/* Brand / Gender */}
          <span className="text-[10px] font-medium tracking-[0.25em] text-black/40">
            {product.sex.toUpperCase()}
          </span>

          {/* Product Name */}
          <h1 className="mt-3 font-heading text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          {/* Price */}
          <p className="mt-5 text-xl font-medium">
            ₦{Number(product.price).toLocaleString()}
          </p>

          {/* Size */}
          <div className="mt-9">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">Select Size</span>

              <button className="text-xs text-black/50 underline underline-offset-4">
                Size Guide
              </button>
            </div>

            <SizePicker
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelected={handleSizeChange}
            />
          </div>

          {/* Stock */}
          <div className="mt-4 text-xs">
            {selectedSize.stock > 0 ? (
              <span className="text-black/50">
                {selectedSize.stock <= 5
                  ? `Only ${selectedSize.stock} left in stock`
                  : "In stock"}
              </span>
            ) : (
              <span className="font-medium text-red-600">
                Out of stock
              </span>
            )}
          </div>

          {/* Quantity */}
          <QuantitySelector
            stock={selectedSize.stock}
            quantity={quantitySelected}
            setQuantitySelected={setQuantitySelected}
          />

          {/* Description */}
          <div className="mt-8 border-y border-black/10 py-6">
            <h3 className="text-sm font-semibold">
              Description & Fit
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/55">
              {product.description}
            </p>
          </div>

          {/* Shipping */}
          <div className="border-b border-black/10 py-6">
            <ShippingSection />
          </div>

          {/* Actions */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              disabled={loading || selectedSize.stock === 0}
              onClick={() =>
                addToCart(
                  selectedSize.product_size_id,
                  quantitySelected
                )
              }
              className="group flex items-center justify-center gap-2 border border-black px-4 py-4 text-xs font-semibold tracking-wider transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  ADDING...
                </>
              ) : (
                <>
                  <ShoppingBag
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />
                  ADD TO CART
                </>
              )}
            </button>

            <button
              disabled={selectedSize.stock === 0}
              onClick={() =>
                router.push(
                  `/checkout?productSizeId=${selectedSize.product_size_id}&quantity=${quantitySelected}`
                )
              }
              className="group flex items-center justify-center gap-2 bg-black px-4 py-4 text-xs font-semibold tracking-wider text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              BUY NOW

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* More Products */}
      <div className="my-20 overflow-hidden md:my-28">
        <MoreToLike
          categoryId={product.category_id}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}

function ShippingSection() {
  return (
    <div>
      <h3 className="text-sm font-semibold">
        Shipping
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-100">
            <CalendarFold
              size={18}
              className="text-black/50"
            />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-black/40">
              Delivery
            </span>

            <div className="mt-1 text-xs font-medium">
              3–4 working days
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-100">
            <Package
              size={18}
              className="text-black/50"
            />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-black/40">
              Package
            </span>

            <div className="mt-1 text-xs font-medium">
              Regular Package
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreToLike({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  const [moreProducts, setMoreProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        const res = await fetch(
          `/api/products?category_id=${categoryId}`
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!cancelled) {
          setMoreProducts(
            data.products.filter(
              (item: Product) => item.id !== currentProductId
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch recommended products:",
          error
        );
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [categoryId, currentProductId]);

  if (moreProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-10">
      <Subtitle label="You Might Also Like" />

      <div className="flex w-full gap-4 overflow-x-auto pb-4 no-scrollbar">
        {moreProducts.map((item) => (
          <div
            key={item.id}
            className="w-56 shrink-0 md:w-64"
          >
            <BaseProductCard product={item} />
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
    <div className="mt-5 flex h-12 w-fit items-center border border-black/15">
      <span className="px-4 text-xs font-medium">
        Quantity
      </span>

      <button
        disabled={quantity <= 1}
        onClick={() => {
          if (quantity > 1) {
            setQuantitySelected(quantity - 1);
          }
        }}
        className="flex h-full w-11 items-center justify-center border-l border-black/10 transition hover:bg-neutral-100 disabled:opacity-30"
      >
        <Minus size={16} />
      </button>

      <span className="flex h-full w-10 items-center justify-center border-l border-black/10 text-sm">
        {quantity}
      </span>

      <button
        disabled={quantity >= stock}
        onClick={() => {
          if (quantity < stock) {
            setQuantitySelected(quantity + 1);
          }
        }}
        className="flex h-full w-11 items-center justify-center border-l border-black/10 transition hover:bg-neutral-100 disabled:opacity-30"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
