"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    BookOpen,
    Plus,
    Compass,
    User,
    Users,
    ShieldAlert,
    LogOut,
    Sparkles,
    ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Types temporaires pour l'affichage
interface Univers {
    id: number;
    name: string;
    slug: string;
    description: string;
    pivot: { role: string };
}

interface Character {
    id: number;
    name: string;
    univers_name: string;
    avatar_url?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [universes, setUniverses] = useState<Univers[]>([]);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [activeTab, setActiveTab] = useState<"universes" | "characters">("universes");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                // 1. Récupérer l'utilisateur connecté
                const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                    method: "GET",
                    headers: { "Accept": "application/json" },
                    credentials: "include"
                });

                if (!userRes.ok) {
                    // Si l'utilisateur n'est pas connecté, retour au login
                    router.push("/login");
                    return;
                }

                const userData = await userRes.json();
                setUser(userData);

                // TODO: Brancher les vrais fetchs API pour les univers et persos plus tard
                // Données fictives pour le design en attendant
                setUniverses([
                    { id: 1, name: "Chroniques d'Elysium", slug: "chroniques-elysium", description: "Un univers de fantasy sombre et politique.", pivot: { role: "owner" } },
                    { id: 2, name: "Neo-Neo-Tokyo 2099", slug: "neo-tokyo-2099", description: "Cyberpunk RP axé sur la survie des gangs urbains.", pivot: { role: "player" } }
                ]);

                setCharacters([
                    { id: 1, name: "Kaelen Vane", univers_name: "Chroniques d'Elysium" },
                    { id: 2, name: "V-04 / Dex", univers_name: "Neo-Neo-Tokyo 2099" }
                ]);

            } catch (error) {
                console.error("Erreur de chargement du dashboard", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDashboardData();
    }, [router]);

    async function handleLogout() {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                method: "POST",
                headers: { "Accept": "application/json" },
                credentials: "include"
            });
            router.push("/login");
        } catch (err) {
            console.error("Échec de la déconnexion", err);
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#17111e] text-[#f5eff5]">
                <div className="text-center space-y-4">
                    <div className="size-12 border-4 border-[#a279b3] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-[#b5a5bc] font-medium">Chargement de votre havre...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#17111e] text-[#f5eff5]">
            {/* NAVBAR */}
            <nav className="border-b border-white/[0.06] bg-[#1e1525] px-6 py-4 sm:px-10">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-xl border border-[#a77ac1]/30 bg-[#35233f] text-[#d6b8ed]">
                            <BookOpen size={18} strokeWidth={1.6} />
                        </div>
                        <span className="font-serif text-xl tracking-wide">
              story <span className="text-[#c59ad9]">haven</span>
            </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 rounded-xl bg-[#261c2f] px-3 py-1.5 border border-white/[0.04]">
                            <User size={15} className="text-[#c59ad9]" />
                            <span className="text-sm font-medium">{user?.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-[#b5a5bc] hover:text-red-400 transition p-1.5 rounded-lg hover:bg-white/[0.02]"
                            title="Se déconnecter"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTAINER */}
            <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
                {/* BANDEAU BIENVENUE */}
                <div className="relative overflow-hidden mb-10 rounded-3xl border border-white/[0.06] bg-gradient-to-r from-[#23192a] to-[#2d1b32] p-8 shadow-xl">
                    <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[#873d58]/10 blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-serif text-3xl sm:text-4xl text-white">Aventurier, bon retour.</h1>
                            <p className="mt-2 text-sm text-[#b5a5bc] max-w-xl">
                                Prêt à reprendre vos récits ? Rejoignez l'une de vos tables ou concevez un tout nouvel univers de jeu pour vos joueurs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* GRILLE DASHBOARD */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* COLONNE GAUCHE & CENTRE : CONTENU PRINCIPAL */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex border-b border-white/[0.08] gap-6">
                            <button
                                onClick={() => setActiveTab("universes")}
                                className={`pb-3 text-sm font-medium transition relative ${activeTab === "universes" ? "text-[#c59ad9]" : "text-[#b5a5bc] hover:text-white"}`}
                            >
                                Mes Communautés ({universes.length})
                                {activeTab === "universes" && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#c59ad9]" />}
                            </button>
                            <button
                                onClick={() => setActiveTab("characters")}
                                className={`pb-3 text-sm font-medium transition relative ${activeTab === "characters" ? "text-[#c59ad9]" : "text-[#b5a5bc] hover:text-white"}`}
                            >
                                Mes Personnages ({characters.length})
                                {activeTab === "characters" && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#c59ad9]" />}
                            </button>
                        </div>

                        {/* LISTE DES UNIVERSES */}
                        {activeTab === "universes" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {universes.map((uni) => (
                                    <Card key={uni.id} className="rounded-2xl border-white/[0.06] bg-[#211827] text-white hover:border-[#a77ac1]/30 transition group flex flex-col justify-between">
                                        <CardHeader className="p-5">
                                            <div className="flex items-center justify-between mb-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${uni.pivot.role === 'owner' ? 'bg-[#873d58]/30 text-[#e9a1be]' : 'bg-[#3d324b] text-[#cda8f0]'}`}>
                          {uni.pivot.role === 'owner' ? 'Fondateur' : 'Joueur'}
                        </span>
                                                <Users size={14} className="text-[#76677e]" />
                                            </div>
                                            <CardTitle className="font-serif text-xl group-hover:text-[#c59ad9] transition">{uni.name}</CardTitle>
                                            <CardDescription className="text-[#b5a5bc] text-xs line-clamp-2 mt-2 leading-relaxed">{uni.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-5 pt-0 border-t border-white/[0.03] flex items-center justify-between mt-auto">
                                            <span className="text-xs text-[#76677e]">24 joueurs actifs</span>
                                            <Link href={`/univers/${uni.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[#c59ad9] hover:underline">
                                                Entrer <ChevronRight size={14} />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* LISTE DES PERSONNAGES */}
                        {activeTab === "characters" && (
                            <div className="space-y-3">
                                {characters.map((char) => (
                                    <div key={char.id} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#211827] p-4 hover:border-[#a77ac1]/30 transition group">
                                        <div className="flex items-center gap-4">
                                            <div className="flex size-10 items-center justify-center rounded-xl bg-[#312439] text-[#c59ad9] border border-white/[0.04]">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white group-hover:text-[#c59ad9] transition">{char.name}</h4>
                                                <p className="text-xs text-[#76677e] mt-0.5">Univers : {char.univers_name}</p>
                                            </div>
                                        </div>
                                        <Link href={`/characters/${char.id}`} className="text-xs text-[#b5a5bc] hover:text-white transition flex items-center gap-1">
                                            Fiche <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* COLONNE DROITE : ACTIONS RAPIDES */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-lg tracking-wide text-white border-b border-white/[0.08] pb-3">Actions rapides</h3>

                        {/* ACTION : CREER */}
                        <Card className="rounded-2xl border-white/[0.06] bg-[#211827] text-white">
                            <CardContent className="p-5 space-y-4">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-[#873d58]/20 text-[#e9a1be] border border-[#873d58]/30">
                                    <Plus size={18} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Créer une communauté</h4>
                                    <p className="text-xs text-[#b5a5bc] mt-1 leading-relaxed">Devenez Narrateur, configurez votre lore et invitez vos joueurs à soumettre leurs fiches.</p>
                                </div>
                                <Button className="w-full h-10 rounded-xl bg-[#873d58] text-white hover:bg-[#a04b69] text-xs font-medium">
                                    Créer un nouvel Univers
                                </Button>
                            </CardContent>
                        </Card>

                        {/* ACTION : REJOINDRE */}
                        <Card className="rounded-2xl border-white/[0.06] bg-[#211827] text-white">
                            <CardContent className="p-5 space-y-4">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-[#a279b3]/20 text-[#d6b8ed] border border-[#a279b3]/30">
                                    <Compass size={18} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Rejoindre via un code</h4>
                                    <p className="text-xs text-[#b5a5bc] mt-1 leading-relaxed">Votre Maître du Jeu vous a donné un jeton d'invitation ? Entrez-le pour rejoindre l'aventure.</p>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ex: SH-75X9"
                                        className="h-10 w-full rounded-xl border border-white/10 bg-[#19121f] px-3 text-xs text-white placeholder:text-[#76677e] focus:outline-none focus:border-[#a279b3]"
                                    />
                                    <Button className="h-10 rounded-xl bg-[#3d2a4a] text-white hover:bg-[#4b355b] text-xs px-4 border border-white/[0.06]">
                                        Rejoindre
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
}

