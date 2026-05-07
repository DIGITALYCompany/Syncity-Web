import { ShieldCheck, Map, Camera, Users, Music2, Smartphone, Shield, MapPin, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "100% Vérifié",
    description: "Chaque membre est vérifié par pièce d'identité. Fini les faux profils.",
    icon: Shield,
    tag: "0 Sécurité",
  },
  {
    title: "Carte Interactive",
    description: "Découvre les événements autour de toi. Ta position reste privée.",
    icon: MapPin,
    tag: "200+ Exploration",
  },
  {
    title: "Geo Check-in",
    description: "Prouve ta présence et partage tes photos. Contenu 100% authentique.",
    icon: Camera,
    tag: "0 Proof",
  },
  {
    title: "Communauté saine",
    description: "Système de 3 strikes anti-toxicité. Comportements inappropriés = ban.",
    icon: Users,
    tag: "0 Social",
  },
  {
    title: "Événements Live",
    description: "Concerts, sport, coworking, soirées... Trouve ton match social.",
    icon: Zap,
    tag: "100+ Live",
  },
  {
    title: "App Native",
    description: "Disponible sur iOS et Android. Notifications en temps réel.",
    icon: Smartphone,
    tag: "100+ Mobile",
  },
];

export function Features() {
  return (
    <section className="sm:py-24 py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-10">
          <p className="text-xs font-semibold text-[#6B7280] tracking-[0.3em] uppercase">Fonctionnalités</p>
          <h2 className="sm:text-3xl text-xl font-black uppercase tracking-tight text-white">Pourquoi Syncity ?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          {features.map((feature, i) => (
            <Card key={i} className="group p-6 rounded-xl border-0 bg-[#252525] flex flex-col items-start space-y-6">
              <div className="w-full flex justify-between items-start">
                <div className="h-10 w-10 bg-[#3a3a3a] rounded-xl flex items-center justify-center text-white group-hover:text-white transition-colors">
                  <feature.icon size={20} />
                </div>
                <span className="text-[10px] uppercase bg-[#303030] px-2 py-1 rounded-[4px] text-neutral-500 font-normal inline-block leading-[15px]" style={{ fontFamily: "var(--font-console)" }}>
                  {feature.tag}
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="md:text-xl text-base font-semibold md:font-bold text-white uppercase tracking-tight">{feature.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
