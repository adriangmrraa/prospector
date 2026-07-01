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
  index,
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

// ─── Lead Visits (CRM de Campo) ─────────────────────────────────────────────────

export const leadVisits = pgTable("lead_visits", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  visitDate: timestamp("visit_date").defaultNow().notNull(),
  contactName: varchar("contact_name", { length: 200 }),
  contactPhone: varchar("contact_phone", { length: 100 }),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | visited
  trafficLight: varchar("traffic_light", { length: 10 }), // green | yellow | red
  demoShown: boolean("demo_shown"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  leadIdIdx: index("lead_visits_lead_id_idx").on(table.leadId),
}));

export type LeadVisit = typeof leadVisits.$inferSelect;
export type NewLeadVisit = typeof leadVisits.$inferInsert;

// ─── Users ──────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
