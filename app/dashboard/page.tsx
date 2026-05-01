"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Bell, Settings, LogOut, ChevronRight, Ticket, Star, Shield, Camera } from "lucide-react";

interface SyncityUser {
  email: string;
  name: string;
  type: string;
  joinedBeta: string;
}

const menuItems = [
  { icon: MapPin, label: "Explorer", description: "Découvrir les événements près de toi" },
  { icon: Calendar, label: "Mes événements", description: "Événements à venir et passés" },
  { icon: Users, label: "Ma communauté", description: "Tes connexions SYNCITY" },
  { icon: Camera, label: "Mes check-ins", description: "Photos et souvenirs validés" },
  { icon: Bell, label: "Notifications", description: "Alertes et nouveautés" },
  { icon: Settings, label: "Paramètres", description: "Gérer ton compte" },
];

export default function UserDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SyncityUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("syncity_user");
    if (!stored) { router.push("/auth"); return; }
    const userData = JSON.parse(stored) as SyncityUser;
    if (userData.type === "partner") { router.push("/dashboard/partenaire"); return; }
    setUser(userData);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("syncity_user");
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-white">SYNCITY</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Bienvenue, {user.name}</h1>
            <p className="text-gray-500 text-sm">Ton espace personnel SYNCITY</p>
          </div>

          <div className="mb-8 p-6 rounded-xl bg-[#252525] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Ticket className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-gray-400">Sync-Pass</span>
                </div>
                <h2 className="text-xl font-black text-white">BETA ACCESS</h2>
              </div>
              <Star className="w-6 h-6 text-yellow-400/60" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Membre depuis</p>
                <p className="text-sm font-semibold text-white">
                  {new Date(user.joinedBeta).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs font-semibold text-white">Vérifié</span>
              </div>
            </div>
          </div>

          <div className="mb-8 p-3 rounded-lg bg-[#252525] border border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              <span className="text-white font-semibold">Phase Beta</span> — L'app complète arrive bientôt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="p-5 rounded-xl bg-[#252525] border border-transparent hover:border-white/10 transition-all text-left group relative"
                  disabled
                >
                  <span className="absolute top-4 right-4 text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full font-medium">Bientôt</span>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm flex items-center gap-1.5">
                        {item.label}
                        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
