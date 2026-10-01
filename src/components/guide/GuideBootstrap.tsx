// =====================================================================
// GuideBootstrap — Composant racine du Guide Bootstrap Interactif
// ---------------------------------------------------------------------
// Gère :
//  - sidebar desktop (fixe) + drawer mobile
//  - navigation clavier (← →, Page Up/Down, Home/End)
//  - navigation molette (vertical wheel → next/prev, avec anti-rebond)
//  - navigation swipe mobile
//  - barre de progression + compteur + boutons prev/next
// =====================================================================

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { SlideView } from "./SlideView";
import { useGuideNavigation } from "@/hooks/guide/useGuideNavigation";
import { ChevronLeft, ChevronRight, Menu, Home } from "lucide-react";

export function GuideBootstrap() {
  const {
    current,
    currentId,
    currentPart,
    currentIndex,
    total,
    direction,
    isAnimating,
    openParts,
    goNext,
    goPrev,
    goTo,
    togglePart,
  } = useGuideNavigation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const wheelLockRef = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // ---- Navigation clavier --------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore si l'utilisateur tape dans un input
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goTo("A1");
          break;
        case "End":
          e.preventDefault();
          goTo("P5");
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo]);

  // ---- Navigation molette (avec anti-rebond 250ms) -------------------
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return;
      // Ignore les scroll verticaux minimes (trackpad)
      if (Math.abs(e.deltaY) < 25 && Math.abs(e.deltaX) < 25) return;

      // Privilégie le scroll horizontal (molette tilt)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 0) {
        goNext();
      } else {
        goPrev();
      }
      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 280);
    };

    // Écoute sur window pour capturer même au-dessus de la slide
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  // ---- Navigation swipe mobile ---------------------------------------
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      // Swipe horizontal marqué (delta X > 60px ET > 1.5× delta Y)
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev]);

  const goToHome = useCallback(() => goTo("A1"), [goTo]);

  if (!current || !currentPart) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Chargement du guide…
      </div>
    );
  }

  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar Desktop */}
      <aside className="hidden w-72 flex-none border-r border-slate-200 lg:block">
        <Sidebar
          currentId={currentId}
          openParts={openParts}
          togglePart={togglePart}
          goTo={goTo}
        />
      </aside>

      {/* Sidebar Mobile (drawer) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl">
            <Sidebar
              currentId={currentId}
              openParts={openParts}
              togglePart={togglePart}
              goTo={goTo}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barre du haut : menu mobile + progression + navigation */}
        <header className="flex-none border-b border-slate-200 bg-white">
          {/* Ligne 1 : branding + compteur + boutons */}
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Ouvrir le sommaire"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goToHome}
              className="flex items-center gap-2 rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"
              aria-label="Retour au début"
              title="Retour à la première fiche"
            >
              <Home className="h-4 w-4" />
              <span className="hidden text-sm font-bold sm:inline">
                Guide Bootstrap
              </span>
            </button>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* Chapitre courant */}
              <div className="hidden items-center gap-2 sm:flex">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
                  style={{ backgroundColor: currentPart.color }}
                >
                  {currentPart.id}
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Partie {currentPart.id}
                  </div>
                  <div className="text-xs font-bold text-slate-700">
                    {currentPart.title}
                  </div>
                </div>
              </div>

              {/* Compteur */}
              <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5">
                <span className="font-mono text-sm font-bold text-[#0d6efd]">
                  {currentIndex + 1}
                </span>
                <span className="text-slate-400">/</span>
                <span className="font-mono text-sm text-slate-500">{total}</span>
              </div>

              {/* Boutons prev/next */}
              <button
                type="button"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Fiche précédente"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={currentIndex === total - 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d6efd] text-white transition-colors hover:bg-[#0b5ed7] disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Fiche suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Ligne 2 : barre de progression */}
          <div className="relative h-1.5 w-full bg-slate-100">
            <div
              className="absolute left-0 top-0 h-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${currentPart.color}, ${currentPart.color}cc)`,
              }}
            />
          </div>
        </header>

        {/* Slide courante */}
        <main className="relative flex-1 overflow-hidden bg-slate-50">
          <SlideView
            fiche={current}
            direction={direction}
            isAnimating={isAnimating}
          />

          {/* Boutons de navigation flottants (desktop) */}
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="group absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full h-12 w-12 bg-white text-slate-600 shadow-lg ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:text-[#0d6efd] hover:ring-[#0d6efd]/30 disabled:cursor-not-allowed disabled:opacity-0 xl:flex"
            aria-label="Fiche précédente"
          >
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === total - 1}
            className="group absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full h-12 w-12 bg-[#0d6efd] text-white shadow-lg ring-1 ring-[#0d6efd] transition-all hover:bg-[#0b5ed7] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-0 xl:flex"
            aria-label="Fiche suivante"
          >
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </main>

        {/* Footer : titre courant + raccourcis */}
        <footer className="flex-none border-t border-slate-200 bg-white px-4 py-2 sm:px-6">
          <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2 truncate">
              <span className="font-mono font-bold text-[#0d6efd]">
                {current.id}
              </span>
              <span className="truncate">— {current.title}</span>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px]">
                  ←
                </kbd>
                <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px]">
                  →
                </kbd>
                <span className="ml-1">navigation</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px]">
                  molette
                </kbd>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px]">
                  swipe
                </kbd>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
