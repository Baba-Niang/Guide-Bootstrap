// =====================================================================
// useGuideNavigation — état de navigation du Guide Bootstrap
// ---------------------------------------------------------------------
// Gère :
//  - la fiche courante (avec persistance localStorage)
//  - les chapitres ouverts/fermés dans la sidebar
//  - le déplacement (suivante / précédente / saut direct)
// =====================================================================

"use client";

import { useCallback, useEffect, useState } from "react";
import { ALL_FICHES, nextFiche, prevFiche, ficheGlobalIndex, PARTS } from "@/data/fiches";

const STORAGE_KEY = "guide-bootstrap:current-fiche";
const OPEN_PARTS_KEY = "guide-bootstrap:open-parts";

export function useGuideNavigation() {
  const [currentId, setCurrentId] = useState<string>(() => {
    if (typeof window === "undefined") return ALL_FICHES[0].id;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ALL_FICHES.some((f) => f.id === saved)) return saved;
    } catch {}
    return ALL_FICHES[0].id;
  });
  const [direction, setDirection] = useState<1 | -1>(1);
  const [openParts, setOpenParts] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (typeof window === "undefined") {
      initial.add(ALL_FICHES[0].partId);
      return initial;
    }
    try {
      const savedParts = localStorage.getItem(OPEN_PARTS_KEY);
      if (savedParts) {
        const arr = JSON.parse(savedParts) as string[];
        arr.forEach((p) => initial.add(p));
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      const partId = saved
        ? ALL_FICHES.find((f) => f.id === saved)?.partId
        : ALL_FICHES[0].partId;
      if (partId) initial.add(partId);
    } catch {}
    if (initial.size === 0) initial.add(ALL_FICHES[0].partId);
    return initial;
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // ---- Persistance ---------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currentId);
    } catch {}
  }, [currentId]);

  useEffect(() => {
    try {
      localStorage.setItem(OPEN_PARTS_KEY, JSON.stringify([...openParts]));
    } catch {}
  }, [openParts]);

  const goNext = useCallback(() => {
    const n = nextFiche(currentId);
    if (n) {
      setDirection(1);
      setIsAnimating(true);
      setCurrentId(n.id);
      setOpenParts((prev) =>
        prev.has(n.partId) ? prev : new Set(prev).add(n.partId)
      );
      window.setTimeout(() => setIsAnimating(false), 380);
    }
  }, [currentId]);

  const goPrev = useCallback(() => {
    const p = prevFiche(currentId);
    if (p) {
      setDirection(-1);
      setIsAnimating(true);
      setCurrentId(p.id);
      setOpenParts((prev) =>
        prev.has(p.partId) ? prev : new Set(prev).add(p.partId)
      );
      window.setTimeout(() => setIsAnimating(false), 380);
    }
  }, [currentId]);

  const goTo = useCallback((id: string) => {
    if (id === currentId) return;
    const target = ficheGlobalIndex(id);
    const current = ficheGlobalIndex(currentId);
    setDirection(target > current ? 1 : -1);
    setIsAnimating(true);
    setCurrentId(id);
    const partId = ALL_FICHES.find((f) => f.id === id)?.partId;
    if (partId) setOpenParts((prev) => new Set(prev).add(partId));
    window.setTimeout(() => setIsAnimating(false), 380);
  }, [currentId]);

  const togglePart = useCallback((partId: string) => {
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(partId)) next.delete(partId);
      else next.add(partId);
      return next;
    });
  }, []);

  const currentIndex = ficheGlobalIndex(currentId);
  const current = ALL_FICHES[currentIndex];
  const currentPart = PARTS.find((p) => p.id === current?.partId);

  return {
    currentId,
    current,
    currentPart,
    currentIndex,
    total: ALL_FICHES.length,
    direction,
    isAnimating,
    openParts,
    goNext,
    goPrev,
    goTo,
    togglePart,
  };
}
