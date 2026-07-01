"use client";

import { useEffect, useState } from "react";
import {
  Shield, BookOpen, MapPin, MessageCircle, Bot, Mic, Globe,
  Smartphone, Printer, Zap, FileText, ClipboardList, Users,
  ExternalLink, AlertTriangle, CheckCircle2, ArrowRight,
  ChevronDown, ChevronUp, Sparkles, Eye, EyeOff, Key,
  Database, Route, Navigation, Phone, Camera, Star, Link2,
  Settings, Send, TrendingUp, DollarSign, LayoutDashboard, List,
  Clock, ShieldCheck,
} from "lucide-react";

const sections = [
  { id: "credenciales", label: "Credenciales" },
  { id: "producto", label: "El Producto" },
  { id: "oferta", label: "Sitio Público" },
  { id: "mapa", label: "Mapa" },
  { id: "leads", label: "Gestión de Leads" },
  { id: "telegram", label: "Bot de Telegram" },
  { id: "offline", label: "Uso Offline" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-border/60 hover:bg-surface-hover transition-colors shrink-0"
    >
      {copied ? (
        <><CheckCircle2 className="h-3 w-3 text-green-500" /> Copiado</>
      ) : (
        <><Link2 className="h-3 w-3" /> Copiar</>
      )}
    </button>
  );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "warning" | "info" | "success" | "danger" }) {
  const colors = {
    default: "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-500/20",
    warning: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    info: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20",
    success: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    danger: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[variant]}`}>
      {children}
    </span>
  );
}

function InfoCallout({ icon: Icon, title, children, variant = "info" }: { icon?: React.ElementType; title: string; children: React.ReactNode; variant?: "info" | "warning" | "tip" | "danger" }) {
  const styles = {
    info: "border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/5 text-sky-800 dark:text-sky-300",
    warning: "border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 text-amber-800 dark:text-amber-300",
    tip: "border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-800 dark:text-emerald-300",
    danger: "border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 text-red-800 dark:text-red-300",
  };
  const IconCmp = Icon || AlertTriangle;
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${styles[variant]}`}>
      <div className="flex items-start gap-3">
        <IconCmp className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm mb-1">{title}</p>
          <div className="text-sm leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ObjecionCard({ objecion, respuesta }: { objecion: string; respuesta: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-bold text-red-500 dark:text-red-400 mb-2">«{objecion}»</p>
        <div className="text-sm text-muted-foreground leading-relaxed">{respuesta}</div>
      </div>
    </div>
  );
}

export default function GuiaPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* ─── Cover ─────────────────────────────────────────────── */}
      <section id="cover" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 p-8 sm:p-12 lg:p-16 text-white mb-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-brand-100 border border-white/10 mb-6">
            <Shield className="h-3.5 w-3.5" />
            Documento interno — Confidencial
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            Guía de Ventas
            <br />
            <span className="text-brand-200">Prospector + DentalForge</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-100 max-w-2xl leading-relaxed mb-8">
            Todo lo que necesitás para prospectar, demostrar y cerrar clínicas
            odontológicas, centros de estética y rehabilitación en Córdoba.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-brand-200">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Prospector v1.0</span>
            <span className="w-1 h-1 rounded-full bg-brand-400/50" />
            <span className="flex items-center gap-1.5"><Bot className="h-4 w-4" /> DentalForge</span>
            <span className="w-1 h-1 rounded-full bg-brand-400/50" />
            <span className="flex items-center gap-1.5"><Smartphone className="h-4 w-4" /> Optimizada para mobile</span>
          </div>
        </div>
      </section>

      {/* ─── Desktop Table of Contents ─────────────────────── */}
      <nav className="hidden lg:block sticky top-20 float-right ml-8 w-56 mb-8" aria-label="Tabla de contenidos">
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">En esta guía</p>
          <ul className="space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`block text-sm py-1.5 px-2 rounded-lg transition-colors ${
                    activeSection === id
                      ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-border/40">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 w-full h-9 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              Imprimir / PDF
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Print / PDF button (mobile) ────────────────────── */}
      <div className="lg:hidden flex justify-end mb-6">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border/60 bg-card hover:bg-surface-hover transition-colors"
        >
          <Printer className="h-4 w-4" />
          Imprimir / PDF
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: CREDENCIALES */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="credenciales" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
            <Key className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Credenciales de Acceso</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
          Estas son las credenciales para acceder a las plataformas de demo y a la app
          de prospección. Son de uso <strong>exclusivamente interno</strong> del equipo
          de ventas.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Prospector */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brand-400 to-brand-600" />
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10">
                    <MapPin className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Prospector App</h3>
                    <p className="text-xs text-muted-foreground">app.prospector.com</p>
                  </div>
                </div>
                <Badge variant="warning">Interno</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Usuario</p>
                    <code className="text-sm font-mono font-medium">admin</code>
                  </div>
                  <CopyButton text="admin" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Contraseña</p>
                    <code className="text-sm font-mono font-medium">Prospector2026!</code>
                  </div>
                  <CopyButton text="Prospector2026!" />
                </div>
              </div>
            </div>
          </div>

          {/* Demo Platform */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-600" />
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                    <Zap className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">DentalForge — Plataforma Demo</h3>
                    <p className="text-xs text-muted-foreground">Frontend de pruebas</p>
                  </div>
                </div>
                <Badge variant="info">Demo</Badge>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Usuario</p>
                    <code className="text-sm font-mono font-medium">pruebaslaura@gmail.com</code>
                  </div>
                  <CopyButton text="pruebaslaura@gmail.com" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Contraseña</p>
                    <code className="text-sm font-mono font-medium">pruebaslaura</code>
                  </div>
                  <CopyButton text="pruebaslaura" />
                </div>
              </div>
              <a
                href="https://dentalforgepruebas-frontend.gvdlcu.easypanel.host/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20 transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir plataforma demo
              </a>
            </div>
          </div>
        </div>

        {/* WhatsApp + Telegram row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* WhatsApp TORA */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10">
                <MessageCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold">TORA — Asistente de Atención al Paciente</h3>
                <p className="text-xs text-muted-foreground">WhatsApp Business API</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Número de WhatsApp</p>
                <code className="text-sm font-mono font-medium">+54 9 370 470-6902</code>
              </div>
              <CopyButton text="5493704706902" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Este número contesta automáticamente como TORA. Los prospectos chatean
              acá para agendar turnos, consultar precios, etc. Se usa en la página
              pública <code className="font-mono text-xs">/oferta</code> con mensajes
              que rotan diariamente.
            </p>
          </div>

          {/* Telegram - Asistente Interno */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10">
                <Send className="h-5 w-5 text-sky-500" />
              </div>
              <div>
                <h3 className="font-bold">Nova — Asistente Interno (Telegram)</h3>
                <p className="text-xs text-muted-foreground">Bot de Telegram</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Bot de Telegram</p>
                <code className="text-sm font-mono font-medium">@demodentalsbot</code>
              </div>
              <CopyButton text="@demodentalsbot" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              El bot de Telegram para el asistente interno Nova. Para acceder, el
              usuario debe estar previamente aprobado. Ver sección{" "}
              <a href="#telegram" className="text-brand-500 hover:text-brand-600 font-medium underline underline-offset-2">
                Bot de Telegram
              </a>{" "}
              para instrucciones de configuración.
            </p>
            <a
              href="https://web.telegram.org/k/#@demodentalsbot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/20 transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir bot de Telegram
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: EL PRODUCTO */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="producto" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10">
            <Bot className="h-5 w-5 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">El Producto — Cómo Venderlo</h2>
        </div>

        {/* ─── Resumen ─── */}
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          DentalForge es un ecosistema de IA para clínicas odontológicas, centros de
          estética y rehabilitación. Se compone de <strong>tres productos principales</strong>{" "}
          que cubren toda la operación de la clínica: atención al paciente, productividad
          interna y gestión administrativa.
        </p>

        {/* ─── 3 Productos ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {/* TORA */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden group hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-200">
            <div className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-500" />
            <div className="p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-50 dark:bg-green-500/10">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-bold text-base">TORA</h3>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Atención al paciente 24/7</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Agenda turnos al instante por WhatsApp, Instagram y Facebook</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Responde precios, horarios y promociones desde tu base de conocimientos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Triaje clínico: clasifica urgencias y deriva al profesional correcto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Atribución de Meta Ads: sabe qué aviso trajo a cada paciente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Verifica comprobantes de pago con IA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* NOVA */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden group hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-200">
            <div className="h-1.5 bg-gradient-to-r from-brand-400 to-brand-600" />
            <div className="p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-500/10">
                  <Mic className="h-5 w-5 text-brand-500" />
                </div>
                <h3 className="font-bold text-base">Nova</h3>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Asistente interno por voz</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>Registra evoluciones clínicas hablando, sin tipear</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>Prepara presupuestos con un audio y los envía por WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>Accede a historia clínica, odontograma e imágenes al instante</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>50+ herramientas por voz: pacientes, turnos, facturación, staff</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CRM */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden group hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-200">
            <div className="h-1.5 bg-gradient-to-r from-violet-400 to-purple-600" />
            <div className="p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-500/10">
                  <Database className="h-5 w-5 text-violet-500" />
                </div>
                <h3 className="font-bold text-base">CRM Clínico</h3>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Gestión administrativa completa</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                  <span>Gestión de turnos, pacientes, historia clínica y odontograma digital</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                  <span>Facturación electrónica y presupuestos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                  <span>Múltiples sedes, profesionales y roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                  <span>Métricas y reportes por sucursal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Audience ─── */}
        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-700/5 p-5 sm:p-7 mb-10">
          <h3 className="font-bold text-sm mb-4">¿A quién apuntamos?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Clínicas odontológicas", desc: "Múltiples consultorios, varios profesionales, recepción centralizada" },
              { title: "Consultorios individuales", desc: "Odontólogo solo con su asistente, sin personal administrativo" },
              { title: "Cadenas y franquicias", desc: "Gestión centralizada, métricas por sucursal, marca unificada" },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl bg-card border border-border/40 p-4">
                <p className="text-sm font-bold mb-1">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Argumentos de Venta ─── */}
        <h3 className="font-bold text-lg mb-4">Argumentos de Venta Clave</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            { icon: Clock, title: "40+ horas/semana recuperadas", desc: "Entre 80 y 120 mensajes por día que TORA responde automáticamente. La recepcionista deja de contestar el mismo WhatsApp 50 veces." },
            { icon: TrendingUp, title: "2.5x más turnos agendados", desc: "Respuesta instantánea 24/7 en WhatsApp, Instagram y Facebook. Nunca pierden un paciente porque el teléfono sonaba ocupado." },
            { icon: Users, title: "60% menos ausentismo", desc: "Recordatorios automáticos con confirmación por WhatsApp. Los pacientes confirman o cancelan con tiempo." },
            { icon: DollarSign, title: "Más conversión de presupuestos", desc: "Nova prepara presupuestos por voz y los envía al instante. El paciente lo recibe caliente, en el momento." },
            { icon: ShieldCheck, title: "Sin riesgo de error humano", desc: "TORA verifica pagos, Nova registra evoluciones. Todo queda documentado automáticamente." },
            { icon: Sparkles, title: "Diferenciación real", desc: "No es un chatbot genérico. TORA conoce los precios, la agenda real y las promociones de CADA clínica." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-500/10 shrink-0">
                  <Icon className="h-4.5 w-4.5 text-brand-500" />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Objeciones comunes ─── */}
        <h3 className="font-bold text-lg mb-4">Objeciones Comunes y Cómo Responderlas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <ObjecionCard
            objecion="Ya tengo un sistema de turnos"
            respuesta="Claro, y está bien. La pregunta es: ¿ese sistema contesta WhatsApp a las 2 AM? ¿Agenda turnos sin intervención humana? ¿Atribuye qué aviso de Instagram trajo a cada paciente? TORA no compite con tu sistema, lo potencia. Se integra con lo que ya tenés."
          />
          <ObjecionCard
            objecion="Mis pacientes prefieren llamar"
            respuesta="El 78% de los pacientes menores de 45 años prefiere WhatsApp antes que llamar. Y los que llaman, llaman porque no tienen otra opción. Con TORA, llaman menos porque obtienen respuesta al instante por el canal que ya usan."
          />
          <ObjecionCard
            objecion="Es muy caro para mi consultorio"
            respuesta="TORA reemplaza media recepcionista. 40 horas semanales recuperadas. Si tu recepcionista gana $X, TORA te cuesta una fracción. Y además agenda 2.5x más turnos. No es un gasto, es una inversión con retorno medible."
          />
          <ObjecionCard
            objecion="La IA va a sonar fría, mis pacientes quieren calidez"
            respuesta="TORA está entrenada para ser cálida y empática. Habla como una recepcionista de verdad, no como un robot. Y cuando el caso lo requiere, deriva automáticamente a un humano. Probálo: chateá con TORA y fijate si notas la diferencia."
          />
          <ObjecionCard
            objecion="No tengo tiempo para implementar algo nuevo"
            respuesta="TORA se activa en 1 clic. Cargás tu base de conocimientos (precios, horarios, servicios) y ya está funcionando. Nosotros te acompañamos en todo el proceso. La implementación lleva días, no meses."
          />
          <ObjecionCard
            objecion="Tengo que contratar a alguien que maneje esto"
            respuesta="Para nada. TORA y Nova están diseñados para que cualquier persona los configure. Y si necesitás ayuda, tenemos soporte incluido. Además Nova funciona por voz: tu equipo habla y él hace. Sin curvas de aprendizaje."
          />
        </div>

        <InfoCallout title="Tip de venta" icon={Zap} variant="tip">
          <strong>Siempre empezá la demo con TORA.</strong> Que el prospecto CHATEE primero
          como paciente. Que EXPERIMENTE la inmediatez. Después mostrale Nova. El orden
          importa: primero el beneficio para sus pacientes, después la productividad interna.
        </InfoCallout>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: SITIO PÚBLICO */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="oferta" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10">
            <Globe className="h-5 w-5 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Sitio Público — /oferta</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">
          La página <code className="font-mono text-xs">/oferta</code> es la landing page
          pública de DentalForge. Cualquier persona puede verla sin autenticación. Es tu
          herramienta de presentación: mostrala en la tablet o el celular durante la visita.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Secciones de la page */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-bold text-sm mb-4">Estructura de la página</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Hero principal", desc: "Título con propuesta de valor + métricas rápidas (40hs, 24/7, -60%, 1 clic)" },
                { label: "TORA — Chateá con tu info", desc: "6 cards con las capacidades de TORA: agenda, consultas, omnicanal, triaje, atribución de ads, verificación de pagos" },
                { label: "Nova — Asistente por voz", desc: "4 cards con uso por voz: evoluciones, presupuestos, historia clínica, métricas" },
                { label: "CTAs principales", desc: "Dos cards: 'Agente IA' (WhatsApp de TORA) y 'Plataforma Demo' (link a la demo)" },
                { label: "Impacto real", desc: "Tres métricas con descripción: 40hs/sem, 2.5x turnos, 60% menos ausentismo" },
                { label: "Pensado para + CTA final", desc: "Segmentación por tipo de clínica + llamado a la acción final con TORA y plataforma" },
              ].map(({ label, desc }) => (
                <li key={label} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Cómo usarla */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-bold text-sm mb-4">Cómo usarla en la visita</h3>
            <ol className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-medium">Abrí la página en tu tablet/celular</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Mostrale al prospecto el hero y leéle las métricas en voz alta.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <p className="font-medium">Que chatee con TORA</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tocá el botón «Hablar con el agente IA». Que el prospecto le haga
                    una pregunta como si fuera un paciente. La experiencia vende sola.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <p className="font-medium">Mostrá la plataforma demo</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Después de TORA, mostrale el sistema completo. Usá las credenciales
                    de demo para que vea el panel, la agenda, los pacientes.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <p className="font-medium">Cerrá con Telegram (Nova)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Si ya tenés tu ID de Telegram aprobado, abrí el bot y mostrale
                    un ejemplo por voz: «Nova, prepará un presupuesto…». Impacto garantizado.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <InfoCallout title="Importante" icon={AlertTriangle} variant="warning">
          Los números de WhatsApp en la página rotan automáticamente según el día del mes.
          Siempre verificá que el mensaje de prueba se esté enviando al número correcto.
          El número del agente TORA es <strong>+54 9 370 470-6902</strong>.
        </InfoCallout>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: MAPA */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="mapa" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10">
            <MapPin className="h-5 w-5 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Mapa de Prospectos</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">
          El mapa muestra todas las clínicas geolocalizadas en Córdoba Capital, con una
          <strong> ruta óptima calculada por TSP</strong> (Travelling Salesman Problem)
          usando el algoritmo del vecino más cercano. Ideal para planificar tu recorrido diario.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Features */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-bold text-sm mb-4">Funcionalidades del mapa</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Navigation className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Geolocalización en tiempo real</p>
                  <p className="text-xs text-muted-foreground">El mapa muestra tu ubicación actual con un marcador azul.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Marcadores de clínicas</p>
                  <p className="text-xs text-muted-foreground">Cada clínica prospectada aparece con un pin rojo. Hacé clic para ver nombre y datos básicos.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Route className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Ruta óptima TSP</p>
                  <p className="text-xs text-muted-foreground">Una línea trazada conecta todas las clínicas en el orden más eficiente para visitarlas. Arranca desde tu ubicación.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Orden de visita</p>
                  <p className="text-xs text-muted-foreground">Cada lead tiene un <code className="font-mono text-xs">routeOrder</code> que indica su posición en la ruta óptima.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Cómo usarlo */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-bold text-sm mb-4">Cómo planificar el día</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-medium">Abrí el mapa al empezar tu jornada</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Identificá las clínicas en tu zona que tenés pendientes.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <p className="font-medium">Seguí el orden de la ruta</p>
                  <p className="text-xs text-muted-foreground mt-0.5">La línea TSP te muestra el camino más eficiente. No improvisés.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <p className="font-medium">Usá Google Maps para navegar</p>
                  <p className="text-xs text-muted-foreground mt-0.5">En el detalle del lead, toca «Ver en Google Maps» para abrir la navegación paso a paso.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <p className="font-medium">Registrá la visita después</p>
                  <p className="text-xs text-muted-foreground mt-0.5">En la ficha del lead, completá el panel de «Visita de campo» con el resultado.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: GESTIÓN DE LEADS */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="leads" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10">
            <ClipboardList className="h-5 w-5 text-violet-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Gestión de Leads</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">
          El panel de Prospector te permite gestionar todo el pipeline: desde el dashboard
          con estadísticas hasta el registro de visitas de campo con CRM integrado.
        </p>

        {/* ─── Dashboard ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10">
                <LayoutDashboard className="h-4 w-4 text-brand-500" />
              </div>
              <h3 className="font-bold text-sm">Dashboard</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <span><strong>Métrica principal:</strong> total de prospectos con contador grande</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <span><strong>6 cards:</strong> Con teléfono, email, WhatsApp, Instagram, geolocalizados, con sitio web — cada uno con barra de progreso</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <span><strong>Top 10 barrios:</strong> ranking con barra de progreso para ver la concentración por zona</span>
              </li>
            </ul>
          </div>

          {/* Leads list */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10">
                <List className="h-4 w-4 text-brand-500" />
              </div>
              <h3 className="font-bold text-sm">Lista de Leads</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Cards con nombre, categoría, barrio, rating, reseñas y contacto</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Ordenados por rating (mejores primero)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Contador de contactables (los que tienen teléfono o email)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Lead Detail ─── */}
        <h3 className="font-bold text-lg mb-4">Detalle del Lead — Acciones Clave</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Contacto directo */}
          <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                <Phone className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="font-bold text-sm">Contacto directo</p>
            </div>
            <ul className="space-y-1.5">
              {["Teléfono (tocá para llamar)", "WhatsApp (abre chat)", "Email (abre mail)", "Instagram (abre perfil)", "Sitio web (abre navegador)"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-current shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          {/* Mensajes generados */}
          <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 dark:bg-green-500/10">
                <MessageCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="font-bold text-sm">Mensajes generados</p>
            </div>
            <ul className="space-y-1.5">
              {["Mensaje de WhatsApp personalizado", "Mensaje de Instagram DM", "Copiá y pegá o enviá directo", "Generados automáticamente por IA"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-current shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          {/* Visita de campo */}
          <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-500/10">
                <ClipboardList className="h-4 w-4 text-violet-500" />
              </div>
              <p className="font-bold text-sm">Visita de campo (CRM)</p>
            </div>
            <ul className="space-y-1.5">
              {["Registrá cada visita a la clínica", "Nombre de contacto y teléfono", "Semáforo: verde/amarillo/rojo", "¿Demo mostrada? Sí/No", "Notas de la visita"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-current shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-700/5 p-5 sm:p-7 mb-8">
          <h3 className="font-bold text-sm mb-3">Workflow recomendado para cada visita</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { step: "1", action: "Abrí el lead", detail: "Revisá los datos antes de llegar" },
              { step: "2", action: "Visitá la clínica", detail: "Usá el mapa + Google Maps para llegar" },
              { step: "3", action: "Mostrá la demo", detail: "Abrí /oferta, que chateen con TORA" },
              { step: "4", action: "Registrá la visita", detail: "Completá el panel de Visita de campo" },
              { step: "5", action: "Hacé seguimiento", detail: "Usá los mensajes generados para dar seguimiento" },
            ].map(({ step, action, detail }) => (
              <div key={step} className="text-center rounded-xl bg-card border border-border/40 p-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-bold mx-auto mb-2">{step}</div>
                <p className="text-sm font-bold">{action}</p>
                <p className="text-xs text-muted-foreground mt-1">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        <InfoCallout title="CRM de campo" icon={ClipboardList} variant="info">
          El panel de «Visita de campo» en cada lead te permite registrar: nombre de
          contacto, teléfono, estado (pendiente/visitado), semáforo (verde/amarillo/rojo),
          si mostraste la demo y notas de la visita. Toda esta info queda asociada al lead
          para que el equipo tenga trazabilidad completa.
        </InfoCallout>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* SECTION 6: TELEGRAM */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="telegram" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10">
            <Send className="h-5 w-5 text-sky-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Bot de Telegram — Nova</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Configuración */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10">
                <Settings className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="font-bold">Configuración del bot</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">URL del bot de Telegram:</p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40 mb-3">
                  <code className="text-sm font-mono">https://web.telegram.org/k/#@demodentalsbot</code>
                  <CopyButton text="https://web.telegram.org/k/#@demodentalsbot" />
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-amber-800 dark:text-amber-300 mb-2">
                      Requisito: Usuario aprobado
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      El bot de Telegram solo responde a usuarios que tienen su ID de
                      Telegram registrado como usuarios aprobados. Si un ID no está
                      registrado, el bot no le va a contestar.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Cómo agregar tu ID de Telegram:</p>
                <ol className="space-y-2.5 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">1</span>
                    <div>
                      <p className="font-medium">Ingresá a la sección <strong>Configuración → Telegram</strong> en la plataforma demo de DentalForge.</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Ahí está el campo para agregar tu ID numérico de Telegram.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">2</span>
                    <div>
                      <p className="font-medium">Si no encontrás tu ID de Telegram, escribile a <strong>@userinfobot</strong> en Telegram.</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Te va a devolver tu ID numérico al instante.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0 mt-0.5">3</span>
                    <div>
                      <p className="font-medium">Pegá tu ID en el campo y guardá.</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Ya podés hablarle a @demodentalsbot para probar Nova.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <InfoCallout title="Importante" variant="danger">
                Si no podés acceder a la sección de configuración o tenés dudas,
                <strong> contactá a tu ejecutivo de cuenta</strong> para que gestione
                el alta de tu ID de Telegram. Sin este paso, no vas a poder demostrar
                Nova en las visitas.
              </InfoCallout>
            </div>
          </div>

          {/* Qué puede hacer Nova */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10">
                <Mic className="h-5 w-5 text-brand-500" />
              </div>
              <h3 className="font-bold">Qué puede hacer Nova</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Una vez configurado, Nova te permite demostrar las capacidades por voz
              del asistente interno. Ejemplos para mostrar en la visita:
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { command: '"Nova, registrá una evolución de control para Sofía Martínez"', desc: "Muestra cómo se registra una evolución clínica sin tipear" },
                { command: '"Nova, prepará un presupuesto para Juan Pérez con limpieza y blanqueamiento"', desc: "Muestra cómo se crea un presupuesto al instante" },
                { command: '"Nova, mostrame el historial de María López"', desc: "Muestra cómo acceder a la historia clínica en segundos" },
                { command: '"Nova, cuántos turnos tuvimos esta semana?"', desc: "Muestra consulta de métricas en tiempo real" },
              ].map(({ command, desc }) => (
                <li key={command} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
                  <div>
                    <code className="text-xs font-mono font-medium text-brand-500 block mb-1">{command}</code>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <a
                href="https://web.telegram.org/k/#@demodentalsbot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/20 transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir bot de Telegram
              </a>
            </div>
          </div>
        </div>

        <InfoCallout title="Para el ejecutivo de ventas" variant="warning">
          Es responsabilidad del vendedor tener su ID de Telegram configurado ANTES
          de la visita al cliente. Sin esto, no puede demostrar Nova. Si necesita
          ayuda, que contacte a su ejecutivo de cuenta para gestionar el alta.
        </InfoCallout>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* SECTION 7: OFFLINE */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="offline" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-500/10">
            <Smartphone className="h-5 w-5 text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Uso Offline — PWA</h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            La app de Prospector está diseñada para funcionar en zonas sin conectividad.
            Cuando estés en la calle visitando clínicas y te quedés sin señal, la app
            sigue funcionando porque los datos se guardan localmente.
          </p>

          <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-7">
            <h3 className="font-bold text-sm mb-4">Recomendaciones para uso en la calle</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Smartphone className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Cargá los datos antes de salir</p>
                  <p className="text-xs text-muted-foreground">Abrí la app con WiFi antes de arrancar la jornada para que los datos se sincronicen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">La info de leads se cachea</p>
                  <p className="text-xs text-muted-foreground">Los leads que ya viste se mantienen disponibles aunque pierdas conexión.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Registrá visitas sin conexión</p>
                  <p className="text-xs text-muted-foreground">El formulario de visita de campo funciona offline. Los datos se sincronizan cuando volvés a tener señal.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">La página /oferta es pública</p>
                  <p className="text-xs text-muted-foreground">No necesita autenticación, perfecta para mostrar en el celular del cliente aunque no tengas señal.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/60 pt-6 pb-4 text-center text-xs text-muted-foreground">
        <p className="mb-2">
          <strong>Prospector</strong> — Pipeline de prospección de clínicas · Fusa Labs
        </p>
        <p>
          Documento interno del equipo de ventas. No compartir con terceros.
          Actualizado a julio 2026.
        </p>
      </footer>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* PRINT STYLES */}
      {/* ════════════════════════════════════════════════════════════ */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          nav, .lg\\:block { display: none !important; }
          button { display: none !important; }
          section { break-inside: avoid; page-break-inside: avoid; }
          section#cover { break-after: page; }
          .bg-gradient-to-br, .bg-gradient-to-r { background: #4f46e5 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .dark\\:bg-* { background: transparent !important; }
          .border { border-color: #ddd !important; }
          a { color: #4f46e5 !important; text-decoration: underline !important; }
          code { font-size: 10pt !important; }
          .text-muted-foreground { color: #555 !important; }
          .bg-card { background: #fafafa !important; border: 1px solid #ddd !important; }
        }
        @page { margin: 1.5cm; }
      `}</style>
    </div>
  );
}


