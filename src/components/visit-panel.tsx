import { getLatestVisit } from "@/app/actions/visits";
import { VisitPanelClient } from "./visit-panel-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

interface VisitPanelProps {
  leadId: number;
}

export async function VisitPanel({ leadId }: VisitPanelProps) {
  const existingVisit = await getLatestVisit(leadId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-brand-500" />
          Visita de campo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <VisitPanelClient leadId={leadId} existingVisit={existingVisit} />
      </CardContent>
    </Card>
  );
}
