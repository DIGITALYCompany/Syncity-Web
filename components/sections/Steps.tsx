import { UserCheck, PartyPopper, Map } from "lucide-react";

const steps = [
  {
    title: "Inscris-toi",
    description: "Crée ton compte et vérifie ton identité. En 2 minutes, tu es prêt. SYNCPASS et tu rejoins une communauté 100% authentique.",
    icon: UserCheck,
    color: "bg-[#8C7FFF1A] text-[#8C7FFF] border-[#8C7FFF33]",
  },
  {
    title: "Explore",
    description: "Découvre les événements autour de toi sur la carte interactive. Soirées, sport, coworking, concerts... Filtre par passion.",
    icon: Map,
    color: "bg-[#F26AF21A] text-[#F26AF2] border-[#F26AF233]",
  },
  {
    title: "Synchronise-toi",
    description: "Rejoins un événement et retrouve-toi dans la vraie vie. Check-in GPS, partage tes photos et vis des moments authentiques.",
    icon: PartyPopper,
    color: "bg-[#FFC4781A] text-[#FFC478] border-[#FFC47833]",
  },
];

export function Steps() {
  return (
    <section className="py-6 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#6B7280] uppercase">Simple comme bonjour</p>
          <h2 className="sm:text-3xl text-xl font-black uppercase tracking-tight text-white">Comment ça marche ?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center space-y-8 group">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${step.color}`}>
                <step.icon size={30} strokeWidth={1.5} />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                <p className="text-[#6B7280] text-sm font-semibold leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
