import cloudinary from "@/cloudinary.config";
import pool from "@/lib/db";
import { EditableProduct } from "@/types/EditableProduct";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { SortOption } from "@/types/Sorting";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const products = await getProducts(
      searchParams.get("sort") as SortOption ?? undefined,
      searchParams.get("category_id") ?? undefined
    );

    return NextResponse.json({ products });
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
