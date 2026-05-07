"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReactNode } from "react";

const legalNav = [
  { to: "/cgu", label: "CGU" },
  { to: "/cgv", label: "CGV" },
  { to: "/confidentialite", label: "Confidentialité" },
  { to: "/mentions-legales", label: "Mentions légales" },
];

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      <main className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />Retour
        </Link>

        <div className="flex flex-wrap gap-2 mb-8">
          {legalNav.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                pathname === link.to
                  ? "bg-white text-[#1a1a1a] border-white font-bold"
                  : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">{title}</h1>
        <p className="text-gray-600 text-xs mb-8">Dernière mise à jour : Janvier 2026</p>

        <div className="space-y-4">{children}</div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-gray-600">
            SYNCITY est édité par{" "}
            <a href="https://digitaly.fr" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              DIGITALY
            </a>{" "}
            — Lyon, France
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Section({ num, title, children }: { num: number; title: string; children: ReactNode }) {
  return (
    <section className="bg-[#252525] rounded-xl p-5">
      <h2 className="text-sm font-bold text-white mb-2">{num}. {title}</h2>
      <div className="text-gray-400 text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
