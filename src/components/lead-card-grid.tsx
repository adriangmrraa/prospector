"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LeadCard } from "@/components/lead-card";
import type { Lead } from "@/db/schema";

interface LeadCardGridProps {
  leads: Lead[];
}

export function LeadCardGrid({ leads }: LeadCardGridProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        const q = search.toLowerCase();
        return (
          l.nombre.toLowerCase().includes(q) ||
          (l.barrio && l.barrio.toLowerCase().includes(q)) ||
          (l.telefono && l.telefono.includes(q)) ||
          (l.direccion && l.direccion.toLowerCase().includes(q))
        );
      }),
    [leads, search],
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar por nombre, barrio, direccion o telefono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 rounded-xl bg-surface border-border/60 focus-visible:border-brand-400 transition-colors"
        />
        {search && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            {filtered.length} resultados
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
          <Search className="h-8 w-8 text-border" />
          <p className="font-medium">No se encontraron leads</p>
          <p className="text-sm">Intenta con otro termino de busqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground px-1">
        <span>
          Mostrando{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          de{" "}
          <span className="font-medium text-foreground">{leads.length}</span>{" "}
          leads
        </span>
        {filtered.length !== leads.length && (
          <button
            onClick={() => setSearch("")}
            className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            Limpiar busqueda
          </button>
        )}
      </div>
    </div>
  );
}
