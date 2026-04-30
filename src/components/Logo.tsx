"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function Logo({ width = 36, height = 36, className = "", priority = false }: LogoProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <Image
        src="/logo-dark.png"
        alt="All Together Capital"
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={isDark ? "/logo-dark.png" : "/logo-light.png"}
      alt="All Together Capital"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
