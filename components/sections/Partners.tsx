export function Partners() {
  const logos = ["ROCK-EN-SEINE", "NUITS SONORES", "GOLDEN COAST", "WE LOVE GREEN", "FESTIVAL BEAUREGARD", "LES VIEILLES CHARRUES"];

  return (
    <section className="pt-12 pb-6 border-t border-b border-[#FFFFFF0D] opacity-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[11px] text-center uppercase tracking-[0.5em] font-semibold text-[#6B7280] mb-6">Des milliers de partenaires nous font confiance</p>
        <div className="relative overflow-hidden w-full">
          <div className="flex w-fit gap-10 lg:gap-20 animate-scroll py-4">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="sm:text-lg text-sm font-medium sm:font-black tracking-widest text-neutral-400 grayscale hover:grayscale-0 hover:text-white transition-all cursor-default whitespace-nowrap px-4">
                {logo}
              </div>
            ))}
          </div>
          {/* Fading edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
