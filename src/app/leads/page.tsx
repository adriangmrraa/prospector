import { getLeads } from "@/app/actions/leads";
import { LeadCardGrid } from "@/components/lead-card-grid";
import { List } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">
            <span className="font-medium text-foreground">{leads.length} clínicas</span> y centros estéticos en Córdoba Capital
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-50 dark:bg-brand-500/10">
          <List className="h-4 w-4 text-brand-500" />
          <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
            {leads.filter((l) => l.telefono || l.scrapedEmail).length} contactables
          </span>
        </div>
      </div>

      <LeadCardGrid leads={leads} />
    </div>
  );
}
