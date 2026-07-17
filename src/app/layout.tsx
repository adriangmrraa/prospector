import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { MainWrapper } from "@/components/main-wrapper";
import { SWRegister } from "@/components/pwa/sw-register";
import { getSession } from "@/app/actions/auth";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prospector — Gestión de Prospectos",
  description: "Pipeline de prospección de clínicas dentales en Córdoba",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Prospector",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-full flex flex-col bg-grid-pattern">
        <SWRegister />
        <NavbarWrapper session={session} />
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
