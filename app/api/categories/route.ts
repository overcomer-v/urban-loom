import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("read");
  try {
    const result = await pool.query(`SELECT * FROM categories`);
    console.log(result);
    return NextResponse.json({ categories: result.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to fetch categories ${error}` },
      { status: 500 },
    );
  }
}
