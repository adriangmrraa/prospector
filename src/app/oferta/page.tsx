import { MessageCircle, ExternalLink, ShieldCheck, Zap, Clock, Smartphone } from "lucide-react";
import Link from "next/link";

export default function OfertaPage() {
  const whatsappNumber = "5493704706902";
  const platformUrl = "https://dentalforgepruebas-frontend.gvdlcu.easypanel.host/";

  return (
    <div className="min-h-screen bg-grid-pattern">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="text-sm font-semibold">DentalForge</span>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            ¿Dudas? Chateá acá
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero */}
        <section className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl shadow-brand-500/25 mb-6">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            Conocé{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              DentalForge
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Un software de gestión inteligente para clínicas dentales. Agendá turnos,
            atendé pacientes con IA, centralizá todo en un solo lugar.
          </p>
        </section>

        {/* CTA Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-24">
          {/* WhatsApp - Demo Agent */}
          <div className="relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-green-400/30 to-emerald-600/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full rounded-2xl border border-border/60 bg-card p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-500/10">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Agente IA</h2>
                  <p className="text-sm text-muted-foreground">Respondé preguntas al instante</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Chateá con nuestro asistente inteligente. Agenda turnos, consultá
                disponibilidad, simulá una atención completa como si fueras paciente
                de la clínica.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 hover:shadow-green-500/35 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4" />
                Hablar con el agente IA
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-400/30 to-brand-600/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full rounded-2xl border border-border/60 bg-card p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-500/10">
                  <Zap className="h-6 w-6 text-brand-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Plataforma Demo</h2>
                  <p className="text-sm text-muted-foreground">Explorá el sistema completo</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Ingresá a la plataforma de prueba. Agendá tu turno, revisá tu ficha
                de paciente, explorá el panel de administración y todas las
                funcionalidades del sistema.
              </p>
              <a
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 transition-all duration-200"
              >
                <Zap className="h-4 w-4" />
                Abrir plataforma demo
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">
            ¿Qué podés hacer?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Chat con IA",
                desc: "El agente atiende pacientes, agenda turnos y responde consultas 24/7 automáticamente.",
              },
              {
                icon: Clock,
                title: "Gestión de turnos",
                desc: "Calendario inteligente con agenda online, recordatorios y reasignación automática.",
              },
              {
                icon: Smartphone,
                title: "Ficha digital",
                desc: "Historial clínico, imágenes, recetas y evolución del paciente en un solo lugar.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 mb-4">
                  <Icon className="h-6 w-6 text-brand-500" />
                </div>
                <h3 className="text-base font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="text-center">
          <div className="rounded-2xl border border-border/60 bg-card p-8 sm:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 mb-4">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              ¿Listo para verlo en acción?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Primero chateá con el agente IA para experimentar la atención
              automatizada. Después entrá a la plataforma y exploralá con libertad.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 hover:shadow-green-500/35 transition-all duration-200"
            >
              <MessageCircle className="h-4 w-4" />
              Empezar ahora
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 text-center text-xs text-muted-foreground border-t border-border/60 pt-6">
          <p>
            Esta es una demo del producto{" "}
            <span className="font-semibold text-foreground">Oferta</span>.
            Las credenciales de acceso completo son provistas por tu asesor
            comercial.
          </p>
        </footer>
      </main>
    </div>
  );
}
