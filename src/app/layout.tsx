import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zBuffer",
  description: "Tech builders and founders investing in AI, software, hardware, space, biotech, and longevity.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased overflow-x-hidden bg-black text-white">
        {children}
      </body>
    </html>
  );
}
