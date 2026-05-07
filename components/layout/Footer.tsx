"use client";

import Link from "next/link";
import { Apple, Play, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  return (
    <footer className="py-12 px-6 lg:px-8 bg-[#141414] border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row border-b border-[#FFFFFF0D] pb-6 justify-between items-start gap-12 mb-12">
          <div className="space-y-4 max-w-xs">
            <Link href="/" className="font-bold text-xl text-white">SYNCITY</Link>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} SYNCITY SAS — {t("allRights")}</p>
          </div>
          <Link href="/partenaires">
            <Button variant="outline" className="rounded-xl uppercase border-[#FFFFFF33] px-8 bg-transparent hover:bg-white/5">
              {t("becomePartner")} <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200">{t("product")}</h4>
            <ul className="space-y-3">
              <li><Link href="/explorer" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("exploreEvents")}</Link></li>
              <li><Link href="/partenaires" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("becomePartnerF")}</Link></li>
              <li><Link href="/auth" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("createAccount")}</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200">{t("company")}</h4>
            <ul className="space-y-3">
              <li><Link href="/a-propos" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("about")}</Link></li>
              <li><Link href="/presse" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("press")}</Link></li>
              <li><span className="text-sm text-[#4B5563]">{t("blog")} <span className="text-[11px]">({t("soon")})</span></span></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200">{t("support")}</h4>
            <ul className="space-y-3">
              <li><Link href="/aide" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("helpCenter")}</Link></li>
              <li><Link href="/contact" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("contactUs")}</Link></li>
              <li><Link href="/contact" className="text-sm text-[#6B7280] hover:text-white transition-colors">{t("reportContent")}</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200">{t("cities")}</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-[#6B7280]">Lyon</span></li>
              <li><span className="text-sm text-[#4B5563]">Paris <span className="text-[11px]">({t("soon")})</span></span></li>
              <li><span className="text-sm text-[#4B5563]">Marseille <span className="text-[11px]">({t("soon")})</span></span></li>
            </ul>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-5 justify-between md:items-center py-6 border-t border-white/5">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-[#6B7280]">{t("downloadTheApp")}</p>
            <div className="flex gap-4">
              <Button variant="premium" size="sm" className="rounded-[8px] text-[#1A1A1A] text-xs font-bold px-4 flex items-center gap-2">
                <Apple size={16} /><span>App Store</span>
              </Button>
              <Button variant="premium" size="sm" className="rounded-[8px] text-[#1A1A1A] text-xs font-bold px-4 flex items-center gap-2">
                <Play size={16} /><span>Play Store</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-white/5">
          <Link href="/cgu" className="text-[11px] uppercase tracking-widest text-[#4B5563] hover:text-white">{t("terms")}</Link>
          <Link href="/cgv" className="text-[11px] uppercase tracking-widest text-[#4B5563] hover:text-white">{t("salesTerms")}</Link>
          <Link href="/confidentialite" className="text-[11px] uppercase tracking-widest text-[#4B5563] hover:text-white">{t("privacy")}</Link>
          <Link href="/mentions-legales" className="text-[11px] uppercase tracking-widest text-[#4B5563] hover:text-white">{t("legalNotice")}</Link>
        </div>
      </div>
    </footer>
  );
}
