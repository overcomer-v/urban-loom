import pool from "@/lib/db";

type CheckoutDetails = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
};

type OrderSource =
  | { type: "cart" }
  | { type: "buy-now"; productSizeId: string; quantity: number };

type CheckoutItem = {
  product_size_id: string;
  quantity: number;
  unit_price: number;
  name: string;
  size: string;
  images: string[];
};

const standardShippingFee = 2500;
const freeShippingThreshold = 50000;

export async function getBuyNowItem(productSizeId: string, quantity: number) {
  const result = await pool.query<CheckoutItem>(
    `SELECT
      ps.id AS product_size_id,
      $2::integer AS quantity,
      p.price AS unit_price,
      p.name,
      s.name AS size,
      COALESCE(
        json_agg(DISTINCT pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
        '[]'
      ) AS images
    FROM product_sizes ps
    JOIN products p ON p.id = ps.product_id
    JOIN sizes s ON s.id = ps.size_id
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE ps.id = $1 AND ps.amount_in_stock >= $2
    GROUP BY ps.id, p.id, s.name`,
    [productSizeId, quantity],
  );

  return result.rows[0] ?? null;
}

export async function createOrder(
  userId: string,
  details: CheckoutDetails,
  source: OrderSource,
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let items: CheckoutItem[];

    if (source.type === "cart") {
      const cartResult = await client.query<CheckoutItem>(
        `SELECT
          ci.product_size_id,
          ci.quantity,
          ci.unit_price,
          p.name,
          s.name AS size,
          COALESCE(
            json_agg(DISTINCT pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
            '[]'
          ) AS images
        FROM carts c
        JOIN cart_items ci ON ci.cart_id = c.id
        JOIN product_sizes ps ON ps.id = ci.product_size_id
        JOIN products p ON p.id = ps.product_id
        JOIN sizes s ON s.id = ps.size_id
        LEFT JOIN product_images pi ON pi.product_id = p.id
        WHERE c.user_id = $1
        GROUP BY ci.id, p.id, s.name`,
        [userId],
      );
      items = cartResult.rows;
    } else {
      const itemResult = await client.query<CheckoutItem>(
        `SELECT
          ps.id AS product_size_id,
          $2::integer AS quantity,
          p.price AS unit_price,
          p.name,
          s.name AS size,
          COALESCE(
            json_agg(DISTINCT pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
            '[]'
          ) AS images
        FROM product_sizes ps
        JOIN products p ON p.id = ps.product_id
        JOIN sizes s ON s.id = ps.size_id
        LEFT JOIN product_images pi ON pi.product_id = p.id
        WHERE ps.id = $1 AND ps.amount_in_stock >= $2
        GROUP BY ps.id, p.id, s.name`,
        [source.productSizeId, source.quantity],
      );
      items = itemResult.rows;
    }

    if (items.length === 0) throw new Error("No available items to order");

    const subtotal = items.reduce(
      (total, item) => total + Number(item.unit_price) * item.quantity,
      0,
    );
    const shippingFee = subtotal >= freeShippingThreshold ? 0 : standardShippingFee;
    const total = subtotal + shippingFee;

    const orderResult = await client.query<{ id: string }>(
      `INSERT INTO orders (
        user_id, customer_name, email, phone, address, city, state,
        postal_code, country, subtotal, shipping_fee, total
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id`,
      [
        userId,
        details.customerName,
        details.email,
        details.phone,
        details.address,
        details.city,
        details.state,
        details.postalCode || null,
        details.country,
        subtotal,
        shippingFee,
        total,
      ],
    );

    const orderId = orderResult.rows[0].id;
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (
          order_id, product_size_id, product_name, size, quantity, unit_price
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          orderId,
          item.product_size_id,
          item.name,
          item.size,
          item.quantity,
          item.unit_price,
        ],
      );
    }

    if (source.type === "cart") {
      await client.query(
        `DELETE FROM cart_items ci
        USING carts c
        WHERE ci.cart_id = c.id AND c.user_id = $1`,
        [userId],
      );
    }

    await client.query("COMMIT");
    return { id: orderId, total };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function getOrdersForUser(userId: string) {
  const result = await pool.query<{
    id: string;
    created_at: Date;
    status: string;
    total: number;
    item_count: number;
  }>(
    `SELECT
      o.id,
      o.created_at,
      o.status,
      o.total,
      COALESCE(SUM(oi.quantity), 0)::integer AS item_count
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    WHERE o.user_id = $1
    GROUP BY o.id
    ORDER BY o.created_at DESC`,
    [userId],
  );

  return result.rows;
}

export async function getOrderForUser(userId: string, orderId: string) {
  const orderResult = await pool.query<{
    id: string;
    created_at: Date;
    customer_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postal_code: string | null;
    country: string;
    subtotal: number;
    shipping_fee: number;
    total: number;
    status: string;
  }>(
    `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
    [orderId, userId],
  );

  const order = orderResult.rows[0];
  if (!order) return null;

  const itemsResult = await pool.query<{
    id: string;
    product_name: string;
    size: string;
    quantity: number;
    unit_price: number;
  }>(
    `SELECT id, product_name, size, quantity, unit_price
    FROM order_items WHERE order_id = $1 ORDER BY created_at`,
    [orderId],
  );

  return { ...order, items: itemsResult.rows };
}
