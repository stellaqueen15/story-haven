import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Story Haven - Un foyer pour vos histoires",
  description: "Rejoignez des communautés de roleplay, créez vos personnages et écrivez des histoires ensemble.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
