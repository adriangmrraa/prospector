"use client";

import { useEffect } from "react";

/**
 * SWRegister — Registra el Service Worker para funcionamiento offline.
 * Se monta una sola vez en el root layout.
 */
export function SWRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.log("[PWA] Service Workers no soportados en este navegador");
      return;
    }

    let mounted = true;

    async function register() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        console.log("[PWA] Service Worker registrado:", registration.scope);

        // Detectar actualizaciones del SW
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (installing) {
            installing.addEventListener("statechange", () => {
              if (installing.state === "installed" && navigator.serviceWorker.controller) {
                // Nuevo SW instalado, esperando activación
                console.log("[PWA] Nueva versión disponible — actualizá la página");
              }
            });
          }
        });
      } catch (err) {
        console.warn("[PWA] Error registrando Service Worker:", err);
      }
    }

    // Registrar cuando el DOM esté listo
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
