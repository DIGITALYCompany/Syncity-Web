"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Zap } from "lucide-react";
import { DUMMY_EVENTS } from "@/lib/dummy-data";

// Fix leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const customIcon = new L.DivIcon({
  html: `<div style="background:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  </div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const boostedIcon = new L.DivIcon({
  html: `<div style="background:#facc15;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(250,204,21,0.5);border:2px solid white">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
  </div>`,
  className: "",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

interface Props {
  events: typeof DUMMY_EVENTS;
  selectedCategory: string;
  onSelectEvent: (event: typeof DUMMY_EVENTS[0]) => void;
}

export default function MapView({ events, selectedCategory, onSelectEvent }: Props) {
  const filtered = selectedCategory === "Tous" ? events : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="relative h-[50vh] md:h-[60vh]">
      <MapContainer
        center={[45.7640, 4.8357]}
        zoom={13}
        className="h-full w-full z-0"
        style={{ background: "#1a1a1a" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {filtered.map((event) => (
          <Marker
            key={event.id}
            position={[event.latitude, event.longitude]}
            icon={event.boost_active ? boostedIcon : customIcon}
            eventHandlers={{ click: () => onSelectEvent(event) }}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                {event.boost_active && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-600 border border-yellow-500/30 mb-1">
                    Sponsorisé
                  </span>
                )}
                <p className="font-bold text-sm">{event.title}</p>
                <p className="text-xs text-gray-500">{event.location_name}</p>
                <p className="text-xs text-gray-500">{event.date} — {event.time}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 left-4 right-4 z-[400] flex gap-2 overflow-x-auto pb-2">
        {["Tous", ...new Set(events.map((e) => e.category))].map((cat) => (
          <button
            key={cat}
            onClick={() => {}}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === cat
                ? "bg-white text-[#1a1a1a] border-white"
                : "bg-[#1a1a1a]/80 backdrop-blur text-gray-300 border-white/10 hover:bg-[#252525]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
