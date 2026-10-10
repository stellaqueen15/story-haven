
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  Moon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthApiUrl, getXsrfToken } from "@/lib/auth-api";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const xsrfToken = await getXsrfToken();

      const response = await fetch(getAuthApiUrl("login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstErrorKey = Object.keys(data.errors)[0];
          throw new Error(data.errors[firstErrorKey]);
        }
        throw new Error(data.message || "Identifiants incorrects.");
      }

      router.push("/dashboard");

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Impossible de se connecter au serveur.");
    } finally {
      setIsLoading(false);
    }
  }


  return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#17111e] px-5 py-12 text-[#f5eff5]">
        <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-[#66324f]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-[#60417c]/20 blur-[120px]" />

        <Link
            href="/"
            className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-[#b9a9c2] transition hover:text-white sm:left-10 sm:top-8"
        >
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Link>

        <div className="relative z-10 w-full max-w-[440px]">
          <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-3"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl border border-[#a77ac1]/30 bg-[#35233f] text-[#d6b8ed]">
              <BookOpen size={21} strokeWidth={1.6} />
            </div>
            <span className="font-serif text-2xl tracking-wide">
            story <span className="text-[#c59ad9]">haven</span>
          </span>
          </Link>

          <Card className="rounded-[28px] border-white/[0.09] bg-[#211827]/95 shadow-2xl shadow-black/30">
            <CardContent className="p-7 sm:p-9">
              <div className="mb-7 flex size-12 items-center justify-center rounded-2xl border border-[#946ba4]/20 bg-[#38273f] text-[#d3b0e0]">
                <Moon size={22} strokeWidth={1.5} />
              </div>

              <h1 className="font-serif text-3xl">
                Heureux de vous revoir.
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#b5a5bc]">
                Retrouvez vos univers et reprenez vos histoires
                là où vous les avez laissées.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#e2d6e7]">
                    Adresse courriel
                  </Label>
                  <div className="relative">
                    <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a58bb1]"
                    />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="vous@exemple.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 rounded-xl border-white/10 bg-[#19121f] pl-11 text-white placeholder:text-[#76677e] focus-visible:border-[#a279b3] focus-visible:ring-[#a279b3]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label htmlFor="password" className="text-[#e2d6e7]">
                      Mot de passe
                    </Label>
                    <Link
                        href="/forgot-password"
                        className="text-xs text-[#c49ad4] transition hover:text-[#e1c4ed]"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a58bb1]"
                    />
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Votre mot de passe"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-xl border-white/10 bg-[#19121f] pl-11 pr-12 text-white placeholder:text-[#76677e] focus-visible:border-[#a279b3] focus-visible:ring-[#a279b3]/20"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword
                              ? "Masquer le mot de passe"
                              : "Afficher le mot de passe"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#a58bb1] transition hover:text-white"
                    >
                      {showPassword ? (
                          <EyeOff size={18} />
                      ) : (
                          <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                    <p
                        role="alert"
                        className="rounded-xl border border-[#a04b69]/30 bg-[#773950]/15 px-4 py-3 text-sm text-[#efb9ca]"
                    >
                      {error}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl bg-[#873d58] text-white hover:bg-[#a04b69] disabled:opacity-50"
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-xs text-[#8e7e97]">
                NOUVEAU SUR STORY HAVEN ?
              </span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <Button
                  variant="outline"
                  asChild
                  className="h-12 w-full rounded-xl border-[#8d638f]/40 bg-transparent text-[#e5d6eb] hover:bg-[#38273f] hover:text-white"
              >
                <Link href="/register">Créer un compte</Link>
              </Button>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs leading-5 text-[#8e7e97]">
            Vos histoires vous attendent.
          </p>
        </div>
      </main>
  );
}
