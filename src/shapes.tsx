import React from "react";

/* ── Text block — reusable, position controlled by parent ── */
const TextBlock: React.FC<{ light?: boolean; className?: string }> = ({
  light = false,
  className = "",
}) => (
  <div className={`relative z-10 ${className}`}>
    <h2
      className={`text-xl font-extrabold leading-snug ${light ? "text-white" : "text-slate-800"}`}
    >
      כותרת ראשית
    </h2>
    <h3
      className={`text-sm font-semibold mt-1.5 ${light ? "text-white/80" : "text-slate-500"}`}
    >
      כותרת משנית לדוגמה
    </h3>
    <p
      className={`text-xs mt-2.5 leading-relaxed max-w-[260px] ${light ? "text-white/60" : "text-slate-400"}`}
    >
      זהו טקסט לדוגמה שמדגים כיצד התוכן ייראה בתוך התבנית הזו.
    </p>
  </div>
);

/** Shared wrapper */
const ShapeContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`relative w-full h-full overflow-hidden bg-white ${className}`}
  >
    {children}
  </div>
);

/* ────────────────────────────────────────────────────────── */

/** 1. הקוביה — right half primary, text on left white half */
export const CubeShape: React.FC = () => (
  <ShapeContainer>
    <div className="absolute inset-y-0 right-0 w-1/2 bg-primary" />
    <TextBlock className="absolute top-1/2 -translate-y-1/2 right-[56%] text-right" />
  </ShapeContainer>
);

/** 2. האלכסון — diagonal stripe, text at top-right on white area */
export const DiagonalShape: React.FC = () => (
  <ShapeContainer>
    <div
      className="absolute bg-primary"
      style={{
        width: "150%",
        height: "40%",
        top: "30%",
        left: "-25%",
        transform: "rotate(-12deg)",
        transformOrigin: "center center",
      }}
    />
    <TextBlock className="absolute top-6 right-6 text-right" />
  </ShapeContainer>
);

/** 3. הכדור — circle on right, text on left side */
export const BallShape: React.FC = () => (
  <ShapeContainer>
    <div
      className="absolute bg-primary rounded-full"
      style={{
        width: "70%",
        paddingBottom: "70%",
        top: "22%",
        right: "-8%",
      }}
    />
    <TextBlock className="absolute top-1/2 -translate-y-1/2 right-[55%] text-right" />
  </ShapeContainer>
);

/** 4. המסגרת — thick primary frame, text centered in white cutout */
export const FrameShape: React.FC = () => (
  <ShapeContainer>
    <div className="absolute inset-0 bg-primary" />
    <div className="absolute inset-[14%] bg-white rounded-lg" />
    <div className="absolute inset-[18%] border-2 border-primary/25 rounded-md" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" />
    </div>
  </ShapeContainer>
);

/** 5. הגריד — bento-box grid with text in cells */
export const GridShape: React.FC = () => (
  <ShapeContainer className="p-2">
    <div className="grid grid-cols-3 grid-rows-3 gap-1.5 w-full h-full">
      <div className="bg-primary rounded-lg col-span-2 row-span-2 flex items-end p-4">
        <div>
          <h2 className="text-base font-extrabold text-white leading-snug">
            כותרת ראשית
          </h2>
          <h3 className="text-xs font-semibold text-white/75 mt-1">
            כותרת משנית
          </h3>
          <p className="text-[10px] text-white/55 mt-1 leading-tight">
            טקסט לדוגמה קצר
          </p>
        </div>
      </div>
      <div className="bg-primary rounded-lg" />
      <div className="bg-primary/35 rounded-lg" />
      <div className="bg-primary/55 rounded-lg" />
      <div className="bg-primary rounded-lg col-span-2" />
    </div>
  </ShapeContainer>
);

/** 6. הקפסולה — pill on right, text on left */
export const CapsuleShape: React.FC = () => (
  <ShapeContainer>
    <div
      className="absolute bg-primary rounded-full"
      style={{
        width: "42%",
        height: "78%",
        top: "11%",
        right: "8%",
      }}
    />
    <TextBlock className="absolute top-1/2 -translate-y-1/2 right-[55%] text-right" />
  </ShapeContainer>
);

/* ────────────────────────────────────────────────────────── */

export const shapeMap: Record<string, React.FC> = {
  cube: CubeShape,
  diagonal: DiagonalShape,
  ball: BallShape,
  frame: FrameShape,
  grid: GridShape,
  capsule: CapsuleShape,
};
