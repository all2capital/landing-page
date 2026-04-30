"use client";

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs text-[rgb(var(--at-paper-rgb)_/_0.3)] text-center">
          © {new Date().getFullYear()} All Together Capital
        </p>
      </div>
    </footer>
  );
}
