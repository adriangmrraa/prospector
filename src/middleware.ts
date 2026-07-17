import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "session";

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = new Set(["/login", "/oferta", "/offline"]);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Siempre permitir rutas públicas
  if (PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  // Permitir assets estáticos, API y favicon siempre
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Verificar sesión
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
