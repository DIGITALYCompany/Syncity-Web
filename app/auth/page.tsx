"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, User, Briefcase, Zap } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTranslation } from "@/lib/i18n";

export default function AuthPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  const [userType, setUserType] = useState("user");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    businessName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error(lang === "fr" ? "Veuillez remplir tous les champs" : "Please fill all fields");
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error(lang === "fr" ? "Les mots de passe ne correspondent pas" : "Passwords don't match");
      return;
    }

    const userData = {
      email: formData.email,
      name: formData.name || formData.email.split("@")[0],
      type: userType,
      businessName: formData.businessName,
      syncPass: true,
      joinedBeta: new Date().toISOString(),
    };

    localStorage.setItem("syncity_user", JSON.stringify(userData));
    toast.success(isLogin
      ? (lang === "fr" ? "Connexion réussie !" : "Logged in!")
      : (lang === "fr" ? "Bienvenue ! Ton Sync-Pass est activé !" : "Welcome! Your Sync-Pass is active!")
    );

    router.push(userType === "partner" ? "/dashboard/partenaire" : "/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          {t("backHome")}
        </Link>

        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-bold text-2xl text-white">SYNCITY</Link>
          <p className="text-gray-500 mt-1 text-sm">
            {isLogin ? t("connectToAccount") : t("getSyncPass")}
          </p>
        </div>

        <Tabs value={userType} onValueChange={setUserType} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-[#252525] border border-white/10 h-11">
            <TabsTrigger value="user" className="data-[state=active]:bg-white data-[state=active]:text-[#1a1a1a] text-gray-400">
              <User className="w-4 h-4 mr-2" />
              {t("user")}
            </TabsTrigger>
            <TabsTrigger value="partner" className="data-[state=active]:bg-white data-[state=active]:text-[#1a1a1a] text-gray-400">
              <Briefcase className="w-4 h-4 mr-2" />
              {t("partner")}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="bg-[#252525] rounded-xl p-6 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-gray-400 text-sm">
                  {userType === "partner" ? t("contactName") : t("yourName")}
                </Label>
                <Input
                  id="name" name="name" type="text" placeholder="Jean Dupont"
                  value={formData.name} onChange={handleInputChange}
                  className="h-11 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 focus:ring-0"
                />
              </div>
            )}

            {!isLogin && userType === "partner" && (
              <div className="space-y-1.5">
                <Label htmlFor="businessName" className="text-gray-400 text-sm">{t("businessName")}</Label>
                <Input
                  id="businessName" name="businessName" type="text" placeholder="Le Sucre, Ninkasi..."
                  value={formData.businessName} onChange={handleInputChange}
                  className="h-11 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 focus:ring-0"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-400 text-sm">{t("email")}</Label>
              <Input
                id="email" name="email" type="email" placeholder="ton@email.com"
                value={formData.email} onChange={handleInputChange}
                className="h-11 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 focus:ring-0"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-400 text-sm">{t("password")}</Label>
              <div className="relative">
                <Input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"} placeholder="••••••••"
                  value={formData.password} onChange={handleInputChange}
                  className="h-11 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 focus:ring-0 pr-12"
                  required
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-gray-400 text-sm">{t("confirm")}</Label>
                <Input
                  id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••"
                  value={formData.confirmPassword} onChange={handleInputChange}
                  className="h-11 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 focus:ring-0"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold rounded-lg transition-all"
            >
              {isLogin ? t("signIn") : userType === "partner" ? t("joinAsPartner") : t("getMyPass")}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? t("noAccount") : t("hasAccount")}
              <button
                type="button" onClick={() => setIsLogin(!isLogin)}
                className="ml-1.5 text-white hover:underline font-medium"
              >
                {isLogin ? t("signUp") : t("signIn")}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
              <p className="text-xs text-gray-400">
                <span className="text-white font-semibold">{t("syncPassBeta")}</span> — {t("exclusiveAccess")}
              </p>
            </div>
          )}
        </div>

        <p className="text-[11px] text-gray-600 text-center mt-5">
          En continuant, tu acceptes nos{" "}
          <Link href="/cgu" className="text-gray-400 hover:text-white">CGU</Link>,{" "}
          <Link href="/cgv" className="text-gray-400 hover:text-white">CGV</Link> et notre{" "}
          <Link href="/confidentialite" className="text-gray-400 hover:text-white">politique de confidentialité</Link>
        </p>
      </div>
    </div>
  );
}
