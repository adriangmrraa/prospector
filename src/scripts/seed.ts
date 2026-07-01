/**
 * Seed script — Importa los leads existentes del pipeline de Node a Neon DB.
 *
 * Uso:
 *   npx tsx src/scripts/seed.ts
 *
 * Requiere DATABASE_URL en .env.local o variable de entorno.
 * El JSON de origen se lee de: ../Prospeccion/resultados/leads.json
 */

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import * as path from "path";
import * as fs from "fs";
import { db } from "../db";
import { leads } from "../db/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env.local explícitamente (dotenv/config no funciona con ESM hoisting)
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const SOURCE_JSON = path.resolve(__dirname, "../../../resultados/leads.json");

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL no está configurada en .env.local");
    process.exit(1);
  }

  // Check source
  if (!fs.existsSync(SOURCE_JSON)) {
    console.error(`❌ No se encontró el archivo de origen: ${SOURCE_JSON}`);
    console.error("   Ejecutá primero el pipeline de Node en la carpeta Prospeccion/");
    process.exit(1);
  }

  console.log("📦 Conectando a Neon...");

  console.log(`📖 Leyendo leads desde: ${SOURCE_JSON}`);
  const raw = JSON.parse(fs.readFileSync(SOURCE_JSON, "utf-8"));
  const sourceLeads = raw.leads || raw;

  console.log(`📊 Total leads en origen: ${sourceLeads.length}`);

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const l of sourceLeads) {
    try {
      const data = {
        placeId: l.place_id || null,
        nombre: l.nombre || "Sin nombre",
        direccion: l.direccion || null,
        barrio: l.barrio || null,
        ciudad: l.ciudad || "Córdoba",
        telefono: l.telefono || null,
        website: l.website || null,
        rating: l.rating ? String(l.rating) : null,
        cantReviews: l.cant_reviews ? Number(l.cant_reviews) : null,
        categoria: l.categoria || null,
        horarios: l.horarios || null,
        mapsUrl: l.maps_url || null,
        lat: l.lat ? String(l.lat) : null,
        lng: l.lng ? String(l.lng) : null,
        terminoBusqueda: l.termino_busqueda || null,
        instagram: l.instagram || null,
        facebook: l.facebook || null,
        scrapedEmail: l.scraped_email || null,
        scrapedWhatsapp: l.scraped_whatsapp || null,
        scrapedInstagram: l.scraped_instagram || null,
        scrapedFacebook: l.scraped_facebook || null,
        scrapedDescription: l.scraped_description || null,
        websiteScraped: l.website_scraped === true || l.website_scraped === false ? l.website_scraped : null,
        websiteError: l.website_error || null,
        mensajeWhatsapp: l.mensaje_whatsapp || null,
        mensajeInstagram: l.mensaje_instagram || null,
        routeOrder: l.route_order || null,
      };

      await db
        .insert(leads)
        .values(data)
        .onConflictDoUpdate({
          target: leads.placeId,
          set: { ...data, updatedAt: new Date() },
        });
      inserted++;
    } catch (rawErr) {
      const err = rawErr as { code?: string; message?: string };
      console.error(`  ❌ Error insertando "${l.nombre}": ${err.message || rawErr}`);
      errors++;
    }

    if (inserted % 50 === 0) {
      console.log(`  ✅ ${inserted} insertados...`);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ SEED COMPLETADO");
  console.log(`   📥 Insertados/Actualizados: ${inserted}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error("💥 Error fatal:", err);
  process.exit(1);
});
