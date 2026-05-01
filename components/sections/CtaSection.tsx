import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="sm:py-24 py-12 px-6 lg:px-8 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-[400px] blur-3xl rounded-full" />
      <div className="mx-auto max-w-4xl relative">
        <h2 className="sm:text-2xl text-base md:text-4xl font-black uppercase tracking-tight text-white mb-2">VOUS GÉREZ UN LIEU OU UN ÉVÉNEMENT ?</h2>
        <h3 className="sm:text-2xl text-base md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 sm:mb-8">
          TROUVEZ VOTRE PUBLIC !
        </h3>
        <p className="sm:text-lg text-sm text-[#6B7280] mb-12 max-w-2xl mx-auto">Connectez votre lieu à la bonne énergie. Attirez un public de confiance, certifié par notre système KYC.</p>
        <div className="flex justify-center items-center ">
          {" "}
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl bg-transparent text-sm sm:text-xl font-bold px-12 h-16 border-[#FFFFFF33] hover:border-white/20 uppercase tracking-widest justify-center flex items-center gap-4 transition-all hover:scale-105 active:scale-95 group"
          >
            Devenir partenaire
            <ArrowRight size={18} className="translate-y-[1px] group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>{" "}
      </div>
    </section>
  );
}
