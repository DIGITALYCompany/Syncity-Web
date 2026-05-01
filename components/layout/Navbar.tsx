"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTranslation } from "@/lib/i18n";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation(lang);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("syncity_user"));
  }, []);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const switchLang = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Syncity Logo" className="h-12 w-auto" onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }} />
          <span className="font-bold text-xl tracking-tight text-white">SYNCITY</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/explorer" className="text-sm font-medium text-[#9CA3AF] hover:text-white transition-colors">
            {t("explorer")}
          </Link>
          <Link href="/partenaires" className="text-sm font-medium text-[#9CA3AF] hover:text-white transition-colors">
            {t("organizer")}
          </Link>
          <button
            onClick={switchLang}
            className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          {isLoggedIn ? (
            <Button
              variant="premium"
              className="rounded-md text-sm font-semibold px-6"
              onClick={() => router.push("/dashboard")}
            >
              {t("mySpace")}
            </Button>
          ) : (
            <Button
              variant="premium"
              className="rounded-md text-sm font-semibold px-6"
              onClick={() => router.push("/auth")}
            >
              {t("login")}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={switchLang} className="text-xs text-gray-400 hover:text-white px-2 py-1.5 rounded border border-white/10">
            <Globe className="w-3.5 h-3.5 inline mr-1" />{lang === "fr" ? "EN" : "FR"}
          </button>
          <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#1a1a1a] border-b border-white/5 p-6 space-y-4 flex flex-col">
          <Link href="/explorer" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-400 hover:text-white">
            {t("explorer")}
          </Link>
          <Link href="/partenaires" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-400 hover:text-white">
            {t("organizer")}
          </Link>
          <Button
            variant="premium"
            className="rounded-md w-fit text-sm font-semibold px-6"
            onClick={() => { router.push(isLoggedIn ? "/dashboard" : "/auth"); setIsOpen(false); }}
          >
            {isLoggedIn ? t("mySpace") : t("login")}
          </Button>
        </div>
      )}
    </nav>
  );
}
