import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Fraunces } from "next/font/google";
import { ProgressProvider } from "@/components/ProgressProvider";
import "./globals.css";

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "EMT Drill",
  description:
    "Scenario-based EMT practice for clinical decisions, assessment sequencing, and NREMT-style reasoning.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e8f0f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
