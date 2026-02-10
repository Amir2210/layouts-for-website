import React, { createContext, useContext } from "react";

/* ── Full-screen context ── */
export const FullScreenCtx = createContext(false);

/* ── Text block — scales up automatically in full-screen ── */
const TextBlock: React.FC<{
  light?: boolean;
  className?: string;
  backdrop?: boolean;
}> = ({ light = false, className = "", backdrop = false }) => {
  const full = useContext(FullScreenCtx);

  const h2Class = full
    ? "text-4xl sm:text-5xl lg:text-6xl"
    : "text-lg sm:text-xl";

  const h3Class = full
    ? "text-xl sm:text-2xl lg:text-3xl mt-3"
    : "text-xs sm:text-sm mt-1";

  const pClass = full
    ? "text-base sm:text-lg lg:text-xl mt-4 max-w-[480px]"
    : "text-[10px] sm:text-xs mt-2 max-w-[200px]";

  return (
    <div
      className={`relative z-10 ${backdrop ? "bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-5" : ""} ${className}`}
    >
      <h2
        className={`${h2Class} font-extrabold leading-tight ${light ? "text-white" : "text-slate-900"}`}
      >
        כותרת ראשית
      </h2>
      <h3
        className={`${h3Class} font-semibold ${light ? "text-white/80" : "text-slate-500"}`}
      >
        כותרת משנית לדוגמה
      </h3>
      <p
        className={`${pClass} leading-relaxed ${light ? "text-white/60" : "text-slate-400"}`}
      >
        זהו טקסט לדוגמה שמדגים כיצד התוכן ייראה בתוך התבנית הזו.
      </p>
    </div>
  );
};

/** Shared wrapper */
const Box: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
    {children}
  </div>
);

/* ────────────────────────────────────────────────────────── */

/** 1. הקוביה — split layout */
export const CubeShape: React.FC = () => (
  <Box>
    <div className="absolute inset-y-0 right-0 w-1/2 bg-primary" />
    <div className="absolute inset-0 flex items-center px-8 sm:px-12">
      <TextBlock className="text-right max-w-[48%]" />
    </div>
  </Box>
);

/** 2. האלכסון — diagonal stripe */
export const DiagonalShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary"
      style={{
        width: "150%",
        height: "45%",
        top: "32%",
        left: "-25%",
        transform: "rotate(-12deg)",
        transformOrigin: "center",
      }}
    />
    <div className="absolute inset-0 flex items-start justify-end p-8 sm:p-12">
      <TextBlock className="text-right" />
    </div>
  </Box>
);

/** 3. הכדור — offset circle */
export const BallShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary rounded-full"
      style={{
        width: "60%",
        paddingBottom: "60%",
        top: "20%",
        right: "-5%",
      }}
    />
    <div className="absolute inset-0 flex items-center px-8 sm:px-12">
      <TextBlock className="text-right max-w-[42%]" />
    </div>
  </Box>
);

/** 4. המסגרת — picture frame */
export const FrameShape: React.FC = () => (
  <Box>
    <div className="absolute inset-0 bg-primary" />
    <div className="absolute inset-[12%] bg-white rounded-2xl" />
    <div className="absolute inset-[15%] border border-primary/20 rounded-xl" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 5. הגריד — bento grid */
export const GridShape: React.FC = () => {
  const full = useContext(FullScreenCtx);

  return (
    <Box className={full ? "p-4 sm:p-6" : "p-2 sm:p-3"}>
      <div className={`grid grid-cols-3 grid-rows-3 w-full h-full ${full ? "gap-3 sm:gap-4" : "gap-1.5 sm:gap-2"}`}>
        <div className="bg-primary col-span-2 row-span-2 flex items-end p-5 sm:p-8">
          <div>
            <h2 className={`${full ? "text-3xl sm:text-4xl lg:text-5xl" : "text-sm sm:text-base"} font-extrabold text-white leading-tight`}>
              כותרת ראשית
            </h2>
            <h3 className={`${full ? "text-lg sm:text-xl lg:text-2xl mt-2" : "text-[10px] sm:text-xs mt-0.5"} font-semibold text-white/70`}>
              כותרת משנית לדוגמה
            </h3>
            <p className={`${full ? "text-sm sm:text-base lg:text-lg mt-3" : "text-[9px] sm:text-[10px] mt-1"} text-white/50 leading-snug`}>
              טקסט לדוגמה קצר
            </p>
          </div>
        </div>
        <div className="bg-primary" />
        <div className="bg-primary/30" />
        <div className="bg-primary/50" />
        <div className="bg-primary col-span-2" />
      </div>
    </Box>
  );
};

/** 6. הקפסולה — pill shape */
export const CapsuleShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary rounded-full"
      style={{
        width: "38%",
        height: "76%",
        top: "12%",
        right: "8%",
      }}
    />
    <div className="absolute inset-0 flex items-center px-8 sm:px-12">
      <TextBlock className="text-right max-w-[48%]" />
    </div>
  </Box>
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
