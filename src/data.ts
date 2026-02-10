export interface LayoutItem {
  id: string;
  title: string;
  description: string;
}

export const layouts: LayoutItem[] = [
  {
    id: "cube",
    title: "הקוביה",
    description: "חלוקה סימטרית לשני חלקים",
  },
  {
    id: "diagonal",
    title: "האלכסון",
    description: "פס אלכסוני דינמי",
  },
  {
    id: "ball",
    title: "הכדור",
    description: "עיגול מרכזי עם חיתוך",
  },
  {
    id: "frame",
    title: "המסגרת",
    description: "מלבן מרכזי במסגרת",
  },
  {
    id: "grid",
    title: "הגריד",
    description: 'תבנית "בנטו בוקס"',
  },
  {
    id: "capsule",
    title: "הקפסולה",
    description: "צורת גלולה מעוגלת",
  },
];
