import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <section className="relative pt-32 pb-10 sm:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="gradient-bg rounded-3xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center p-7 sm:p-10">
            <div className="flex flex-col space-y-4 animate-in fade-in slide-in-from-left duration-1000">
              <h1 className="md:text-3xl text-xl font-bold md:font-black leading-[1.1] tracking-tight text-white uppercase">LE SOCIAL C'EST MIEUX EN VRAI QUE DERRIÈRE UN ECRAN.</h1>
              <p className="text-base text-white font-medium ">Rejoignez nous lors de la phase îlets pour donner vie à SYNCITY</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-5 w-full">
                <div className="relative flex-2">
                  <Input placeholder="votre@email.com" className="rounded-full h-14 bg-white/5 backdrop-blur-lg border-[#FFFFFF1A] text-white pr-4 placeholder:text-white/80" />
                </div>
                <Button className="rounded-full flex-1 text-white flex gap-0 bg-[#1C1C1C] border border-white/10 hover:bg-neutral-800 text-sm h-14 px-8 font-semibold whitespace-nowrap">
                  Obtenir mon SYNC <span className="text-sm font-normal">PASS</span>
                </Button>
              </div>
              <div className="flex  sm:flex-row flex-col items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {["A", "D", "R", "+"].map((char, i) => (
                    <div key={i} className="h-10 w-10 rounded-full border border-black bg-[#FF1E40] overflow-hidden relative flex items-center justify-center">
                      <span className="text-white text-xs font-black">{char}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white italic flex items-center gap-1 font-bold">
                  569+ membres
                  <span className="text-white font-light">déjà inscrits à la date</span>
                </p>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end pr-0 lg:pr-10">{/* Optional spacer to keep grid balanced if needed, or leave empty if the image is truly floating */}</div>
          </div>
        </div>

        {/* Floating image outside the gradient box */}
        <div className="absolute -top-[36px] right-12 lg:right-20 hidden lg:block animate-in fade-in slide-in-from-right duration-1000 delay-200">
          <img src="hero.png" alt="Hero Image" className="w-72 h-auto object-cover shadow-2xl  transition-transform duration-500" />
        </div>

        {/* Mobile version stays inside or differently positioned */}
        <div className="hidden mt-8 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          <img src="hero.png" alt="Hero Image" className="w-64 rounded-2xl object-cover shadow-lg" />
        </div>
      </div>
    </section>
  );
}
