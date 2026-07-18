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
          <div className="w-full max-w-md mx-auto mobile-container shadow-2xl overflow-hidden flex flex-col relative min-h-[100dvh]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
