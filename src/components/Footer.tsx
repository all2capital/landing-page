"use client";

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs text-white/30 text-center">
          © {new Date().getFullYear()} All2 Capital
        </p>
      </div>
    </footer>
  );
}
