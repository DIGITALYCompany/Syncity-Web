"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  LogOut, Users, Eye, Calendar, Settings, Star, MapPin, Clock,
  Plus, Pencil, Trash2, X, Save, Share2, Bell, Zap, CheckCircle,
  Shield, Gift, Building2, ShieldCheck, BarChart3, TrendingUp, ArrowLeft,
} from "lucide-react";
import { DUMMY_PARTNER_EVENTS, DUMMY_PROMOS } from "@/lib/dummy-data";

interface SyncityUser {
  email: string;
  name: string;
  type: string;
  businessName?: string;
}

const CATEGORIES = ["Soirée", "Musique", "Sport", "Networking", "Travail", "Culture", "Gastronomie", "Autre"];
const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
];

const emptyEvent = {
  title: "", description: "", category: "Soirée", location_name: "", location_address: "",
  date: "", time: "20h00", price: "Gratuit", max_participants: 100, image_url: EVENT_IMAGES[0],
};

export default function PartnerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SyncityUser | null>(null);
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState(DUMMY_PARTNER_EVENTS);
  const [promos, setPromos] = useState(DUMMY_PROMOS);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<(typeof DUMMY_PARTNER_EVENTS)[0] | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ ...emptyEvent });
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [promoForm, setPromoForm] = useState({ title: "", description: "", conditions: "" });
  const [profileForm, setProfileForm] = useState({ business_name: "", description: "", address: "", phone: "", website: "", category: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("syncity_user");
    if (!stored) { router.push("/auth"); return; }
    const userData = JSON.parse(stored) as SyncityUser;
    if (userData.type !== "partner") { router.push("/dashboard"); return; }
    setUser(userData);
    setProfileForm((prev) => ({ ...prev, business_name: userData.businessName || "" }));
  }, [router]);

  const handleLogout = () => { localStorage.removeItem("syncity_user"); router.push("/"); };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location_name || !formData.date) {
      toast.error("Remplis le titre, le lieu et la date"); return;
    }
    setLoading(true);
    setTimeout(() => {
      if (editingEvent) {
        setEvents((prev) => prev.map((ev) => ev.id === editingEvent.id ? { ...ev, ...formData } : ev));
        toast.success("Événement modifié !");
      } else {
        const newEvent = {
          ...emptyEvent, ...formData,
          id: `pe${Date.now()}`, participants_count: 0, views_count: 0, shares_count: 0,
          boost_active: false, creator_email: user?.email || "",
          latitude: 45.7640, longitude: 4.8357,
        };
        setEvents((prev) => [newEvent, ...prev]);
        toast.success("Événement créé !");
      }
      setShowEventForm(false); setEditingEvent(null); setFormData({ ...emptyEvent });
      setLoading(false);
    }, 600);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (selectedEventId === id) setSelectedEventId(null);
    toast.success("Événement supprimé");
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.title) { toast.error("Ajoute un titre à ton offre"); return; }
    setLoading(true);
    setTimeout(() => {
      setPromos((prev) => [{
        id: `p${Date.now()}`, ...promoForm, active: true, redemptions: 0,
        creator_email: user?.email || "", establishment_id: "",
        created_at: new Date().toISOString(),
      }, ...prev]);
      toast.success("Offre créée !"); setShowPromoForm(false);
      setPromoForm({ title: "", description: "", conditions: "" });
      setLoading(false);
    }, 500);
  };

  const togglePromo = (id: string) => {
    setPromos((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deletePromo = (id: string) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Offre supprimée");
  };

  const startEdit = (event: typeof DUMMY_PARTNER_EVENTS[0]) => {
    setEditingEvent(event);
    setFormData({
      title: event.title, description: event.description, category: event.category,
      location_name: event.location_name, location_address: event.location_address,
      date: event.date, time: event.time, price: event.price,
      max_participants: event.max_participants, image_url: event.image_url,
    });
    setShowEventForm(true);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { toast.success("Profil mis à jour !"); setLoading(false); }, 500);
  };

  if (!user) return null;

  const totalParticipants = events.reduce((s, e) => s + (e.participants_count || 0), 0);
  const totalViews = events.reduce((s, e) => s + (e.views_count || 0), 0);
  const totalShares = events.reduce((s, e) => s + (e.shares_count || 0), 0);

  const selectedEvent = selectedEventId ? events.find((e) => e.id === selectedEventId) : null;
  const fillRate = selectedEvent ? Math.round((selectedEvent.participants_count / selectedEvent.max_participants) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-xl text-white">SYNCITY</Link>
            <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full font-medium">Partenaire</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{profileForm.business_name || user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
                {profileForm.business_name || "Espace Partenaire"}
              </h1>
              <p className="text-gray-500 text-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />Point de Synchronisation
              </p>
            </div>
            <Button
              onClick={() => { setEditingEvent(null); setFormData({ ...emptyEvent }); setShowEventForm(true); setSelectedEventId(null); }}
              className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold px-5 py-2.5 rounded-lg h-auto"
            >
              <Plus className="w-4 h-4 mr-2" />Créer un événement
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Calendar, label: "Événements", value: events.length, sub: "actifs" },
              { icon: Users, label: "Participants", value: totalParticipants, sub: "total inscrits" },
              { icon: Eye, label: "Vues totales", value: totalViews, sub: "fiches consultées" },
              { icon: Share2, label: "Partages", value: totalShares, sub: "fois partagé" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-[#252525] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><Icon className="w-4 h-4 text-white" /></div>
                    <span className="text-[11px] text-gray-500">{s.sub}</span>
                  </div>
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              );
            })}
          </div>

          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSelectedEventId(null); }}>
            <TabsList className="bg-[#252525] border border-white/10 mb-6 h-auto p-1">
              <TabsTrigger value="events" className="text-gray-400 px-4 py-2 text-sm">
                <Calendar className="w-4 h-4 mr-2" />Événements
              </TabsTrigger>
              <TabsTrigger value="promos" className="text-gray-400 px-4 py-2 text-sm">
                <Gift className="w-4 h-4 mr-2" />Offres
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-gray-400 px-4 py-2 text-sm">
                <Settings className="w-4 h-4 mr-2" />Profil
              </TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events">
              {selectedEventId && selectedEvent ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <button onClick={() => setSelectedEventId(null)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <ArrowLeft className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-white text-lg truncate">{selectedEvent.title}</h2>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />{selectedEvent.location_name} — {selectedEvent.date}, {selectedEvent.time}
                      </p>
                    </div>
                    <img src={selectedEvent.image_url} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { icon: Eye, label: "Vues", value: selectedEvent.views_count, sub: "consultations" },
                      { icon: Users, label: "Participants", value: `${selectedEvent.participants_count}/${selectedEvent.max_participants}`, sub: "ont indiqué venir" },
                      { icon: TrendingUp, label: "Conversion", value: selectedEvent.views_count > 0 ? `${Math.round((selectedEvent.participants_count / selectedEvent.views_count) * 100)}%` : "0%", sub: "vues → inscriptions" },
                      { icon: Share2, label: "Partages", value: selectedEvent.shares_count, sub: "fois partagé" },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="bg-[#252525] rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Icon className="w-4 h-4 text-gray-500" />
                            <span className="text-[10px] text-gray-600 uppercase tracking-wider">{stat.label}</span>
                          </div>
                          <p className="text-2xl font-black text-white">{stat.value}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{stat.sub}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-[#252525] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">Taux de remplissage</h3>
                      <span className="text-sm font-bold text-white">{fillRate}%</span>
                    </div>
                    <Progress value={fillRate} className="h-3" />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-500">{selectedEvent.participants_count} inscrits</span>
                      <span className="text-[11px] text-gray-500">{selectedEvent.max_participants} places max</span>
                    </div>
                  </div>
                </div>
              ) : events.length === 0 ? (
                <div className="bg-[#252525] rounded-xl p-12 text-center">
                  <Calendar className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <p className="text-white font-semibold mb-1">Aucun événement</p>
                  <p className="text-gray-500 text-sm mb-4">Crée ton premier événement pour apparaître sur la carte</p>
                  <Button onClick={() => setShowEventForm(true)} className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />Créer un événement
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`bg-[#252525] rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors ${event.boost_active ? "ring-1 ring-yellow-500/30" : ""}`}
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <img src={event.image_url} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm truncate">{event.title}</h3>
                          {event.boost_active && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 flex items-center gap-1 shrink-0">
                              <Zap className="w-2.5 h-2.5" />Boost
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location_name}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500 shrink-0">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{event.views_count}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{event.participants_count}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); startEdit(event); }} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <Pencil className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Promos Tab */}
            <TabsContent value="promos">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Offres promotionnelles</h3>
                    <p className="text-xs text-gray-500">Attirez de nouveaux clients avec des offres exclusives</p>
                  </div>
                  <Button onClick={() => setShowPromoForm(!showPromoForm)} className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold px-4 py-2 rounded-lg text-sm h-auto">
                    <Plus className="w-4 h-4 mr-1.5" />Nouvelle offre
                  </Button>
                </div>

                {showPromoForm && (
                  <form onSubmit={handlePromoSubmit} className="bg-[#252525] rounded-xl p-5 mb-4 border border-white/10 space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-gray-400 text-sm">Titre de l'offre *</Label>
                      <Input value={promoForm.title} onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                        placeholder="Ex: 1 shot offert, -10% sur l'addition..."
                        className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-gray-400 text-sm">Description</Label>
                      <textarea value={promoForm.description} onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                        rows={2} placeholder="Décris ton offre..."
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-md text-white px-3 py-2 focus:border-white/30 resize-none text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-gray-400 text-sm">Conditions</Label>
                      <Input value={promoForm.conditions} onChange={(e) => setPromoForm({ ...promoForm, conditions: e.target.value })}
                        placeholder="Ex: Sur présentation du compte SYNCITY..."
                        className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" />
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" onClick={() => setShowPromoForm(false)} className="text-gray-400 hover:text-white hover:bg-white/10">Annuler</Button>
                      <Button type="submit" disabled={loading} className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg">
                        {loading ? "..." : "Publier l'offre"}
                      </Button>
                    </div>
                  </form>
                )}

                {promos.length === 0 && !showPromoForm ? (
                  <div className="bg-[#252525] rounded-xl p-12 text-center">
                    <Gift className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                    <p className="text-white font-semibold mb-1">Aucune offre</p>
                    <p className="text-gray-500 text-sm mb-4 max-w-sm mx-auto">Crée une offre promo pour attirer des membres SYNCITY.</p>
                    <Button onClick={() => setShowPromoForm(true)} className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg">
                      <Plus className="w-4 h-4 mr-1.5" />Créer une offre
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {promos.map((promo) => (
                      <div key={promo.id} className={`bg-[#252525] rounded-xl p-4 border transition-all ${promo.active ? "border-green-500/20" : "border-white/5 opacity-60"}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${promo.active ? "bg-green-500/10" : "bg-white/5"}`}>
                              <Gift className={`w-5 h-5 ${promo.active ? "text-green-400" : "text-gray-500"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-white text-sm truncate">{promo.title}</h4>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${promo.active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-500"}`}>
                                  {promo.active ? "Active" : "Inactive"}
                                </span>
                              </div>
                              {promo.description && <p className="text-xs text-gray-400 mt-0.5">{promo.description}</p>}
                              {promo.conditions && <p className="text-[11px] text-gray-500 mt-1 italic">{promo.conditions}</p>}
                              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{promo.redemptions} utilisation{promo.redemptions !== 1 ? "s" : ""}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => togglePromo(promo.id)}
                              className={`p-2 rounded-lg text-xs font-medium ${promo.active ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"} transition-colors`}>
                              {promo.active ? "Désactiver" : "Activer"}
                            </button>
                            <button onClick={() => deletePromo(promo.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors">
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <form onSubmit={handleProfileSubmit} className="bg-[#252525] rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-gray-400 text-sm">Nom de l'établissement</Label>
                    <Input value={profileForm.business_name} onChange={(e) => setProfileForm({ ...profileForm, business_name: e.target.value })}
                      className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-400 text-sm">Catégorie</Label>
                    <select value={profileForm.category} onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                      className="w-full h-11 bg-[#1a1a1a] border border-white/10 rounded-md text-white px-3 focus:border-white/30">
                      <option value="">Sélectionner</option>
                      {["Bar", "Restaurant", "Club", "Coworking", "Salle de sport", "Casino", "Autre"].map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-gray-400 text-sm">Description</Label>
                    <textarea value={profileForm.description} onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                      rows={3} className="w-full bg-[#1a1a1a] border border-white/10 rounded-md text-white px-3 py-2 focus:border-white/30 resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-400 text-sm">Adresse</Label>
                    <Input value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="1 Rue de la Barre, Lyon" className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-400 text-sm">Téléphone</Label>
                    <Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="04 XX XX XX XX" className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-gray-400 text-sm">Site web</Label>
                    <Input value={profileForm.website} onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      placeholder="https://..." className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg">
                  <Save className="w-4 h-4 mr-2" />{loading ? "..." : "Enregistrer"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#252525] rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto border border-white/10">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="font-bold text-white">{editingEvent ? "Modifier l'événement" : "Nouvel événement"}</h2>
              <button onClick={() => { setShowEventForm(false); setEditingEvent(null); }} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEventSubmit} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-gray-400 text-sm">Titre *</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Soirée Afterwork" className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-400 text-sm">Description</Label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2} placeholder="Décris ton événement..."
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-md text-white px-3 py-2 focus:border-white/30 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-sm">Catégorie</Label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-11 bg-[#1a1a1a] border border-white/10 rounded-md text-white px-3 focus:border-white/30">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-sm">Prix</Label>
                  <Input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Gratuit" className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-400 text-sm">Lieu *</Label>
                <Input value={formData.location_name} onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                  placeholder="Le Sucre, Lyon 2e" className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-sm">Date *</Label>
                  <Input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Sam. 25 Jan" className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-400 text-sm">Heure</Label>
                  <Input value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="20h00" className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-400 text-sm">Image</Label>
                <div className="grid grid-cols-3 gap-2">
                  {EVENT_IMAGES.map((img) => (
                    <button key={img} type="button" onClick={() => setFormData({ ...formData, image_url: img })}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${formData.image_url === img ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <img src={img} alt="" className="w-full h-14 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={() => { setShowEventForm(false); setEditingEvent(null); }}
                  className="flex-1 text-gray-400 hover:text-white hover:bg-white/10">Annuler</Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg">
                  {loading ? "..." : editingEvent ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
