import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const normalizedEmail = email.toLowerCase().trim();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 },
      );
    }

    // 1. Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normalizedEmail],
    );

    if (existingUser.rows.length > 0) {
      return Response.json({ error: "User already exists" }, { status: 409 });
    }

    if (password.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // 2. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, name, created_at`,
      [name, normalizedEmail, passwordHash],
    );

    const user = result.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("User signed up",user);

    return new Response(
      JSON.stringify({
        user,
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.log("Failed to sign In",error);
    
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
