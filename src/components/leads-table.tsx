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
import { Star, Search, MapPin, Phone, MessageCircle, Mail, Camera } from "lucide-react";
import Link from "next/link";

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          l.nombre.toLowerCase().includes(search.toLowerCase()) ||
          (l.barrio && l.barrio.toLowerCase().includes(search.toLowerCase())) ||
          (l.telefono && l.telefono.includes(search))
      ),
    [leads, search]
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, barrio o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Clínica</TableHead>
              <TableHead className="hidden md:table-cell">Barrio</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead className="hidden lg:table-cell">Web</TableHead>
              <TableHead className="w-[100px]">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No se encontraron leads
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium text-sm">{lead.nombre}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[250px]">
                      {lead.direccion}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="text-xs">
                      {lead.barrio || "-"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lead.rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{lead.rating}</span>
                        {lead.cantReviews && (
                          <span className="text-xs text-muted-foreground">
                            ({lead.cantReviews})
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {lead.telefono && (
                        <a
                          href={`tel:${lead.telefono}`}
                          title="Teléfono"
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Phone className="h-3.5 w-3.5 text-green-500" />
                        </a>
                      )}
                      {lead.scrapedWhatsapp && (
                        <a
                          href={lead.scrapedWhatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          className="p-1 hover:bg-muted rounded"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                        </a>
                      )}
                      {lead.scrapedEmail && (
                        <a
                          href={`mailto:${lead.scrapedEmail}`}
                          title={lead.scrapedEmail}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Mail className="h-3.5 w-3.5 text-purple-500" />
                        </a>
                      )}
                      {lead.scrapedInstagram && (
                        <a
                          href={`https://instagram.com/${lead.scrapedInstagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={lead.scrapedInstagram}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Camera className="h-3.5 w-3.5 text-pink-500" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {lead.website ? (
                      <a
                        href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline truncate block max-w-[150px]"
                      >
                        {lead.website.replace(/https?:\/\//, "").split("/")[0]}
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/leads/${lead.id}`}
                      className="inline-flex items-center justify-center h-7 px-2.5 rounded-lg text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
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
    </div>
  );
}
