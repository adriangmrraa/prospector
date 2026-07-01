import {
  MessageCircle, ExternalLink, ShieldCheck, Zap, Clock, Smartphone,
  BrainCircuit, CalendarCheck, Headphones, TrendingUp, Users, HeartPulse,
  TimerReset, Sparkles, Bot, BarChart3, Mic, FileText, DollarSign,
  CheckCircle2,
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

          {/* Metricas rápidas */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8">
            {[
              { value: "40+", label: "horas semanales recuperadas" },
              { value: "24/7", label: "atención automática" },
              { value: "-60%", label: "ausentismo en turnos" },
              { value: "1 clic", label: "activación del asistente" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-brand-500">{value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TORA: CHATEA CON TU INFORMACIÓN ─────────────────── */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 mb-4">
              <MessageCircle className="h-6 w-6 text-brand-500" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3">
              Chateá con <span className="text-brand-500">tu</span> información
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              TORA no es un chatbot genérico. Conoce los servicios de tu clínica,
              los precios, la disponibilidad real de la agenda, tus promociones
              activas y las preguntas frecuentes de tus pacientes. Chatea con tus
              propios datos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: CalendarCheck,
                title: "Agenda turnos al instante",
                desc: "El paciente consulta disponibilidad y agenda sin hablar con una persona. TORA conoce la agenda real, los horarios de cada profesional y las sedes disponibles. Sin idas y vueltas.",
              },
              {
                icon: Headphones,
                title: "Responde consultas 24/7",
                desc: "Precios, horarios, promociones, direcciones, formas de pago. Todo lo que los pacientes preguntan mil veces, TORA lo responde al instante desde tu propia base de conocimientos.",
              },
              {
                icon: HeartPulse,
                title: "Atención omnicanal",
                desc: "TORA atiende por WhatsApp, Instagram y Facebook Messenger. Un mismo asistente, un mismo cerebro, en todos los canales donde están tus pacientes.",
              },
              {
                icon: BrainCircuit,
                title: "Triaje clínico inteligente",
                desc: "El paciente describe sus síntomas y TORA clasifica la urgencia. Detecta emergencias, prioriza atención y deriva al profesional indicado según el caso.",
              },
              {
                icon: TrendingUp,
                title: "Atribución de Meta Ads",
                desc: "Sabés exactamente qué aviso de Instagram o Facebook trajo a cada paciente. TORA saluda al paciente mencionando el aviso que vio y activa el flujo correcto según la campaña.",
              },
              {
                icon: ShieldCheck,
                title: "Verifica pagos con IA",
                desc: "El paciente envía el comprobante de transferencia por WhatsApp y TORA verifica el monto, el titular y lo asocia al turno automáticamente. Sin revisión manual.",
              },
            ].map(({ icon: Icon, title, desc }) => (
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
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── NOVA: AGENTE INTERNO POR VOZ ────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-brand-600/5 via-transparent to-indigo-900/5 p-8 sm:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 mb-4">
                <Mic className="h-6 w-6 text-brand-500" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                Nova: tu asistente interno por voz
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                Mientras TORA atiende a tus pacientes, Nova trabaja con tu equipo.
                Un copiloto de voz que ejecuta tareas clínicas y administrativas
                con solo hablar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  icon: Mic,
                  title: "Registrá evoluciones clínicas hablando",
                  desc: 'Terminaste un procedimiento y decís: "Nova, registrá una evolución de control para Sofía Martínez — se realizó ajuste de ortodoncia, sin complicaciones, próxima cita en 4 semanas." Nova lo escribe automáticamente en la historia clínica. Sin tipear, sin abrir la compu, sin perder tiempo.',
                },
                {
                  icon: DollarSign,
                  title: "Prepará presupuestos con un audio",
                  desc: 'Decís: "Nova, prepará un presupuesto para Juan Pérez con la limpieza y el blanqueamiento." Nova crea el plan de tratamiento, le agrega los ítems con sus precios, genera el PDF y lo envía por WhatsApp al paciente. Todo sin escribir una línea.',
                },
                {
                  icon: FileText,
                  title: "Accedé a la historia clínica al instante",
                  desc: '"Nova, mostrame el historial de María López" — y en segundos tenés en pantalla sus tratamientos, imágenes, recetas y odontograma. Sin buscar carpetas, sin hacer clic.',
                },
                {
                  icon: BarChart3,
                  title: "Consultá métricas y rendimiento",
                  desc: '"Nova, cuántos turnos tuvimos esta semana? ¿Cuál es el rendimiento del Dr. Gómez?" Nova consulta la base de datos y te responde al instante con datos reales.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 shrink-0 mt-0.5">
                      <Icon className="h-5 w-5 text-brand-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-4 py-2 rounded-full">
                <Sparkles className="h-3.5 w-3.5" />
                50 herramientas disponibles por voz — odontograma, pacientes, turnos, facturación, staff y más
              </div>
            </div>
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

        {/* ─── Impacto real ────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-brand-600/5 via-transparent to-brand-800/5 p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                El impacto real
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Clínicas que ya activaron DentalForge:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Users,
                  stat: "40+ hs/sem",
                  label: "que tu recepcionista recupera",
                  desc: "Entre 80 y 120 mensajes por día que TORA responde automáticamente. Agenda, consultas, reprogramaciones — todo sin intervención humana.",
                },
                {
                  icon: TrendingUp,
                  stat: "2.5x mas",
                  label: "turnos agendados sin esfuerzo",
                  desc: "Respuesta instantánea 24/7 en WhatsApp, Instagram y Facebook. Nunca perdés un paciente porque el teléfono sonaba ocupado o era fuera de horario.",
                },
                {
                  icon: Clock,
                  stat: "60% menos",
                  label: "ausentismo en turnos",
                  desc: "Recordatorios automáticos con confirmación por WhatsApp. Los pacientes confirman o cancelan con tiempo para reasignar el turno.",
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

        {/* ─── Pensado para ─────────────────────────────────────────── */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">
            Pensado para
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Clínicas odontológicas",
                items: [
                  "Múltiples consultorios",
                  "Varios profesionales",
                  "Recepción centralizada",
                ],
              },
              {
                title: "Consultorios individuales",
                items: [
                  "Odontólogo solo con su asistente",
                  "Sin personal administrativo",
                  "Quiere automatizar todo",
                ],
              },
              {
                title: "Cadenas y franquicias",
                items: [
                  "Gestión centralizada",
                  "Métricas por sucursal",
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
              ¿Listo para verlo en acción?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              Primero chatea con TORA para experimentar la atención automatizada.
              Después entrá a la plataforma y explorala con libertad.
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
                Chatear con TORA
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
            <span className="font-semibold text-foreground">DentalForge</span>.
            Las credenciales de acceso completo son provistas por tu asesor
            comercial.
          </p>
        </footer>
      </main>
    </div>
  );
}
