"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

interface NavbarWrapperProps {
  session: { id: number; username: string } | null;
}

export function NavbarWrapper({ session }: NavbarWrapperProps) {
  const pathname = usePathname();
  const isOferta = pathname.startsWith("/oferta");

  if (isOferta) return null;

  return <Navbar session={session} />;
}
