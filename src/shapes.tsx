import React, { createContext, useContext } from "react";
import { motion, type Variants } from "framer-motion";

/* ── Full-screen context ── */
export const FullScreenCtx = createContext(false);

const MDiv = motion.div;
const ShapeMotion: React.FC<React.ComponentProps<typeof motion.div>> = ({ children, ...props }) => {
  const full = useContext(FullScreenCtx);
  const p = { ...props };
  // In detail view, force animation if using whileInView
  if (full && p.whileInView && !p.animate) {
    p.animate = p.whileInView;
    delete p.whileInView;
  }
  // Ensure permissive viewport check
  p.viewport = { once: true, amount: 0, ...p.viewport };
  return <MDiv {...p}>{children}</MDiv>;
};

/* ── Text block — scales up in full-screen ── */
/* ── Text block — scales up in full-screen ── */
const TextBlock: React.FC<{
  light?: boolean;
  className?: string;
  align?: "left" | "center" | "right";
}> = ({ light = false, className = "", align = "right" }) => {
  const full = useContext(FullScreenCtx);

  const h2 = full
    ? "text-4xl sm:text-5xl lg:text-7xl mb-4"
    : "text-lg sm:text-xl mb-1";
  const h3 = full
    ? "text-xl sm:text-2xl lg:text-3xl mb-6"
    : "text-[10px] sm:text-xs mb-1";
  const p = full
    ? "text-base sm:text-lg lg:text-xl leading-8 max-w-[600px]"
    : "text-[9px] sm:text-[10px] leading-tight max-w-[180px]";

  const textColor = light ? "text-white" : "text-slate-950";
  const subColor = light ? "text-white/95" : "text-slate-700";
  const descColor = light ? "text-white/90" : "text-slate-600";

  // Text shadow for light text to pop on any bg
  const shadowClass = light ? "drop-shadow-md" : "";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <ShapeMotion
      className={`relative z-10 flex flex-col ${align === "center"
        ? "items-center text-center"
        : align === "left"
          ? "items-start text-left"
          : "items-end text-right"
        } ${className}`}
      variants={full ? containerVariants : {}}
      initial={full ? "hidden" : "show"}
      animate={full ? "show" : undefined}
      whileInView={full ? undefined : "show"}
      viewport={{ once: true, amount: 0 }}
    >
      <motion.h2
        variants={itemVariants}
        className={`${h2} font-extrabold tracking-tight ${textColor} ${shadowClass}`}
      >
        כותרת ראשית
      </motion.h2>
      <motion.h3
        variants={itemVariants}
        className={`${h3} font-bold tracking-wide uppercase ${subColor} ${shadowClass}`}
      >
        כותרת משנית מרשימה
      </motion.h3>
      <motion.p
        variants={itemVariants}
        className={`${p} font-medium ${descColor} ${shadowClass}`}
      >
        טקסט לדוגמה הממחיש את העיצוב הנקי והמקצועי של התבנית. הטיפוגרפיה מותאמת לקריאות מיטבית.
      </motion.p>

      {/* Decorative button for "Call to Action" feel */}
      {full && (
        <motion.button
          variants={itemVariants}
          className={`mt-8 px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 ${light
            ? "bg-white text-slate-900 hover:bg-white/90"
            : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
        >
          קרא עוד
        </motion.button>
      )}
    </ShapeMotion>
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

/* ════════════════════════════════════════════════════════════ */

/** 1. הקוביה — clean vertical split */
export const CubeShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ x: "100%" }}
      whileInView={{ x: "0%" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="absolute inset-y-0 right-0 w-1/2 bg-primary"
    />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock className="text-right max-w-[46%]" />
    </div>
  </Box>
);

/** 2. האלכסון — bold diagonal cut */
export const DiagonalShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ x: "-100%", rotate: -10 }}
      whileInView={{ x: "-25%", rotate: -10 }}
      transition={{ duration: 0.8, delay: 0.1, ease: "backOut" }}
      className="absolute bg-primary"
      style={{
        width: "150%",
        height: "50%",
        top: "30%",
        left: "-25%",
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
    <ShapeMotion
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
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
    <ShapeMotion
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-[10%] bg-white rounded-xl shadow-2xl"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 5. הגריד — bento grid */
export const GridShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className={full ? "p-4 sm:p-6" : "p-2 sm:p-3"}>
      <div className={`grid grid-cols-3 grid-rows-3 w-full h-full ${full ? "gap-3 sm:gap-4" : "gap-1.5 sm:gap-2"}`}>
        <ShapeMotion
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-primary col-span-2 row-span-2 flex items-end p-[10%]"
        >
          <div>
            <h2 className={`${full ? "text-3xl sm:text-4xl lg:text-5xl" : "text-sm sm:text-base"} font-extrabold text-white leading-tight drop-shadow-md`}>
              כותרת ראשית
            </h2>
            <h3 className={`${full ? "text-lg sm:text-xl lg:text-2xl mt-2" : "text-[10px] sm:text-xs mt-0.5"} font-semibold text-white/90 drop-shadow-sm`}>
              כותרת משנית
            </h3>
          </div>
        </ShapeMotion>
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-primary" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-primary/25" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-primary/50" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-primary col-span-2" />
      </div>
    </Box>
  );
};

/** 6. השלישיות — three columns with center content */
export const ThirdsShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ height: "0%" }}
      whileInView={{ height: "100%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute inset-y-0 right-0 w-[30%] bg-primary"
    />
    <ShapeMotion
      initial={{ height: "0%" }}
      whileInView={{ height: "100%" }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
      className="absolute inset-y-0 left-0 w-[30%] bg-primary/20"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 7. הגל — wave with curved divider */
export const WaveShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="absolute bottom-0 left-0 right-0 h-[50%] bg-primary"
    />
    <ShapeMotion
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="absolute left-0 right-0 bg-white"
      style={{ height: "18%", top: "38%", borderRadius: "0 0 50% 50%", originY: 0 }}
    />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right" />
    </div>
  </Box>
);

/** 8. הפינה — L-shaped corner composition */
export const CornerShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ x: "100%", y: "-100%" }}
      whileInView={{ x: "0%", y: "0%" }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 right-0 w-[60%] h-[50%] bg-primary"
    />
    <ShapeMotion
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="absolute bottom-0 left-0 w-[35%] h-[25%] bg-primary/15"
    />
    <div className="absolute inset-0 flex items-end px-[8%] pb-[8%]">
      <TextBlock className="text-right max-w-[55%]" />
    </div>
  </Box>
);

/** 9. השכבות — three fading horizontal bands */
export const LayersShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ x: "100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.6, delay: 0.0 }} className="absolute top-0 left-0 right-0 h-[22%] bg-primary" />
    <ShapeMotion initial={{ x: "100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute top-[26%] left-0 right-0 h-[16%] bg-primary/45" />
    <ShapeMotion initial={{ x: "100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute top-[46%] left-0 right-0 h-[10%] bg-primary/20" />
    <div className="absolute inset-0 flex items-end justify-end p-[8%]">
      <TextBlock className="text-right" />
    </div>
  </Box>
);

/** 10. הזיגזג — alternating staggered blocks */
export const ZigzagShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="absolute top-0 right-0 w-[55%] h-[33%] bg-primary" />
    <ShapeMotion initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute top-[33%] left-0 w-[55%] h-[34%] bg-primary/60" />
    <ShapeMotion initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="absolute bottom-0 right-0 w-[55%] h-[33%] bg-primary/30" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 11. החלון — four-pane grid */
export const WindowShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} className="absolute top-[2%] right-[2%] w-[47%] h-[47%] bg-primary" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute top-[2%] left-[2%] w-[47%] h-[47%] bg-primary/25" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute bottom-[2%] right-[2%] w-[47%] h-[47%] bg-primary/45" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="absolute bottom-[2%] left-[2%] w-[47%] h-[47%] bg-primary/12" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 12. הגרדיאנט — fading vertical strips */
export const GradientShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.0 }} className="absolute inset-y-0 right-0 w-[20%] bg-primary" />
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="absolute inset-y-0 right-[20%] w-[20%] bg-primary/70" />
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="absolute inset-y-0 right-[40%] w-[20%] bg-primary/45" />
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="absolute inset-y-0 right-[60%] w-[20%] bg-primary/22" />
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="absolute inset-y-0 left-0 w-[20%] bg-primary/8" />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock light className="text-right max-w-[35%]" />
    </div>
  </Box>
);

/** 13. הפסיפס — scattered mosaic grid */
export const MosaicShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className={full ? "p-4 sm:p-6" : "p-2 sm:p-3"}>
      <div className={`grid grid-cols-4 grid-rows-3 w-full h-full ${full ? "gap-3 sm:gap-4" : "gap-1.5 sm:gap-2"}`}>
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-primary col-span-1 row-span-2" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-primary/20" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-primary col-span-2" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-primary/45 col-span-2" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-primary/12" />
        <ShapeMotion
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-primary col-span-2 flex items-end p-[8%]"
        >
          <div>
            <h2 className={`${full ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xs sm:text-sm"} font-extrabold text-white leading-tight drop-shadow-md`}>
              כותרת ראשית
            </h2>
            <h3 className={`${full ? "text-base sm:text-lg mt-1" : "text-[9px] sm:text-[10px] mt-0.5"} font-semibold text-white/90 drop-shadow-sm`}>
              כותרת משנית
            </h3>
          </div>
        </ShapeMotion>
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }} className="bg-primary/35" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-primary" />
      </div>
    </Box>
  );
};

/** 14. האופק — clean horizon split */
export const HorizonShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ height: "0%" }}
      whileInView={{ height: "38%" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="absolute bottom-0 left-0 right-0 bg-primary"
    />
    <ShapeMotion
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
      className="absolute bottom-[38%] left-0 right-0 h-[3px] bg-primary-dark"
    />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock className="text-right max-w-[50%]" />
    </div>
  </Box>
);

/** 15. הקשת — rounded arch with content below */
export const ArchShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ y: "-100%" }}
      whileInView={{ y: "0%" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="absolute bg-primary"
      style={{
        width: "70%",
        height: "55%",
        top: 0,
        left: "15%",
        borderRadius: "0 0 50% 50%",
      }}
    />
    <ShapeMotion
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-0 left-0 right-0 h-[12%] bg-primary/15"
    />
    <div className="absolute inset-0 flex items-end justify-center pb-[14%]">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 16. היהלום — rotated diamond focal point */
export const DiamondShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ scale: 0, rotate: 0 }}
      whileInView={{ scale: 1, rotate: 45 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="absolute bg-primary"
      style={{
        width: "42%",
        height: "42%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(45deg)",
      }}
    />
    <ShapeMotion
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
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
    <ShapeMotion initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.0 }} className="absolute top-[6%] right-[6%] w-[82%] h-[82%] border-[3px] border-primary" />
    <ShapeMotion initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="absolute top-[14%] right-[14%] w-[66%] h-[66%] border-[3px] border-primary/60" />
    <ShapeMotion initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[22%] right-[22%] w-[50%] h-[50%] border-[3px] border-primary/35" />
    <ShapeMotion initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="absolute top-[30%] right-[30%] w-[34%] h-[34%] bg-primary/12" />
    <div className="absolute inset-0 flex items-end px-[8%] pb-[6%]">
      <TextBlock className="text-right max-w-[50%]" />
    </div>
  </Box>
);

/** 18. הסרט — diagonal ribbon banner */
export const RibbonShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ x: "-100%" }}
      whileInView={{ x: "-30%" }}
      transition={{ duration: 0.8, ease: "anticipate" }}
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
    <ShapeMotion
      initial={{ x: "-100%" }}
      whileInView={{ x: "-30%" }}
      transition={{ duration: 0.9, delay: 0.1, ease: "anticipate" }}
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
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "88%" }} transition={{ duration: 0.6, delay: 0.0 }} className="absolute bottom-[6%] right-[5%] w-[18%] bg-primary" />
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "76%" }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute bottom-[12%] right-[27%] w-[12%] bg-primary/65" />
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "64%" }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute bottom-[18%] right-[43%] w-[8%] bg-primary/40" />
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "52%" }} transition={{ duration: 0.6, delay: 0.3 }} className="absolute bottom-[24%] right-[55%] w-[6%] bg-primary/20" />
    <div className="absolute inset-0 flex items-end px-[8%] pb-[8%]">
      <TextBlock className="text-right max-w-[38%]" />
    </div>
  </Box>
);

/** 20. המדרגות — staircase ascending blocks */
export const StepsShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.0 }} className="absolute bottom-0 right-0 w-[25%] h-[25%] bg-primary/20" />
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute bottom-0 right-[25%] w-[25%] h-[50%] bg-primary/40" />
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute bottom-0 right-[50%] w-[25%] h-[75%] bg-primary/70" />
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.3 }} className="absolute bottom-0 right-[75%] w-[25%] h-full bg-primary" />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right max-w-[48%]" />
    </div>
  </Box>
);

/** 21. הליקוי — overlapping circles */
export const EclipseShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="absolute bg-primary rounded-full"
      style={{ width: "48%", paddingBottom: "48%", top: "18%", right: "10%" }}
    />
    <ShapeMotion
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
      className="absolute bg-primary/35 rounded-full"
      style={{ width: "48%", paddingBottom: "48%", top: "30%", right: "30%" }}
    />
    <ShapeMotion
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
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
    <ShapeMotion initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.6 }} className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[30%] bg-primary/30" />
    {/* Horizontal bar */}
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[30%] bg-primary" />
    {/* Center square */}
    <ShapeMotion initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-primary" />
    <div className="absolute inset-0 flex items-start justify-end p-[8%]">
      <TextBlock className="text-right max-w-[30%]" />
    </div>
  </Box>
);

/** 23. הפירמידה — triangular pyramid composition */
export const PyramidShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      transition={{ duration: 0.8, ease: "circOut" }}
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
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="absolute bottom-0 left-0 right-0 h-[12%] bg-primary/20" />
    <div className="absolute inset-0 flex items-start justify-center pt-[8%]">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 24. הפיצול — asymmetric offset split */
export const SplitShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ x: "100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.7 }} className="absolute top-0 right-0 w-[55%] h-[60%] bg-primary" />
    <ShapeMotion initial={{ x: "-100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.7 }} className="absolute bottom-0 left-0 w-[55%] h-[60%] bg-primary/40" />
    <ShapeMotion initial={{ x: "100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.7, delay: 0.2 }} className="absolute top-[60%] right-0 w-[55%] h-[10%] bg-primary/15" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
        <TextBlock className="text-center" align="center" />
      </div>
    </div>
  </Box>
);

/** 25. האריחים — irregular tile layout */
export const TilesShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className={full ? "p-4 sm:p-6" : "p-2 sm:p-3"}>
      <div className={`grid grid-cols-5 grid-rows-3 w-full h-full ${full ? "gap-3 sm:gap-4" : "gap-1.5 sm:gap-2"}`}>
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.0 }} className="bg-primary col-span-2 row-span-1" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-primary/20 col-span-1 row-span-2" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-primary/55 col-span-2 row-span-1" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-primary/35 col-span-1 row-span-1" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-primary col-span-1 row-span-2" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-primary/15 col-span-2 row-span-1" />
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-primary/70 col-span-1 row-span-1" />
        <ShapeMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-primary col-span-2 row-span-1 flex items-end p-[8%]"
        >
          <div>
            <h2 className={`${full ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xs sm:text-sm"} font-extrabold text-white leading-tight drop-shadow-md`}>
              כותרת ראשית
            </h2>
            <h3 className={`${full ? "text-base sm:text-lg mt-1" : "text-[9px] sm:text-[10px] mt-0.5"} font-semibold text-white/90 drop-shadow-sm`}>
              כותרת משנית
            </h3>
          </div>
        </ShapeMotion>
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-primary/45 col-span-1 row-span-1" />
      </div>
    </Box>
  );
};

/** 26. הוילון — side curtain reveal */
export const CurtainShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ width: "0%" }} whileInView={{ width: "35%" }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-y-0 right-0 bg-primary" />
    <ShapeMotion initial={{ width: "0%" }} whileInView={{ width: "8%" }} transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }} className="absolute inset-y-0 right-[35%] bg-primary/50" />
    <ShapeMotion initial={{ width: "0%" }} whileInView={{ width: "4%" }} transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }} className="absolute inset-y-0 right-[43%] bg-primary/25" />
    <ShapeMotion initial={{ width: "0%" }} whileInView={{ width: "2%" }} transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }} className="absolute inset-y-0 right-[47%] bg-primary/10" />
    <div className="absolute inset-0 flex items-center px-[8%]">
      <TextBlock className="text-right max-w-[32%]" light />
    </div>
  </Box>
);

/** 27. הגשר — horizontal bridge with supports */
export const BridgeShape: React.FC = () => (
  <Box>
    {/* Bridge deck */}
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8 }} className="absolute left-0 right-0 top-[35%] h-[14%] bg-primary" />
    {/* Left support */}
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "55%" }} transition={{ duration: 0.6, delay: 0.4 }} className="absolute top-[35%] right-[12%] w-[14%] bg-primary/60" />
    {/* Right support */}
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "55%" }} transition={{ duration: 0.6, delay: 0.5 }} className="absolute top-[35%] left-[12%] w-[14%] bg-primary/60" />
    {/* Base */}
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} className="absolute bottom-0 left-0 right-0 h-[10%] bg-primary/20" />
    <div className="absolute inset-0 flex items-start justify-center pt-[8%]">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 28. הקן — nested rectangles / frames */
export const NestShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.0 }} className="absolute inset-[5%] border-[3px] border-primary" />
    <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="absolute inset-[12%] border-[3px] border-primary/55" />
    <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute inset-[19%] border-[3px] border-primary/30" />
    <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="absolute inset-[26%] bg-primary/10" />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 29. הפסגה — mountain peak / chevron */
export const PeakShape: React.FC = () => (
  <Box>
    {/* Main peak */}
    <ShapeMotion
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
    <ShapeMotion
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
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
    <ShapeMotion
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
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
    <ShapeMotion initial={{ rotate: 0 }} whileInView={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute border-2 border-primary/25 rounded-full"
      style={{ width: "80%", height: "80%", top: "10%", left: "10%" }}
    />
    {/* Middle orbit ring */}
    <ShapeMotion initial={{ rotate: 0 }} whileInView={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute border-2 border-primary/45 rounded-full"
      style={{ width: "55%", height: "55%", top: "22.5%", left: "22.5%" }}
    />
    {/* Inner orbit ring */}
    <ShapeMotion initial={{ rotate: 0 }} whileInView={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute border-2 border-primary/70 rounded-full"
      style={{ width: "30%", height: "30%", top: "35%", left: "35%" }}
    />
    {/* Center dot */}
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute bg-primary rounded-full"
      style={{ width: "10%", height: "10%", top: "45%", left: "45%" }}
    />
    {/* Orbiting element 1 */}
    <ShapeMotion
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute w-full h-full top-0 left-0 pointer-events-none"
    >
      <div className="absolute bg-primary rounded-full" style={{ width: "6%", paddingBottom: "6%", top: "8%", left: "47%" }} />
    </ShapeMotion>

    <div className="absolute inset-0 flex items-end justify-end p-[8%]">
      <TextBlock className="text-right max-w-[40%]" />
    </div>
  </Box>
);

/** 31. המשושה — Hexagon mask */
export const HexagonShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="absolute bg-primary"
      style={{
        width: "60%",
        height: "60%",
        top: "20%",
        left: "20%",
        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      }}
    />
    <ShapeMotion
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      className="absolute bg-primary/20"
      style={{
        width: "70%",
        height: "70%",
        top: "15%",
        left: "15%",
        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        zIndex: -1,
      }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" light align="center" />
    </div>
  </Box>
);

/** 32. הקולנוע — Cinematic widescreen */
export const CinemaShape: React.FC = () => (
  <Box className="bg-black">
    <ShapeMotion initial={{ height: "50%" }} whileInView={{ height: "15%" }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute inset-x-0 top-0 bg-black z-10" />
    <ShapeMotion initial={{ height: "50%" }} whileInView={{ height: "15%" }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute inset-x-0 bottom-0 bg-black z-10" />
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="absolute inset-0 top-[15%] bottom-[15%] bg-primary/80 flex items-center justify-center">
      <TextBlock className="text-center max-w-[60%]" light align="center" />
    </ShapeMotion>
  </Box>
);

/** 33. האוריגמי — Folded paper look */
export const OrigamiShape: React.FC = () => (
  <Box>
    <ShapeMotion
      initial={{ rotateY: 90, opacity: 0 }}
      whileInView={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute bg-primary"
      style={{
        width: "50%",
        height: "50%",
        top: "10%",
        left: "10%",
        clipPath: "polygon(0 0, 100% 0, 0 100%)",
      }}
    />
    <ShapeMotion
      initial={{ rotateX: 90, opacity: 0 }}
      whileInView={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute bg-primary/70"
      style={{
        width: "50%",
        height: "50%",
        top: "10%",
        left: "10%",
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      }}
    />
    <ShapeMotion
      initial={{ rotateY: -90, opacity: 0 }}
      whileInView={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="absolute bg-primary/40"
      style={{
        width: "50%",
        height: "50%",
        bottom: "10%",
        right: "10%",
        clipPath: "polygon(0 0, 100% 100%, 0 100%)",
      }}
    />
    <ShapeMotion
      initial={{ rotateX: -90, opacity: 0 }}
      whileInView={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="absolute bg-primary/20"
      style={{
        width: "50%",
        height: "50%",
        bottom: "10%",
        right: "10%",
        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
      }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 34. הריחוף — Floating card with shadow */
export const FloatShape: React.FC = () => (
  <Box className="bg-slate-50">
    <ShapeMotion
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="absolute inset-[15%] bg-white shadow-2xl rounded-xl border border-slate-100 flex items-center justify-center p-6"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
      <TextBlock className="text-center" align="center" />
    </ShapeMotion>
  </Box>
);

/** 35. הפרוסות — Glitch/Slice effect */
export const SlicesShape: React.FC = () => (
  <Box>
    <div className="flex w-full h-full">
      <div className="w-1/4 h-full bg-primary/10 relative overflow-hidden">
        <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: 16 }} transition={{ duration: 0.5, delay: 0.0 }} className="absolute inset-0 bg-primary/20" />
      </div>
      <div className="w-1/4 h-full bg-primary/20 relative overflow-hidden">
        <ShapeMotion initial={{ y: "-100%" }} whileInView={{ y: -8 }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute inset-0 bg-primary/40" />
      </div>
      <div className="w-1/4 h-full bg-primary/30 relative overflow-hidden">
        <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: 24 }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute inset-0 bg-primary/60" />
      </div>
      <div className="w-1/4 h-full bg-primary/40 relative overflow-hidden">
        <ShapeMotion initial={{ y: "-100%" }} whileInView={{ y: -12 }} transition={{ duration: 0.5, delay: 0.3 }} className="absolute inset-0 bg-primary/80" />
      </div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center mix-blend-multiply">
      <TextBlock className="text-center" align="center" />
    </div>
  </Box>
);

/** 36. המיקוד — Blur focus center */
export const FocusShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ filter: "blur(0px)" }} whileInView={{ filter: "blur(4px)" }} transition={{ duration: 1 }} className="absolute inset-0 bg-primary/10 backdrop-blur-sm" />
    <ShapeMotion
      initial={{ scale: 1.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-[20%] bg-white rounded-full shadow-lg z-10 flex items-center justify-center border-4 border-primary/20"
    >
      <TextBlock className="text-center max-w-[70%]" align="center" />
    </ShapeMotion>
  </Box>
);

/** 37. הספקטרום — Gradient spectrum */
export const SpectrumShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/40 to-white" />
    <ShapeMotion
      animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/30 to-primary/20 mix-blend-overlay"
    />
    <div className="absolute inset-0 flex items-end p-[10%]">
      <TextBlock className="text-right" light />
    </div>
  </Box>
);

/** 38. השער — Portal frames */
export const PortalShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.0 }} className="absolute inset-0 bg-primary/5" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute inset-[10%] border border-primary/20" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute inset-[20%] border border-primary/40" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="absolute inset-[30%] border border-primary/60" />
    <ShapeMotion
      initial={{ scale: 0, rotate: 180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="absolute inset-[40%] bg-primary shadow-lg flex items-center justify-center"
    >
      <span className="text-white text-4xl font-bold">↩</span>
    </ShapeMotion>
    <div className="absolute inset-x-0 bottom-[10%] text-center">
      <TextBlock className="inline-block" align="center" />
    </div>
  </Box>
);

/** 39. הסימטריה — Mirror split */
export const SymmetryShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ x: "-100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.7, ease: "circOut" }} className="absolute inset-y-0 left-0 w-1/2 bg-primary flex items-center justify-end pr-4">
      <div className="w-16 h-16 border-4 border-white/30 rounded-full" />
    </ShapeMotion>
    <ShapeMotion initial={{ x: "100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.7, ease: "circOut" }} className="absolute inset-y-0 right-0 w-1/2 bg-primary/10 flex items-center justify-start pl-4">
      <div className="w-16 h-16 border-4 border-primary/30 rounded-full" />
    </ShapeMotion>
    <div className="absolute inset-0 flex items-center justify-center pt-[40%]">
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
        <TextBlock className="text-center" align="center" />
      </div>
    </div>
  </Box>
);

/** 40. המטריצה — Tech/Code look */
export const MatrixShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-slate-900 text-primary-content">
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '10px 10px' }}
      />
      <ShapeMotion
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: "80%", opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-[10%] left-[10%] border-l-2 border-primary h-[80%] pl-4 flex flex-col justify-center"
      >
        <h2 className={`${full ? "text-5xl" : "text-xl"} font-mono text-primary mb-2`}>&lt;Code /&gt;</h2>
        <TextBlock className="text-left font-mono" light align="left" />
      </ShapeMotion>
    </Box>
  );
};

/* ════════════════════════════════════════════════════════════ */

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
  hexagon: HexagonShape,
  cinema: CinemaShape,
  origami: OrigamiShape,
  float: FloatShape,
  slices: SlicesShape,
  focus: FocusShape,
  spectrum: SpectrumShape,
  portal: PortalShape,
  symmetry: SymmetryShape,
  matrix: MatrixShape,
};


