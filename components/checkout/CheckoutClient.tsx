"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ChevronLeft,
  LockKeyhole,
  ShoppingBag,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";

type CartItem = {
  cart_item_id: string;
  product_size_id: string;
  quantity: number;
  unit_price: number;
  name: string;
  size: string;
  images: string[];
};

type CheckoutClientProps = {
  customerName: string;
  customerEmail: string;
};

const STANDARD_SHIPPING_FEE = 2500;
const FREE_SHIPPING_THRESHOLD = 50000;

export default function CheckoutClient({
  customerName,
  customerEmail,
}: CheckoutClientProps) {
  const searchParams = useSearchParams();
  const productSizeId = searchParams.get("productSizeId");
  const buyNowQuantity = Number(searchParams.get("quantity"));
  const isBuyNow =
    Boolean(productSizeId) &&
    Number.isInteger(buyNowQuantity) &&
    buyNowQuantity > 0;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = isBuyNow
          ? await fetch(
              `/api/checkout?productSizeId=${productSizeId}&quantity=${buyNowQuantity}`,
            )
          : await fetch("/api/cart");
        if (!response.ok) throw new Error("Unable to load cart");
        const data = await response.json();
        setCart(isBuyNow ? [data] : data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("We couldn't load your cart. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [buyNowQuantity, isBuyNow, productSizeId]);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.unit_price) * item.quantity,
        0,
      ),
    [cart],
  );
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shipping;

  async function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          city: formData.get("city"),
          state: formData.get("state"),
          postalCode: formData.get("postalCode"),
          country: formData.get("country"),
          source: isBuyNow
            ? { type: "buy-now", productSizeId, quantity: buyNowQuantity }
            : { type: "cart" },
        }),
      });
      if (!response.ok) throw new Error("Unable to complete checkout");
      if (!isBuyNow) {
        setCart([]);
        window.dispatchEvent(new Event("cart-updated"));
      }
      setIsComplete(true);
    } catch (submitError) {
      console.error(submitError);
      setError("Something went wrong. Your cart has not been changed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto min-h-[65vh] w-full max-w-6xl px-4 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-9 w-44 rounded bg-neutral-200" />
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="h-130 rounded-xl bg-neutral-100" />
            <div className="h-96 rounded-xl bg-neutral-100" />
          </div>
        </div>
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="mx-auto flex min-h-[65vh] w-full max-w-6xl items-center justify-center px-4 py-16">
        <section className="max-w-md text-center">
          <CheckCircle2
            className="mx-auto h-14 w-14 text-green-600"
            strokeWidth={1.5}
          />
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Order confirmed
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Thank you for your order.
          </h1>
          <p className="mt-3 text-neutral-500">
            This is a portfolio checkout, so no payment was collected. You can
            view this order any time in My Orders.
          </p>
          <Link
            href="/orders"
            className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            View my orders
          </Link>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto flex min-h-[65vh] w-full max-w-6xl items-center justify-center px-4 py-16">
        <section className="text-center">
          <ShoppingBag
            className="mx-auto h-12 w-12 text-neutral-400"
            strokeWidth={1.5}
          />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            Your cart is empty
          </h1>
          <p className="mt-2 text-neutral-500">
            Add something you love before checking out.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
          >
            Shop the collection
          </Link>
        </section>
      </main>
    );
  }

  return (
    <Container className="w-full px-4 py-10 md:py-16">
      <Link
        href={isBuyNow ? "/shop" : "/cart"}
        className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-black"
      >
        <ChevronLeft className="h-4 w-4" />{" "}
        {isBuyNow ? "Continue shopping" : "Back to cart"}
      </Link>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Enter your delivery details to complete this demo order.
      </p>
      <form
        onSubmit={placeOrder}
        className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"
      >
        <section className="space-y-8">
          <fieldset className="rounded-xl border border-neutral-200 p-5 sm:p-7">
            <legend className="px-2 text-lg font-semibold">
              Contact information
            </legend>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                defaultValue={customerName}
                autoComplete="name"
              />
              <Field
                label="Email address"
                name="email"
                type="email"
                defaultValue={customerEmail}
                autoComplete="email"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="rounded-xl border border-neutral-200 p-5 sm:p-7">
            <legend className="px-2 text-lg font-semibold">
              Delivery address
            </legend>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="Street address"
                  name="address"
                  autoComplete="street-address"
                />
              </div>
              <Field label="City" name="city" autoComplete="address-level2" />
              <Field label="State" name="state" autoComplete="address-level1" />
              <Field
                label="Postal code (optional)"
                name="postalCode"
                autoComplete="postal-code"
                required={false}
              />
              <Field
                label="Country"
                name="country"
                defaultValue="Nigeria"
                autoComplete="country-name"
              />
            </div>
          </fieldset>
        </section>
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cart_item_id ?? item.product_size_id} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                    {item.images?.[0] && (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="mt-1 text-neutral-500">
                      Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ₦
                    {(Number(item.unit_price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5 text-sm">
              <PriceRow label="Subtotal" amount={subtotal} />
              <PriceRow
                label="Shipping"
                amount={shipping}
                free={shipping === 0}
              />
              <div className="flex justify-between border-t border-neutral-200 pt-4 text-base font-semibold">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              disabled={isSubmitting}
              className="mt-6 w-full rounded-lg bg-black py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Confirming order..." : "Place demo order"}
            </button>
            {error && (
              <p className="mt-3 text-center text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-neutral-500">
              <LockKeyhole className="h-3.5 w-3.5" /> No payment is collected in
              this demo.
            </p>
          </div>
        </aside>
      </form>
    </Container>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 w-full rounded-lg border border-neutral-300 px-3.5 py-3 text-sm outline-none transition focus:border-black"
      />
    </label>
  );
}

function PriceRow({
  label,
  amount,
  free = false,
}: {
  label: string;
  amount: number;
  free?: boolean;
}) {
  return (
    <div className="flex justify-between text-neutral-500">
      <span>{label}</span>
      <span>{free ? "Free" : `₦${amount.toLocaleString()}`}</span>
    </div>
  );
}
