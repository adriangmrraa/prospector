"use server";

import { db } from "@/db";
import { leads, type NewLead } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getLeads() {
  return await db.select().from(leads).orderBy(desc(leads.rating));
}

export async function getLeadById(id: number) {
  const result = await db.select().from(leads).where(eq(leads.id, id));
  return result[0] || null;
}

export async function getLeadsWithCoords() {
  return await db
    .select()
    .from(leads)
    .where(sql`${leads.lat} IS NOT NULL AND ${leads.lng} IS NOT NULL`)
    .orderBy(desc(leads.rating));
}

export async function getStats() {
  const total = await db.select({ count: sql<number>`count(*)` }).from(leads);
  const withPhone = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(sql`${leads.telefono} IS NOT NULL`);
  const withEmail = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(sql`${leads.scrapedEmail} IS NOT NULL`);
  const withCoords = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(sql`${leads.lat} IS NOT NULL AND ${leads.lng} IS NOT NULL`);
  const withWhatsapp = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(sql`${leads.scrapedWhatsapp} IS NOT NULL`);
  const withInstagram = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(sql`${leads.scrapedInstagram} IS NOT NULL`);

  const barrios = await db
    .select({ barrio: leads.barrio, count: sql<number>`count(*)` })
    .from(leads)
    .where(sql`${leads.barrio} IS NOT NULL`)
    .groupBy(leads.barrio)
    .orderBy(sql`count(*) desc`);

  return {
    total: Number(total[0]?.count || 0),
    withPhone: Number(withPhone[0]?.count || 0),
    withEmail: Number(withEmail[0]?.count || 0),
    withCoords: Number(withCoords[0]?.count || 0),
    withWhatsapp: Number(withWhatsapp[0]?.count || 0),
    withInstagram: Number(withInstagram[0]?.count || 0),
    barrios: barrios.slice(0, 10),
  };
}

export async function deleteLead(id: number) {
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/");
  revalidatePath("/leads");
}

export async function updateLead(id: number, data: Partial<NewLead>) {
  await db
    .update(leads)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(leads.id, id));
  revalidatePath("/");
  revalidatePath("/leads");
}
