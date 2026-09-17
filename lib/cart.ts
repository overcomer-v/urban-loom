import pool from "./db";

export async function getOrCreateCart(userId: string) {
  const existing = await pool.query(
    `SELECT * FROM carts WHERE user_id = $1`,
    [userId]
  );

  if (existing.rows.length > 0) return existing.rows[0];

  const created = await pool.query(
    `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`,
    [userId]
  );

  return created.rows[0];
}

export async function getCart(userId: string) {
  const query = `
    SELECT
      ci.id AS cart_item_id,
      ci.quantity,
      ci.unit_price,
      p.id AS product_id,
      p.name,
      s.name AS size,
      ps.id AS product_size_id,
      ps.amount_in_stock,
      COALESCE(
        json_agg(DISTINCT pi.image_url)
        FILTER (WHERE pi.image_url IS NOT NULL),
        '[]'
      ) AS images
    FROM carts c
    JOIN cart_items ci ON ci.cart_id = c.id
    JOIN product_sizes ps ON ps.id = ci.product_size_id
    JOIN products p ON p.id = ps.product_id
    JOIN sizes s ON s.id = ps.size_id
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE c.user_id = $1
    GROUP BY ci.id, p.id, s.name, ps.id, ps.amount_in_stock
    ORDER BY ci.added_at DESC
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
}

export async function addToCart(
  userId: string,
  productSizeId: string,
  quantity: number
) {
  const cart = await getOrCreateCart(userId);

  console.log("Cart available", cart, productSizeId);

  const priceResult = await pool.query(
    `SELECT p.price
     FROM product_sizes ps
     JOIN products p ON p.id = ps.product_id
     WHERE ps.id = $1`,
    [productSizeId]
  );


  if (priceResult.rows.length === 0) {
    
    throw new Error("Product size not found");
  }

  const unitPrice = priceResult.rows[0].price;

  const query = `
    INSERT INTO cart_items (cart_id, product_size_id, quantity, unit_price)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (cart_id, product_size_id)
    DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
    RETURNING *
  `;

  const result = await pool.query(query, [
    cart.id,
    productSizeId,
    quantity,
    unitPrice,
  ]);

  console.log("cart_items inserted",result);

  return result.rows[0];
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {

  const result = await pool.query(
    `UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *`,
    [quantity, cartItemId]
  );

  return result.rows[0];

}

export async function removeCartItem(cartItemId: string) {
  await pool.query(`DELETE FROM cart_items WHERE id = $1`, [cartItemId]);
}

export async function clearCart(cartId: string) {
  await pool.query(`DELETE FROM cart_items WHERE cart_id = $1`, [cartId]);
}