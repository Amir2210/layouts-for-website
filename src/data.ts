export interface LayoutItem {
  id: string;
  title: string;
}

export const layouts: LayoutItem[] = [
  { id: "cube", title: "הקוביה" },
  { id: "diagonal", title: "האלכסון" },
  { id: "ball", title: "הכדור" },
  { id: "frame", title: "המסגרת" },
  { id: "grid", title: "הגריד" },
  { id: "thirds", title: "השלישיות" },
  { id: "wave", title: "הגל" },
  { id: "corner", title: "הפינה" },
  { id: "layers", title: "השכבות" },
  { id: "zigzag", title: "הזיגזג" },
  { id: "window", title: "החלון" },
  { id: "gradient", title: "הגרדיאנט" },
  { id: "mosaic", title: "הפסיפס" },
  { id: "horizon", title: "האופק" },
];
