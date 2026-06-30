import Link from "next/link";
import { MapPin, LayoutDashboard, List, GitBranch } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span>Prospector</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            href="/leads"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Leads</span>
          </Link>
          <Link
            href="/mapa"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Mapa</span>
          </Link>
          <a
            href="https://github.com/adriangmrraa/prospector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitBranch className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
