import cloudinary from "@/cloudinary.config";
import pool from "@/lib/db";
import { EditableProduct } from "@/types/EditableProduct";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category_id = searchParams.get("category_id");
    const sort = searchParams.get("sort");

    let orderBy = "";

    switch (sort) {
      case "price_asc":
        orderBy = "ORDER BY products.price ASC";
        break;

      case "price_desc":
        orderBy = "ORDER BY products.price DESC";
        break;

      case "latest":
        orderBy = "ORDER BY products.created_at DESC";
        break;

      default:
        orderBy = "ORDER BY products.id ASC";
    }

    const values: string[] = [];
    let whereClause = "";

    if (category_id) {
      values.push(category_id);
      whereClause = `WHERE categories.id = $${values.length}`;
    }

    const query = `
      SELECT
        products.id,
        products.name,
        product_images.image_url,
        products.sex,
        products.price,
        products.description,
        products.amount_in_stock,
        categories.category
      FROM products 
      JOIN product_images
        ON products.id = product_images.product_id
      JOIN product_categories
        ON products.id = product_categories.product_id
      JOIN categories
        ON categories.id = product_categories.category_id
      ${whereClause}
      ${orderBy}
    `;

    const results = await pool.query(query, values);

    return NextResponse.json({ products: results.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Error Fetching Products ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const meta = JSON.parse(data.get("meta") as string) as EditableProduct;

    console.log("File Received", meta);

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        })
        .end(buffer);
    });

    console.log("imageUrl gotten" + result.secure_url);

    const queryData = await pool.query(
      `INSERT INTO products (
        name,
        price,
        amount_in_stock,
        description,
        sex
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id
        `,
      [meta.name, meta.price, meta.amount_in_stock, meta.description, meta.sex],
    );

    await pool.query(
      `INSERT INTO product_images (
        product_id,
        image_url,
        public_id
        )
        VALUES ($1,$2,$3)
        `,
      [queryData.rows[0].id, result.secure_url, result.public_id],
    );

    await pool.query(
      `INSERT INTO product_categories(
        category_id,
        product_id
        )
        VALUES($1,$2)
        `,
      [meta.category_id, queryData.rows[0].id],
    );

    return Response.json({ message: "Product Created" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: `Upload Failed, Error ${error}` },
      { status: 500 },
    );
  }
}
