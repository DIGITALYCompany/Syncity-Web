"use client";

import { LegalLayout } from "@/components/layout/LegalLayout";
import { Shield, MapPin, Camera, Users, Quote, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const content = {
  fr: {
    title: "À propos de SYNCITY",
    missionTitle: "Notre mission",
    missionText: "SYNCITY est né d'un constat simple : les réseaux sociaux nous ont éloignés les uns des autres. Faux profils, ghosting, insécurité... On mérite mieux. Notre mission est de reconnecter les gens dans la vraie vie, autour de ce qu'ils aiment, dans un environnement 100% sécurisé et vérifié.",
    pillarsTitle: "Nos piliers",
    pillars: [
      { icon: Shield, title: "Sécurité radicale", desc: "Vérification d'identité obligatoire. Système de Strikes anti-toxicité." },
      { icon: MapPin, title: "Hyper-local", desc: "Une carte interactive pour découvrir ce qui se passe autour de toi." },
      { icon: Camera, title: "Authenticité", desc: "Check-in GPS et contenu vérifié. Rien de fake." },
      { icon: Users, title: "Communauté", desc: "Une communauté engagée qui se retrouve dans la vraie vie." },
    ],
    founderTitle: "Le mot du fondateur",
    founderQuote: "J'ai créé SYNCITY parce que je crois que la technologie doit rapprocher les gens, pas les isoler. À l'ère des faux profils et du ghosting, nous méritons un espace digital qui encourage les vraies rencontres. SYNCITY, c'est la promesse d'un social network où chaque interaction mène à un moment réel, vérifié, authentique. On commence par Lyon, on finira par changer la façon dont la France se connecte.",
    founderName: "Fondateur & CEO",
    companyTitle: "DIGITALY",
    companyText: "SYNCITY est un produit de DIGITALY, entreprise technologique basée à Lyon spécialisée dans le développement de solutions digitales innovantes.",
    companyVision: "DIGITALY croit en un digital responsable, vérifié et au service de l'humain. SYNCITY est la première concrétisation de cette vision.",
    discover: "Découvrir DIGITALY",
    numbersTitle: "SYNCITY en chiffres",
    numbers: [
      { value: "2026", label: "Année de création" },
      { value: "Lyon", label: "Ville de lancement" },
      { value: "500+", label: "Membres Beta" },
      { value: "100%", label: "Profils vérifiés" },
    ],
  },
  en: {
    title: "About SYNCITY",
    missionTitle: "Our mission",
    missionText: "SYNCITY was born from a simple observation: social networks have distanced us from each other. Fake profiles, ghosting, insecurity... We deserve better. Our mission is to reconnect people in real life, around what they love, in a 100% secure and verified environment.",
    pillarsTitle: "Our pillars",
    pillars: [
      { icon: Shield, title: "Radical security", desc: "Mandatory ID verification. Anti-toxicity Strike system." },
      { icon: MapPin, title: "Hyper-local", desc: "An interactive map to discover what's happening around you." },
      { icon: Camera, title: "Authenticity", desc: "GPS check-in and verified content. Nothing fake." },
      { icon: Users, title: "Community", desc: "An engaged community that meets in real life." },
    ],
    founderTitle: "A word from the founder",
    founderQuote: "I created SYNCITY because I believe technology should bring people together, not isolate them. In the era of fake profiles and ghosting, we deserve a digital space that encourages real encounters. SYNCITY is the promise of a social network where every interaction leads to a real, verified, authentic moment. We start with Lyon, we'll end up changing the way France connects.",
    founderName: "Founder & CEO",
    companyTitle: "DIGITALY",
    companyText: "SYNCITY is a product by DIGITALY, a Lyon-based tech company specializing in innovative digital solutions.",
    companyVision: "DIGITALY believes in responsible, verified digital technology that serves people. SYNCITY is the first realization of this vision.",
    discover: "Discover DIGITALY",
    numbersTitle: "SYNCITY in numbers",
    numbers: [
      { value: "2026", label: "Year founded" },
      { value: "Lyon", label: "Launch city" },
      { value: "500+", label: "Beta members" },
      { value: "100%", label: "Verified profiles" },
    ],
  },
};

export default function AProposPage() {
  const { lang } = useLanguage();
  const c = content[lang] || content.fr;

  return (
    <LegalLayout title={c.title}>
      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-3">{c.missionTitle}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{c.missionText}</p>
      </div>

      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-4">{c.pillarsTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {c.pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                  <p className="text-xs text-gray-500">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#252525] rounded-xl p-6 relative overflow-hidden">
        <Quote className="w-8 h-8 text-white/5 absolute top-4 right-4" />
        <h3 className="font-bold text-white mb-4">{c.founderTitle}</h3>
        <blockquote className="text-gray-300 text-sm leading-relaxed italic mb-4 border-l-2 border-white/20 pl-4">
          "{c.founderQuote}"
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-sm font-bold text-white">
            CEO
          </div>
          <div>
            <p className="text-white font-semibold text-sm">DIGITALY</p>
            <p className="text-gray-500 text-xs">{c.founderName}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-4">{c.numbersTitle}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {c.numbers.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-black text-white">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-3">{c.companyTitle}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">{c.companyText}</p>
        <p className="text-gray-500 text-sm italic mb-4">{c.companyVision}</p>
        <a href="https://digitaly.fr" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          <ExternalLink className="w-4 h-4" /> {c.discover}
        </a>
      </div>
    </LegalLayout>
  );
}
