import { getLeadsWithCoords } from "@/app/actions/leads";
import MapView from "@/components/mapa/MapView";
import { MapPin, Navigation, Route } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MapaPage() {
  const leads = await getLeadsWithCoords();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mapa de Prospectos</h1>
        <p className="text-muted-foreground mt-1">
          <span className="font-medium text-foreground">{leads.length} clínicas</span> con geolocalización · Ruta óptima TSP
        </p>
      </div>

      <div className="h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden border border-border/60 shadow-sm">
        <MapView leads={leads} height="100%" />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 px-4 py-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-500/20">
            <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Tu ubicación</p>
            <p className="text-xs text-muted-foreground">Geolocalización en tiempo real</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 px-4 py-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-100 dark:bg-red-500/20">
            <MapPin className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Clínicas</p>
            <p className="text-xs text-muted-foreground">Prospectos con coordenadas</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 px-4 py-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-500/20">
            <Route className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Ruta óptima</p>
            <p className="text-xs text-muted-foreground">Vecino más cercano (TSP)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
