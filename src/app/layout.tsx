import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guide Bootstrap Interactif",
  description: "Un parcours pédagogique visuel pour apprendre Bootstrap progressivement, notion par notion.",
  keywords: ["Bootstrap", "guide", "apprentissage", "css", "framework", "responsive"],
  authors: [{ name: "Baba-Niang" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Guide Bootstrap Interactif",
    description: "Parcours pédagogique visuel pour apprendre Bootstrap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guide Bootstrap Interactif",
    description: "Parcours pédagogique visuel pour apprendre Bootstrap",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
