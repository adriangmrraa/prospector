"use server";

import { db } from "@/db";
import { leadVisits, type NewLeadVisit } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getLatestVisit(leadId: number) {
  try {
    const result = await db
      .select()
      .from(leadVisits)
      .where(eq(leadVisits.leadId, leadId))
      .orderBy(desc(leadVisits.visitDate))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching latest visit:", error);
    return null;
  }
}

export async function saveVisit(data: NewLeadVisit) {
  try {
    const [created] = await db
      .insert(leadVisits)
      .values({
        ...data,
        visitDate: data.visitDate ?? new Date(),
      })
      .returning();

    return created;
  } catch (error) {
    console.error("Error saving visit:", error);
    throw new Error("No se pudo guardar la visita");
  }
}
