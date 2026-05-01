import type { Metadata, Viewport } from "next";
import "./globals.css";

const preloadedImages = [
  "/design-assets/bg-philosophy-space.png",
  "/design-assets/bg-investments-underwater.png",
  "/design-assets/bg-team-desert.png",
  "/design-assets/founder-hisham.png",
  "/design-assets/founder-robert.png",
];

export const metadata: Metadata = {
  title: "All Together Capital",
  description: "Tech builders and founders investing in AI, software, hardware, space, biotech, and longevity.",
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
  themeColor: "#1F2328",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {preloadedImages.map((href) => (
          <link key={href} rel="preload" as="image" href={href} />
        ))}
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="" />
        <link rel="preconnect" href="https://icon.horse" crossOrigin="" />
        <link rel="preconnect" href="https://t1.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
      </head>
      <body className="antialiased overflow-x-hidden bg-[var(--at-deep)] text-[var(--at-paper)] min-h-[100dvh] min-h-[100svh]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
