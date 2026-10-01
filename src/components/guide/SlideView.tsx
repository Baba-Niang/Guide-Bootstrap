// =====================================================================
// SlideView — Affichage d'une fiche
// ---------------------------------------------------------------------
//  - Si la fiche possède une image 1774×887 : affichage plein cadre,
//    image non déformée (object-contain), lisible sans zoom.
//  - Sinon : placeholder pédagogique montrant la structure
//    CODE → TRANSFORMATION → RÉSULTAT avec de vraies classes Bootstrap.
// =====================================================================

"use client";

import { Fiche, partById } from "@/data/fiches";
import { ImageOff, Tag, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SlideViewProps = {
  fiche: Fiche;
  direction: 1 | -1;
  isAnimating: boolean;
};

export function SlideView({ fiche, direction, isAnimating }: SlideViewProps) {
  const part = partById(fiche.partId);

  // Reset scroll position on fiche change
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [fiche.id]);

  return (
    <div
      ref={scrollRef}
      className="guide-scroll flex-1 overflow-y-auto"
      key={fiche.id}
    >
      <div
        className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10"
        style={{
          animation: `${direction === 1 ? "slideInRight" : "slideInLeft"} 0.38s ease-out`,
        }}
      >
        {/* Header de la fiche */}
        <FicheHeader fiche={fiche} partColor={part?.color ?? "#0d6efd"} />

        {/* Corps de la fiche */}
        <div className="mt-6">
          {fiche.image ? (
            <FicheImage
              key={fiche.id}
              src={fiche.image}
              title={fiche.title}
            />
          ) : (
            <FichePlaceholder fiche={fiche} />
          )}
        </div>

        {/* Mots-clés */}
        <FicheKeywords fiche={fiche} partColor={part?.color ?? "#0d6efd"} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Header de la fiche : badge partie, ID, titre, description
// ---------------------------------------------------------------------
function FicheHeader({
  fiche,
  partColor,
}: {
  fiche: Fiche;
  partColor: string;
}) {
  const part = partById(fiche.partId);
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex flex-none items-center gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-extrabold text-white shadow-md"
          style={{ backgroundColor: partColor }}
        >
          {fiche.partId}
        </span>
        <span
          className="rounded-md px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: partColor }}
        >
          {fiche.id}
        </span>
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {part?.title}
        </div>
        <h1 className="mt-0.5 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {fiche.title}
        </h1>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------
// Affichage de l'image 1774×887
// État encapsulé dans le composant : se reset automatiquement via key
// ---------------------------------------------------------------------
function FicheImage({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return <FichePlaceholder fiche={{ id: "?", partId: "?", partTitle: "", title, image: null, description: "Image introuvable.", keywords: [] }} />;
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="relative aspect-[1774/887] w-full bg-slate-50">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#0d6efd]" />
              <span className="text-sm">Chargement de la fiche…</span>
            </div>
          </div>
        )}
        <img
          src={src}
          alt={`Fiche ${title}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
          className="h-full w-full object-contain object-center"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
        />
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
        Fiche visuelle · format 1774 × 887 px · non déformée
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------
// Placeholder pédagogique pour fiches sans image
// Montre la structure CODE → TRANSFORMATION → RÉSULTAT avec
// de vraies classes Bootstrap sur des exemples typés selon la partie.
// ---------------------------------------------------------------------
function FichePlaceholder({ fiche }: { fiche: Fiche }) {
  const example = getPlaceholderExample(fiche.id);

  return (
    <div className="space-y-5">
      {/* Bandeau image à venir */}
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-5 py-3 text-amber-800">
        <ImageOff className="h-5 w-5 flex-none" />
        <span className="text-sm font-medium">
          Image de la fiche à venir. Voici un aperçu pédagogique de la notion.
        </span>
      </div>

      {/* Description */}
      <div className="rounded-xl bg-slate-50 px-5 py-4 text-slate-700">
        <p className="text-base leading-relaxed">{fiche.description}</p>
      </div>

      {/* Bloc CODE → TRANSFORMATION → RÉSULTAT */}
      {example && (
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          {/* CODE */}
          <div className="rounded-xl bg-slate-900 p-5 shadow-lg">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0d6efd]/30 text-[10px] text-[#0d6efd]">
                1
              </span>
              Code
            </div>
            <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-100">
              <code>{example.code}</code>
            </pre>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-slate-400">
              <ArrowRight className="hidden h-6 w-6 lg:block" />
              <ArrowRight className="h-6 w-6 rotate-90 lg:hidden" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                transforme
              </span>
            </div>
          </div>

          {/* RÉSULTAT */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-100 text-[10px] text-emerald-700">
                2
              </span>
              Résultat visuel
            </div>
            <div className="flex min-h-[120px] items-center justify-center">
              {example.result}
            </div>
          </div>
        </div>
      )}

      {/* À retenir */}
      <div className="rounded-xl bg-[#0d6efd]/5 border border-[#0d6efd]/20 px-5 py-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0d6efd]">
          À retenir
        </div>
        <p className="text-sm leading-relaxed text-slate-700">
          {example?.keep ?? fiche.description}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Mots-clés Bootstrap
// ---------------------------------------------------------------------
function FicheKeywords({
  fiche,
  partColor,
}: {
  fiche: Fiche;
  partColor: string;
}) {
  if (!fiche.keywords.length) return null;
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Tag className="h-3.5 w-3.5" /> Classes abordées
      </span>
      {fiche.keywords.map((kw) => (
        <span
          key={kw}
          className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-600"
        >
          {kw}
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------
// Exemples pédagogiques par fiche (placeholder)
// ---------------------------------------------------------------------
type PlaceholderExample = {
  code: string;
  result: React.ReactNode;
  keep: string;
};

function getPlaceholderExample(ficheId: string): PlaceholderExample | null {
  const examples: Record<string, PlaceholderExample> = {
    J5: {
      code: `<button class="btn btn-sm btn-primary">
  Petit
</button>
<button class="btn btn-primary">
  Normal
</button>
<button class="btn btn-lg btn-primary">
  Grand
</button>`,
      result: (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="rounded-md bg-[#0d6efd] px-2.5 py-1 text-xs font-semibold text-white">
            Petit
          </button>
          <button className="rounded-md bg-[#0d6efd] px-4 py-1.5 text-sm font-semibold text-white">
            Normal
          </button>
          <button className="rounded-md bg-[#0d6efd] px-5 py-2.5 text-base font-semibold text-white">
            Grand
          </button>
        </div>
      ),
      keep: "Trois tailles officielles : btn-sm (compact), btn (défaut), btn-lg (mise en avant). Choisir selon la hiérarchie visuelle de la page.",
    },
    J6: {
      code: `<button class="btn btn-outline-primary">
  Outline
</button>
<button class="btn btn-primary">
  Plein
</button>`,
      result: (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="rounded-md border-2 border-[#0d6efd] bg-transparent px-4 py-2 text-sm font-semibold text-[#0d6efd]">
            Outline
          </button>
          <button className="rounded-md bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
            Plein
          </button>
        </div>
      ),
      keep: "btn-outline-* : bouton transparent avec bordure colorée. Variante élégante pour les actions secondaires.",
    },
    J7: {
      code: `<button class="btn btn-primary active">
  Actif
</button>
<button class="btn btn-primary" disabled>
  Désactivé
</button>`,
      result: (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="rounded-md bg-[#0b5ed7] px-4 py-2 text-sm font-semibold text-white shadow-inner">
            Actif
          </button>
          <button
            disabled
            className="rounded-md bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white opacity-50"
          >
            Désactivé
          </button>
        </div>
      ),
      keep: "active : bouton visuellement enfoncé (effet enfoncé). disabled : bouton grisé, non cliquable, pointer-events:none.",
    },
    J8: {
      code: `<button class="btn-close"></button>`,
      result: (
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="relative h-8 w-8 rounded-md hover:bg-slate-100"
            aria-label="Close"
          >
            <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-700" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-slate-700" />
          </button>
        </div>
      ),
      keep: "btn-close : croix de fermeture standardisée. À combiner avec data-bs-dismiss pour fermer modals et alerts.",
    },
    J9: {
      code: `<div class="btn-group">
  <button class="btn btn-primary">G</button>
  <button class="btn btn-primary">D</button>
  <button class="btn btn-primary">M</button>
</div>`,
      result: (
        <div className="inline-flex overflow-hidden rounded-md">
          <button className="bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
            G
          </button>
          <button className="border-l border-white/30 bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
            D
          </button>
          <button className="border-l border-white/30 bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
            M
          </button>
        </div>
      ),
      keep: "btn-group : regroupe visuellement plusieurs boutons. Les bordures fusionnent pour former une barre d'outils cohérente.",
    },
    J10: {
      code: `<div class="btn-group-vertical">
  <button class="btn btn-primary">1</button>
  <button class="btn btn-primary">2</button>
  <button class="btn btn-primary">3</button>
</div>`,
      result: (
        <div className="inline-flex flex-col overflow-hidden rounded-md">
          <button className="bg-[#0d6efd] px-6 py-2 text-sm font-semibold text-white">
            1
          </button>
          <button className="border-t border-white/30 bg-[#0d6efd] px-6 py-2 text-sm font-semibold text-white">
            2
          </button>
          <button className="border-t border-white/30 bg-[#0d6efd] px-6 py-2 text-sm font-semibold text-white">
            3
          </button>
        </div>
      ),
      keep: "btn-group-vertical : même principe que btn-group mais empilé verticalement. Idéal pour menus d'actions.",
    },
    J11: {
      code: `<button class="btn btn-primary w-100">
  Valider
</button>`,
      result: (
        <div className="w-full max-w-xs">
          <button className="w-full rounded-md bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
            Valider
          </button>
        </div>
      ),
      keep: "w-100 sur un btn : bouton qui occupe toute la largeur du parent. Parfait pour les formulaires et CTA mobile.",
    },
    J12: {
      code: `<button class="btn btn-primary 
        d-none d-md-inline-block">
  Desktop only
</button>`,
      result: (
        <div className="flex flex-col items-center gap-2">
          <button className="rounded-md bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
            Desktop only
          </button>
          <span className="text-xs text-slate-400">
            (visible à partir de md ≥ 768px)
          </span>
        </div>
      ),
      keep: "Combiner btn + d-none d-md-inline-block : bouton caché sur mobile, visible sur desktop. Technique responsive clé.",
    },
    K1: {
      code: `/* Breakpoints Bootstrap */
sm  → 576px
md  → 768px
lg  → 992px
xl  → 1200px
xxl → 1400px`,
      result: (
        <div className="grid grid-cols-5 gap-2 text-center">
          {[
            ["sm", "576"],
            ["md", "768"],
            ["lg", "992"],
            ["xl", "1200"],
            ["xxl", "1400"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-md bg-[#0d6efd]/10 px-2 py-3"
            >
              <div className="font-mono text-sm font-bold text-[#0d6efd]">
                {k}
              </div>
              <div className="text-xs text-slate-500">{v}px</div>
            </div>
          ))}
        </div>
      ),
      keep: "Bootstrap définit 5 breakpoints : sm, md, lg, xl, xxl. Mobile-first : un breakpoint s'applique à partir de sa largeur et au-delà.",
    },
    K2: {
      code: `p-md-4
│   │  └ taille (4)
│   └──── breakpoint (md)
└──────── propriété (padding)`,
      result: (
        <div className="text-center font-mono text-sm">
          <div className="mb-2 inline-block rounded-md bg-[#0d6efd]/10 px-4 py-3 text-[#0d6efd]">
            p-md-4
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Padding 4, mais uniquement à partir de md (768px)
          </div>
        </div>
      ),
      keep: "Lecture d'une classe responsive : propriété-breakpoint-taille. Le breakpoint indique À PARTIR DE quelle largeur la règle s'applique.",
    },
    K3: {
      code: `Palier  Largeur min
─────────────────
sm      ≥ 576px
md      ≥ 768px
lg      ≥ 992px
xl      ≥ 1200px
xxl     ≥ 1400px`,
      result: (
        <div className="w-full max-w-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left font-mono text-[#0d6efd]">
                  Palier
                </th>
                <th className="px-3 py-2 text-right text-slate-500">
                  Largeur min
                </th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {[
                ["sm", "576px"],
                ["md", "768px"],
                ["lg", "992px"],
                ["xl", "1200px"],
                ["xxl", "1400px"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-slate-100">
                  <td className="px-3 py-1.5 font-bold text-[#0d6efd]">{k}</td>
                  <td className="px-3 py-1.5 text-right text-slate-600">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      keep: "5 paliers à mémoriser : 576, 768, 992, 1200, 1400. Facile à retenir : +200, +96, +208, +200.",
    },
    K4: {
      code: `<div class="bg-primary 
        bg-md-danger p-3">
  Couleur responsive
</div>`,
      result: (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-md bg-[#0d6efd] px-6 py-4 text-sm font-semibold text-white">
            <span className="lg:hidden">Bleu sur mobile</span>
            <span className="hidden lg:inline">Rouge sur desktop</span>
          </div>
          <span className="text-xs text-slate-400">
            (change selon la largeur d'écran)
          </span>
        </div>
      ),
      keep: "Les classes responsive permettent de changer n'importe quelle propriété visuelle selon l'écran : couleur, taille, affichage, espacement…",
    },
    K5: {
      code: `<div class="p-2 p-md-4 p-lg-6">
  Espacement adaptatif
</div>`,
      result: (
        <div className="text-center">
          <div className="inline-block rounded-md bg-slate-100 p-2 md:p-4 lg:p-6">
            <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-semibold text-white">
              Padding : 2 / 4 / 6
            </div>
          </div>
        </div>
      ),
      keep: "Empiler plusieurs règles responsive : la dernière qui correspond gagne. Permet 3 comportements différents sur 3 paliers.",
    },
    L1: {
      code: `<div class="d-flex">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>`,
      result: (
        <div className="flex gap-2">
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">A</div>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">B</div>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">C</div>
        </div>
      ),
      keep: "d-flex active Flexbox : les enfants deviennent des flex-items alignables. Sans d-flex, les blocs s'empilent verticalement.",
    },
    L2: {
      code: `<div class="d-flex flex-column">
  <div>A</div>
  <div>B</div>
</div>`,
      result: (
        <div className="flex flex-col gap-2">
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-center text-sm font-bold text-white">A</div>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-center text-sm font-bold text-white">B</div>
        </div>
      ),
      keep: "flex-row (défaut) : horizontal. flex-column : vertical. flex-row-reverse / flex-column-reverse : inverser l'ordre.",
    },
    L3: {
      code: `<div class="d-flex 
        justify-content-between">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>`,
      result: (
        <div className="flex justify-between">
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">A</div>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">B</div>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">C</div>
        </div>
      ),
      keep: "justify-content-* : alignement sur l'axe principal. start, end, center, between (écart maximal), around (écart demi-bords).",
    },
    L4: {
      code: `<div class="d-flex 
        align-items-center"
     style="min-height: 80px">
  <div>Centré</div>
</div>`,
      result: (
        <div className="flex items-center rounded bg-slate-100" style={{ minHeight: 80 }}>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">Centré</div>
        </div>
      ),
      keep: "align-items-* : alignement sur l'axe secondaire. center = centrage vertical parfait (avec une hauteur fixée au parent).",
    },
    L5: {
      code: `<div class="d-flex gap-3">
  <div>A</div>
  <div>B</div>
</div>`,
      result: (
        <div className="flex gap-3">
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">A</div>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">B</div>
        </div>
      ),
      keep: "gap-* : espace automatique entre flex-items. Évite de gérer des margin individuels. Échelle 0 à 5.",
    },
    L6: {
      code: `<div class="d-flex flex-wrap">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>`,
      result: (
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="w-12 rounded bg-[#0d6efd] px-2 py-3 text-center text-sm font-bold text-white"
            >
              {n}
            </div>
          ))}
        </div>
      ),
      keep: "flex-wrap : autorise le retour à la ligne des flex-items. flex-nowrap (défaut) : reste sur une seule ligne, peut déborder.",
    },
    L7: {
      code: `<div class="d-flex 
        justify-content-center 
        align-items-center gap-3">
  <div>A</div>
  <div>B</div>
</div>`,
      result: (
        <div
          className="flex items-center justify-center gap-3 rounded bg-slate-100"
          style={{ minHeight: 100 }}
        >
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">A</div>
          <div className="rounded bg-[#0d6efd] px-4 py-3 text-sm font-bold text-white">B</div>
        </div>
      ),
      keep: "Recette du centrage parfait : d-flex + justify-content-center + align-items-center. Le combo le plus utilisé en Flexbox.",
    },
    M1: {
      code: `<div class="container">
  Contenu centré
  max-width automatique
</div>`,
      result: (
        <div className="w-full">
          <div className="mx-auto max-w-2xl rounded-md border-2 border-dashed border-[#0d6efd] bg-[#0d6efd]/5 px-4 py-6 text-center text-sm font-semibold text-[#0d6efd]">
            container → max-width: 540px / 720px / 960px / 1140px / 1320px
          </div>
        </div>
      ),
      keep: "container : largeur maximale responsive. Centrage horizontal automatique. Le conteneur standard pour le contenu de page.",
    },
    M2: {
      code: `<div class="container-fluid">
  100% de largeur
  en permanence
</div>`,
      result: (
        <div className="w-full">
          <div className="rounded-md border-2 border-dashed border-[#6610f2] bg-[#6610f2]/5 px-4 py-6 text-center text-sm font-semibold text-[#6610f2]">
            container-fluid → width: 100% toujours
          </div>
        </div>
      ),
      keep: "container-fluid : 100% de largeur à tous les breakpoints. Idéal pour les banniières pleine largeur.",
    },
    M3: {
      code: `<div class="container-sm">
  Limité à partir de sm
</div>`,
      result: (
        <div className="w-full">
          <div className="mx-auto max-w-sm rounded-md border-2 border-dashed border-[#0dcaf0] bg-[#0dcaf0]/5 px-4 py-6 text-center text-sm font-semibold text-[#0dcaf0]">
            container-sm → 100% puis max-width à partir de 576px
          </div>
        </div>
      ),
      keep: "container-{bp} : full-width sous le breakpoint, puis largeur fixée. Combinaison intelligente de fluid et fixed.",
    },
    M4: {
      code: `BP     max-width container
─────────────────────
sm     540px
md     720px
lg     960px
xl     1140px
xxl    1320px`,
      result: (
        <div className="w-full max-w-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left font-mono text-[#0d6efd]">BP</th>
                <th className="px-3 py-2 text-right text-slate-500">max-width</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {[
                ["sm", "540px"],
                ["md", "720px"],
                ["lg", "960px"],
                ["xl", "1140px"],
                ["xxl", "1320px"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-slate-100">
                  <td className="px-3 py-1.5 font-bold text-[#0d6efd]">{k}</td>
                  <td className="px-3 py-1.5 text-right text-slate-600">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      keep: "Le container grandit par paliers. Au-delà de 1320px (xxl), il reste fixé. À retenir : +180px entre chaque palier.",
    },
    N1: {
      code: `<div class="row">
  <div class="col">1</div>
  <div class="col">2</div>
  <div class="col">3</div>
</div>`,
      result: (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">
              {n}
            </div>
          ))}
        </div>
      ),
      keep: "La grille Bootstrap : row + col. 12 colonnes virtuelles. Sans précision, chaque col prend une part égale.",
    },
    N2: {
      code: `<div class="row">
  <div class="col">A</div>
  <div class="col">B</div>
</div>`,
      result: (
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">A</div>
          <div className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">B</div>
        </div>
      ),
      keep: "row : conteneur Flex horizontal. Gère automatiquement les gutters (gouttières) entre les colonnes.",
    },
    N3: {
      code: `<div class="row">
  <div class="col">1/3</div>
  <div class="col">1/3</div>
  <div class="col">1/3</div>
</div>`,
      result: (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">
              1/3
            </div>
          ))}
        </div>
      ),
      keep: "col seul : largeur automatique et égale entre tous les cols. Si 3 cols → chacun prend 1/3.",
    },
    N4: {
      code: `12 colonnes
─────────
1 + 11   → 1/12 + 11/12
2 + 10   → 1/6 + 5/6
3 + 9    → 1/4 + 3/4
4 + 8    → 1/3 + 2/3
6 + 6    → 1/2 + 1/2`,
      result: (
        <div className="grid grid-cols-12 gap-1 text-center text-xs">
          {[
            [1, 11],
            [2, 10],
            [3, 9],
            [4, 8],
            [6, 6],
          ].map(([a, b], i) => (
            <div key={i} className="contents">
              <div
                className="rounded bg-[#6610f2] px-1 py-2 font-bold text-white"
                style={{ gridColumn: `span ${a}` }}
              >
                {a}
              </div>
              <div
                className="rounded bg-[#6610f2]/40 px-1 py-2 font-bold text-white"
                style={{ gridColumn: `span ${b}` }}
              >
                {b}
              </div>
            </div>
          ))}
        </div>
      ),
      keep: "Pourquoi 12 ? Divisible par 2, 3, 4, 6. Permet toutes les combinaisons courantes : moitiés, tiers, quarts, sixièmes.",
    },
    N5: {
      code: `<div class="row">
  <div class="col-6">6</div>
  <div class="col-6">6</div>
</div>`,
      result: (
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">col-6</div>
          <div className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">col-6</div>
        </div>
      ),
      keep: "col-6 : occupe 6 colonnes sur 12 = la moitié de la ligne. Deux col-6 = une ligne complète.",
    },
    N6: {
      code: `<div class="row">
  <div class="col-4">4</div>
  <div class="col-8">8</div>
</div>`,
      result: (
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">col-4</div>
          <div
            className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white"
            style={{ gridColumn: "span 2" }}
          >
            col-8
          </div>
        </div>
      ),
      keep: "col-4 + col-8 : combinaison 1/3 + 2/3. Très utilisée pour sidebar + contenu principal.",
    },
    N7: {
      code: `<div class="row">
  <div class="col-4">1</div>
  <div class="col-4">2</div>
  <div class="col-4">3</div>
</div>`,
      result: (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">
              col-4
            </div>
          ))}
        </div>
      ),
      keep: "Plusieurs col égales : col-4 × 3 = ligne complète (12), col-3 × 4 = ligne complète, col-2 × 6 = ligne complète.",
    },
    N8: {
      code: `<div class="row">
  <div class="col-12 col-md-6 
       col-lg-4">
    Responsive
  </div>
</div>`,
      result: (
        <div className="text-center">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded bg-[#6610f2] px-2 py-4 text-center text-sm font-bold text-white">
                col
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            1 colonne mobile · 2 tablette · 3 desktop
          </div>
        </div>
      ),
      keep: "col-12 col-md-6 col-lg-4 : mobile-first. 1 colonne sur mobile, 2 sur tablette, 3 sur desktop. Pattern ultra-classique.",
    },
    N9: {
      code: `<div class="container">
  <header class="row">…</header>
  <main class="row">
    <aside class="col-3">Menu</aside>
    <section class="col-9">Article</section>
  </main>
  <footer class="row">…</footer>
</div>`,
      result: (
        <div className="w-full space-y-2">
          <div className="rounded bg-slate-300 px-3 py-2 text-center text-xs font-bold text-slate-700">
            header
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3 rounded bg-[#6610f2] px-2 py-6 text-center text-xs font-bold text-white">
              aside col-3
            </div>
            <div className="col-span-9 rounded bg-[#6610f2]/60 px-2 py-6 text-center text-xs font-bold text-white">
              main col-9
            </div>
          </div>
          <div className="rounded bg-slate-300 px-3 py-2 text-center text-xs font-bold text-slate-700">
            footer
          </div>
        </div>
      ),
      keep: "Mise en page classique : header + (sidebar + contenu) + footer. Tout dans un container, et chaque section est une row.",
    },
    O1: {
      code: `<div class="card">
  <div class="card-body">
    <h5 class="card-title">
      Titre
    </h5>
    <p class="card-text">
      Contenu
    </p>
  </div>
</div>`,
      result: (
        <div className="max-w-xs rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
          <h5 className="text-base font-bold text-slate-900">Titre</h5>
          <p className="mt-1 text-sm text-slate-600">Contenu de la card.</p>
        </div>
      ),
      keep: "card : conteneur flexible avec card-body, card-title, card-text. Le composant le plus réutilisable de Bootstrap.",
    },
    O2: {
      code: `<nav class="navbar 
     navbar-dark bg-dark">
  <a class="navbar-brand">
    Mon site
  </a>
</nav>`,
      result: (
        <div className="w-full rounded-md bg-slate-900 px-4 py-3">
          <span className="font-bold text-white">Mon site</span>
        </div>
      ),
      keep: "navbar : barre de navigation responsive. Devient menu hamburger automatiquement sur mobile via navbar-toggler.",
    },
    O3: {
      code: `<div class="alert 
     alert-success">
  Opération réussie !
</div>`,
      result: (
        <div className="w-full rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          ✓ Opération réussie !
        </div>
      ),
      keep: "alert + alert-{success|danger|warning|info} : messages contextuels. Combinable avec btn-close pour dismissible.",
    },
    O4: {
      code: `<span class="badge 
      bg-primary">
  9
</span>`,
      result: (
        <div className="flex gap-2">
          <span className="rounded-full bg-[#0d6efd] px-2.5 py-0.5 text-xs font-bold text-white">9</span>
          <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">Nouveau</span>
          <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">42</span>
        </div>
      ),
      keep: "badge : petit marqueur collé à du contenu. Compteurs, états, labels. Taille automatique au contenu.",
    },
    O5: {
      code: `<ul class="list-group">
  <li class="list-group-item">
    Premier
  </li>
  <li class="list-group-item">
    Second
  </li>
</ul>`,
      result: (
        <ul className="w-full max-w-xs overflow-hidden rounded-md border border-slate-200">
          <li className="border-b border-slate-100 px-4 py-2 text-sm text-slate-700">Premier</li>
          <li className="px-4 py-2 text-sm text-slate-700">Second</li>
        </ul>
      ),
      keep: "list-group : liste stylée cohérente. Items actifs (list-group-item-active), désactivés, danger, success.",
    },
    O6: {
      code: `<button data-bs-toggle="modal"
        data-bs-target="#m">
  Ouvrir
</button>`,
      result: (
        <button className="rounded-md bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
          Ouvrir la fenêtre
        </button>
      ),
      keep: "modal : fenêtre superposée au contenu. Nécessite data-bs-toggle=modal et data-bs-target. Le composant le plus complexe.",
    },
    O7: {
      code: `<div class="dropdown">
  <button data-bs-toggle="dropdown">
    Menu ▾
  </button>
  <ul class="dropdown-menu">
    <li>Action 1</li>
  </ul>
</div>`,
      result: (
        <div className="text-center">
          <button className="rounded-md bg-[#0d6efd] px-4 py-2 text-sm font-semibold text-white">
            Menu ▾
          </button>
        </div>
      ),
      keep: "dropdown : menu déroulant caché. data-bs-toggle=dropdown active le comportement au clic.",
    },
    O8: {
      code: `<div class="accordion">
  <div class="accordion-item">
    <h2>Section 1</h2>
    <div>Contenu…</div>
  </div>
</div>`,
      result: (
        <div className="w-full max-w-md overflow-hidden rounded-md border border-slate-200">
          <div className="bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            ▸ Section 1
          </div>
          <div className="bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            ▸ Section 2
          </div>
        </div>
      ),
      keep: "accordion : panneaux repliables. Un seul ouvert à la fois. Idéal pour FAQ et formulaires longs.",
    },
    O9: {
      code: `<div class="carousel">
  <div class="carousel-item">
    <img src="1.jpg">
  </div>
  <div class="carousel-item">
    <img src="2.jpg">
  </div>
</div>`,
      result: (
        <div className="flex items-center justify-center gap-2">
          <button className="rounded bg-slate-200 px-3 py-2 text-slate-700">‹</button>
          <div className="h-16 w-32 rounded-md bg-gradient-to-r from-[#0d6efd] to-[#6610f2]" />
          <button className="rounded bg-slate-200 px-3 py-2 text-slate-700">›</button>
        </div>
      ),
      keep: "carousel : diaporama d'éléments. Nécessite JS pour la rotation automatique. Composant le plus complexe.",
    },
    P1: {
      code: `<div class="card shadow">
  <img src="…" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">Titre</h5>
    <p class="card-text">…</p>
    <button class="btn btn-primary">
      Action
    </button>
  </div>
</div>`,
      result: (
        <div className="max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="h-24 bg-gradient-to-br from-[#0d6efd] to-[#6610f2]" />
          <div className="p-4">
            <h5 className="text-sm font-bold text-slate-900">Titre</h5>
            <p className="mt-1 text-xs text-slate-600">Description de la card.</p>
            <button className="mt-3 rounded-md bg-[#0d6efd] px-3 py-1.5 text-xs font-semibold text-white">
              Action
            </button>
          </div>
        </div>
      ),
      keep: "Recette complète : card + shadow + card-img-top + card-body + btn. Un composant réutilisable pour tout catalogue.",
    },
    P2: {
      code: `<div class="btn-group">
  <button class="btn btn-outline-secondary">⟵</button>
  <button class="btn btn-outline-secondary">⟶</button>
  <button class="btn btn-outline-secondary">⟳</button>
  <button class="btn btn-danger">Supprimer</button>
</div>`,
      result: (
        <div className="inline-flex overflow-hidden rounded-md">
          <button className="border border-slate-300 px-3 py-2 text-slate-700">⟵</button>
          <button className="border border-l-0 border-slate-300 px-3 py-2 text-slate-700">⟶</button>
          <button className="border border-l-0 border-slate-300 px-3 py-2 text-slate-700">⟳</button>
          <button className="bg-red-500 px-3 py-2 text-white">Supprimer</button>
        </div>
      ),
      keep: "btn-group combinant des actions secondaires (outline) et une action destructive (danger). Code typique d'éditeur WYSIWYG.",
    },
    P3: {
      code: `<section class="container py-5">
  <div class="row g-4">
    <div class="col-12 col-md-6">
      Colonne 1
    </div>
    <div class="col-12 col-md-6">
      Colonne 2
    </div>
  </div>
</section>`,
      result: (
        <div className="w-full rounded-md border-2 border-dashed border-slate-300 p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded bg-[#0d6efd]/10 px-3 py-4 text-center text-xs font-bold text-[#0d6efd]">Col 1</div>
            <div className="rounded bg-[#0d6efd]/10 px-3 py-4 text-center text-xs font-bold text-[#0d6efd]">Col 2</div>
          </div>
        </div>
      ),
      keep: "container + row + col responsive + g-* (gutters) = section moderne. Le squelette de toutes les mises en page Bootstrap.",
    },
    P4: {
      code: `<nav class="navbar bg-dark">…</nav>
<header class="bg-primary text-white py-5">
  Hero
</header>
<main class="container">
  <div class="row">…cards…</div>
</main>
<footer class="bg-dark text-white">…</footer>`,
      result: (
        <div className="w-full space-y-1">
          <div className="rounded bg-slate-900 px-2 py-1 text-[10px] text-white">navbar</div>
          <div className="rounded bg-[#0d6efd] px-2 py-3 text-center text-[10px] font-bold text-white">hero</div>
          <div className="grid grid-cols-3 gap-1">
            <div className="rounded bg-white px-1 py-3 text-center text-[10px] border border-slate-200">card</div>
            <div className="rounded bg-white px-1 py-3 text-center text-[10px] border border-slate-200">card</div>
            <div className="rounded bg-white px-1 py-3 text-center text-[10px] border border-slate-200">card</div>
          </div>
          <div className="rounded bg-slate-900 px-2 py-1 text-[10px] text-white">footer</div>
        </div>
      ),
      keep: "Une page Bootstrap complète : navbar + hero + grille de cards + footer. Tous les composants vus précédemment assemblés.",
    },
    P5: {
      code: `<div class="col-12 col-md-6 
            col-lg-4 p-3 
            bg-primary text-white">
  …
</div>
/* Lecture :
   1) colonnes responsive
   2) padding
   3) couleur de fond
   4) couleur de texte */`,
      result: (
        <div className="w-full">
          <ol className="space-y-2 text-sm">
            <li><span className="font-mono text-[#0d6efd]">col-12 col-md-6 col-lg-4</span> → responsive grille</li>
            <li><span className="font-mono text-[#0d6efd]">p-3</span> → padding</li>
            <li><span className="font-mono text-[#0d6efd]">bg-primary</span> → fond bleu</li>
            <li><span className="font-mono text-[#0d6efd]">text-white</span> → texte blanc</li>
          </ol>
        </div>
      ),
      keep: "Méthode de lecture : décomposer classe par classe. 1) Layout 2) Espacement 3) Couleur 4) États. Comprendre l'ordre logique.",
    },
  };

  return examples[ficheId] ?? null;
}
