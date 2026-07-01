"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin, Mail, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { TrafficLightBadge } from "@/components/traffic-light-badge";
import { getLatestVisit } from "@/app/actions/visits";
import type { Lead } from "@/db/schema";
import type { LeadVisit } from "@/db/schema";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const router = useRouter();
  const [latestVisit, setLatestVisit] = useState<LeadVisit | null>(null);

  useEffect(() => {
    getLatestVisit(lead.id).then(setLatestVisit);
  }, [lead.id]);

  const phone = lead.scrapedWhatsapp ?? lead.telefono;

  return (
    <div
      onClick={() => router.push(`/leads/${lead.id}`)}
      className="group relative flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5 shadow-sm hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800 transition-all duration-200 cursor-pointer"
    >
      {/* Header: nombre + rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm leading-tight text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
            {lead.nombre}
          </h3>
        </div>

        {lead.rating && (
          <div className="flex items-center gap-1 shrink-0 px-1.5 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold tabular-nums">
              {lead.rating}
            </span>
          </div>
        )}
      </div>

      {/* Badges row: barrio + semaforo */}
      <div className="flex items-center gap-2 flex-wrap">
        {lead.barrio && (
          <Badge variant="secondary" className="text-xs font-medium rounded-lg">
            <MapPin className="h-3 w-3 mr-1 text-brand-400" />
            {lead.barrio}
          </Badge>
        )}

        {(() => {
          const tl = latestVisit?.trafficLight;
          const badgeColor =
            tl === "green" || tl === "yellow" || tl === "red" ? tl : null;
          return badgeColor ? <TrafficLightBadge color={badgeColor} /> : null;
        })()}
      </div>

      {/* Direccion */}
      {lead.direccion && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
          <MapPin className="h-3 w-3 shrink-0 text-muted-foreground/60" />
          <span className="truncate">{lead.direccion}</span>
        </p>
      )}

      {/* Acciones: iconos contacto + whatsapp */}
      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <div className="flex items-center gap-0.5">
          {lead.scrapedEmail && (
            <a
              href={`mailto:${lead.scrapedEmail}`}
              onClick={(e) => e.stopPropagation()}
              title="Email"
              className="p-1.5 rounded-lg text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          )}
          {lead.scrapedInstagram && (
            <a
              href={`https://instagram.com/${lead.scrapedInstagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Instagram"
              className="p-1.5 rounded-lg text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors"
            >
              <Camera className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <WhatsAppButton
          phone={phone}
          message={lead.mensajeWhatsapp}
          className="shrink-0"
        />
      </div>
    </div>
  );
}
