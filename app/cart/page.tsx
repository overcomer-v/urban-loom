import MyCartsPage from "@/components/cart/cartClient";
import { getCurrentUser } from "@/lib/auth";

export default async function CartPage() {
  const user = await getCurrentUser();

  console.log("user");

  if (!user) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-full bg-neutral-100">
            <span className="text-xl">🛒</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Please log in to view your cart
          </h1>

          <p className="text-neutral-500 mt-2 max-w-md">
            Log in to add items to your cart and manage your shopping bag.
          </p>

          <a
            href="/signin?redirect=/cart"
            className="mt-7 px-8 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition"
          >
            Log in
          </a>

          <a
            href="/shop"
            className="mt-4 text-sm text-neutral-500 hover:text-black transition"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return <MyCartsPage/>;
}