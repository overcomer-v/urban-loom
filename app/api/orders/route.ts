import { getCurrentUser } from "@/lib/auth";
import { createOrder } from "@/lib/orders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const requiredFields = ["customerName", "email", "phone", "address", "city", "state", "country"];
    if (requiredFields.some((field) => !body[field])) {
      return NextResponse.json({ error: "Please complete all required delivery details" }, { status: 400 });
    }

    const source = body.source;
    const isCart = source?.type === "cart";
    const isBuyNow = source?.type === "buy-now" && source.productSizeId && Number.isInteger(source.quantity) && source.quantity > 0;
    if (!isCart && !isBuyNow) {
      return NextResponse.json({ error: "Invalid checkout selection" }, { status: 400 });
    }

    const order = await createOrder(user.id, {
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      state: body.state,
      postalCode: body.postalCode,
      country: body.country,
    }, source);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Unable to create your order" }, { status: 500 });
  }
}
