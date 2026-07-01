"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveVisit } from "@/app/actions/visits";
import type { LeadVisit } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface VisitPanelClientProps {
  leadId: number;
  existingVisit: LeadVisit | null;
}

const TRAFFIC_OPTIONS = [
  {
    value: "green",
    label: "Alto",
    color: "bg-green-500",
    activeBg: "bg-green-50 dark:bg-green-500/15",
    activeRing: "ring-green-400",
  },
  {
    value: "yellow",
    label: "Medio",
    color: "bg-yellow-500",
    activeBg: "bg-yellow-50 dark:bg-yellow-500/15",
    activeRing: "ring-yellow-400",
  },
  {
    value: "red",
    label: "Bajo",
    color: "bg-red-500",
    activeBg: "bg-red-50 dark:bg-red-500/15",
    activeRing: "ring-red-400",
  },
] as const;

export function VisitPanelClient({ leadId, existingVisit }: VisitPanelClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"pending" | "visited">(
    (existingVisit?.status as "pending" | "visited") ?? "pending",
  );
  const [contactName, setContactName] = useState(
    existingVisit?.contactName ?? "",
  );
  const [contactPhone, setContactPhone] = useState(
    existingVisit?.contactPhone ?? "",
  );
  const [trafficLight, setTrafficLight] = useState(
    existingVisit?.trafficLight ?? "green",
  );
  const [demoShown, setDemoShown] = useState(
    existingVisit?.demoShown ?? false,
  );
  const [notes, setNotes] = useState(existingVisit?.notes ?? "");
  const [visitDate, setVisitDate] = useState(() => {
    if (existingVisit?.visitDate) {
      return new Date(existingVisit.visitDate).toISOString().split("T")[0];
    }
    return new Date().toISOString().split("T")[0];
  });
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  useEffect(() => {
    if (feedback?.type === "success") {
      feedbackTimer.current = setTimeout(() => setFeedback(null), 4000);
    }
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, [feedback]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    startTransition(async () => {
      const result = await saveVisit({
        leadId,
        status,
        contactName: contactName || null,
        contactPhone: contactPhone || null,
        trafficLight: trafficLight || null,
        demoShown,
        notes: notes || null,
        visitDate: new Date(visitDate),
      });

      if (result.success) {
        setFeedback({
          type: "success",
          message: "Visita guardada correctamente",
        });
        router.refresh();
      } else {
        setFeedback({
          type: "error",
          message: result.error ?? "Error al guardar la visita",
        });
      }
    });
  }

  const labelCls = "text-sm font-medium text-foreground/80";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {feedback && (
        <div
          className={cn(
            "px-3 py-2 rounded-lg text-sm font-medium transition-opacity",
            feedback.type === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
          )}
        >
          {feedback.message}
        </div>
      )}

      {/* Estado: pendiente / visitado */}
      <div className="space-y-2">
        <span className={labelCls}>Estado</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStatus("pending")}
            className={cn(
              "flex-1 h-9 rounded-xl text-sm font-medium transition-all cursor-pointer",
              status === "pending"
                ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400 dark:bg-amber-500/20 dark:text-amber-400"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            Pendiente
          </button>
          <button
            type="button"
            onClick={() => setStatus("visited")}
            className={cn(
              "flex-1 h-9 rounded-xl text-sm font-medium transition-all cursor-pointer",
              status === "visited"
                ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-400"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            Visitado
          </button>
        </div>
      </div>

      {/* Contacto + Telefono — 2 columnas en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="contactName" className={labelCls}>
            Contacto
          </label>
          <Input
            id="contactName"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Nombre del encargado"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contactPhone" className={labelCls}>
            Telefono contacto
          </label>
          <Input
            id="contactPhone"
            type="text"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="+54 9 11 ..."
          />
        </div>
      </div>

      {/* Semaforo */}
      <div className="space-y-2">
        <span className={labelCls}>Semaforo</span>
        <div className="flex gap-3">
          {TRAFFIC_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTrafficLight(opt.value)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer",
                trafficLight === opt.value
                  ? `${opt.activeBg} ring-2 ${opt.activeRing} ring-offset-1 ring-offset-background`
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              <span
                className={cn(
                  "inline-block w-3.5 h-3.5 rounded-full shrink-0",
                  opt.color,
                )}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo + Fecha — 2 columnas en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 pt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={demoShown}
            onChange={(e) => setDemoShown(e.target.checked)}
            className="h-4 w-4 rounded border-border text-brand-500 focus-visible:ring-brand-500/20 cursor-pointer"
          />
          <span className={labelCls}>Demo mostrada</span>
        </label>
        <div className="space-y-2">
          <label htmlFor="visitDate" className={labelCls}>
            Fecha de visita
          </label>
          <Input
            id="visitDate"
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
          />
        </div>
      </div>

      {/* Notas */}
      <div className="space-y-2">
        <label htmlFor="notes" className={labelCls}>
          Notas
        </label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Observaciones de la visita..."
          className="min-h-20 resize-y"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Guardando..." : "Guardar visita"}
      </Button>
    </form>
  );
}
