"use client"

import clsx from "clsx"

type ThemeLogoProps = {
  className?: string
}

export function ThemeLogo({ className }: ThemeLogoProps) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <span
        className="inline-flex items-center rounded-full border border-zinc-200/60 bg-white/80 px-4 py-2 text-sm font-black uppercase text-zinc-900 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.8)] transition-all duration-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
        style={{
          fontFamily: "var(--font-display, inherit)",
          letterSpacing: "0.55em",
        }}
      >
        REBUILDR
      </span>
      <span className="hidden text-xs font-medium tracking-[0.2em] text-zinc-500 transition-colors duration-300 sm:inline dark:text-zinc-300">
        adaptive web studio
      </span>
    </div>
  )
}
