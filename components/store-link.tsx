"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

// Use the public router rather than Vinext's broken private link-navigation
// import in production. NextLink still supplies href resolution and prefetching.
export default function StoreLink({ onClick, onNavigate, ...props }: ComponentProps<typeof NextLink>) {
  const router = useRouter();

  return <NextLink {...props} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.currentTarget;
    if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;

    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    event.preventDefault();
    let cancelled = false;
    onNavigate?.({ preventDefault: () => { cancelled = true; } });
    if (cancelled) return;

    const href = `${destination.pathname}${destination.search}${destination.hash}`;
    const options = { scroll: props.scroll !== false };
    if (props.replace) router.replace(href, options);
    else router.push(href, options);
  }} />;
}
