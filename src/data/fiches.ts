// =====================================================================
// GUIDE BOOTSTRAP — Structure centralisée des fiches pédagogiques
// ---------------------------------------------------------------------
// Pour ajouter / remplacer une fiche, modifiez simplement ce fichier.
// Une fiche = une entrée. Le site se met à jour automatiquement.
//
//  - image : chemin vers l'image 1774×887 px dans /public/fiches/
//            (laisser null si l'image n'est pas encore disponible)
//  - description : court résumé affiché sous le titre (placeholder)
//  - keywords : mots-clés Bootstrap réellement concernés par la fiche
// =====================================================================

export type Fiche = {
  id: string;          // ex. "A1"
  partId: string;      // ex. "A"
  partTitle: string;   // ex. "Comprendre Bootstrap"
  title: string;       // ex. "Qu'est-ce que Bootstrap ?"
  image: string | null;
  description: string;
  keywords: string[];
};

export type Part = {
  id: string;
  title: string;
  shortTitle: string;
  color: string;       // couleur Bootstrap d'accent
  fiches: Fiche[];
};

// Convention image : /fiches/B_NN.png (44 images disponibles à ce jour).
// Les images sont attribuées séquentiellement aux premières fiches.
const img = (n: number) => `/fiches/B_${n}.png`;

export const PARTS: Part[] = [
  // ---------------------------------------------------------------- A
  {
    id: "A",
    title: "Comprendre Bootstrap",
    shortTitle: "Comprendre",
    color: "#0d6efd",
    fiches: [
      { id: "A1", partId: "A", partTitle: "Comprendre Bootstrap", title: "Qu'est-ce que Bootstrap ?", image: img(1), description: "Présentation générale de Bootstrap, framework CSS le plus utilisé pour construire des interfaces responsive.", keywords: ["framework", "css", "responsive"] },
      { id: "A2", partId: "A", partTitle: "Comprendre Bootstrap", title: "Pourquoi utiliser Bootstrap ?", image: img(2), description: "Les avantages concrets : rapidité, cohérence, composants prêts à l'emploi et communauté immense.", keywords: ["avantages", "productivité", "design"] },
      { id: "A3", partId: "A", partTitle: "Comprendre Bootstrap", title: "HTML + CSS + Bootstrap", image: img(3), description: "Comment Bootstrap s'ajoute au duo HTML/CSS sans le remplacer : une couche d'utilitaires et de composants.", keywords: ["html", "css", "integration"] },
      { id: "A4", partId: "A", partTitle: "Comprendre Bootstrap", title: "Installer Bootstrap", image: img(4), description: "Les trois méthodes : CDN, téléchargement local, npm. Laquelle choisir selon le projet.", keywords: ["cdn", "npm", "installation"] },
      { id: "A5", partId: "A", partTitle: "Comprendre Bootstrap", title: "Première classe Bootstrap", image: img(5), description: "Premier contact : appliquer bg-primary et text-white sur un <div> et voir le résultat immédiat.", keywords: ["bg-primary", "text-white", "premiere-classe"] },
    ],
  },
  // ---------------------------------------------------------------- B
  {
    id: "B",
    title: "Couleurs",
    shortTitle: "Couleurs",
    color: "#6610f2",
    fiches: [
      { id: "B1", partId: "B", partTitle: "Couleurs", title: "Couleurs de fond", image: img(6), description: "La famille bg-* : bg-primary, bg-success, bg-danger… Comment colorer un bloc entier.", keywords: ["bg-primary", "bg-success", "background"] },
      { id: "B2", partId: "B", partTitle: "Couleurs", title: "Couleurs du texte", image: img(7), description: "La famille text-* : text-primary, text-muted, text-white… Colorer uniquement le texte.", keywords: ["text-primary", "text-muted", "color"] },
      { id: "B3", partId: "B", partTitle: "Couleurs", title: "Combiner bg-* + text-*", image: img(8), description: "Associer une couleur de fond et une couleur de texte pour créer des blocs lisibles et contrastés.", keywords: ["combinaison", "contraste", "bg", "text"] },
      { id: "B4", partId: "B", partTitle: "Couleurs", title: "Comprendre les couleurs Bootstrap", image: img(9), description: "Le système sémantique : primary, secondary, success, danger, warning, info, light, dark.", keywords: ["palette", "semantic", "theme"] },
    ],
  },
  // ---------------------------------------------------------------- C
  {
    id: "C",
    title: "Classes utilitaires",
    shortTitle: "Utilitaires",
    color: "#0dcaf0",
    fiches: [
      { id: "C1", partId: "C", partTitle: "Classes utilitaires", title: "Qu'est-ce qu'une classe utilitaire ?", image: img(10), description: "Définition d'une classe utilitaire : une classe = une seule propriété CSS. Philosophie de Bootstrap.", keywords: ["utility", "atomique", "philosophie"] },
      { id: "C2", partId: "C", partTitle: "Classes utilitaires", title: "Comment lire une classe utilitaire ?", image: img(11), description: "La syntaxe propriété-côté-taille : p-t-3 = padding top 3. Mécanique de lecture universelle.", keywords: ["syntaxe", "lecture", "convention"] },
      { id: "C3", partId: "C", partTitle: "Classes utilitaires", title: "Combiner plusieurs classes", image: img(12), description: "Combiner plusieurs utilitaires pour construire un composant complet sans écrire de CSS personnalisé.", keywords: ["combinaison", "composition", "stack"] },
      { id: "C4", partId: "C", partTitle: "Classes utilitaires", title: "Propriété + option + breakpoint", image: img(13), description: "La logique tridimensionnelle : propriété + option + breakpoint. Comprendre comment lire p-md-4.", keywords: ["pattern", "responsive", "logique"] },
    ],
  },
  // ---------------------------------------------------------------- D
  {
    id: "D",
    title: "Espacement",
    shortTitle: "Espacement",
    color: "#198754",
    fiches: [
      { id: "D1", partId: "D", partTitle: "Espacement", title: "Margin : créer de l'espace autour", image: img(14), description: "Margin = espace extérieur. La classe m-* pousse l'élément loin de ses voisins.", keywords: ["margin", "m-", "exterior"] },
      { id: "D2", partId: "D", partTitle: "Espacement", title: "Margin : choisir le côté", image: img(15), description: "mt, mb, ms, me, mx, my : cibler un côté précis plutôt que tous les côtés.", keywords: ["mt", "mb", "ms", "me", "side"] },
      { id: "D3", partId: "D", partTitle: "Espacement", title: "Margin : comprendre les tailles", image: img(16), description: "Échelle 0 à 5 : chaque niveau correspond à 0.25rem × niveau. Comprendre les valeurs réelles.", keywords: ["tailles", "echelle", "spacers"] },
      { id: "D4", partId: "D", partTitle: "Espacement", title: "Margin responsive", image: img(17), description: "Adapter la marge selon l'écran : m-md-4 n'applique la marge qu'à partir de md.", keywords: ["responsive", "breakpoint", "md"] },
      { id: "D5", partId: "D", partTitle: "Espacement", title: "Padding : espace à l'intérieur", image: img(18), description: "Padding = espace intérieur. La classe p-* respire à l'intérieur de l'élément.", keywords: ["padding", "p-", "interior"] },
      { id: "D6", partId: "D", partTitle: "Espacement", title: "Padding : choisir le côté", image: img(19), description: "pt, pb, ps, pe, px, py : cibler un côté précis pour le padding.", keywords: ["pt", "pb", "ps", "pe"] },
      { id: "D7", partId: "D", partTitle: "Espacement", title: "Margin vs Padding", image: img(20), description: "Schéma de boîte : margin = extérieur, padding = intérieur. Quand utiliser l'un ou l'autre.", keywords: ["box-model", "comparaison", "difference"] },
    ],
  },
  // ---------------------------------------------------------------- E
  {
    id: "E",
    title: "Dimensions",
    shortTitle: "Dimensions",
    color: "#fd7e14",
    fiches: [
      { id: "E1", partId: "E", partTitle: "Dimensions", title: "Width : largeur", image: img(21), description: "w-25, w-50, w-75, w-100 : contrôler la largeur d'un élément en pourcentage.", keywords: ["width", "w-50", "largeur"] },
      { id: "E2", partId: "E", partTitle: "Dimensions", title: "Height : hauteur", image: img(22), description: "h-25, h-50, h-75, h-100 : contrôler la hauteur, avec la particularité du parent.", keywords: ["height", "h-100", "hauteur"] },
      { id: "E3", partId: "E", partTitle: "Dimensions", title: "Width + Height", image: img(23), description: "Combiner w-* et h-* pour fixer les dimensions. La classe w-100 h-100 = plein cadre.", keywords: ["combinaison", "ratio", "dimensions"] },
    ],
  },
  // ---------------------------------------------------------------- F
  {
    id: "F",
    title: "Affichage",
    shortTitle: "Affichage",
    color: "#d63384",
    fiches: [
      { id: "F1", partId: "F", partTitle: "Affichage", title: "Display : comprendre le principe", image: img(24), description: "display en CSS : block, inline, flex, none. Bootstrap reprend ce concept via d-*.", keywords: ["display", "d-", "css"] },
      { id: "F2", partId: "F", partTitle: "Affichage", title: "d-block vs d-inline", image: img(25), description: "Comportement block (pleine largeur, saut de ligne) vs inline (en flux, taille du contenu).", keywords: ["d-block", "d-inline", "comportement"] },
      { id: "F3", partId: "F", partTitle: "Affichage", title: "d-flex : activer Flexbox", image: img(26), description: "d-flex active Flexbox sur l'élément : ses enfants deviennent flex-items alignables.", keywords: ["d-flex", "flexbox", "alignement"] },
      { id: "F4", partId: "F", partTitle: "Affichage", title: "d-none : masquer un élément", image: img(27), description: "d-none cache un élément. Combiné à un breakpoint : d-md-none pour masquer seulement sur grand écran.", keywords: ["d-none", "hidden", "responsive"] },
    ],
  },
  // ---------------------------------------------------------------- G
  {
    id: "G",
    title: "Positionnement",
    shortTitle: "Positionnement",
    color: "#0d6efd",
    fiches: [
      { id: "G1", partId: "G", partTitle: "Positionnement", title: "position : comprendre le principe", image: img(28), description: "static, relative, absolute, fixed, sticky : les 5 valeurs fondamentales de position.", keywords: ["position", "css", "static"] },
      { id: "G2", partId: "G", partTitle: "Positionnement", title: "position-relative", image: img(29), description: "position-relative : l'élément sert de repère pour ses enfants absolus.", keywords: ["relative", "repere", "parent"] },
      { id: "G3", partId: "G", partTitle: "Positionnement", title: "position-absolute", image: img(30), description: "position-absolute : sorti du flux, positionné par rapport au parent relatif le plus proche.", keywords: ["absolute", "flux", "top"] },
      { id: "G4", partId: "G", partTitle: "Positionnement", title: "position-fixed", image: img(31), description: "position-fixed : reste fixe pendant le défilement. Idéal pour barre de navigation.", keywords: ["fixed", "scroll", "navbar"] },
      { id: "G5", partId: "G", partTitle: "Positionnement", title: "position-sticky", image: img(32), description: "position-sticky : hybride entre relative et fixed, reste collé tant qu'on défile dans son parent.", keywords: ["sticky", "hybride", "scroll"] },
    ],
  },
  // ---------------------------------------------------------------- H
  {
    id: "H",
    title: "Overflow",
    shortTitle: "Overflow",
    color: "#6610f2",
    fiches: [
      { id: "H1", partId: "H", partTitle: "Overflow", title: "overflow : comprendre le débordement", image: img(33), description: "Quand le contenu dépasse le conteneur : visible, hidden, scroll, auto. Comprendre le débordement.", keywords: ["overflow", "debordement", "container"] },
      { id: "H2", partId: "H", partTitle: "Overflow", title: "overflow-auto", image: img(34), description: "overflow-auto : le navigateur ajoute une scrollbar uniquement si le contenu déborde.", keywords: ["auto", "scrollbar", "intelligent"] },
      { id: "H3", partId: "H", partTitle: "Overflow", title: "overflow-hidden", image: img(35), description: "overflow-hidden : tout ce qui dépasse est coupé net. Utile pour rogner des images.", keywords: ["hidden", "crop", "coupe"] },
      { id: "H4", partId: "H", partTitle: "Overflow", title: "overflow-scroll", image: img(36), description: "overflow-scroll : la scrollbar est toujours présente, même si le contenu ne déborde pas.", keywords: ["scroll", "always", "force"] },
    ],
  },
  // ---------------------------------------------------------------- I
  {
    id: "I",
    title: "Apparence",
    shortTitle: "Apparence",
    color: "#198754",
    fiches: [
      { id: "I1", partId: "I", partTitle: "Apparence", title: "shadow : ajouter une ombre", image: img(37), description: "shadow, shadow-sm, shadow-lg : trois niveaux d'ombres pour donner de la profondeur.", keywords: ["shadow", "depth", "elevation"] },
      { id: "I2", partId: "I", partTitle: "Apparence", title: "border : ajouter une bordure", image: img(38), description: "border, border-top, border-bottom… Comment tracer une bordure sur un côté précis.", keywords: ["border", "outline", "line"] },
      { id: "I3", partId: "I", partTitle: "Apparence", title: "border : couleur et épaisseur", image: img(39), description: "border-primary, border-2, border-3 : colorer la bordure et jouer sur son épaisseur.", keywords: ["border-primary", "border-3", "color"] },
      { id: "I4", partId: "I", partTitle: "Apparence", title: "rounded : arrondir les coins", image: img(40), description: "rounded, rounded-3, rounded-circle, rounded-pill : maîtriser les angles arrondis.", keywords: ["rounded", "circle", "radius"] },
    ],
  },
  // ---------------------------------------------------------------- J
  {
    id: "J",
    title: "Boutons",
    shortTitle: "Boutons",
    color: "#fd7e14",
    fiches: [
      { id: "J1", partId: "J", partTitle: "Boutons", title: "Qu'est-ce qu'un bouton Bootstrap ?", image: img(41), description: "Définition et rôle du bouton : élément d'action principal. Pourquoi btn est spécial.", keywords: ["btn", "action", "cta"] },
      { id: "J2", partId: "J", partTitle: "Boutons", title: "La classe btn", image: img(42), description: "La classe de base btn : styles fondamentaux (padding, bordure, curseur, hover).", keywords: ["btn", "base", "fondamentaux"] },
      { id: "J3", partId: "J", partTitle: "Boutons", title: "btn + couleur", image: img(43), description: "btn-primary, btn-success, btn-danger… La couleur donne le sens sémantique au bouton.", keywords: ["btn-primary", "btn-success", "semantic"] },
      { id: "J4", partId: "J", partTitle: "Boutons", title: "Les couleurs des boutons", image: img(44), description: "Vue d'ensemble des 8 couleurs de boutons et leur signification.", keywords: ["colors", "palette", "semantic"] },
      { id: "J5", partId: "J", partTitle: "Boutons", title: "Les tailles btn-sm / btn / btn-lg", image: null, description: "Trois tailles officielles : btn-sm, btn (défaut), btn-lg. Quand utiliser laquelle.", keywords: ["btn-sm", "btn-lg", "tailles"] },
      { id: "J6", partId: "J", partTitle: "Boutons", title: "Les boutons outline", image: null, description: "btn-outline-primary : bouton transparent avec bordure colorée. Variante élégante.", keywords: ["outline", "transparent", "variant"] },
      { id: "J7", partId: "J", partTitle: "Boutons", title: "Les états active / disabled", image: null, description: "active : bouton enfoncé visuellement. disabled : bouton désactivé, non cliquable.", keywords: ["active", "disabled", "states"] },
      { id: "J8", partId: "J", partTitle: "Boutons", title: "btn-close", image: null, description: "btn-close : la croix de fermeture. Utilisée dans modals, alerts et notifications.", keywords: ["close", "dismiss", "x"] },
      { id: "J9", partId: "J", partTitle: "Boutons", title: "btn-group", image: null, description: "btn-group : regrouper plusieurs boutons côte à côte pour former une barre d'outils.", keywords: ["group", "toolbar", "combiner"] },
      { id: "J10", partId: "J", partTitle: "Boutons", title: "Groupes verticaux", image: null, description: "btn-group-vertical : empiler les boutons verticalement pour des menus d'actions.", keywords: ["vertical", "stack", "menu"] },
      { id: "J11", partId: "J", partTitle: "Boutons", title: "Boutons pleine largeur", image: null, description: "w-100 sur un btn : bouton qui occupe toute la largeur du parent. Idéal pour formulaires.", keywords: ["w-100", "full-width", "block"] },
      { id: "J12", partId: "J", partTitle: "Boutons", title: "Boutons responsives", image: null, description: "Combiner btn + classes responsive pour adapter la taille ou l'affichage selon l'écran.", keywords: ["responsive", "breakpoint", "mobile"] },
    ],
  },
  // ---------------------------------------------------------------- K
  {
    id: "K",
    title: "Responsive",
    shortTitle: "Responsive",
    color: "#0dcaf0",
    fiches: [
      { id: "K1", partId: "K", partTitle: "Responsive", title: "Comprendre les breakpoints", image: null, description: "sm, md, lg, xl, xxl : les 5 paliers de Bootstrap. Que se passe-t-il à chaque seuil.", keywords: ["breakpoints", "sm", "md", "lg"] },
      { id: "K2", partId: "K", partTitle: "Responsive", title: "Comment lire une classe responsive", image: null, description: "Syntaxe propriété-breakpoint-taille : p-md-4 = padding 4 uniquement à partir de md.", keywords: ["syntaxe", "lecture", "convention"] },
      { id: "K3", partId: "K", partTitle: "Responsive", title: "sm / md / lg / xl / xxl", image: null, description: "Tableau des largeurs : 576, 768, 992, 1200, 1400 px. Mémoriser les paliers.", keywords: ["widths", "thresholds", "sizes"] },
      { id: "K4", partId: "K", partTitle: "Responsive", title: "Modifier un style selon l'écran", image: null, description: "Cas concret : changer la couleur, la taille ou l'affichage entre mobile et desktop.", keywords: ["adapt", "variation", "mobile"] },
      { id: "K5", partId: "K", partTitle: "Responsive", title: "Combiner plusieurs règles responsive", image: null, description: "Empiler p-2 p-md-4 p-lg-6 : trois comportements différents selon l'écran.", keywords: ["stack", "combine", "multi-rules"] },
    ],
  },
  // ---------------------------------------------------------------- L
  {
    id: "L",
    title: "Flexbox",
    shortTitle: "Flexbox",
    color: "#d63384",
    fiches: [
      { id: "L1", partId: "L", partTitle: "Flexbox", title: "Comprendre d-flex", image: null, description: "d-flex active le modèle Flexbox : les enfants deviennent flex-items alignables.", keywords: ["d-flex", "activation", "model"] },
      { id: "L2", partId: "L", partTitle: "Flexbox", title: "flex-direction", image: null, description: "flex-row, flex-column, flex-row-reverse : changer l'axe principal des flex-items.", keywords: ["direction", "row", "column"] },
      { id: "L3", partId: "L", partTitle: "Flexbox", title: "justify-content", image: null, description: "justify-content-start/end/center/between/around : aligner sur l'axe principal.", keywords: ["justify", "alignment", "main-axis"] },
      { id: "L4", partId: "L", partTitle: "Flexbox", title: "align-items", image: null, description: "align-items-start/end/center/baseline/stretch : aligner sur l'axe secondaire.", keywords: ["align", "cross-axis", "items"] },
      { id: "L5", partId: "L", partTitle: "Flexbox", title: "gap", image: null, description: "gap-2, gap-3 : espacer automatiquement les flex-items sans margin individuel.", keywords: ["gap", "spacing", "auto"] },
      { id: "L6", partId: "L", partTitle: "Flexbox", title: "flex-wrap", image: null, description: "flex-wrap / flex-nowrap : autoriser ou non le retour à la ligne des flex-items.", keywords: ["wrap", "nowrap", "line-break"] },
      { id: "L7", partId: "L", partTitle: "Flexbox", title: "Combinaisons Flexbox", image: null, description: "d-flex + justify-content + align-items + gap : recette complète pour centrage parfait.", keywords: ["combination", "centering", "recipe"] },
    ],
  },
  // ---------------------------------------------------------------- M
  {
    id: "M",
    title: "Conteneurs",
    shortTitle: "Conteneurs",
    color: "#0d6efd",
    fiches: [
      { id: "M1", partId: "M", partTitle: "Conteneurs", title: "container", image: null, description: "container : largeur maximale responsive par défaut. Centrage horizontal automatique.", keywords: ["container", "max-width", "center"] },
      { id: "M2", partId: "M", partTitle: "Conteneurs", title: "container-fluid", image: null, description: "container-fluid : 100% de largeur en permanence, sans marge maximale.", keywords: ["fluid", "full-width", "edge"] },
      { id: "M3", partId: "M", partTitle: "Conteneurs", title: "container responsive", image: null, description: "container-sm, container-md… : conteneur qui n'agit qu'à partir d'un certain breakpoint.", keywords: ["responsive", "breakpoint", "sm"] },
      { id: "M4", partId: "M", partTitle: "Conteneurs", title: "Comprendre les largeurs de container", image: null, description: "Tableau récapitulatif : à chaque breakpoint, la largeur maximale du container change.", keywords: ["widths", "table", "max-width"] },
    ],
  },
  // ---------------------------------------------------------------- N
  {
    id: "N",
    title: "Grid",
    shortTitle: "Grid",
    color: "#6610f2",
    fiches: [
      { id: "N1", partId: "N", partTitle: "Grid", title: "Comprendre le système de grille", image: null, description: "La grille Bootstrap : 12 colonnes, row + col, base de toutes les mises en page.", keywords: ["grid", "12-colonnes", "system"] },
      { id: "N2", partId: "N", partTitle: "Grid", title: "row", image: null, description: "row : conteneur de ligne. Display flex, gère les gutters et le retour à la ligne.", keywords: ["row", "ligne", "flex"] },
      { id: "N3", partId: "N", partTitle: "Grid", title: "col", image: null, description: "col : colonne auto. Sans précision, chaque col prend une part égale.", keywords: ["col", "auto", "equal"] },
      { id: "N4", partId: "N", partTitle: "Grid", title: "12 colonnes", image: null, description: "Pourquoi 12 ? Divisible par 2, 3, 4, 6 — permet toutes les combinaisons simples.", keywords: ["12", "divisible", "math"] },
      { id: "N5", partId: "N", partTitle: "Grid", title: "col-6", image: null, description: "col-6 : occupe 6 colonnes sur 12 = la moitié de la ligne.", keywords: ["col-6", "half", "50%"] },
      { id: "N6", partId: "N", partTitle: "Grid", title: "col-4 / col-8", image: null, description: "col-4 + col-8 : combinaison classique 1/3 + 2/3, très utilisée pour sidebar + contenu.", keywords: ["col-4", "col-8", "split"] },
      { id: "N7", partId: "N", partTitle: "Grid", title: "Plusieurs colonnes", image: null, description: "Trois col-4, quatre col-3, six col-2 : organiser plusieurs colonnes égales.", keywords: ["multiple", "equal", "organization"] },
      { id: "N8", partId: "N", partTitle: "Grid", title: "Grille responsive", image: null, description: "col-12 col-md-6 col-lg-4 : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop.", keywords: ["responsive", "mobile-first", "grid"] },
      { id: "N9", partId: "N", partTitle: "Grid", title: "Exercice : construire une mise en page", image: null, description: "Exercice pratique : assembler header + sidebar + contenu + footer avec la grille.", keywords: ["exercise", "pratique", "layout"] },
    ],
  },
  // ---------------------------------------------------------------- O
  {
    id: "O",
    title: "Composants",
    shortTitle: "Composants",
    color: "#fd7e14",
    fiches: [
      { id: "O1", partId: "O", partTitle: "Composants", title: "Cards", image: null, description: "card : conteneur visuel avec header, body, footer. Le composant le plus réutilisable.", keywords: ["card", "panel", "tile"] },
      { id: "O2", partId: "O", partTitle: "Composants", title: "Navbar", image: null, description: "navbar : barre de navigation responsive avec branding, liens, menu mobile.", keywords: ["navbar", "navigation", "header"] },
      { id: "O3", partId: "O", partTitle: "Composants", title: "Alerts", image: null, description: "alert alert-success/danger/warning : messages contextuels pour l'utilisateur.", keywords: ["alert", "message", "feedback"] },
      { id: "O4", partId: "O", partTitle: "Composants", title: "Badges", image: null, description: "badge bg-primary : petit marqueur de compteur ou d'état collé à un élément.", keywords: ["badge", "counter", "tag"] },
      { id: "O5", partId: "O", partTitle: "Composants", title: "List groups", image: null, description: "list-group : liste stylée d'éléments, avec items actifs, désactivés, contextualisés.", keywords: ["list-group", "items", "styled"] },
      { id: "O6", partId: "O", partTitle: "Composants", title: "Modal", image: null, description: "modal : fenêtre superposée qui s'ouvre par-dessus le contenu. Nécessite data-bs-toggle.", keywords: ["modal", "dialog", "overlay"] },
      { id: "O7", partId: "O", partTitle: "Composants", title: "Dropdown", image: null, description: "dropdown : menu déroulant. data-bs-toggle=\"dropdown\" active le comportement.", keywords: ["dropdown", "menu", "toggle"] },
      { id: "O8", partId: "O", partTitle: "Composants", title: "Accordion", image: null, description: "accordion : ensemble de panneaux repliables. Un seul ouvert à la fois.", keywords: ["accordion", "collapse", "panels"] },
      { id: "O9", partId: "O", partTitle: "Composants", title: "Carousel", image: null, description: "carousel : diaporama d'images ou de contenus. Composant le plus complexe de Bootstrap.", keywords: ["carousel", "slider", "diaporama"] },
    ],
  },
  // ---------------------------------------------------------------- P
  {
    id: "P",
    title: "Synthèses",
    shortTitle: "Synthèses",
    color: "#198754",
    fiches: [
      { id: "P1", partId: "P", partTitle: "Synthèses", title: "Construire une carte Bootstrap", image: null, description: "Synthèse : assembler card + shadow + image + boutons + badges en un composant complet.", keywords: ["card", "synthese", "assemblage"] },
      { id: "P2", partId: "P", partTitle: "Synthèses", title: "Construire une barre d'actions", image: null, description: "Synthèse : btn-group + boutons + icônes + states pour créer une barre d'actions.", keywords: ["btn-group", "actions", "toolbar"] },
      { id: "P3", partId: "P", partTitle: "Synthèses", title: "Construire une section responsive", image: null, description: "Synthèse : container + row + col responsive + flexbox + utilitaires visuels.", keywords: ["section", "responsive", "assemblage"] },
      { id: "P4", partId: "P", partTitle: "Synthèses", title: "Construire une interface complète", image: null, description: "Synthèse finale : navbar + hero + grille + cards + footer. Une page d'accueil complète.", keywords: ["interface", "complete", "final"] },
      { id: "P5", partId: "P", partTitle: "Synthèses", title: "Lire et décoder un code Bootstrap", image: null, description: "Synthèse : apprendre à décortiquer un snippet Bootstrap inconnu classe par classe.", keywords: ["lecture", "decodage", "comprehension"] },
    ],
  },
];

// Liste à plat de toutes les fiches (utile pour la navigation linéaire).
export const ALL_FICHES: Fiche[] = PARTS.flatMap((p) => p.fiches);

// Nombre total de fiches (pour la barre de progression).
export const TOTAL_FICHES = ALL_FICHES.length;

// Index global d'une fiche (0-based).
export const ficheGlobalIndex = (id: string) =>
  ALL_FICHES.findIndex((f) => f.id === id);

// Fiche suivante / précédente dans l'ordre global.
export const nextFiche = (id: string): Fiche | null => {
  const i = ficheGlobalIndex(id);
  return i >= 0 && i < ALL_FICHES.length - 1 ? ALL_FICHES[i + 1] : null;
};
export const prevFiche = (id: string): Fiche | null => {
  const i = ficheGlobalIndex(id);
  return i > 0 ? ALL_FICHES[i - 1] : null;
};

// Récupère une partie par son ID.
export const partById = (id: string) => PARTS.find((p) => p.id === id);
