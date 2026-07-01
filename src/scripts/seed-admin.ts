/**
 * seed-admin.ts
 * Crea el usuario admin en Neon con contraseña hasheada con bcrypt.
 *
 * Uso:
 *   npx tsx src/scripts/seed-admin.ts
 *
 * Requiere DATABASE_URL en .env.local
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

// dotenv/config solo carga .env, cargamos .env.local manualmente
const envLocal = path.resolve(__dirname ?? process.cwd(), "../.env.local");
if (fs.existsSync(envLocal)) {
  const content = fs.readFileSync(envLocal, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Prospector2026!";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL no está configurada en .env.local");
    process.exit(1);
  }

  console.log("📦 Conectando a Neon...");
  console.log(`👤 Creando usuario: "${ADMIN_USERNAME}"`);

  // Hashear contraseña con bcrypt (12 rounds = ~250ms, seguro para producción)
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

  // Verificar si ya existe
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, ADMIN_USERNAME));

  if (existing.length > 0) {
    // Actualizar contraseña
    await db
      .update(users)
      .set({ passwordHash })
      .where(eq(users.username, ADMIN_USERNAME));
    console.log("✅ Usuario admin actualizado con nueva contraseña");
  } else {
    // Insertar nuevo
    await db.insert(users).values({
      username: ADMIN_USERNAME,
      passwordHash,
    });
    console.log("✅ Usuario admin creado exitosamente");
  }

  console.log("\n" + "=".repeat(50));
  console.log("🔐 CREDENCIALES DE ADMIN");
  console.log("   Usuario: admin");
  console.log("   Contraseña: Prospector2026!");
  console.log("=".repeat(50));
  console.log("\n⚠️  Cambiá la contraseña en producción.");
  console.log("   Editala en src/scripts/seed-admin.ts y volvé a correrlo.");
}

main().catch((err) => {
  console.error("\n💥 Error:", err.message);
  process.exit(1);
});
