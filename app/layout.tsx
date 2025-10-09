import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "REBUILDR вЂ” AI Web Agency",
  description: "REBUILDR СЃРѕР·РґР°С‘С‚ РІС‹СЂР°Р·РёС‚РµР»СЊРЅС‹Рµ С†РёС„СЂРѕРІС‹Рµ Р»РµРЅРґРёРЅРіРё Рё РїСЂРѕС‚РѕС‚РёРїС‹, РїСЂРµРІСЂР°С‰Р°СЏ СЃС‹СЂС‹Рµ РёРґРµРё РІ РїСЂРѕРґСѓРєС‚ СЃ СЏСЃРЅС‹Рј СЃРјС‹СЃР»РѕРј.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
