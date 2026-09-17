"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Container from "../ui/Container";

type CartItem = {
  cart_item_id: string;
  quantity: number;
  unit_price: number;
  product_id: number;
  name: string;
  size: string;
  product_size_id: number;
  amount_in_stock: number;
  images: string[];
};

export default function MyCartsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("/api/cart");

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();

    // console.log("counting");
  }, []);

  async function clearCart() {
    if (cart.length === 0) return;

    setClearing(true);

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCart([]);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Failed to clear cart:", error);
    } finally {
      setClearing(false);
    }
  }

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.unit_price) * item.quantity,
    0,
  );

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-neutral-200 rounded mb-8" />

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-32 bg-neutral-100 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <ShoppingBag
            className="w-12 h-12 mb-5 text-neutral-400"
            strokeWidth={1.5}
          />

          <h1 className="text-2xl font-semibold tracking-tight">
            Your cart is empty
          </h1>

          <p className="text-neutral-500 mt-2">
            Looks like you havent added anything yet.
          </p>

          <Link
            href="/shop"
            className="mt-7 px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <Container className="px-4 py-10 md:py-16 w-full min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your Cart</h1>

          <p className="text-sm text-neutral-500 mt-1">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          onClick={clearCart}
          disabled={clearing}
          className="text-sm text-neutral-500 hover:text-black transition disabled:opacity-50"
        >
          {clearing ? "Clearing..." : "Clear cart"}
        </button>
      </div>

      <div className=" grid lg:grid-cols-[1fr_300px] justify-between gap-24 w-full">
        {/* Cart items */}
        <div className="space-y-6">
          {cart.map((item) => {
            return (
              <OrderItemsCard
                key={item.cart_item_id}
                item={item}
                onCartDelete={(cartItemId) => {
                  setCart((currentCart) =>
                    currentCart.filter(
                      (item) => item.cart_item_id !== cartItemId,
                    ),
                  );
                }}
                onCartUpdate={(updatedItem, cartItemId) => {
                  setCart((currentCart) =>
                    currentCart.map((item) =>
                      item.cart_item_id === cartItemId
                        ? {
                            ...item,
                            quantity: updatedItem.quantity,
                          }
                        : item,
                    ),
                  );
                }}
              />
            );
          })}
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="border border-neutral-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="flex justify-between mt-6 text-sm">
              <span className="text-neutral-500">Subtotal</span>

              <span>₦{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mt-3 gap-6 text-sm">
              <span className="text-neutral-500">Shipping</span>

              <span>Calculated at checkout</span>
            </div>

            <div className="border-t border-neutral-200 mt-5 pt-5">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full mt-6 bg-black text-white py-3.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition text-center"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/shop"
              className="block text-center text-sm mt-4 text-neutral-500 hover:text-black"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function OrderItemsCard({
  item,
  onCartDelete,
  onCartUpdate,
}: {
  item: CartItem;
  onCartUpdate: (updatedItem: CartItem, cartItemId: string) => void;
  onCartDelete: (cartItem: string) => void;
}) {
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const image = item.images?.[0];
  const isUpdating = updatingItem === item.cart_item_id;

  async function updateQuantity(cartItemId: string, quantity: number) {
    if (quantity < 1) return;

    setUpdatingItem(cartItemId);

    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedItem = await response.json();

      onCartUpdate(updatedItem, cartItemId);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setUpdatingItem(null);
    }
  }

  async function removeItem(cartItemId: string) {
    setUpdatingItem(cartItemId);

    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      onCartDelete(cartItemId);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setUpdatingItem(null);
    }
  }

  return (
    <div
      key={item.cart_item_id}
      className="flex gap-5 pb-6 border-b border-neutral-200 w-[85vw] lg:w-full"
    >
      {/* Product image */}
      <Link
        href={`/shop/${item.product_id}`}
        className="relative w-28 h-32 sm:w-36 sm:h-40 bg-neutral-100 rounded-lg overflow-hidden shrink-0"
      >
        {image ? (
          <Image src={image} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            No image
          </div>
        )}
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="">
          <div className="flex justify-between w-full">
            <div>
              <Link
                href={`/shop/${item.product_id}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>

              <p className="text-sm text-neutral-500 mt-1">Size: {item.size}</p>
            </div>

            <p className="font-medium whitespace-nowrap">
              ₦{(Number(item.unit_price) * item.quantity).toLocaleString()}
            </p> 
          </div>

          <p className="text-sm text-neutral-500 mt-2">
            ₦{Number(item.unit_price).toLocaleString()} each
          </p>
        </div>

        <div className="flex items-center justify-between mt-5">
          {/* Quantity */}
          <div className="flex items-center border border-neutral-300 rounded-lg">
            <button
              onClick={() =>
                updateQuantity(item.cart_item_id, item.quantity - 1)
              }
              disabled={isUpdating || item.quantity <= 1}
              className="p-2 hover:bg-neutral-100 disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-9 text-center text-sm">{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.cart_item_id, item.quantity + 1)
              }
              disabled={isUpdating || item.quantity >= item.amount_in_stock}
              className="p-2 hover:bg-neutral-100 disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.cart_item_id)}
            disabled={isUpdating}
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-red-600 transition disabled:opacity-40"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
