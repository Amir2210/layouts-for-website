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

/** 15. הקשת — rounded arch with content below */
export const ArchShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary"
      style={{
        width: "70%",
        height: "55%",
        top: 0,
        left: "15%",
        borderRadius: "0 0 50% 50%",
      }}
    />
    <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-primary/15" />
    <div className="absolute inset-0 flex items-end justify-center pb-[14%]">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 16. היהלום — rotated diamond focal point */
export const DiamondShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary"
      style={{
        width: "42%",
        height: "42%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(45deg)",
      }}
    />
    <div
      className="absolute bg-primary/20"
      style={{
        width: "54%",
        height: "54%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(45deg)",
      }}
    />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right max-w-[40%]" />
    </div>
  </Box>
);

/** 17. הספירלה — concentric offset rectangles */
export const SpiralShape: React.FC = () => (
  <Box>
    <div className="absolute top-[6%] right-[6%] w-[82%] h-[82%] border-[3px] border-primary" />
    <div className="absolute top-[14%] right-[14%] w-[66%] h-[66%] border-[3px] border-primary/60" />
    <div className="absolute top-[22%] right-[22%] w-[50%] h-[50%] border-[3px] border-primary/35" />
    <div className="absolute top-[30%] right-[30%] w-[34%] h-[34%] bg-primary/12" />
    <div className="absolute inset-0 flex items-end px-[8%] pb-[6%]">
      <TextBlock className="text-right max-w-[50%]" />
    </div>
  </Box>
);

/** 18. הסרט — diagonal ribbon banner */
export const RibbonShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary"
      style={{
        width: "160%",
        height: "22%",
        top: "40%",
        left: "-30%",
        transform: "rotate(-15deg)",
        transformOrigin: "center",
      }}
    />
    <div
      className="absolute bg-primary/15"
      style={{
        width: "160%",
        height: "10%",
        top: "20%",
        left: "-30%",
        transform: "rotate(-15deg)",
        transformOrigin: "center",
      }}
    />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right max-w-[44%]" />
    </div>
  </Box>
);

/** 19. העמודים — vertical columns of varying widths */
export const PillarsShape: React.FC = () => (
  <Box>
    <div className="absolute inset-y-[6%] right-[5%] w-[18%] bg-primary" />
    <div className="absolute inset-y-[12%] right-[27%] w-[12%] bg-primary/65" />
    <div className="absolute inset-y-[18%] right-[43%] w-[8%] bg-primary/40" />
    <div className="absolute inset-y-[24%] right-[55%] w-[6%] bg-primary/20" />
    <div className="absolute inset-0 flex items-end px-[8%] pb-[8%]">
      <TextBlock className="text-right max-w-[38%]" />
    </div>
  </Box>
);

/** 20. המדרגות — staircase ascending blocks */
export const StepsShape: React.FC = () => (
  <Box>
    <div className="absolute bottom-0 right-0 w-[25%] h-[25%] bg-primary/20" />
    <div className="absolute bottom-0 right-[25%] w-[25%] h-[50%] bg-primary/40" />
    <div className="absolute bottom-0 right-[50%] w-[25%] h-[75%] bg-primary/70" />
    <div className="absolute bottom-0 right-[75%] w-[25%] h-full bg-primary" />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right max-w-[48%]" />
    </div>
  </Box>
);

/** 21. הליקוי — overlapping circles */
export const EclipseShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary rounded-full"
      style={{ width: "48%", paddingBottom: "48%", top: "18%", right: "10%" }}
    />
    <div
      className="absolute bg-primary/35 rounded-full"
      style={{ width: "48%", paddingBottom: "48%", top: "30%", right: "30%" }}
    />
    <div
      className="absolute bg-primary/15 rounded-full"
      style={{ width: "32%", paddingBottom: "32%", top: "10%", right: "50%" }}
    />
    <div className="absolute inset-0 flex items-end px-[8%] pb-[6%]">
      <TextBlock className="text-right max-w-[45%]" />
    </div>
  </Box>
);

/** 22. הצלב — plus/cross intersection */
export const CrossShape: React.FC = () => (
  <Box>
    {/* Vertical bar */}
    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[30%] bg-primary/30" />
    {/* Horizontal bar */}
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[30%] bg-primary" />
    {/* Center square */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-primary" />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right max-w-[30%]" />
    </div>
  </Box>
);

/** 23. הפירמידה — triangular pyramid composition */
export const PyramidShape: React.FC = () => (
  <Box>
    <div
      className="absolute bg-primary"
      style={{
        width: 0,
        height: 0,
        bottom: "12%",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "28vw solid transparent",
        borderRight: "28vw solid transparent",
        borderBottom: "52vh solid var(--color-primary)",
      }}
    />
    <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-primary/20" />
    <div className="absolute inset-0 flex items-start justify-center pt-[8%]">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 24. הפיצול — asymmetric offset split */
export const SplitShape: React.FC = () => (
  <Box>
    <div className="absolute top-0 right-0 w-[55%] h-[60%] bg-primary" />
    <div className="absolute bottom-0 left-0 w-[55%] h-[60%] bg-primary/40" />
    <div className="absolute top-[60%] right-0 w-[55%] h-[10%] bg-primary/15" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 25. האריחים — irregular tile layout */
export const TilesShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className={full ? "p-4 sm:p-6" : "p-2 sm:p-3"}>
      <div className={`grid grid-cols-5 grid-rows-3 w-full h-full ${full ? "gap-3 sm:gap-4" : "gap-1.5 sm:gap-2"}`}>
        <div className="bg-primary col-span-2 row-span-1" />
        <div className="bg-primary/20 col-span-1 row-span-2" />
        <div className="bg-primary/55 col-span-2 row-span-1" />
        <div className="bg-primary/35 col-span-1 row-span-1" />
        <div className="bg-primary col-span-1 row-span-2" />
        <div className="bg-primary/15 col-span-2 row-span-1" />
        <div className="bg-primary/70 col-span-1 row-span-1" />
        <div className="bg-primary col-span-2 row-span-1 flex items-end p-[8%]">
          <div>
            <h2 className={`${full ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xs sm:text-sm"} font-extrabold text-white leading-tight`}>
              כותרת ראשית
            </h2>
            <h3 className={`${full ? "text-base sm:text-lg mt-1" : "text-[9px] sm:text-[10px] mt-0.5"} font-semibold text-white/70`}>
              כותרת משנית
            </h3>
          </div>
        </div>
        <div className="bg-primary/45 col-span-1 row-span-1" />
      </div>
    </Box>
  );
};

/** 26. הווילון — side curtain reveal */
export const CurtainShape: React.FC = () => (
  <Box>
    <div className="absolute inset-y-0 right-0 w-[35%] bg-primary" />
    <div className="absolute inset-y-0 right-[35%] w-[8%] bg-primary/50" />
    <div className="absolute inset-y-0 right-[43%] w-[4%] bg-primary/25" />
    <div className="absolute inset-y-0 right-[47%] w-[2%] bg-primary/10" />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock className="text-right max-w-[32%]" light />
    </div>
  </Box>
);

/** 27. הגשר — horizontal bridge with supports */
export const BridgeShape: React.FC = () => (
  <Box>
    {/* Bridge deck */}
    <div className="absolute left-0 right-0 top-[35%] h-[14%] bg-primary" />
    {/* Left support */}
    <div className="absolute top-[35%] right-[12%] w-[14%] h-[55%] bg-primary/60" />
    {/* Right support */}
    <div className="absolute top-[35%] left-[12%] w-[14%] h-[55%] bg-primary/60" />
    {/* Base */}
    <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-primary/20" />
    <div className="absolute inset-0 flex items-start justify-center pt-[8%]">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 28. הקן — nested rectangles / frames */
export const NestShape: React.FC = () => (
  <Box>
    <div className="absolute inset-[5%] border-[3px] border-primary" />
    <div className="absolute inset-[12%] border-[3px] border-primary/55" />
    <div className="absolute inset-[19%] border-[3px] border-primary/30" />
    <div className="absolute inset-[26%] bg-primary/10" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" />
    </div>
  </Box>
);

/** 29. הפסגה — mountain peak / chevron */
export const PeakShape: React.FC = () => (
  <Box>
    {/* Main peak */}
    <div
      className="absolute bg-primary"
      style={{
        width: "50%",
        height: "70%",
        bottom: 0,
        left: "25%",
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
      }}
    />
    {/* Secondary peak */}
    <div
      className="absolute bg-primary/30"
      style={{
        width: "35%",
        height: "50%",
        bottom: 0,
        left: "5%",
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
      }}
    />
    {/* Small peak */}
    <div
      className="absolute bg-primary/18"
      style={{
        width: "28%",
        height: "38%",
        bottom: 0,
        right: "4%",
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
      }}
    />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right max-w-[40%]" />
    </div>
  </Box>
);

/** 30. המסלול — circular orbital paths */
export const OrbitShape: React.FC = () => (
  <Box>
    {/* Outer orbit ring */}
    <div
      className="absolute border-2 border-primary/25 rounded-full"
      style={{ width: "80%", height: "80%", top: "10%", left: "10%" }}
    />
    {/* Middle orbit ring */}
    <div
      className="absolute border-2 border-primary/45 rounded-full"
      style={{ width: "55%", height: "55%", top: "22.5%", left: "22.5%" }}
    />
    {/* Inner orbit ring */}
    <div
      className="absolute border-2 border-primary/70 rounded-full"
      style={{ width: "30%", height: "30%", top: "35%", left: "35%" }}
    />
    {/* Center dot */}
    <div
      className="absolute bg-primary rounded-full"
      style={{ width: "10%", height: "10%", top: "45%", left: "45%" }}
    />
    {/* Orbiting element 1 */}
    <div
      className="absolute bg-primary rounded-full"
      style={{ width: "6%", paddingBottom: "6%", top: "8%", left: "47%" }}
    />
    {/* Orbiting element 2 */}
    <div
      className="absolute bg-primary/60 rounded-full"
      style={{ width: "5%", paddingBottom: "5%", top: "50%", left: "87%" }}
    />
    {/* Orbiting element 3 */}
    <div
      className="absolute bg-primary/35 rounded-full"
      style={{ width: "4%", paddingBottom: "4%", top: "78%", left: "30%" }}
    />
    <div className="absolute inset-0 flex items-end justify-end p-[8%]">
      <TextBlock className="text-right max-w-[40%]" />
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
  arch: ArchShape,
  diamond: DiamondShape,
  spiral: SpiralShape,
  ribbon: RibbonShape,
  pillars: PillarsShape,
  steps: StepsShape,
  eclipse: EclipseShape,
  cross: CrossShape,
  pyramid: PyramidShape,
  split: SplitShape,
  tiles: TilesShape,
  curtain: CurtainShape,
  bridge: BridgeShape,
  nest: NestShape,
  peak: PeakShape,
  orbit: OrbitShape,
};
