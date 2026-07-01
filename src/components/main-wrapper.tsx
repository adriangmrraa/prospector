"use client";

import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOferta = pathname.startsWith("/oferta");

  if (isOferta) {
    return <>{children}</>;
  }

  return (
    <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">
      {children}
    </main>
  );
}
