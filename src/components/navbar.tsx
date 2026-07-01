"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, LayoutDashboard, List, LogOut, User, BookOpen } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: List },
  { href: "/mapa", label: "Mapa", icon: MapPin },
  { href: "/guia", label: "Guía", icon: BookOpen },
];

interface NavbarProps {
  session: { id: number; username: string } | null;
}

export function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/30 transition-shadow">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="gradient-text">Prospector</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover active:bg-surface-active"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-brand-500 dark:bg-brand-400" />
                )}
              </Link>
            );
          })}

          {session && (
            <>
              <div className="w-px h-5 bg-border mx-1" />
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="font-medium">{session.username}</span>
              </div>
              <form action="/api/logout" method="post">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
