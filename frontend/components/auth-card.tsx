import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, LockKeyhole, Mail, UserRound } from "lucide-react";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthCardProps = { mode: "login" | "register" };

export function AuthCard({ mode }: AuthCardProps) {
  const isRegister = mode === "register";

  return (
    <main className="auth-page">
      <header className="auth-header"><Brand /><Link className="back-link" href="/"><ArrowLeft size={15} /> Retour à l’accueil</Link></header>
      <div className="auth-content">
        <div className="auth-intro"><span className="section-kicker">{isRegister ? "BIENVENUE DANS L’AVENTURE" : "HEUREUX DE VOUS REVOIR"}</span><h1>{isRegister ? <>Votre histoire<br /><span>commence ici.</span></> : <>Reprenez le fil<br /><span>de vos histoires.</span></>}</h1><p>{isRegister ? "Un compte pour vous. Tous vos personnages, au même endroit." : "Connectez-vous pour retrouver vos personnages et vos communautés."}</p></div>
        <Card className="auth-card">
          <CardHeader>
            <CardTitle>{isRegister ? "Créer un compte" : "Se connecter"}</CardTitle>
            <CardDescription>{isRegister ? "Quelques informations et vous y êtes." : "Entrez les informations de votre compte."}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="auth-fields">
              {isRegister && <div className="field-group"><Label htmlFor="name">Nom affiché</Label><div className="input-wrap"><UserRound size={16} /><Input id="name" name="name" autoComplete="name" placeholder="Votre nom" /></div></div>}
              <div className="field-group"><Label htmlFor="email">Adresse courriel</Label><div className="input-wrap"><Mail size={16} /><Input id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" /></div></div>
              <div className="field-group"><div className="label-row"><Label htmlFor="password">Mot de passe</Label>{!isRegister && <Link href="#mot-de-passe-oublie">Oublié&nbsp;?</Link>}</div><div className="input-wrap"><LockKeyhole size={16} /><Input id="password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} placeholder="8 caractères minimum" /><button className="input-action" type="button" aria-label="Afficher le mot de passe"><Eye size={16} /></button></div></div>
              {isRegister && <p className="auth-hint">Vous pourrez créer vos personnages après votre inscription.</p>}
              <Button className="auth-submit" size="lg" type="button">{isRegister ? "Créer mon compte" : "Se connecter"}<ArrowRight size={16} /></Button>
              <p className="auth-switch">{isRegister ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"} <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Se connecter" : "Créer un compte"}</Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="auth-footer">Story Haven <span>·</span> Un foyer pour vos histoires.</footer>
    </main>
  );
}
