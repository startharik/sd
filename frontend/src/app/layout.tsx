import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { BackgroundWrapper } from "@/components/BackgroundWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SD Covenant Community Center",
  description: "Empowering a global network for positive and innovative the sustainable future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-[#020617] text-slate-100 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen relative overflow-hidden">
            {/* 3D Background */}
            <BackgroundWrapper />

            {/* Ambient Background Glow */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-950/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-950/10 blur-[120px] rounded-full" />
            </div>

            <Header />
            
            <main className="flex-grow container mx-auto px-6 py-8 relative z-10">
              {children}
            </main>

            <footer className="border-t border-emerald-950/50 py-12 bg-[#020617] relative z-10">
              <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-black text-[10px]">SD</div>
                    <span className="text-lg font-bold tracking-tight text-white">SD Covenant <span className="text-emerald-500">Community Center</span></span>
                  </div>
                  <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                    Empowering a global network for positive and innovative the sustainable future
                  </p>
                </div>
                
                <div className="text-center md:text-right">
                  <p className="text-slate-500 text-sm mb-2">&copy; 2026 SD Covenant. All rights reserved.</p>
                  <div className="flex items-center justify-center md:justify-end gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/70">
                      RWA Demo Environment
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
