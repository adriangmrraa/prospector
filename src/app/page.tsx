import { getStats } from "@/app/actions/leads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageCircle, Camera, Globe, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const iconColors = [
  { icon: Phone, color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
  { icon: Mail, color: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/20" },
  { icon: MessageCircle, color: "from-green-500 to-emerald-600", shadow: "shadow-green-500/20" },
  { icon: Camera, color: "from-pink-500 to-rose-600", shadow: "shadow-pink-500/20" },
  { icon: Globe, color: "from-orange-500 to-amber-600", shadow: "shadow-orange-500/20" },
  { icon: Building2, color: "from-sky-500 to-blue-600", shadow: "shadow-sky-500/20" },
];

const statCards = [
  { key: "withPhone", label: "Con Teléfono" },
  { key: "withEmail", label: "Con Email" },
  { key: "withWhatsapp", label: "Con WhatsApp" },
  { key: "withInstagram", label: "Con Instagram" },
  { key: "withCoords", label: "Geolocalizados" },
  { key: "withWebsite", label: "Con Sitio Web" },
] as const;

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Hero header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Resumen de prospección — <span className="font-medium text-foreground">{stats.total} clínicas</span> en Córdoba Capital
          </p>
        </div>
        <Link
          href="/mapa"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 transition-all duration-200 hover-lift"
        >
          <MapPin className="h-4 w-4" />
          Ver Mapa
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Main metric */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-brand-100 text-sm font-medium tracking-wide uppercase">Total Prospectos</p>
            <p className="text-5xl sm:text-6xl font-bold tracking-tight mt-1">{stats.total}</p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
            <MapPin className="h-5 w-5 text-brand-200" />
            <span className="text-sm text-brand-100">Córdoba Capital, Argentina</span>
          </div>
        </div>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map(({ key, label }, idx) => {
          const value = stats[key as keyof typeof stats] as number;
          const { icon: Icon, color, shadow } = iconColors[idx];
          const pct = stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;

          return (
            <Card key={key} className="card-glow overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <div className={`rounded-xl p-2.5 bg-gradient-to-br ${color} ${shadow} shadow-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">
                  {value}
                  <span className="text-sm font-normal text-muted-foreground ml-1.5">
                    / {stats.total}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {pct}% del total
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top barrios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-500" />
            Top Barrios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {stats.barrios.map((b: { barrio: string | null; count: number }, i: number) => {
              const maxCount = Math.max(...stats.barrios.map((x: { count: number }) => x.count));
              const pct = (b.count / maxCount) * 100;
              return (
                <div
                  key={b.barrio || `null-${i}`}
                  className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`
                      flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0
                      ${i === 0 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                        i === 1 ? "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300" :
                        i === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" :
                        "bg-muted text-muted-foreground"}
                    `}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium truncate">
                      {b.barrio || "Sin barrio"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block w-32 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold tabular-nums min-w-[2ch] text-right">
                      {b.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
