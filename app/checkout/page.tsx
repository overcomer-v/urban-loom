import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getCurrentUser } from "@/lib/auth";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Please log in to check out
        </h1>
        <p className="mt-2 text-neutral-500">
          Log in to complete your Urban Loom order.
        </p>
        <a
          href="/signin?redirect=/checkout"
          className="mt-7 inline-block rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Log in
        </a>
      </main>
    );
  }

  return (
    <CheckoutClient
      
      customerName={user.name}
      customerEmail={user.email}
    />
  );
}
