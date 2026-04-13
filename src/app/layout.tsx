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
  themeColor: "#08080c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ colorScheme: 'dark' }}>
      <body className="antialiased bg-black text-white h-[100dvh] overflow-hidden" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
