"use client";

import Link from "next/link";
import { PackageSearch } from "lucide-react";
import Container from "@/components/ui/Container";

type Order = {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  itemCount: number;
};

export default function OrdersClient({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <Container className="flex min-h-[60vh] w-full items-center justify-center px-4 py-16"><section className="text-center"><PackageSearch className="mx-auto h-12 w-12 text-neutral-400" strokeWidth={1.5} /><h1 className="mt-5 text-2xl font-semibold tracking-tight">No orders yet</h1><p className="mt-2 text-neutral-500">Your completed Urban Loom orders will appear here.</p><Link href="/shop" className="mt-7 inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white">Start shopping</Link></section></Container>;
  }

  return <Container className="w-full px-4 py-10 md:py-16"><h1 className="text-3xl font-semibold tracking-tight">My Orders</h1><p className="mt-2 text-sm text-neutral-500">Review your completed Urban Loom orders.</p><div className="mt-8 overflow-x-auto rounded-xl border border-neutral-200"><table className="min-w-full text-left text-sm"><thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500"><tr><th className="px-5 py-4 font-medium">Order</th><th className="px-5 py-4 font-medium">Date</th><th className="px-5 py-4 font-medium">Items</th><th className="px-5 py-4 font-medium">Total</th><th className="px-5 py-4 font-medium">Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-b border-neutral-100 last:border-0"><td className="px-5 py-4 font-medium"><Link href={`/orders/${order.id}`} className="hover:underline">#{order.id.slice(0, 8).toUpperCase()}</Link></td><td className="whitespace-nowrap px-5 py-4 text-neutral-600">{new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date(order.createdAt))}</td><td className="px-5 py-4 text-neutral-600">{order.itemCount}</td><td className="px-5 py-4 font-medium">₦{Number(order.total).toLocaleString()}</td><td className="px-5 py-4"><span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium capitalize text-green-700">{order.status}</span></td></tr>)}</tbody></table></div></Container>;
}
