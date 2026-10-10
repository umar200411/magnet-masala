"use client";

import { ThemeProvider as Provider, useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <Provider attribute="data-theme" defaultTheme="dark" enableSystem storageKey="magnet-theme" disableTransitionOnChange>{children}</Provider>;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const label = resolvedTheme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return <button className="theme-toggle" type="button" aria-label={label} aria-pressed={resolvedTheme === "light"} title={label} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
    <Sun className="theme-sun" aria-hidden="true" />
    <Moon className="theme-moon" aria-hidden="true" />
  </button>;
}
