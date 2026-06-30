import { getLeads } from "@/app/actions/leads";
import { LeadsTable } from "@/components/leads-table";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="text-muted-foreground">
          {leads.length} clínicas odontológicas en Córdoba Capital
        </p>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
