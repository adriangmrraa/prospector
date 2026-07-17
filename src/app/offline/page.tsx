import { WifiOff, MapPin, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-500/10 mb-6">
          <WifiOff className="h-8 w-8 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Sin conexión
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          No hay acceso a internet. Los datos que ya cargaste siguen disponibles,
          pero no se pueden actualizar hasta que vuelvas a tener señal.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-4 py-2 rounded-xl mb-6">
          <MapPin className="h-3.5 w-3.5" />
          Prospector funciona offline
        </div>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-lg shadow-brand-500/25 transition-all duration-200"
        >
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </button>
      </div>
    </div>
  );
}
