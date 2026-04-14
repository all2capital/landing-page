import type { Metadata, Viewport } from "next";
import "@fontsource/metropolis/latin.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "All Together Capital | Building AI & Software Together",
  description: "Founder-led fund investing in cutting-edge AI, robotics, energy, and space. We build with the tech we back.",
  icons: {
    icon: { url: "/favicon.png", type: "image/png" },
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ colorScheme: 'light' }}>
      <body className="antialiased bg-white text-black h-[100dvh] overflow-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
