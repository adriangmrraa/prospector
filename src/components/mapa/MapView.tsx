"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import type { Lead } from "@/db/schema";
import { calculateTspRoute, calculateTotalDistance } from "@/lib/route-planner";
import { MapPin, Navigation, Route, Crosshair } from "lucide-react";

// Leaflet must be imported dynamically (no SSR)
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((m) => m.Polyline), { ssr: false });



interface MapViewProps {
  leads: Lead[];
  showOnlyRouted?: boolean;
  height?: string;
}

type LeafletLatLng = [number, number];

export default function MapView({ leads, showOnlyRouted = false, height = "100%" }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<LeafletLatLng | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<any>(null);

  // Load leaflet icons
  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setL(leaflet);
      setMounted(true);
    })();
  }, []);

  // Get user geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        setLocationError("No se pudo obtener tu ubicación");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Filter leads with valid coordinates
  const validLeads = useMemo(
    () =>
      leads.filter((l) => l.lat && l.lng).map((l) => ({
        ...l,
        lat: Number(l.lat),
        lng: Number(l.lng),
      })),
    [leads]
  );

  // Calculate TSP route
  const route = useMemo(() => {
    if (validLeads.length === 0) return [];
    const coords = validLeads.map((l) => ({
      id: l.id,
      nombre: l.nombre,
      lat: l.lat,
      lng: l.lng,
    }));
    return calculateTspRoute(
      coords,
      userLocation?.[0],
      userLocation?.[1]
    );
  }, [validLeads, userLocation]);

  const totalDistance = useMemo(() => calculateTotalDistance(route), [route]);

  const routeLatLngs: LeafletLatLng[] = useMemo(
    () => route.map((r) => [r.lat, r.lng]),
    [route]
  );

  const center: LeafletLatLng = useMemo(() => {
    if (userLocation) return userLocation;
    if (validLeads.length > 0) return [validLeads[0].lat, validLeads[0].lng];
    return [-31.4167, -64.1833]; // Córdoba center
  }, [userLocation, validLeads]);

  const userIcon = useMemo(() => {
    if (!L) return undefined;
    return L.divIcon({
      className: "",
      html: `<div style="
        width: 28px; height: 28px;
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(99,102,241,0.3), 0 2px 8px rgba(0,0,0,0.2);
        display: flex; align-items: center; justify-content: center;
      ">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
        </svg>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  }, [L]);

  const leadIcon = useMemo(() => {
    if (!L) return undefined;
    return L.divIcon({
      className: "",
      html: `<div style="
        width: 16px; height: 16px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        border: 2.5px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 3px rgba(239,68,68,0.25), 0 2px 6px rgba(0,0,0,0.15);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  }, [L]);

  const locatorUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 15, { duration: 1.5 });
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-surface rounded-2xl gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && userIcon && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500 inline-block" />
                  Tu ubicación
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Lead markers */}
        {leadIcon &&
          (showOnlyRouted ? validLeads.filter((l) => l.routeOrder) : validLeads).map((lead) => (
            <Marker
              key={lead.id}
              position={[lead.lat, lead.lng]}
              icon={leadIcon}
            >
              <Popup>
                <div className="space-y-2 max-w-[240px]">
                  <p className="font-semibold text-sm leading-tight">{lead.nombre}</p>
                  {lead.rating && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium">{lead.rating}</span>
                    </div>
                  )}
                  {lead.direccion && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lead.direccion}
                    </p>
                  )}
                  {lead.telefono && (
                    <a
                      href={`tel:${lead.telefono}`}
                      className="block text-xs text-brand-500 hover:text-brand-600 font-medium"
                    >
                      📞 {lead.telefono}
                    </a>
                  )}
                  {lead.scrapedWhatsapp && (
                    <a
                      href={lead.scrapedWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-emerald-500 hover:text-emerald-600 font-medium"
                    >
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Route polyline */}
        {routeLatLngs.length > 1 && (
          <Polyline
            positions={routeLatLngs}
            color="#6366f1"
            weight={3}
            opacity={0.6}
            dashArray="8, 10"
          />
        )}
      </MapContainer>

      {/* Info overlay */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-1.5">
        <div className="glass-strong rounded-xl shadow-lg px-3.5 py-2 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-red-500" />
            {validLeads.length} clínicas
          </span>
        </div>
        {route.length > 1 && (
          <div className="glass-strong rounded-xl shadow-lg px-3.5 py-2 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Route className="h-3.5 w-3.5 text-brand-500" />
              {totalDistance} km (ruta óptima)
            </span>
          </div>
        )}
        {userLocation && (
          <button
            onClick={locatorUser}
            className="glass-strong rounded-xl shadow-lg px-3.5 py-2 text-xs font-medium text-left hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Navigation className="h-3.5 w-3.5 text-brand-500" />
              Mi ubicación
            </span>
          </button>
        )}
        {locationError && (
          <div className="rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 shadow-lg px-3.5 py-2 text-xs font-medium text-amber-700 dark:text-amber-400">
            <span className="flex items-center gap-1.5">
              <Crosshair className="h-3.5 w-3.5" />
              {locationError}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
