import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zBuffer",
  description: "Early-stage venture capital for technical founders building the infrastructure of tomorrow",
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
