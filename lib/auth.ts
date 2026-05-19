// lib/auth.ts
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import pool from "@/lib/db"
import { User } from "@/types/User"


export async function getCurrentUser(): Promise<User> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) return null

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      email: string
    }

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [decoded.id]
    )

    return result.rows[0] ?? null

  } catch {
    return null
  }
}