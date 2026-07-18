import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "HalalFlow",
  description: "Agentic Halal Remittance & Zakat Protocol on Celo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased min-h-screen flex items-center justify-center`}>
        <Providers>
          <div className="w-full max-w-sm mobile-container shadow-2xl overflow-hidden flex flex-col relative h-[100dvh] sm:h-[850px] sm:rounded-[3rem] sm:border-[8px] sm:border-slate-800">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
