"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const categories = {
  fr: [
    { value: "support", label: "Support technique" },
    { value: "partenariat", label: "Partenariat / Organisateur" },
    { value: "presse", label: "Presse & Médias" },
    { value: "signalement", label: "Signaler un contenu" },
    { value: "autre", label: "Autre" },
  ],
  en: [
    { value: "support", label: "Technical support" },
    { value: "partenariat", label: "Partnership / Organizer" },
    { value: "presse", label: "Press & Media" },
    { value: "signalement", label: "Report content" },
    { value: "autre", label: "Other" },
  ],
};

const texts = {
  fr: { title: "Nous contacter", subtitle: "Une question, une suggestion ou un problème ? Remplis le formulaire et nous te répondrons rapidement.", name: "Ton nom", email: "Ton email", category: "Catégorie", subject: "Sujet", message: "Ton message", send: "Envoyer", sending: "Envoi...", success: "Message envoyé !", successText: "Nous te répondrons dans les plus brefs délais.", another: "Envoyer un autre message", back: "Retour" },
  en: { title: "Contact us", subtitle: "A question, suggestion or issue? Fill out the form and we'll get back to you quickly.", name: "Your name", email: "Your email", category: "Category", subject: "Subject", message: "Your message", send: "Send", sending: "Sending...", success: "Message sent!", successText: "We'll get back to you as soon as possible.", another: "Send another message", back: "Back" },
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.fr;
  const cats = categories[lang] || categories.fr;
  const [form, setForm] = useState({ name: "", email: "", category: "support", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error(lang === "fr" ? "Remplis tous les champs" : "Fill all fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      <main className="pt-28 pb-16 max-w-2xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />{t.back}
        </Link>

        <h1 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">{t.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{t.subtitle}</p>

        {sent ? (
          <div className="bg-[#252525] rounded-xl p-10 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">{t.success}</h2>
            <p className="text-gray-400 text-sm mb-6">{t.successText}</p>
            <Button
              onClick={() => { setSent(false); setForm({ name: "", email: "", category: "support", subject: "", message: "" }); }}
              className="bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg"
            >
              {t.another}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#252525] rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-400 text-sm">{t.name} *</Label>
                <Input
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jean Dupont" required
                  className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-400 text-sm">{t.email} *</Label>
                <Input
                  type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ton@email.com" required
                  className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">{t.category}</Label>
              <select
                value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-11 bg-[#1a1a1a] border border-white/10 rounded-md text-white px-3 focus:border-white/30"
              >
                {cats.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">{t.subject} *</Label>
              <Input
                value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required
                className="h-11 bg-[#1a1a1a] border-white/10 text-white focus:border-white/30 focus:ring-0"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400 text-sm">{t.message} *</Label>
              <textarea
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5} required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-md text-white px-3 py-2 focus:border-white/30 resize-none text-sm"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4 mr-2" />{t.send}</>}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
