import { getCurrentUser } from "@/lib/auth";
import { getCartItemCount } from "@/lib/cart";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ count: 0 });

  return NextResponse.json({ count: await getCartItemCount(user.id) });
}
