"use client";

import { ThemeProvider as Provider, useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <Provider attribute="data-theme" defaultTheme="dark" enableSystem storageKey="magnet-theme" disableTransitionOnChange>{children}</Provider>;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return <button type="button" aria-label="Toggle light or dark mode" title="Toggle light or dark mode" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
    <Sun className="theme-sun" aria-hidden="true" />
    <Moon className="theme-moon" aria-hidden="true" />
  </button>;
}
