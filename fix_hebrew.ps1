$path = 'src/shapes.tsx'
$content = Get-Content $path -Raw -Encoding UTF8

# Fix separators corrupted by encoding issues
$content = $content -replace 'ג”€', '─'
$content = $content -replace 'ג€”', '—'
$content = $content -replace 'ג•', '═'

# Dictionary for Shape names
$map = @{
    "1"="הקוביה"; "2"="האלכסון"; "3"="הכדור"; "4"="המסגרת"; "5"="הגריד";
    "6"="השלישיות"; "7"="הגל"; "8"="הפינה"; "9"="השכבות"; "10"="הזיגזג";
    "11"="החלון"; "12"="הגרדיאנט"; "13"="הפסיפס"; "14"="האופק"; "15"="הקשת";
    "16"="היהלום"; "17"="הספירלה"; "18"="הסרט"; "19"="העמודים"; "20"="המדרגות";
    "21"="הליקוי"; "22"="הצלב"; "23"="הפירמידה"; "24"="הפיצול"; "25"="האריחים";
    "26"="הוילון"; "27"="הגשר"; "28"="הקן"; "29"="הפסגה"; "30"="המסלול";
    "31"="המשושה"; "32"="הקולנוע"; "33"="האוריגמי"; "34"="הריחוף"; "35"="הפרוסות";
    "36"="המיקוד"; "37"="הספקטרום"; "38"="השער"; "39"="הסימטריה"; "40"="המטריצה"
}

foreach ($key in $map.Keys) {
    # Match: /** N. Garbage —
    # Note: escape * for regex
    $pattern = "/\*\* $key\. .+? —"
    $replacement = "/** $key. $($map[$key]) —"
    $content = $content -replace $pattern, $replacement
}

$content | Set-Content $path -Encoding UTF8
