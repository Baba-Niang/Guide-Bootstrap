// =====================================================================
// Sidebar — Navigation latérale avec chapitres A-P repliables
// =====================================================================

"use client";

import { PARTS } from "@/data/fiches";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  currentId: string;
  openParts: Set<string>;
  togglePart: (partId: string) => void;
  goTo: (id: string) => void;
  onCloseMobile?: () => void;
};

export function Sidebar({
  currentId,
  openParts,
  togglePart,
  goTo,
  onCloseMobile,
}: SidebarProps) {
  return (
    <nav
      aria-label="Sommaire du guide"
      className="flex h-full flex-col bg-white"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d6efd] text-white shadow-sm">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d6efd]">
            Guide
          </div>
          <div className="text-base font-extrabold text-slate-900">
            Bootstrap
          </div>
        </div>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Fermer le menu"
          >
            ✕
          </button>
        )}
      </div>

      {/* Liste des chapitres */}
      <div className="flex-1 overflow-y-auto px-3 py-4 guide-scroll">
        <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          16 parties · {PARTS.reduce((a, p) => a + p.fiches.length, 0)} fiches
        </div>

        {PARTS.map((part) => {
          const isOpen = openParts.has(part.id);
          const isCurrentPart = part.fiches.some((f) => f.id === currentId);

          return (
            <div key={part.id} className="mb-1">
              {/* Header du chapitre */}
              <button
                type="button"
                onClick={() => togglePart(part.id)}
                className={cn(
                  "group flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-semibold transition-colors",
                  isCurrentPart
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
                aria-expanded={isOpen}
              >
                <span
                  className="flex h-6 w-6 flex-none items-center justify-center rounded-md text-[11px] font-bold text-white"
                  style={{ backgroundColor: part.color }}
                >
                  {part.id}
                </span>
                <span className="flex-1 truncate">{part.title}</span>
                <span className="text-[10px] font-medium text-slate-400">
                  {part.fiches.length}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 flex-none text-slate-400 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Fiches du chapitre */}
              {isOpen && (
                <ul className="mt-1 space-y-0.5 pl-1">
                  {part.fiches.map((fiche) => {
                    const isCurrent = fiche.id === currentId;
                    return (
                      <li key={fiche.id}>
                        <button
                          type="button"
                          onClick={() => {
                            goTo(fiche.id);
                            onCloseMobile?.();
                          }}
                          className={cn(
                            "group flex w-full items-center gap-2 rounded-md py-1.5 pl-3 pr-2 text-left text-[13px] transition-colors",
                            isCurrent
                              ? "bg-[#0d6efd]/10 text-[#0d6efd] font-semibold"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          <ChevronRight
                            className={cn(
                              "h-3 w-3 flex-none",
                              isCurrent ? "text-[#0d6efd]" : "text-slate-300"
                            )}
                          />
                          <span className="flex-none font-mono text-[11px] text-slate-400">
                            {fiche.id}
                          </span>
                          <span className="flex-1 truncate">{fiche.title}</span>
                          {fiche.image ? (
                            <span
                              className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-400"
                              title="Image disponible"
                            />
                          ) : (
                            <span
                              className="h-1.5 w-1.5 flex-none rounded-full bg-slate-200"
                              title="Image à venir"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 px-5 py-3 text-[11px] text-slate-400">
        Guide interactif · Navigation : ← → · Molette · Swipe
      </div>
    </nav>
  );
}
