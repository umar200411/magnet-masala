"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";

export function WhatsAppLink({ href, children, className = "button whatsapp" }: { href: string; children: ReactNode; className?: string }) {
  const [preparing, setPreparing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={() => {
    setPreparing(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPreparing(false), 1100);
  }} aria-live="polite">{preparing ? <><Check size={18} aria-hidden="true" /> Preparing your order…</> : children}</a>;
}
