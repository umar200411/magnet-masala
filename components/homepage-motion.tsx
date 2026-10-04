"use client";

import { useEffect } from "react";

export function HomepageMotion() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      sections.forEach(section => section.classList.add("reveal-visible"));
      return;
    }
    sections.forEach(section => section.classList.add("reveal-pending"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -35px 0px" });
    sections.forEach(section => observer.observe(section));

    let frame = 0;
    const stage = document.querySelector<HTMLElement>(".mm-hero-stage");
    const updateParallax = () => {
      if (!stage || reduceMotion.matches || window.innerWidth <= 700) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { stage.style.translate = `0 ${Math.min(window.scrollY * .035, 18)}px`; });
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateParallax);
      if (stage) stage.style.removeProperty("translate");
    };
  }, []);
  return null;
}
