import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { getCurrentUser } from "@/lib/auth";
import { getOrderForUser } from "@/lib/orders";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;

  if (!user) return <main className="mx-auto w-full max-w-6xl px-4 py-20 text-center"><h1 className="text-2xl font-semibold tracking-tight">Please log in to view this order</h1><Link href={`/signin?redirect=/orders/${id}`} className="mt-7 inline-block rounded-lg bg-black px-8 py-3 text-sm font-medium text-white">Log in</Link></main>;

  const order = await getOrderForUser(user.id, id);
  if (!order) notFound();

  return <Container className="w-full px-4 py-10 md:py-16"><Link href="/orders" className="text-sm text-neutral-500 hover:text-black">← Back to My Orders</Link><div className="mt-6 flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-neutral-500">Order #{order.id.slice(0, 8).toUpperCase()}</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Order details</h1><p className="mt-2 text-sm text-neutral-500">Placed {new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(order.created_at)}</p></div><span className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium capitalize text-green-700">{order.status}</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><section className="rounded-xl border border-neutral-200"><div className="border-b border-neutral-200 px-5 py-4 font-semibold">Items</div><div className="divide-y divide-neutral-100">{order.items.map((item) => <div key={item.id} className="flex items-start justify-between gap-4 px-5 py-4"><div><p className="font-medium">{item.product_name}</p><p className="mt-1 text-sm text-neutral-500">Size {item.size} · Qty {item.quantity}</p></div><p className="font-medium">₦{(Number(item.unit_price) * item.quantity).toLocaleString()}</p></div>)}</div></section><aside className="space-y-6"><section className="rounded-xl border border-neutral-200 p-5"><h2 className="font-semibold">Delivery address</h2><p className="mt-3 text-sm leading-6 text-neutral-600">{order.customer_name}<br />{order.address}<br />{order.city}, {order.state}<br />{order.postal_code && <>{order.postal_code}<br /></>}{order.country}<br />{order.phone}</p></section><section className="rounded-xl border border-neutral-200 p-5 text-sm"><h2 className="font-semibold text-base">Order summary</h2><div className="mt-4 space-y-3 text-neutral-600"><p className="flex justify-between"><span>Subtotal</span><span>₦{Number(order.subtotal).toLocaleString()}</span></p><p className="flex justify-between"><span>Shipping</span><span>{Number(order.shipping_fee) === 0 ? "Free" : `₦${Number(order.shipping_fee).toLocaleString()}`}</span></p><p className="flex justify-between border-t border-neutral-200 pt-4 text-base font-semibold text-black"><span>Total</span><span>₦{Number(order.total).toLocaleString()}</span></p></div></section></aside></div></Container>;
}
