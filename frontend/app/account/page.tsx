"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Save, ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getXsrfToken } from "@/lib/auth-api";

type AccountUser = { name: string; email: string };

function errorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const payload = data as { message?: unknown; errors?: Record<string, unknown> };
  const firstError = payload.errors && Object.values(payload.errors)[0];
  if (Array.isArray(firstError) && typeof firstError[0] === "string") return firstError[0];
  if (typeof payload.message === "string") return payload.message;
  return fallback;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<AccountUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    async function loadAccount() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers: { Accept: "application/json" },
          credentials: "include",
        });
        if (!response.ok) {
          router.replace("/login");
          return;
        }
        const account = await response.json();
        setUser(account);
        setName(account.name);
        setEmail(account.email);
      } catch {
        setProfileError("Impossible de charger votre compte. Vérifiez la connexion au serveur.");
      } finally {
        setIsLoading(false);
      }
    }

    loadAccount();
  }, [router]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setIsSavingProfile(true);

    try {
      const xsrfToken = await getXsrfToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(errorMessage(data, "Impossible d’enregistrer le profil."));
      setUser(data.user);
      setName(data.user.name);
      setEmail(data.user.email);
      setProfileMessage(data.message);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");
    setIsSavingPassword(true);

    try {
      const xsrfToken = await getXsrfToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
          current_password: currentPassword,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(errorMessage(data, "Impossible de modifier le mot de passe."));
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
      setPasswordMessage(data.message);
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsSavingPassword(false);
    }
  }

  if (isLoading) {
    return <main className="flex min-h-screen items-center justify-center bg-[#17111e] text-[#b5a5bc]">Chargement de votre compte…</main>;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#17111e] px-5 py-12 text-[#f5eff5] sm:px-8">
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-[#66324f]/20 blur-[120px]" />
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span
              className="flex size-10 items-center justify-center rounded-xl border border-[#a77ac1]/30 bg-[#35233f]
                text-[#d6b8ed]">
              <BookOpen size={19} />
            </span>
            <span className="font-serif text-xl">
              story <span className="text-[#c59ad9]">haven</span>
            </span>
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[#b9a9c2] transition hover:text-white"><ArrowLeft size={16} /> Retour au tableau de bord</Link>
        </header>

        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-sm text-[#c59ad9]">
            <UserRound size={16} /> {user?.name}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl">
            Paramètres du compte
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#b5a5bc]">
            Mettez à jour vos informations et gardez votre compte sécurisé.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border-white/[0.08] bg-[#211827]/95 text-[#f5eff5]">
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-xl">
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveProfile} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#e2d6e7]">Pseudo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    minLength={2}
                    maxLength={30}
                    autoComplete="username"
                    className="h-12 rounded-xl border-white/10 bg-[#19121f] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#e2d6e7]">Adresse courriel</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="h-12 rounded-xl border-white/10 bg-[#19121f] text-white"
                  />
                </div>
                {profileError && (
                  <p role="alert" className="rounded-xl border border-[#a04b69]/30 bg-[#773950]/15 px-4 py-3 text-sm text-[#efb9ca]">
                    {profileError}
                  </p>
                )}
                {profileMessage && (
                  <p role="status" className="text-sm text-emerald-300">
                    {profileMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isSavingProfile}
                  className="h-11 rounded-xl bg-[#873d58] text-white hover:bg-[#a04b69]"
                >
                  <Save className="mr-2 size-4" />
                  {isSavingProfile ? "Enregistrement…" : "Enregistrer le profil"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-white/[0.08] bg-[#211827]/95 text-[#f5eff5]">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 font-serif text-xl"><ShieldCheck size={20} className="text-[#c59ad9]" /> Sécurité</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={savePassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-[#e2d6e7]">Mot de passe actuel</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-12 rounded-xl border-white/10 bg-[#19121f] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-[#e2d6e7]">Nouveau mot de passe</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="h-12 rounded-xl border-white/10 bg-[#19121f] text-white"
                  />
                  <p className="text-xs text-[#8e7e97]">Au moins 8 caractères.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-confirmation" className="text-[#e2d6e7]">Confirmer le nouveau mot de passe</Label>
                  <Input
                    id="password-confirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="h-12 rounded-xl border-white/10 bg-[#19121f] text-white"
                  />
                </div>
                {passwordError && (
                  <p role="alert" className="rounded-xl border border-[#a04b69]/30 bg-[#773950]/15 px-4 py-3 text-sm text-[#efb9ca]">
                    {passwordError}
                  </p>
                )}
                {passwordMessage && (
                  <p role="status" className="text-sm text-emerald-300">
                    {passwordMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isSavingPassword}
                  variant="outline"
                  className="h-11 rounded-xl border-[#8d638f]/40 bg-transparent text-[#e5d6eb] hover:bg-[#38273f] hover:text-white"
                >
                  {isSavingPassword ? "Mise à jour…" : "Modifier le mot de passe"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
