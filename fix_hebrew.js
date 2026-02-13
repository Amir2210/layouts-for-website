const fs = require('fs');
const path = 'src/shapes.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix separators
// Global replace all occurrences
content = content.split('ג”€').join('─');
content = content.split('ג€”').join('—');
content = content.split('ג•').join('═');

const map = {
  "1": "הקוביה", "2": "האלכסון", "3": "הכדור", "4": "המסגרת", "5": "הגריד",
  "6": "השלישיות", "7": "הגל", "8": "הפינה", "9": "השכבות", "10": "הזיגזג",
  "11": "החלון", "12": "הגרדיאנט", "13": "הפסיפס", "14": "האופק", "15": "הקשת",
  "16": "היהלום", "17": "הספירלה", "18": "הסרט", "19": "העמודים", "20": "המדרגות",
  "21": "הליקוי", "22": "הצלב", "23": "הפירמידה", "24": "הפיצול", "25": "האריחים",
  "26": "הוילון", "27": "הגשר", "28": "הקן", "29": "הפסגה", "30": "המסלול",
  "31": "המשושה", "32": "הקולנוע", "33": "האוריגמי", "34": "הריחוף", "35": "הפרוסות",
  "36": "המיקוד", "37": "הספקטרום", "38": "השער", "39": "הסימטריה", "40": "המטריצה"
};

for (const [key, val] of Object.entries(map)) {
  // Regex: /** N. Garbage —
  // Since we replaced ג€” with —, we look for —
  // Using RegExp constructor. Escape backslashes for string content: \\*
  // Pattern: `/\*\* ${key}\. .+? —`
  const regex = new RegExp(`\/\\*\\* ${key}\\. .+? —`, 'g');
  content = content.replace(regex, `/** ${key}. ${val} —`);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Hebrew text restored in comments.');
