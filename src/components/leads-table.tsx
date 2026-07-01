"use client";

import { useState, useMemo } from "react";
import type { Lead } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Star, Search, MapPin, Phone, MessageCircle, Mail, Camera,
  ArrowUpRight, Globe,
} from "lucide-react";
import Link from "next/link";

interface LeadsTableProps {
  leads: Lead[];
}

const contactIcons: Array<{
  key: "telefono" | "scrapedWhatsapp" | "scrapedEmail" | "scrapedInstagram";
  icon: typeof Phone;
  href: (v: string) => string;
  color: string;
  title: string;
  external?: boolean;
}> = [
  {
    key: "telefono",
    icon: Phone,
    href: (v: string) => `tel:${v}`,
    color: "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
    title: "Teléfono",
  },
  {
    key: "scrapedWhatsapp",
    icon: MessageCircle,
    href: (v: string) => v,
    color: "text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10",
    title: "WhatsApp",
    external: true,
  },
  {
    key: "scrapedEmail",
    icon: Mail,
    href: (v: string) => `mailto:${v}`,
    color: "text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10",
    title: "Email",
  },
  {
    key: "scrapedInstagram",
    icon: Camera,
    href: (v: string) => `https://instagram.com/${v.replace("@", "")}`,
    color: "text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10",
    title: "Instagram",
    external: true,
  },
];

export function LeadsTable({ leads }: LeadsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          l.nombre.toLowerCase().includes(search.toLowerCase()) ||
          (l.barrio && l.barrio.toLowerCase().includes(search.toLowerCase())) ||
          (l.telefono && l.telefono.includes(search)) ||
          (l.direccion && l.direccion.toLowerCase().includes(search.toLowerCase()))
      ),
    [leads, search]
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, barrio, dirección o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 rounded-xl bg-surface border-border/60 focus-visible:border-brand-400 transition-colors"
        />
        {search && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {filtered.length} resultados
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Clínica</TableHead>
              <TableHead className="hidden md:table-cell font-semibold">Barrio</TableHead>
              <TableHead className="hidden md:table-cell font-semibold">Rating</TableHead>
              <TableHead className="font-semibold">Contacto</TableHead>
              <TableHead className="hidden lg:table-cell font-semibold">Web</TableHead>
              <TableHead className="w-[80px] font-semibold">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-border" />
                    <p className="font-medium">No se encontraron leads</p>
                    <p className="text-sm">Intenta con otro término de búsqueda</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((lead) => (
                <TableRow key={lead.id} className="group hover:bg-surface-hover transition-colors">
                  <TableCell>
                    <div className="font-medium text-sm leading-tight">{lead.nombre}</div>
                    {lead.direccion && (
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-[220px]">{lead.direccion}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lead.barrio ? (
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium rounded-lg"
                      >
                        {lead.barrio}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lead.rating ? (
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold tabular-nums">{lead.rating}</span>
                        </div>
                        {lead.cantReviews && (
                          <span className="text-xs text-muted-foreground">
                            ({lead.cantReviews})
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {contactIcons.map(({ key, icon: Icon, href, color, title, external }) => {
                        const val = lead[key];
                        if (!val) return null;
                        return (
                          <a
                            key={key}
                            href={href(val)}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            title={title}
                            className={`p-1.5 rounded-lg transition-colors ${color}`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </a>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {lead.website ? (
                      <a
                        href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        <Globe className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">
                          {lead.website.replace(/https?:\/\//, "").split("/")[0]}
                        </span>
                        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-50" />
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/leads/${lead.id}`}
                      className="inline-flex items-center justify-center h-8 px-3 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors"
                    >
                      Ver
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground px-1">
        <span>
          Mostrando <span className="font-medium text-foreground">{filtered.length}</span> de{" "}
          <span className="font-medium text-foreground">{leads.length}</span> leads
        </span>
        {filtered.length !== leads.length && (
          <button
            onClick={() => setSearch("")}
            className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>
    </div>
  );
}
