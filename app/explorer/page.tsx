"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Users, UserCheck, Share2, Gift, Zap } from "lucide-react";
import { toast } from "sonner";
import { DUMMY_EVENTS, DUMMY_PROMOS } from "@/lib/dummy-data";

const MapView = dynamic(() => import("@/components/explorer/MapView"), { ssr: false, loading: () => (
  <div className="h-[50vh] md:h-[60vh] bg-[#252525] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
) });

type Event = typeof DUMMY_EVENTS[0];

export default function ExplorerPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const categories = ["Tous", ...Array.from(new Set(DUMMY_EVENTS.map((e) => e.category)))];
  const filteredEvents = selectedCategory === "Tous" ? DUMMY_EVENTS : DUMMY_EVENTS.filter((e) => e.category === selectedCategory);

  const handleJoin = (event: Event) => {
    const storedUser = localStorage.getItem("syncity_user");
    if (!storedUser) { toast.error("Connecte-toi pour participer"); return; }
    toast.success(`Inscription confirmée pour "${event.title}" !`);
  };

  const handleShare = async (event: Event) => {
    try {
      if (navigator.share) {
        await navigator.share({ title: event.title, text: `${event.title} — ${event.location_name}`, url: window.location.href });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Lien copié !");
      } else {
        toast.success("Partage enregistré !");
      }
    } catch {
      toast.success("Partage enregistré !");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      <div className="pt-20">
        {/* Map with category filter */}
        <div className="relative">
          {/* Category overlay above map */}
          <div className="absolute top-4 left-4 right-4 z-[500] flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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
          <MapView
            events={DUMMY_EVENTS}
            selectedCategory={selectedCategory}
            onSelectEvent={setSelectedEvent}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              {filteredEvents.length} événement{filteredEvents.length !== 1 ? "s" : ""} à Lyon
            </h2>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-[#252525] rounded-xl p-12 text-center">
              <Calendar className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">Aucun événement pour cette catégorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`bg-[#252525] rounded-xl overflow-hidden cursor-pointer group border transition-all duration-200 ${
                    event.boost_active
                      ? "border-yellow-500/30 ring-1 ring-yellow-500/20 shadow-[0_0_24px_-8px_rgba(250,204,21,0.3)]"
                      : selectedEvent?.id === event.id ? "border-white/30" : "border-transparent hover:border-white/10"
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={event.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-white text-[#1a1a1a] text-xs font-bold px-2.5 py-1 rounded-md w-fit">{event.category}</span>
                      {event.boost_active && (
                        <span className="flex items-center gap-1 bg-yellow-400 text-[#1a1a1a] text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-md w-fit">
                          <Zap className="w-3 h-3 fill-current" />Sponsorisé
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md">{event.price}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-2 text-sm">{event.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                      <MapPin className="w-3 h-3 shrink-0" /><span className="truncate">{event.location_name}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
                      </div>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.participants_count}/{event.max_participants}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => { e.stopPropagation(); handleJoin(event); }}
                        className="flex-1 h-9 bg-white text-[#1a1a1a] hover:bg-gray-200 font-semibold rounded-lg text-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5 mr-1.5" />Je participe
                      </Button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleShare(event); }}
                        className="h-9 w-9 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/15 transition-colors shrink-0"
                      >
                        <Share2 className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {DUMMY_PROMOS.length > 0 && (
            <div className="mt-8">
              <div className="h-px bg-white/10 mb-6" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-400" />Offres partenaires
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DUMMY_PROMOS.map((promo) => (
                  <div key={promo.id} className="bg-[#252525] rounded-xl p-4 border border-green-500/10 hover:border-green-500/20 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                        <Gift className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm">{promo.title}</h3>
                        {promo.description && <p className="text-xs text-gray-400 mt-0.5">{promo.description}</p>}
                        {promo.conditions && (
                          <p className="text-[11px] text-green-400/70 mt-1.5 bg-green-500/10 px-2 py-1 rounded inline-block">{promo.conditions}</p>
                        )}
                        <Button
                          onClick={() => toast.success("QR code généré ! Montre-le à l'établissement.")}
                          className="mt-3 h-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-semibold rounded-lg text-xs border border-green-500/20 w-full"
                        >
                          Utiliser l'offre
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
