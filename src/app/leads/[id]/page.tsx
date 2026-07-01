import { getLeadById } from "@/app/actions/leads";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Phone, MessageCircle, Mail, Camera, Globe, Star, ArrowLeft,
  Clock, Route, ExternalLink, ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(Number(id));

  if (!lead) notFound();

  const contactItems = [
    { label: "Teléfono", value: lead.telefono, icon: Phone, href: lead.telefono ? `tel:${lead.telefono}` : null, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "WhatsApp", value: lead.scrapedWhatsapp, icon: MessageCircle, href: lead.scrapedWhatsapp, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10", external: true },
    { label: "Email", value: lead.scrapedEmail, icon: Mail, href: lead.scrapedEmail ? `mailto:${lead.scrapedEmail}` : null, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" },
    { label: "Instagram", value: lead.scrapedInstagram, icon: Camera, href: lead.scrapedInstagram ? `https://instagram.com/${lead.scrapedInstagram.replace("@", "")}` : null, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10", external: true },
    { label: "Sitio Web", value: lead.website, icon: Globe, href: lead.website ? (lead.website.startsWith("http") ? lead.website : `https://${lead.website}`) : null, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10", external: true },
  ].filter((c) => c.value);

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/leads"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Volver a leads
      </Link>

      {/* Header card */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-700" />
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl tracking-tight">{lead.nombre}</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                {lead.categoria && (
                  <Badge variant="secondary" className="rounded-lg text-xs font-medium">
                    {lead.categoria}
                  </Badge>
                )}
                {lead.barrio && (
                  <Badge variant="outline" className="rounded-lg text-xs font-medium">
                    <MapPin className="h-3 w-3 mr-1 text-brand-400" />
                    {lead.barrio}
                  </Badge>
                )}
              </div>
            </div>
            {lead.rating && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-500/10">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <div>
                  <span className="text-lg font-bold">{lead.rating}</span>
                  {lead.cantReviews && (
                    <span className="text-sm text-muted-foreground ml-1">
                      ({lead.cantReviews} reseñas)
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lead.direccion && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/10 shrink-0">
                <MapPin className="h-4 w-4 text-brand-500" />
              </div>
              <div>
                <p className="text-sm font-medium">{lead.direccion}</p>
                {lead.barrio && (
                  <p className="text-xs text-muted-foreground mt-0.5">{lead.barrio}</p>
                )}
              </div>
            </div>
          )}
          {lead.horarios && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted shrink-0">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Horarios</p>
                <p className="text-sm text-muted-foreground mt-0.5">{lead.horarios}</p>
              </div>
            </div>
          )}
          {lead.scrapedDescription && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted shrink-0">
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Descripción</p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  {lead.scrapedDescription}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages section */}
        <div className="lg:col-span-2 space-y-6">
          {(lead.mensajeWhatsapp || lead.mensajeInstagram) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-brand-500" />
                  Mensajes Generados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lead.mensajeWhatsapp && (
                  <div className="relative group">
                    <div className="absolute -left-3 top-0 w-1 h-full rounded-full bg-emerald-400 opacity-60" />
                    <div className="pl-3">
                      <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                        </span>
                        WhatsApp
                      </h4>
                      <div className="text-sm text-foreground/80 bg-muted/50 backdrop-blur-sm rounded-xl p-4 border border-border/40 whitespace-pre-wrap leading-relaxed">
                        {lead.mensajeWhatsapp}
                      </div>
                    </div>
                  </div>
                )}
                {lead.mensajeInstagram && (
                  <div className="relative group">
                    <div className="absolute -left-3 top-0 w-1 h-full rounded-full bg-pink-400 opacity-60" />
                    <div className="pl-3">
                      <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-pink-50 dark:bg-pink-500/10">
                          <Camera className="h-3.5 w-3.5 text-pink-500" />
                        </span>
                        Instagram DM
                      </h4>
                      <div className="text-sm text-foreground/80 bg-muted/50 backdrop-blur-sm rounded-xl p-4 border border-border/40 whitespace-pre-wrap leading-relaxed">
                        {lead.mensajeInstagram}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-brand-500" />
                Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contactItems.map(({ label, value, icon: Icon, href, color, bg, external }) => (
                <a
                  key={label}
                  href={href || "#"}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`
                    flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150
                    ${href ? "hover:bg-surface-hover cursor-pointer" : "cursor-default"}
                    group
                  `}
                >
                  <div className={`p-2 rounded-lg ${bg} shrink-0`}>
                    <Icon className={`h-4 w-4 ${color} transition-transform group-hover:scale-110`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium truncate">{value}</p>
                  </div>
                  {external && href && (
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  )}
                </a>
              ))}
              {contactItems.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Sin datos de contacto
                </p>
              )}
            </CardContent>
          </Card>

          {/* Ubicación */}
          {lead.lat && lead.lng && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-500" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <code className="text-xs font-mono text-muted-foreground">
                    {Number(lead.lat).toFixed(6)}, {Number(lead.lng).toFixed(6)}
                  </code>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${lead.lat},${lead.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 w-full h-9 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-md shadow-brand-500/20 hover:shadow-brand-500/30 transition-all duration-200"
                >
                  <MapPin className="h-4 w-4" />
                  Ver en Google Maps
                  <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </CardContent>
            </Card>
          )}

          {/* Ruta */}
          {lead.routeOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Route className="h-5 w-5 text-brand-500" />
                  Ruta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white font-bold text-sm shadow-md shadow-brand-500/20">
                    #{lead.routeOrder}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Parada en ruta óptima</p>
                    <p className="text-xs text-muted-foreground">Orden según TSP</p>
                  </div>
                </div>
                <Link
                  href="/mapa"
                  className="group inline-flex items-center justify-center gap-2 w-full h-9 rounded-xl text-sm font-medium border border-border/60 bg-card hover:bg-surface-hover transition-all duration-200"
                >
                  <MapPin className="h-4 w-4 text-brand-500" />
                  Ver en el mapa
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
