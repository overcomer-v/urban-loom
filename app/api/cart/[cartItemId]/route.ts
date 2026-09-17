import { NextRequest, NextResponse } from "next/server";
import {
  updateCartItemQuantity,
  removeCartItem,
} from "@/lib/cart";
import { getCurrentUser } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    cartItemId: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { cartItemId } = await params;
    const { quantity } = await request.json();

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    const item = await updateCartItemQuantity(
      cartItemId,
      quantity
    );

    if (!item) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("PATCH /api/cart/[cartItemId] error:", error);

    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { cartItemId } = await params;

    await removeCartItem(cartItemId);

    return NextResponse.json({
      message: "Cart item removed successfully",
    });
  } catch (error) {
    console.error("DELETE /api/cart/[cartItemId] error:", error);

    return NextResponse.json(
      { error: "Failed to remove cart item" },
      { status: 500 }
    );
  }
}