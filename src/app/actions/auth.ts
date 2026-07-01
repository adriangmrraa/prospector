"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

// ─── TOKEN helpers (HMAC-SHA256, sin dependencias externas) ────────────────────

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET no configurado");
  return secret;
}

function encodeBase64Url(data: string): string {
  return Buffer.from(data)
    .toString("base64url");
}

function decodeBase64Url(str: string): string {
  return Buffer.from(str, "base64url").toString("utf-8");
}

async function signToken(payload: Record<string, unknown>): Promise<string> {
  const secret = getSecret();
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = encodeBase64Url(JSON.stringify(payload));
  const data = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const signature = encodeBase64Url(Buffer.from(sig).toString("base64"));

  return `${data}.${signature}`;
}

async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, body, sig] = parts;
  const secret = getSecret();
  const data = `${header}.${body}`;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      Buffer.from(sig, "base64url"),
      new TextEncoder().encode(data)
    );
    if (!valid) return null;
  } catch {
    return null;
  }

  try {
    return JSON.parse(decodeBase64Url(body));
  } catch {
    return null;
  }
}

// ─── ACCIONES ──────────────────────────────────────────────────────────────────

export async function login(
  _prevState: { error: string } | undefined,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Usuario y contraseña requeridos" };
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .then((r) => r[0]);

  if (!user) {
    return { error: "Usuario o contraseña incorrectos" };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: "Usuario o contraseña incorrectos" };
  }

  // Crear sesión
  const token = await signToken({
    sub: user.id,
    username: user.username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}

export async function getSession(): Promise<{
  id: number;
  username: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload || !payload.sub || !payload.username) return null;

  return {
    id: payload.sub as number,
    username: payload.username as string,
  };
}
