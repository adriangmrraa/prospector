import { getLeadById } from "@/app/actions/leads";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, MessageCircle, Mail, Camera, Globe, Star, ArrowLeft } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/leads"
          className="inline-flex items-center gap-1 h-7 px-2.5 rounded-lg text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{lead.nombre}</CardTitle>
                  {lead.categoria && (
                    <Badge variant="secondary" className="mt-1">
                      {lead.categoria}
                    </Badge>
                  )}
                </div>
                {lead.rating && (
                  <div className="flex items-center gap-1 text-lg">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{lead.rating}</span>
                    {lead.cantReviews && (
                      <span className="text-sm text-muted-foreground">
                        ({lead.cantReviews})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dirección */}
              {lead.direccion && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{lead.direccion}</p>
                    {lead.barrio && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {lead.barrio}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Horarios */}
              {lead.horarios && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Horarios:</span> {lead.horarios}
                </div>
              )}

              {/* Descripción */}
              {lead.scrapedDescription && (
                <div>
                  <span className="text-sm font-medium">Descripción:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lead.scrapedDescription}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mensajes */}
          {(lead.mensajeWhatsapp || lead.mensajeInstagram) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mensajes Generados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lead.mensajeWhatsapp && (
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                      WhatsApp
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg whitespace-pre-wrap">
                      {lead.mensajeWhatsapp}
                    </p>
                  </div>
                )}
                {lead.mensajeInstagram && (
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                      <Camera className="h-3.5 w-3.5 text-pink-500" />
                      Instagram DM
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg whitespace-pre-wrap">
                      {lead.mensajeInstagram}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lead.telefono && (
                <a
                  href={`tel:${lead.telefono}`}
                  className="flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
                >
                  <Phone className="h-4 w-4 text-green-500" />
                  {lead.telefono}
                </a>
              )}
              {lead.scrapedWhatsapp && (
                <a
                  href={lead.scrapedWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  WhatsApp
                </a>
              )}
              {lead.scrapedEmail && (
                <a
                  href={`mailto:${lead.scrapedEmail}`}
                  className="flex items-center gap-2 text-sm hover:text-purple-500 transition-colors truncate"
                >
                  <Mail className="h-4 w-4 text-purple-500" />
                  {lead.scrapedEmail}
                </a>
              )}
              {lead.scrapedInstagram && (
                <a
                  href={`https://instagram.com/${lead.scrapedInstagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-pink-500 transition-colors"
                >
                  <Camera className="h-4 w-4 text-pink-500" />
                  {lead.scrapedInstagram}
                </a>
              )}
              {lead.website && (
                <a
                  href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-blue-500 transition-colors truncate"
                >
                  <Globe className="h-4 w-4 text-blue-500" />
                  {lead.website.replace(/https?:\/\//, "").split("/")[0]}
                </a>
              )}
            </CardContent>
          </Card>

          {/* Maps link */}
          {lead.lat && lead.lng && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ubicación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  {Number(lead.lat).toFixed(6)}, {Number(lead.lng).toFixed(6)}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${lead.lat},${lead.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 h-7 px-2.5 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted hover:text-foreground transition-colors w-full"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Ver en Google Maps
                </a>
              </CardContent>
            </Card>
          )}

          {/* Route info */}
          {lead.routeOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ruta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Parada #{lead.routeOrder} en la ruta óptima
                </p>
                <Link
                  href="/mapa"
                  className="inline-flex items-center justify-center gap-1 h-7 px-2.5 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted hover:text-foreground transition-colors w-full mt-2"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Ver en el mapa
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
