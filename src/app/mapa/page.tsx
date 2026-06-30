import { getLeadsWithCoords } from "@/app/actions/leads";
import MapView from "@/components/mapa/MapView";

export const dynamic = "force-dynamic";

export default async function MapaPage() {
  const leads = await getLeadsWithCoords();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mapa de Prospectos</h1>
          <p className="text-muted-foreground">
            {leads.length} clínicas con geolocalización · Ruta óptima TSP · Tu ubicación en tiempo real
          </p>
        </div>
      </div>

      <div className="h-[75vh] rounded-lg overflow-hidden border">
        <MapView leads={leads} height="100%" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow" />
          <span className="text-muted-foreground">Tu ubicación (geolocalización)</span>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-muted-foreground">Clínicas prospectadas</span>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
          <div className="w-6 h-0.5 bg-blue-500 opacity-70" style={{ borderTop: "2px dashed #3b82f6" }} />
          <span className="text-muted-foreground">Ruta óptima (vecino más cercano)</span>
        </div>
      </div>
    </div>
  );
}
