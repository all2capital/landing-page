"use client";

import Image from "next/image";
import { founders } from "@/lib/site-content";
import { PageHeader } from "@/components/site/PageHeader";

export function TeamSlide() {
  return (
    <div className="at-team-slide min-h-full overflow-y-auto text-[var(--at-ink)]">
      <main className="relative z-[1] mx-auto w-full max-w-[1120px] px-5 pb-20 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-32 lg:px-14">
        <PageHeader title="Team" tone="dark" className="mb-12" />

        <section className="grid grid-cols-1 justify-center gap-8 md:grid-cols-[minmax(0,440px)_minmax(0,440px)] md:gap-10 lg:gap-12" aria-label="Team">
          {founders.map((member) => (
            <article
              key={member.name}
              className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--at-paper-soft)]"
            >
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 42vw, 100vw"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-[rgb(var(--at-ink-rgb)_/_0.7)] group-hover:block group-focus-within:block">
                <div className="pointer-events-auto flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="min-w-0">
                    <h2
                      className="m-0 truncate text-lg font-medium uppercase leading-[1.05] tracking-normal text-[#F4EFE6] sm:text-xl"
                      style={{ fontFamily: "var(--at-font-body)" }}
                    >
                      {member.name}
                    </h2>
                    <p className="m-0 mt-1 font-display text-base italic leading-tight text-[#F4EFE6] sm:text-lg">
                      Founding Partner
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex h-10 w-10 items-center justify-center border border-[rgb(244,239,230_/_0.7)] text-[#F4EFE6] touch-manipulation hover:border-[#F4EFE6] hover:bg-[#F4EFE6] hover:text-[var(--at-ink)]"
                    >
                      <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center border border-[rgb(244,239,230_/_0.7)] text-[#F4EFE6] touch-manipulation hover:border-[#F4EFE6] hover:bg-[#F4EFE6] hover:text-[var(--at-ink)]"
                    >
                      <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                        <rect x="2.5" y="5" width="19" height="14" rx="0.5" />
                        <path d="M3 6l9 7 9-7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
