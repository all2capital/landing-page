import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "@voaii/proxima-nova/latin.css";
import "./globals.css";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "All2 Capital",
  description: "Tech builders and founders investing in AI, software, hardware, space, biotech, and longevity.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#08080c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden bg-black text-white min-h-[100dvh] min-h-[100svh]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
