import {
  pgTable,
  serial,
  text,
  varchar,
  decimal,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),

  // Datos de Google Maps
  placeId: text("place_id").unique(),
  nombre: varchar("nombre", { length: 300 }).notNull(),
  direccion: text("direccion"),
  barrio: varchar("barrio", { length: 200 }),
  ciudad: varchar("ciudad", { length: 200 }).default("Córdoba"),
  telefono: varchar("telefono", { length: 100 }),
  website: text("website"),
  rating: decimal("rating", { precision: 3, scale: 1 }),
  cantReviews: integer("cant_reviews"),
  categoria: varchar("categoria", { length: 200 }),
  horarios: text("horarios"),
  mapsUrl: text("maps_url"),
  lat: decimal("lat", { precision: 10, scale: 7 }),
  lng: decimal("lng", { precision: 10, scale: 7 }),
  terminoBusqueda: varchar("termino_busqueda", { length: 200 }),

  // Redes sociales (desde scraper)
  instagram: varchar("instagram", { length: 300 }),
  facebook: varchar("facebook", { length: 300 }),

  // Enriquecimiento (web scraping)
  scrapedEmail: text("scraped_email"),
  scrapedWhatsapp: text("scraped_whatsapp"),
  scrapedInstagram: varchar("scraped_instagram", { length: 200 }),
  scrapedFacebook: text("scraped_facebook"),
  scrapedDescription: text("scraped_description"),
  websiteScraped: boolean("website_scraped"),
  websiteError: varchar("website_error", { length: 50 }),

  // Mensajes generados
  mensajeWhatsapp: text("mensaje_whatsapp"),
  mensajeInstagram: text("mensaje_instagram"),

  // Ruta (TSP)
  routeOrder: integer("route_order"),

  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
