import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Steps } from "@/components/sections/Steps"
import { Features } from "@/components/sections/Features"
import { CtaSection } from "@/components/sections/CtaSection"
import { Partners } from "@/components/sections/Partners"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-white selection:bg-purple-500/30 selection:text-white">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Steps />
        <Features />
        <CtaSection />
        <Partners />
      </main>
      
      <Footer />
    </div>
  )
}
