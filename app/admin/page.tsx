"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Shield, ShieldCheck, ShieldX, Clock, Building2, Mail, Eye, CheckCircle, XCircle } from "lucide-react";
import { DUMMY_ADMIN_ESTABLISHMENTS, DUMMY_ADMIN_CONTACTS } from "@/lib/dummy-data";

type VerifStatus = "verifie" | "en_attente" | "rejete" | "non_verifie";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [establishments, setEstablishments] = useState(DUMMY_ADMIN_ESTABLISHMENTS);
  const [contacts] = useState(DUMMY_ADMIN_CONTACTS);
  const [tab, setTab] = useState("verifications");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "syncity-admin-2026") { setAuthed(true); toast.success("Connecté !"); }
    else toast.error("Mot de passe incorrect");
  };

  const updateStatus = (id: string, status: VerifStatus) => {
    setEstablishments((prev) => prev.map((e) => e.id === id ? { ...e, verification_status: status } : e));
    toast.success("Statut mis à jour");
  };

  const statusBadge = (s: string) => {
    const m: Record<string, { color: string; Icon: typeof Shield; label: string }> = {
      verifie: { color: "bg-green-500/20 text-green-400", Icon: ShieldCheck, label: "Vérifié" },
      en_attente: { color: "bg-yellow-500/20 text-yellow-400", Icon: Clock, label: "En attente" },
      rejete: { color: "bg-red-500/20 text-red-400", Icon: ShieldX, label: "Rejeté" },
      non_verifie: { color: "bg-gray-500/20 text-gray-400", Icon: Shield, label: "Non vérifié" },
    };
    const d = m[s] || m.non_verifie;
    const Icon = d.Icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${d.color}`}>
        <Icon className="w-3 h-3" />{d.label}
      </span>
    );
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-[#252525] rounded-xl p-8 w-full max-w-sm border border-white/10">
          <h1 className="text-xl font-black text-white mb-4 uppercase">Admin SYNCITY</h1>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe admin"
            className="h-11 bg-[#1a1a1a] border-white/10 text-white mb-3" />
          <Button type="submit" className="w-full bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg">Connexion</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-white uppercase">Admin SYNCITY</h1>
          <div className="flex gap-2">
            {[{ id: "verifications", label: "Vérifications" }, { id: "contacts", label: "Messages" }].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? "bg-white text-[#1a1a1a]" : "bg-[#252525] text-gray-400 hover:text-white"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab === "verifications" && (
          <div className="space-y-3">
            {establishments.map((est) => (
              <div key={est.id} className="bg-[#252525] rounded-xl p-5 border border-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <h3 className="font-bold text-white text-sm">{est.name}</h3>
                      {statusBadge(est.verification_status)}
                    </div>
                    <p className="text-xs text-gray-500">{est.address || "Pas d'adresse"} — {est.city}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 mt-1"><Mail className="w-3 h-3" />{est.owner_email}</p>
                    {est.verification_doc_path && (
                      <span className="text-xs text-blue-400 mt-1 inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" />{est.verification_doc_path}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => updateStatus(est.id, "verifie")}
                      className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors" title="Approuver">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </button>
                    <button onClick={() => updateStatus(est.id, "rejete")}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors" title="Rejeter">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "contacts" && (
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="bg-[#252525] rounded-xl p-8 text-center"><p className="text-gray-500">Aucun message</p></div>
            ) : contacts.map((msg) => (
              <div key={msg.id} className="bg-[#252525] rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded">{msg.category}</span>
                  <h3 className="font-bold text-white text-sm">{msg.subject}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-2">{msg.message}</p>
                <p className="text-xs text-gray-600">{msg.name} — {msg.email} — {new Date(msg.created_at).toLocaleString("fr-FR")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
