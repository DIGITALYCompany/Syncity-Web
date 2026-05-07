"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Shield, Star, ArrowRight, CheckCircle, Zap, Target, Eye, BarChart3 } from "lucide-react";

const benefits = [
  { icon: Users, title: "Clientèle qualifiée", description: "Attirez une audience vérifiée, engagée et prête à découvrir de nouveaux lieux." },
  { icon: Shield, title: "Environnement sécurisé", description: "Profitez de notre système de vérification KYC pour des clients identifiés et responsables." },
  { icon: TrendingUp, title: "Visibilité boostée", description: "Apparaissez sur notre carte interactive et touchez des milliers d'utilisateurs actifs." },
  { icon: Star, title: "Badge officiel", description: "Devenez un 'Point de Synchronisation' officiel avec un badge exclusif sur la plateforme." },
];

const partnerTypes = [
  { name: "Bars & Restaurants", features: ["Référencement prioritaire", "Boost événements", "Analytics détaillés"] },
  { name: "Clubs & Discothèques", features: ["Gestion des soirées privées", "Contrôle d'accès intégré", "Feed photos exclusif"] },
  { name: "Espaces de Coworking", features: ["Événements networking", "Communauté professionnelle", "Réservations simplifiées"] },
  { name: "Casinos & Lieux Événementiels", features: ["Expériences VIP", "Accès Sync-Pass Premium", "Partenariats exclusifs"] },
];

const stats = [
  { icon: Users, value: "10k+", label: "Utilisateurs vérifiés" },
  { icon: Eye, value: "50k+", label: "Vues mensuelles" },
  { icon: BarChart3, value: "200+", label: "Événements/mois" },
  { icon: Star, value: "4.9", label: "Note moyenne" },
];

export default function PartenairesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />

      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#252525] rounded-2xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-xs tracking-widest uppercase font-semibold text-gray-500 mb-4">Programme Partenaires B2B</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
              Devenez un Point de<br />
              <span className="text-gray-500">Synchronisation</span>
            </h1>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Rejoignez le réseau SYNCITY et connectez-vous à une communauté vérifiée. Beta à Lyon, bientôt en France.
            </p>
            <Button onClick={() => router.push("/auth")} className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold px-8 py-3 rounded-lg h-auto">
              Devenir partenaire <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-[#252525] rounded-xl p-5 text-center">
                  <Icon className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-white/10 mb-10" />
          <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide mb-8">Pourquoi rejoindre SYNCITY ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-[#252525] rounded-xl p-6 border border-transparent hover:border-white/10 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1.5">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-white/10 mb-10" />
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Types de partenariats</p>
          <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide mb-8">Une offre adaptée à chaque lieu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerTypes.map((type) => (
              <div key={type.name} className="bg-[#252525] rounded-xl p-6 border border-transparent hover:border-white/10 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white">{type.name}</h3>
                </div>
                <ul className="space-y-2">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-gray-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#252525] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <Target className="w-10 h-10 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-3 uppercase">Prêt à synchroniser votre établissement ?</h2>
            <p className="text-gray-400 text-sm mb-6">Contactez-nous pour discuter des opportunités de partenariat.</p>
            <Button onClick={() => router.push("/auth")} className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold px-8 py-3 rounded-lg h-auto">
              S'inscrire maintenant <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
