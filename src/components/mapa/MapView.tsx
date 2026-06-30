"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import type { Lead } from "@/db/schema";
import { calculateTspRoute, calculateTotalDistance } from "@/lib/route-planner";

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

type LeafletIcon = ReturnType<typeof import("leaflet").divIcon>;
type LeafletLatLng = [number, number];

export default function MapView({ leads, showOnlyRouted = false, height = "100%" }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<LeafletLatLng | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load leaflet icons (fix for webpack)
  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      // Fix default icon paths
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
      (err) => {
        setLocationError("No se pudo obtener tu ubicación: " + err.message);
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
      className: "user-location-marker",
      html: `<div style="
        width: 24px; height: 24px; 
        background: #3b82f6; 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 0 10px rgba(59,130,246,0.6);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }, [L]);

  const leadIcon = useMemo(() => {
    if (!L) return undefined;
    return L.divIcon({
      className: "lead-marker",
      html: `<div style="
        width: 14px; height: 14px; 
        background: #ef4444; 
        border: 2px solid white; 
        border-radius: 50%; 
        box-shadow: 0 0 6px rgba(239,68,68,0.4);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  }, [L]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-lg">
        <p className="text-muted-foreground">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      <MapContainer
        center={center}
        zoom={13}
        className="rounded-lg border shadow-sm w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && userIcon && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-sm">
                <strong>📌 Tu ubicación</strong>
                <br />
                {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Lead markers */}
        {leadIcon &&
          validLeads.map((lead) => (
            <Marker
              key={lead.id}
              position={[lead.lat, lead.lng]}
              icon={leadIcon}
            >
              <Popup>
                <div className="text-sm max-w-[250px]">
                  <strong className="text-base">{lead.nombre}</strong>
                  {lead.rating && (
                    <span className="ml-1 text-yellow-500">
                      ★ {lead.rating}
                    </span>
                  )}
                  <br />
                  {lead.direccion && <span className="text-muted-foreground">{lead.direccion}</span>}
                  {lead.telefono && (
                    <>
                      <br />
                      <span>📞 {lead.telefono}</span>
                    </>
                  )}
                  {lead.scrapedWhatsapp && (
                    <>
                      <br />
                      <a
                        href={lead.scrapedWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        💬 WhatsApp
                      </a>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Route polyline */}
        {routeLatLngs.length > 1 && (
          <Polyline
            positions={routeLatLngs}
            color="#3b82f6"
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
      </MapContainer>

      {/* Info overlay */}
      <div className="absolute top-3 left-3 z-[1000] space-y-1">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg shadow p-2 text-xs">
          <span className="font-medium">📍 {validLeads.length} clínicas</span>
        </div>
        {route.length > 1 && (
          <div className="bg-background/90 backdrop-blur-sm rounded-lg shadow p-2 text-xs">
            <span className="font-medium">🛣️ {totalDistance} km (ruta óptima)</span>
          </div>
        )}
        {userLocation && (
          <div className="bg-blue-500/90 text-white rounded-lg shadow p-2 text-xs">
            📌 Tu ubicación
          </div>
        )}
        {locationError && (
          <div className="bg-yellow-500/90 text-white rounded-lg shadow p-2 text-xs">
            ⚠️ {locationError}
          </div>
        )}
      </div>
    </div>
  );
}
