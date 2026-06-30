import { getStats } from "@/app/actions/leads";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageCircle, Camera, Globe } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: MapPin,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Con Teléfono",
      value: stats.withPhone,
      total: stats.total,
      icon: Phone,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      title: "Con Email",
      value: stats.withEmail,
      icon: Mail,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "Con WhatsApp",
      value: stats.withWhatsapp,
      icon: MessageCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Con Instagram",
      value: stats.withInstagram,
      icon: Camera,
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      title: "Con Geolocalización",
      value: stats.withCoords,
      icon: Globe,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de prospección en Córdoba Capital
          </p>
        </div>
        <Link
          href="/mapa"
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          <MapPin className="h-4 w-4" />
          Ver Mapa
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {card.value}
                {card.total && (
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    / {card.total}
                  </span>
                )}
              </div>
              {card.total && (
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((card.value / card.total) * 100)}% del total
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top barrios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Barrios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.barrios.map((b: { barrio: string | null; count: number }, i: number) => (
              <div
                key={b.barrio || `null-${i}`}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-5">
                    {i + 1}.
                  </span>
                  <span className="text-sm font-medium">{b.barrio || "Sin barrio"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-blue-100 rounded-full" style={{
                      width: `${Math.max(20, (b.count / Math.max(...stats.barrios.map((x) => x.count))) * 100)}px`,
                  }}>
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${(b.count / Math.max(...stats.barrios.map((x: any) => x.count))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold min-w-[24px] text-right">
                    {b.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
