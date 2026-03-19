import type { Metadata, Viewport } from "next";
import "@fontsource/metropolis/latin.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "all2 capital",
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
  themeColor: "#08080c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden bg-white dark:bg-[#181818] text-neutral-900 dark:text-white min-h-[100dvh] min-h-[100svh]" suppressHydrationWarning>
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
