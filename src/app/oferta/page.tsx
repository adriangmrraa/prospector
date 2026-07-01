import {
  MessageCircle, ExternalLink, ShieldCheck, Zap, Clock, Smartphone,
  BrainCircuit, CalendarCheck, Headphones, TrendingUp, Users, HeartPulse,
  TimerReset, Sparkles, Bot, BarChart3,
} from "lucide-react";

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
        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl shadow-brand-500/25 mb-6">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            Conocé{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              DentalForge
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            El asistente de IA que atiende pacientes, agenda turnos y gestiona tu
            clínica dental <strong className="text-foreground">24/7</strong>.
            Tu equipo se enfoca en atender, nosotros nos encargamos del resto.
          </p>

          {/* Metricas rapìdas */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8">
            {[
              { value: "40+", label: "horas semanales recuperadas" },
              { value: "24/7", label: "atencion automatica" },
              { value: "-60%", label: "ausentismo en turnos" },
              { value: "1 clic", label: "activacion del asistente" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-brand-500">{value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA Cards ──────────────────────────────────────────── */}
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

        {/* ─── El Asistente ────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3">
              El Asistente Interno
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Una IA entrenada para trabajar como parte de tu equipo. No reemplaza a nadie:
              libera a tu personal para que haga lo que realmente importa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: Headphones,
                title: "Recepcion 24/7",
                desc: "Atende llamadas y mensajes de WhatsApp automaticamente, incluso fuera del horario de atencion. Tu clinica nunca cierra.",
                highlight: "Recupera hasta 20 hs semanales de tu recepcionista",
              },
              {
                icon: CalendarCheck,
                title: "Agenda inteligente",
                desc: "Agenda, reprograma y confirma turnos sin intervencion humana. El asistente conoce la disponibilidad en tiempo real y asigna los horarios optimos.",
                highlight: "Reduce ausentismo un 60% con recordatorios automaticos",
              },
              {
                icon: BrainCircuit,
                title: "Responde todo",
                desc: "Horarios, precios, promociones, formas de pago, direccion. El asistente responde al instante cualquier consulta frecuente sin derivar a un humano.",
                highlight: "Elimina las 30+ consultas repetitivas por dia",
              },
              {
                icon: HeartPulse,
                title: "Ficha clinica digital",
                desc: "Toma datos del paciente durante la conversacion, crea su historia clinica, asocia imagenes y tratamientos. Todo queda registrado automaticamente.",
                highlight: "Cero carga manual de datos",
              },
              {
                icon: TimerReset,
                title: "Recordatorios y seguimiento",
                desc: "Envia recordatorios por WhatsApp 24h y 2h antes del turno. Hace seguimiento post-consulta y activa recall de pacientes para tratamientos incompletos.",
                highlight: "Automatiza la cobranza y el follow-up",
              },
              {
                icon: BarChart3,
                title: "Reportes y metricas",
                desc: "Mostrador de turnos, conversion de consultas, horas pico, servicios mas solicitados. Todo visible en tiempo real desde el panel.",
                highlight: "Decidi con datos, no con suposiciones",
              },
            ].map(({ icon: Icon, title, desc, highlight }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 shrink-0">
                    <Icon className="h-5 w-5 text-brand-500" />
                  </div>
                  <h3 className="text-base font-bold">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  {highlight}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Por que tus colegas ya lo usan ────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-brand-600/5 via-transparent to-brand-800/5 p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                El impacto real
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Esto no es teoria. Clinicas que ya activaron DentalForge:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Users,
                  stat: "40+ hs/sem",
                  label: "que tu recepcionista recupera",
                  desc: "Una secretaria recibe entre 80 y 120 mensajes/llamadas por dia. El asistente IA responde el 90% automaticamente.",
                },
                {
                  icon: TrendingUp,
                  stat: "2.5x mas",
                  label: "turnos agendados sin esfuerzo",
                  desc: "Respuesta instantanea 24/7 significa que nunca perdes un paciente porque el telefono sonaba ocupado o era fuera de horario.",
                },
                {
                  icon: Clock,
                  stat: "60% menos",
                  label: "ausentismo en turnos",
                  desc: "Recordatorios automaticos con confirmacion por WhatsApp. Los pacientes confirman o cancelan con tiempo para reasignar el turno.",
                },
              ].map(({ icon: Icon, stat, label, desc }) => (
                <div key={label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 mb-4">
                    <Icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-brand-500 mb-1">{stat}</div>
                  <div className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3">{label}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Feature cards resumidas ──────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">
            Todo lo que necesitas en un solo lugar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Chat con IA en WhatsApp",
                desc: "El agente atiende pacientes, agenda turnos y responde consultas 24/7 automaticamente. Tus pacientes te escriben por WhatsApp y reciben respuesta al instante.",
              },
              {
                icon: Clock,
                title: "Gestion integral de turnos",
                desc: "Calendario inteligente con agenda online, recordatorios, confirmacion, cola de espera y reasignacion automatica cuando alguien cancela.",
              },
              {
                icon: Smartphone,
                title: "Ficha digital del paciente",
                desc: "Historial clinico completo, imagenes, recetas, plan de tratamiento y evolucion. Accesible desde el celular del profesional en todo momento.",
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

        {/* ─── Para quien es ─────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">
            Pensado para
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Clinicas odontologicas",
                items: [
                  "Multiples consultorios",
                  "Varios profesionales",
                  "Recepcion centralizada",
                ],
              },
              {
                title: "Consultorios individuales",
                items: [
                  "Odontologo solo con su asistente",
                  "Sin personal administrativo",
                  "Quiere automatizar todo",
                ],
              },
              {
                title: "Cadenas y franquicias",
                items: [
                  "Gestion centralizada",
                  "Metricas por sucursal",
                  "Marca unificada",
                ],
              },
            ].map(({ title, items }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
              >
                <h3 className="text-base font-bold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA final ──────────────────────────────────────────────── */}
        <section className="text-center">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-brand-600/5 via-transparent to-brand-800/5 p-8 sm:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 mb-4">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              ¿Listo para verlo en accion?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              Primero chatea con el agente IA para experimentar la atencion
              automatizada. Despues entra a la plataforma y explorala con libertad.
              Cuando quieras, tu asesor comercial te da las credenciales completas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 hover:shadow-green-500/35 transition-all duration-200 w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Chatear con el agente IA
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
              <a
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 border border-border/60 transition-all duration-200 w-full sm:w-auto"
              >
                <Zap className="h-4 w-4" />
                Explorar plataforma
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
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
