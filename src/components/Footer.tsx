"use client";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-sm text-neutral-500 text-center">
          © {new Date().getFullYear()} zBuffer
        </p>
      </div>
    </footer>
  );
}
