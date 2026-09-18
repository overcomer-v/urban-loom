import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getCurrentUser } from "@/lib/auth";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-20 text-center flex flex-col items-center ">
        <h1 className="text-2xl font-semibold tracking-tight">
          Please log in to check out
        </h1>
        <p className="mt-2 text-neutral-500">
          Log in to complete your Urban Loom order.
        </p>

        <div className="flex gap-4 items-center">
          <a
            href="/signin?redirect=/cart"
            className="mt-7 px-8.5 py-3.5 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition"
          >
            Log in
          </a>
          <a
            href="/signup?redirect=/cart"
            className="mt-7 px-8 py-3 border-black border-2 hover:text-white  text-sm font-medium hover:bg-neutral-800 transition"
          >
            Sign up
          </a>
        </div>
      </main>
    );
  }

  return <CheckoutClient customerName={user.name} customerEmail={user.email} />;
}
