"use client";

import { LegalLayout } from "@/components/layout/LegalLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";

const content = {
  fr: {
    title: "Centre d'aide",
    faq: [
      { q: "Qu'est-ce que SYNCITY ?", a: "SYNCITY est une application mobile qui connecte les gens dans la vraie vie autour de centres d'intérêt communs. Concerts, sport, coworking, soirées... Tous les membres sont vérifiés par pièce d'identité." },
      { q: "Comment fonctionne la vérification d'identité ?", a: "Lors de ton inscription, tu fournis une pièce d'identité valide. Notre système vérifie que tu es bien la personne que tu prétends être. Tes documents ne sont pas conservés après vérification." },
      { q: "Qu'est-ce que le Sync-Pass ?", a: "Le Sync-Pass est ton ticket d'accès à SYNCITY. En t'inscrivant à la Beta, tu obtiens un Sync-Pass gratuit qui te donne accès à toutes les fonctionnalités de la plateforme." },
      { q: "Comment fonctionne le Geo Check-in ?", a: "Quand tu arrives à un événement, l'app vérifie ta position GPS (rayon de 50m). Une fois validé, tu peux poster des photos et interagir avec les autres participants." },
      { q: "C'est quoi le système de Strikes ?", a: "Chaque comportement inapproprié entraîne un avertissement. 3 strikes = bannissement définitif." },
      { q: "Comment devenir partenaire ?", a: "Inscris-toi en tant que partenaire. Tu pourras créer des événements, publier des offres et suivre tes stats en temps réel." },
      { q: "Les offres promotionnelles, ça marche comment ?", a: "Les partenaires créent des offres. Tu génères un QR code unique depuis l'app, que tu montres à l'établissement. Chaque offre est utilisable une seule fois." },
      { q: "SYNCITY est disponible où ?", a: "La Beta est actuellement ouverte à Lyon. L'app sera déployée dans toute la France prochainement." },
      { q: "Comment supprimer mon compte ?", a: "Contacte-nous à dpo@syncity.app. La suppression est effective sous 48h." },
    ],
    noAnswer: "Tu ne trouves pas ta réponse ?",
    contactUs: "Contacte-nous",
  },
  en: {
    title: "Help center",
    faq: [
      { q: "What is SYNCITY?", a: "SYNCITY is a mobile app that connects people in real life around shared interests. Concerts, sports, coworking, parties... All members are ID-verified." },
      { q: "How does ID verification work?", a: "When you sign up, you provide a valid ID. Our system verifies you are who you claim to be. Your documents are not stored after verification." },
      { q: "What is the Sync-Pass?", a: "The Sync-Pass is your access ticket to SYNCITY. By joining the Beta, you get a free Sync-Pass with full platform access." },
      { q: "How does Geo Check-in work?", a: "When you arrive at an event, the app verifies your GPS location (50m radius). Once validated, you can post photos and interact with other attendees." },
      { q: "What is the Strike system?", a: "Any inappropriate behavior results in a warning. 3 strikes = permanent ban." },
      { q: "How to become a partner?", a: "Sign up as a partner. You can create events, publish offers and track your stats in real time." },
      { q: "How do promotional offers work?", a: "Partners create offers. You generate a unique QR code from the app and show it at the venue. Each offer can only be used once." },
      { q: "Where is SYNCITY available?", a: "The Beta is currently open in Lyon, France. The app will be rolled out across France soon." },
      { q: "How to delete my account?", a: "Contact us at dpo@syncity.app. Deletion is effective within 48 hours." },
    ],
    noAnswer: "Can't find your answer?",
    contactUs: "Contact us",
  },
};

export default function AidePage() {
  const { lang } = useLanguage();
  const c = content[lang] || content.fr;

  return (
    <LegalLayout title={c.title}>
      <div className="space-y-3">
        {c.faq.map((item, i) => (
          <details key={i} className="bg-[#252525] rounded-xl group">
            <summary className="p-5 cursor-pointer list-none flex items-center justify-between text-white font-semibold text-sm hover:text-gray-200 transition-colors">
              {item.q}
              <svg className="w-4 h-4 text-gray-500 shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">{item.a}</div>
          </details>
        ))}
      </div>
      <div className="bg-[#252525] rounded-xl p-6 mt-4 text-center">
        <p className="text-gray-400 text-sm">{c.noAnswer}</p>
        <a href="mailto:help@syncity.app" className="text-white font-semibold text-sm hover:underline mt-1 inline-block">{c.contactUs}</a>
      </div>
    </LegalLayout>
  );
}
