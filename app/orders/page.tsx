import OrdersClient from "@/components/orders/OrdersClient";
import { getCurrentUser } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/orders";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) return <main className="mx-auto w-full max-w-6xl px-4 py-20 text-center"><h1 className="text-2xl font-semibold tracking-tight">Please log in to view your orders</h1><a href="/signin?redirect=/orders" className="mt-7 inline-block rounded-lg bg-black px-8 py-3 text-sm font-medium text-white">Log in</a></main>;

  const orders = await getOrdersForUser(user.id);
  return <OrdersClient orders={orders.map((order) => ({ id: order.id, createdAt: order.created_at.toISOString(), status: order.status, total: Number(order.total), itemCount: order.item_count }))} />;
}
