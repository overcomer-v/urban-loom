import { getCurrentUser } from "@/lib/auth";
import { getBuyNowItem } from "@/lib/orders";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const productSizeId = request.nextUrl.searchParams.get("productSizeId");
  const quantity = Number(request.nextUrl.searchParams.get("quantity"));

  if (!productSizeId || !Number.isInteger(quantity) || quantity < 1) {
    return NextResponse.json({ error: "Invalid product selection" }, { status: 400 });
  }

  const item = await getBuyNowItem(productSizeId, quantity);
  if (!item) return NextResponse.json({ error: "Item is unavailable" }, { status: 404 });

  return NextResponse.json(item);
}
