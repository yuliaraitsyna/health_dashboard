import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(req: Request) {
  const { uid, email } = await req.json();

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
  });

  await client.connect();

  try {
    await client.query("INSERT INTO users (id, email) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING", [uid, email]);
    return NextResponse.json({ message: "User saved" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  } finally {
    await client.end();
  }
}
