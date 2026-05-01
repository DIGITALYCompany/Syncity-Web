"use client";

import { LegalLayout } from "@/components/layout/LegalLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Download, Mail } from "lucide-react";

const content = {
  fr: {
    title: "Espace Presse",
    aboutTitle: "À propos de SYNCITY",
    aboutText: "SYNCITY est la première application de Social Connecting hyper-locale en France. Lancée en Beta à Lyon, elle permet aux utilisateurs vérifiés de se retrouver dans la vraie vie autour de centres d'intérêt communs. Chaque membre est vérifié par pièce d'identité, garantissant un environnement 100% authentique et sécurisé.",
    aboutDigitaly: "SYNCITY est un produit de",
    numbers: "Chiffres clés",
    stats: [{ value: "500+", label: "Inscrits Beta" }, { value: "100%", label: "Profils vérifiés" }, { value: "Lyon", label: "Ville de lancement" }, { value: "2026", label: "Année de lancement" }],
    contactTitle: "Contact presse",
    contactText: "Pour toute demande presse, interview ou partenariat média :",
    resourcesTitle: "Ressources",
    resourcesText: "Kit presse et assets disponibles sur demande.",
    requestKit: "Demander le kit presse",
  },
  en: {
    title: "Press Room",
    aboutTitle: "About SYNCITY",
    aboutText: "SYNCITY is the first hyper-local Social Connecting app in France. Launched in Beta in Lyon, it allows ID-verified users to meet in real life around shared interests. Every member is verified by ID, ensuring a 100% authentic and secure environment.",
    aboutDigitaly: "SYNCITY is a product by",
    numbers: "Key figures",
    stats: [{ value: "500+", label: "Beta signups" }, { value: "100%", label: "Verified profiles" }, { value: "Lyon", label: "Launch city" }, { value: "2026", label: "Launch year" }],
    contactTitle: "Press contact",
    contactText: "For any press inquiry, interview or media partnership:",
    resourcesTitle: "Resources",
    resourcesText: "Press kit and assets available on request.",
    requestKit: "Request press kit",
  },
};

export default function PressePage() {
  const { lang } = useLanguage();
  const c = content[lang] || content.fr;

  return (
    <LegalLayout title={c.title}>
      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-3">{c.aboutTitle}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.aboutText}</p>
        <p className="text-gray-400 text-sm">{c.aboutDigitaly} <a href="https://digitaly.fr" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">DIGITALY</a> — Lyon, France.</p>
      </div>
      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-3">{c.numbers}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {c.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-black text-white">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-3">{c.contactTitle}</h3>
        <p className="text-gray-400 text-sm mb-3">{c.contactText}</p>
        <a href="mailto:presse@syncity.app" className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:underline">
          <Mail className="w-4 h-4" /> presse@syncity.app
        </a>
      </div>
      <div className="bg-[#252525] rounded-xl p-6">
        <h3 className="font-bold text-white mb-3">{c.resourcesTitle}</h3>
        <p className="text-gray-500 text-sm mb-3">{c.resourcesText}</p>
        <a href="mailto:presse@syncity.app?subject=Press kit request"
          className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          <Download className="w-4 h-4" /> {c.requestKit}
        </a>
      </div>
    </LegalLayout>
  );
}
