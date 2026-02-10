import React, { createContext, useContext } from "react";

/* ── Full-screen context ── */
export const FullScreenCtx = createContext(false);

/* ── Text block — scales up in full-screen ── */
const TextBlock: React.FC<{
  light?: boolean;
  className?: string;
}> = ({ light = false, className = "" }) => {
  const full = useContext(FullScreenCtx);

  const h2 = full ? "text-4xl sm:text-5xl lg:text-6xl" : "text-lg sm:text-xl";
  const h3 = full ? "text-xl sm:text-2xl lg:text-3xl mt-3" : "text-xs sm:text-sm mt-1";
  const p = full
    ? "text-base sm:text-lg lg:text-xl mt-4 max-w-[480px]"
    : "text-[10px] sm:text-xs mt-2 max-w-[200px]";

  return (
    <div className={`relative z-10 ${className}`}>
      <h2 className={`${h2} font-extrabold leading-tight ${light ? "text-white" : "text-slate-900"}`}>
        כותרת ראשית
      </h2>
      <h3 className={`${h3} font-semibold ${light ? "text-white/80" : "text-slate-500"}`}>
        כותרת משנית לדוגמה
      </h3>
      <p className={`${p} leading-relaxed ${light ? "text-white/60" : "text-slate-400"}`}>
        זהו טקסט לדוגמה שמדגים כיצד התוכן ייראה בתוך התבנית הזו.
      </p>
    </div>
  );
};

/** Shared wrapper */
const Box: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
    {children}
  </div>
);

/* ════════════════════════════════════════════════════════════ */

/** 1. הקוביה — clean vertical split */
export const CubeShape: React.FC = () => (
  <Box>
    <div className="absolute inset-y-0 right-0 w-1/2 bg-primary" />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock className="text-right max-w-[46%]" />
    </div>
  </Box>
);

/** 2. האלכסון — bold diagonal cut */
export const DiagonalShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary"
      style={{
        width: "150%",
        height: "50%",
        top: "30%",
        left: "-25%",
        transform: "rotate(-10deg)",
        transformOrigin: "center",
      }}
    />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right" />
    </div>
  </Box>
);

/** 3. הכדור — large offset circle */
export const BallShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary rounded-full"
      style={{ width: "58%", paddingBottom: "58%", top: "22%", right: "-4%" }}
    />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock className="text-right max-w-[40%]" />
    </div>
  </Box>
);

/** 4. המסגרת — elegant picture frame */
export const FrameShape: React.FC = () => (
  <Box>
    <div className="absolute inset-0 bg-primary" />
    <div className="absolute inset-[10%] bg-white rounded-xl" />
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
        <div className="bg-primary col-span-2 row-span-2 flex items-end p-[10%]">
          <div>
            <h2 className={`${full ? "text-3xl sm:text-4xl lg:text-5xl" : "text-sm sm:text-base"} font-extrabold text-white leading-tight`}>
              כותרת ראשית
            </h2>
            <h3 className={`${full ? "text-lg sm:text-xl lg:text-2xl mt-2" : "text-[10px] sm:text-xs mt-0.5"} font-semibold text-white/70`}>
              כותרת משנית
            </h3>
          </div>
        </div>
        <div className="bg-primary" />
        <div className="bg-primary/25" />
        <div className="bg-primary/50" />
        <div className="bg-primary col-span-2" />
      </div>
    </Box>
  );
};

/** 6. השלישיות — three columns with center content */
export const ThirdsShape: React.FC = () => (
  <Box>
    <div className="absolute inset-y-0 right-0 w-[30%] bg-primary" />
    <div className="absolute inset-y-0 left-0 w-[30%] bg-primary/20" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 7. הגל — wave with curved divider */
export const WaveShape: React.FC = () => (
  <Box>
    <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-primary" />
    <div
      className="absolute left-0 right-0 bg-white"
      style={{ height: "18%", top: "38%", borderRadius: "0 0 50% 50%" }}
    />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right" />
    </div>
  </Box>
);

/** 8. הפינה — L-shaped corner composition */
export const CornerShape: React.FC = () => (
  <Box>
    <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-primary" />
    <div className="absolute bottom-0 left-0 w-[35%] h-[25%] bg-primary/15" />
    <div className="absolute inset-0 flex items-end px-[8%] pb-[8%]">
      <TextBlock className="text-right max-w-[55%]" />
    </div>
  </Box>
);

/** 9. השכבות — three fading horizontal bands */
export const LayersShape: React.FC = () => (
  <Box>
    <div className="absolute top-0 left-0 right-0 h-[22%] bg-primary" />
    <div className="absolute top-[26%] left-0 right-0 h-[16%] bg-primary/45" />
    <div className="absolute top-[46%] left-0 right-0 h-[10%] bg-primary/20" />
    <div className="absolute inset-0 flex items-end justify-end p-[8%]">
      <TextBlock className="text-right" />
    </div>
  </Box>
);

/** 10. הזיגזג — alternating staggered blocks */
export const ZigzagShape: React.FC = () => (
  <Box>
    <div className="absolute top-0 right-0 w-[55%] h-[33%] bg-primary" />
    <div className="absolute top-[33%] left-0 w-[55%] h-[34%] bg-primary/60" />
    <div className="absolute bottom-0 right-0 w-[55%] h-[33%] bg-primary/30" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 11. החלון — four-pane grid */
export const WindowShape: React.FC = () => (
  <Box>
    <div className="absolute top-[2%] right-[2%] w-[47%] h-[47%] bg-primary" />
    <div className="absolute top-[2%] left-[2%] w-[47%] h-[47%] bg-primary/25" />
    <div className="absolute bottom-[2%] right-[2%] w-[47%] h-[47%] bg-primary/45" />
    <div className="absolute bottom-[2%] left-[2%] w-[47%] h-[47%] bg-primary/12" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 12. הגרדיאנט — fading vertical strips */
export const GradientShape: React.FC = () => (
  <Box>
    <div className="absolute inset-y-0 right-0 w-[20%] bg-primary" />
    <div className="absolute inset-y-0 right-[20%] w-[20%] bg-primary/70" />
    <div className="absolute inset-y-0 right-[40%] w-[20%] bg-primary/45" />
    <div className="absolute inset-y-0 right-[60%] w-[20%] bg-primary/22" />
    <div className="absolute inset-y-0 left-0 w-[20%] bg-primary/8" />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock light className="text-right max-w-[42%]" />
    </div>
  </Box>
);

/** 13. הפסיפס — scattered mosaic grid */
export const MosaicShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className={full ? "p-4 sm:p-6" : "p-2 sm:p-3"}>
      <div className={`grid grid-cols-4 grid-rows-3 w-full h-full ${full ? "gap-3 sm:gap-4" : "gap-1.5 sm:gap-2"}`}>
        <div className="bg-primary col-span-1 row-span-2" />
        <div className="bg-primary/20" />
        <div className="bg-primary col-span-2" />
        <div className="bg-primary/45 col-span-2" />
        <div className="bg-primary/12" />
        <div className="bg-primary col-span-2 flex items-end p-[8%]">
          <div>
            <h2 className={`${full ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xs sm:text-sm"} font-extrabold text-white leading-tight`}>
              כותרת ראשית
            </h2>
            <h3 className={`${full ? "text-base sm:text-lg mt-1" : "text-[9px] sm:text-[10px] mt-0.5"} font-semibold text-white/70`}>
              כותרת משנית
            </h3>
          </div>
        </div>
        <div className="bg-primary/35" />
        <div className="bg-primary" />
      </div>
    </Box>
  );
};

/** 14. האופק — clean horizon split */
export const HorizonShape: React.FC = () => (
  <Box>
    <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-primary" />
    <div className="absolute bottom-[38%] left-0 right-0 h-[3px] bg-primary-dark" />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock className="text-right max-w-[50%]" />
    </div>
  </Box>
);

/* ════════════════════════════════════════════════════════════ */

export const shapeMap: Record<string, React.FC> = {
  cube: CubeShape,
  diagonal: DiagonalShape,
  ball: BallShape,
  frame: FrameShape,
  grid: GridShape,
  thirds: ThirdsShape,
  wave: WaveShape,
  corner: CornerShape,
  layers: LayersShape,
  zigzag: ZigzagShape,
  window: WindowShape,
  gradient: GradientShape,
  mosaic: MosaicShape,
  horizon: HorizonShape,
};
