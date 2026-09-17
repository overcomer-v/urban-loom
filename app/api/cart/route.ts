import { NextRequest, NextResponse } from "next/server";
import {
  getCart,
  addToCart,
  getOrCreateCart,
  clearCart,
  updateCartItemQuantity,
} from "@/lib/cart";
import { getCurrentUser } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    cartItemId: string;
  }>;
};

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await getCart(user.id);

    return NextResponse.json(cart);
  } catch (error) {
    console.error("GET /api/cart error:", error);

    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productSizeId, quantity } = await request.json();

    if (!productSizeId || !quantity) {
      return NextResponse.json(
        { error: "productSizeId and quantity are required" },
        { status: 400 },
      );
    }

    const item = await addToCart(user.id, productSizeId, quantity);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart error:", error);

    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await getOrCreateCart(user.id);

    await clearCart(cart.id);

    return NextResponse.json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);

    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 },
    );
  }
}
