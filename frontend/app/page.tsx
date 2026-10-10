
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Compass,
  Feather,
  Menu,
  Moon,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: Compass,
    title: "Bâtissez votre univers",
    description:
        "Rassemblez votre lore, vos lieux et vos factions dans un espace qui vous appartient.",
  },
  {
    icon: Users,
    title: "Donnez vie à vos personnages",
    description:
        "Créez des personnages, explorez leurs relations et gardez une trace de leur évolution.",
  },
  {
    icon: ScrollText,
    title: "Gardez le fil de vos histoires",
    description:
        "Organisez vos aventures et retrouvez les événements qui façonnent vos récits.",
  },
];

export default function Home() {
  const [currentYear] = useState(new Date().getFullYear());

  return (
      <main className="min-h-screen overflow-hidden bg-[#17111e] text-[#f5eff5]">
        {/* Navigation */}
        <header className="relative z-10 border-b border-white/[0.07]">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-[#a77ac1]/30 bg-[#35233f] text-[#d6b8ed] transition group-hover:bg-[#493052]">
                <BookOpen size={20} strokeWidth={1.6} />
              </div>
              <span className="font-serif text-xl tracking-wide">
              story <span className="text-[#c59ad9]">haven</span>
            </span>
            </Link>

            <div className="hidden items-center gap-8 text-sm text-[#c5b8cc] md:flex">
              <a
                  href="#univers"
                  className="transition hover:text-white"
              >
                Découvrir
              </a>
              <a
                  href="#fonctionnalites"
                  className="transition hover:text-white"
              >
                Fonctionnalités
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button
                  variant="ghost"
                  asChild
                  className="hidden rounded-full text-[#e4d9e9] hover:bg-white/5 hover:text-white sm:inline-flex"
              >
                <Link href="/login">Se connecter</Link>
              </Button>

              <Button
                  asChild
                  className="rounded-full bg-[#773950] px-5 text-white shadow-lg shadow-black/20 hover:bg-[#914661]"
              >
                <Link href="/register">Créer un compte</Link>
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section
            id="univers"
            className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-20 md:pt-28 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-32"
        >
          {/* Subtle background decoration */}
          <div className="pointer-events-none absolute -left-40 top-10 size-[440px] rounded-full bg-[#542747]/20 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 top-24 size-[360px] rounded-full bg-[#554078]/15 blur-[120px]" />

          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b18ac5]/20 bg-[#38263f]/70 px-4 py-2 text-xs tracking-[0.13em] text-[#d6b8e4]">
              <Sparkles size={14} />
              UN ESPACE POUR VOTRE IMAGINATION
            </div>

            <h1 className="max-w-xl font-serif text-5xl leading-[1.12] tracking-tight sm:text-6xl lg:text-[68px]">
              Chaque histoire
              <br />
              mérite son{" "}
              <span className="italic text-[#c79bd7]">
              univers.
            </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#bcb0c4] sm:text-lg">
              Vos personnages, votre lore, vos aventures.
              Un seul endroit pour donner vie aux mondes
              que vous imaginez ensemble.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-[#873d58] px-6 text-sm text-white hover:bg-[#a04b69]"
              >
                <Link href="/register">
                  Créer mon espace
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="h-12 rounded-full text-[#e1d4e7] hover:bg-white/5 hover:text-white"
              >
                <a href="#fonctionnalites">
                  Découvrir Story Haven
                  <ArrowDownRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#9e8da8]">
              <span>Vos univers</span>
              <span className="text-[#744d7c]">✳</span>
              <span>Vos personnages</span>
              <span className="text-[#744d7c]">✳</span>
              <span>Vos histoires</span>
            </div>
          </div>

          {/* Illustrative world preview */}
          <div className="relative mx-auto w-full max-w-[510px] lg:ml-auto">
            <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-[#6c3c70]/20 to-[#722c47]/10 blur-2xl" />

            <Card className="relative overflow-hidden rounded-[30px] border-[#76577f]/40 bg-[#211827] shadow-2xl shadow-black/30">
              <CardContent className="p-0">
                {/* Artwork */}
                <div className="relative flex h-[270px] items-center justify-center overflow-hidden bg-[#30233a]">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#46344f]/20 via-[#281c34]/10 to-[#211827]" />

                  <div className="absolute left-8 top-7 flex items-center gap-2 text-xs tracking-[0.2em] text-[#d0b6d9]">
                    <Moon size={14} />
                    LES CHRONIQUES D’AMBRELUNE
                  </div>

                  {/* Moon */}
                  <div className="absolute right-16 top-12 size-16 rounded-full bg-[#ead9e9]/90 shadow-[0_0_60px_rgba(210,166,220,0.22)]" />
                  <div className="absolute right-[52px] top-[39px] size-16 rounded-full bg-[#30233a]" />

                  {/* Stylized mountains and forest */}
                  <svg
                      viewBox="0 0 520 230"
                      className="absolute inset-x-0 bottom-0 h-[210px] w-full"
                      preserveAspectRatio="xMidYMax slice"
                      aria-hidden="true"
                  >
                    <path
                        d="M0 155 L80 85 L140 142 L225 55 L315 145 L390 77 L520 153 V230 H0Z"
                        fill="#49344f"
                    />
                    <path
                        d="M0 183 L110 122 L195 172 L305 100 L390 175 L465 119 L520 160 V230 H0Z"
                        fill="#35243f"
                    />
                    <path
                        d="M0 205 L70 165 L135 205 L210 155 L280 210 L355 163 L425 204 L490 170 L520 187 V230 H0Z"
                        fill="#241b2e"
                    />
                    {[
                      [45, 165],
                      [88, 148],
                      [170, 170],
                      [325, 162],
                      [405, 160],
                      [465, 145],
                    ].map(([x, y], i) => (
                        <g key={i} fill="#1c1626">
                          <path
                              d={`M${x} ${y + 35} l-17 0 l17 -38 l17 38 Z`}
                          />
                          <path
                              d={`M${x} ${y + 17} l-12 0 l12 -29 l12 29 Z`}
                          />
                        </g>
                    ))}
                    <path
                        d="M222 230 V184 L241 165 L260 184 V230"
                        fill="#17111e"
                    />
                    <path
                        d="M216 185 L241 155 L266 185"
                        fill="none"
                        stroke="#b28aba"
                        strokeWidth="1.2"
                        opacity="0.8"
                    />
                    <path
                        d="M241 230 V196"
                        stroke="#b28aba"
                        strokeWidth="1"
                        opacity="0.5"
                    />
                  </svg>

                  <div className="absolute bottom-5 left-6 flex items-center gap-2 rounded-full border border-white/10 bg-[#1d1625]/80 px-3 py-2 text-xs text-[#e5d7e9] backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-[#c9a1d8]" />
                    Un monde prend forme...
                  </div>
                </div>

                {/* World details */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.18em] text-[#a58bb1]">
                        VOTRE PROCHAIN UNIVERS
                      </p>
                      <h2 className="mt-2 font-serif text-2xl text-[#f2e6f2]">
                        Les Chroniques d’Ambrelune
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[#aa9bad]">
                        Là où les anciennes légendes
                        rencontrent de nouvelles histoires.
                      </p>
                    </div>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#7d5a87]/30 bg-[#38273f] text-[#d5b1e0]">
                      <Feather size={19} />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { icon: BookOpen, label: "Lore" },
                      { icon: Users, label: "Personnages" },
                      { icon: ScrollText, label: "Chroniques" },
                    ].map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-2 py-4 text-center"
                        >
                          <Icon
                              size={18}
                              className="mx-auto text-[#bc91ca]"
                              strokeWidth={1.5}
                          />
                          <p className="mt-2 text-xs text-[#c8b7ce]">
                            {label}
                          </p>
                        </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-[#76577f]/30 bg-[#261b30] px-4 py-3 shadow-xl sm:flex">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#49314f] text-[#d8b3e4]">
                <Sparkles size={17} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#eee1f1]">
                  Votre imagination
                </p>
                <p className="mt-1 text-xs text-[#a999b0]">
                  Sans limites.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
            id="fonctionnalites"
            className="border-t border-white/[0.07] bg-[#1d1524] px-6 py-20 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.2em] text-[#bd8bcf]">
                TOUT AU MÊME ENDROIT
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Moins de temps à organiser.
                <br />
                <span className="italic text-[#c49ad4]">
                Plus de temps à raconter.
              </span>
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-[#b5a5bc]">
                Un espace conçu pour celles et ceux qui aiment
                inventer des mondes, faire évoluer leurs
                personnages et écrire des histoires ensemble.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                  <Card
                      key={title}
                      className="rounded-[24px] border-white/[0.08] bg-[#261b2e] transition duration-300 hover:-translate-y-1 hover:border-[#946ba4]/50"
                  >
                    <CardContent className="p-7">
                      <div className="flex size-12 items-center justify-center rounded-2xl border border-[#a279b3]/20 bg-[#47304f] text-[#d2addf]">
                        <Icon size={21} strokeWidth={1.6} />
                      </div>
                      <h3 className="mt-6 font-serif text-xl text-[#f1e5f1]">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#b3a3bb]">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-[#8d638f]/25 bg-gradient-to-br from-[#35233e] to-[#271925] px-6 py-12 text-center sm:px-12 sm:py-16">
            <Moon className="mx-auto size-7 text-[#d0a6de]" />
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
              Et si votre prochaine histoire
              <br className="hidden sm:block" /> commençait ici ?
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-[#c0b0c8]">
              Créez votre espace et donnez une place à tous
              les univers que vous imaginez.
            </p>
            <Button
                asChild
                size="lg"
                className="mt-8 h-12 rounded-full bg-[#873d58] px-7 text-white hover:bg-[#a04b69]"
            >
              <Link href="/register">
                Créer mon compte
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.07] px-6 py-7 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#9d8ca5] sm:flex-row">
            <Link href="/" className="font-serif text-lg text-[#dfc9e5]">
              story haven
            </Link>
            <p>Un espace pour les mondes que vous imaginez.</p>
            <p>© {currentYear} Story Haven</p>
          </div>
        </footer>
      </main>
  );
}
