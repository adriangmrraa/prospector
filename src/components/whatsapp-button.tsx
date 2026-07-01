import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_MESSAGE =
  "Hola! Tenemos un software excelente, que ahorra decenas de horas semanales a Clinicas en todo LATAM. Nuestro objetivo es que centralices y delegues a un sistema que ayuda enserio a la clinica o centro dental! Profesionales que ya trabajan con nosotros estan ahorrando horas todos los dias, delegando acciones o chateando con la informacion de sus pacientes. Tenemos una demo lista para que la pruebes sin costo y sin compromiso. Si te interesa saber mas, podemos coordinar una demo mas inmersiva donde pueda ver internamente la plataforma, entender funciones y como operarias diariamente con el sistema...";

interface WhatsAppButtonProps {
  phone: string | null | undefined;
  message: string | null | undefined;
  className?: string;
}

/**
 * Extrae solo digitos del valor recibido.
 * Si empieza con http o wa.me, parsea la URL para extraer el numero.
 */
function extractDigits(raw: string): string {
  if (!raw) return "";

  const trimmed = raw.trim();

  // Si es URL, extraer numero del pathname
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("wa.me")
  ) {
    try {
      const url = trimmed.startsWith("wa.me")
        ? `https://${trimmed}`
        : trimmed;
      const parsed = new URL(url);
      const pathDigits = parsed.pathname.replace(/\D/g, "");
      if (pathDigits.length >= 7) return pathDigits;
    } catch {
      // fall through a extraccion directa de digitos
    }
  }

  return trimmed.replace(/\D/g, "");
}

/**
 * Formatea numero argentino: 549 + numero (sin 0 ni 15).
 */
function formatArgentinaPhone(digits: string): string {
  if (digits.startsWith("549")) return digits;
  if (digits.startsWith("54")) return `549${digits.slice(2)}`;

  let cleaned = digits;
  if (cleaned.startsWith("015")) cleaned = cleaned.slice(3);
  else if (cleaned.startsWith("15")) cleaned = cleaned.slice(2);
  else if (cleaned.startsWith("0")) cleaned = cleaned.slice(1);

  return `549${cleaned}`;
}

export function WhatsAppButton({
  phone,
  message,
  className,
}: WhatsAppButtonProps) {
  if (!phone) return null;

  const digits = extractDigits(phone);
  if (digits.length < 7) return null;

  const number = formatArgentinaPhone(digits);
  const text = message || DEFAULT_MESSAGE;
  const href = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 active:bg-green-700 transition-colors shadow-sm min-h-[44px]",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      <span>WhatsApp</span>
    </a>
  );
}
