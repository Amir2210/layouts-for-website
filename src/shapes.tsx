import React, { createContext, useContext } from "react";

import { motion, type Variants } from "framer-motion";
import portraitImage from "./assets/portrait/portrait png.png";

/* ── Full-screen context ── */
export const FullScreenCtx = createContext(false);

export const MDiv = motion.div;
export const ShapeMotion: React.FC<React.ComponentProps<typeof motion.div>> = ({ children, ...props }) => {
  const full = useContext(FullScreenCtx);
  const p = { ...props };
  if (full && p.whileInView && !p.animate) {
    p.animate = p.whileInView;
    delete p.whileInView;
  }
  p.viewport = { once: true, amount: 0, ...p.viewport };
  return <MDiv {...p}>{children}</MDiv>;
};

/* ── Text block — scales up in full-screen ── */
export const TextBlock: React.FC<{
  light?: boolean;
  className?: string;
  align?: "left" | "center" | "right";
}> = ({ light = false, className = "", align = "right" }) => {
  const full = useContext(FullScreenCtx);

  const h2 = full ? "text-4xl sm:text-5xl lg:text-7xl mb-4" : "text-lg sm:text-xl mb-1";
  const h3 = full ? "text-xl sm:text-2xl lg:text-3xl mb-6" : "text-[10px] sm:text-xs mb-1";
  const p = full ? "text-base sm:text-lg lg:text-xl leading-8 max-w-[600px]" : "text-[9px] sm:text-[10px] leading-tight max-w-[180px]";

  const textColor = light ? "text-white" : "text-slate-950";
  const subColor = light ? "text-white/95" : "text-slate-700";
  const descColor = light ? "text-white/90" : "text-slate-600";
  const shadowClass = light ? "drop-shadow-md" : "";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <ShapeMotion
      className={`relative z-10 flex flex-col ${align === "center" ? "items-center text-center" : align === "left" ? "items-start text-left" : "items-end text-right"} ${className}`}
      variants={full ? containerVariants : {}}
      initial={full ? "hidden" : "show"}
      animate={full ? "show" : undefined}
      whileInView={full ? undefined : "show"}
      viewport={{ once: true, amount: 0 }}
    >
      <motion.h2 variants={itemVariants} className={`${h2} font-extrabold tracking-tight ${textColor} ${shadowClass}`}>כותרת ראשית</motion.h2>
      <motion.h3 variants={itemVariants} className={`${h3} font-bold tracking-wide uppercase ${subColor} ${shadowClass}`}>כותרת משנית מרשימה</motion.h3>
      <motion.p variants={itemVariants} className={`${p} font-medium ${descColor} ${shadowClass}`}>טקסט לדוגמה הממחיש את העיצוב הנקי והמקצועי של התבנית. הטיפוגרפיה מותאמת לקריאות מיטבית.</motion.p>
      {full && (
        <motion.button variants={itemVariants} className={`mt-8 px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 ${light ? "bg-white text-slate-900 hover:bg-white/90" : "bg-slate-900 text-white hover:bg-slate-800"}`}>קרא עוד</motion.button>
      )}
    </ShapeMotion>
  );
};

/** Shared wrapper */
export const Box: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>{children}</div>
);

/* ── Decorative helpers ── */
const Dots: React.FC<{ full: boolean; className?: string; count?: number; color?: string }> = ({ full, className = "", count = 9, color = "bg-primary/30" }) => (
  <div className={`absolute opacity-40 ${className}`} style={{ display: "grid", gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(count))}, 1fr)`, gap: full ? "10px" : "3px" }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`rounded-full ${color}`} style={{ width: full ? "5px" : "2px", height: full ? "5px" : "2px" }} />
    ))}
  </div>
);

const Ring: React.FC<{ full: boolean; size: string; smallSize: string; className?: string; color?: string; delay?: number }> = ({ full, size, smallSize, className = "", color = "border-primary/20", delay = 0.5 }) => (
  <ShapeMotion initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay }} className={`absolute rounded-full border-2 ${color} ${className}`} style={{ width: full ? size : smallSize, height: full ? size : smallSize }} />
);

const GlowBlob: React.FC<{ full: boolean; className?: string; color?: string; size?: string; smallSize?: string }> = ({ full, className = "", color = "bg-primary", size = "300px", smallSize = "80px" }) => (
  <div className={`absolute rounded-full ${color} ${className}`} style={{ width: full ? size : smallSize, height: full ? size : smallSize, filter: full ? "blur(50px)" : "blur(15px)", opacity: 0.12 }} />
);

const FloatingBadge: React.FC<{ full: boolean; icon: string; label: string; sub: string; className?: string; delay?: number; bgColor?: string }> = ({ full, icon, label, sub, className = "", delay = 0.5, bgColor = "bg-amber-100" }) => (
  <ShapeMotion
    initial={{ opacity: 0, scale: 0.6, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
    className={`absolute bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 z-20 ${className}`}
    style={{ padding: full ? "10px 16px" : "3px 7px" }}
  >
    <div className={`${full ? "w-7 h-7" : "w-3 h-3"} rounded-full ${bgColor} flex items-center justify-center`}>
      <span style={{ fontSize: full ? "14px" : "6px" }}>{icon}</span>
    </div>
    <div>
      <div className={`${full ? "text-xs font-bold" : "text-[5px] font-bold"} text-slate-800`}>{label}</div>
      <div className={`${full ? "text-[10px]" : "text-[4px]"} text-slate-500`}>{sub}</div>
    </div>
  </ShapeMotion>
);

/* ════════════════════════════════════════════════════════════ */

/** 1. הקוביה — vertical split with warm gradient & floating accents */
export const CubeShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-amber-50/80 via-white to-orange-50/60">
      <GlowBlob full={full} className="top-[-10%] right-[-5%]" color="bg-primary" size="400px" smallSize="100px" />
      <GlowBlob full={full} className="bottom-[-5%] left-[10%]" color="bg-orange-300" size="250px" smallSize="60px" />

      <ShapeMotion initial={{ x: "-100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.8, ease: "circOut" }} className="absolute inset-y-0 left-0 w-[50%] bg-primary overflow-hidden rounded-r-3xl shadow-2xl">
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-primary/20 mix-blend-multiply" />
      </ShapeMotion>

      <Dots full={full} className="bottom-[10%] left-[52%]" count={12} />
      <Ring full={full} size="100px" smallSize="28px" className="top-[8%] right-[8%]" />
      <FloatingBadge full={full} icon="⭐" label="Premium" sub="Quality" className={full ? "bottom-[15%] left-[54%]" : "bottom-[12%] left-[52%]"} delay={0.6} />

      <div className="absolute inset-0 flex items-center justify-start px-[8%]">
        <TextBlock className="text-right max-w-[40%]" />
      </div>
    </Box>
  );
};

/** 2. הכדור — offset circle — TEAL/CYAN theme */
export const BallShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-tl! from-teal-50/70 via-white to-cyan-50/50">
      <GlowBlob full={full} className="top-[5%] left-[-10%]" color="bg-teal-400" size="350px" smallSize="90px" />
      <GlowBlob full={full} className="bottom-[-5%] right-[20%]" color="bg-cyan-300" size="200px" smallSize="50px" />

      <ShapeMotion initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring", bounce: 0.3 }} className="absolute bg-teal-500 rounded-full overflow-hidden shadow-2xl border-4 border-white aspect-square" style={{ height: "75%", top: "12%", left: "-5%" }}>
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
      </ShapeMotion>

      <Ring full={full} size="130px" smallSize="35px" className="top-[5%] left-[25%]" color="border-teal-300/30" delay={0.3} />
      <Ring full={full} size="60px" smallSize="16px" className="bottom-[12%] left-[30%]" color="border-teal-400/25" delay={0.6} />
      <Dots full={full} className="top-[15%] right-[10%]" count={9} color="bg-teal-300/40" />
      <FloatingBadge full={full} icon="✨" label="Exclusive" sub="Design" className={full ? "bottom-[20%] right-[10%]" : "bottom-[18%] right-[8%]"} delay={0.7} bgColor="bg-teal-100" />

      <div className="absolute inset-0 flex items-center justify-start px-[8%]">
        <TextBlock className="text-right max-w-[45%]" />
      </div>
    </Box>
  );
};

/** 3. המסגרת — elegant picture frame — ROSE/PINK theme */
export const FrameShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-rose-50/80 via-pink-50/30 to-white">
      <GlowBlob full={full} className="top-[-5%] left-[40%]" color="bg-rose-300" size="200px" smallSize="50px" />
      <GlowBlob full={full} className="bottom-[5%] right-[10%]" color="bg-pink-200" size="150px" smallSize="40px" />

      <ShapeMotion initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute inset-[8%] bg-white shadow-2xl overflow-hidden rounded-2xl border border-rose-200/60">
        <div className="absolute inset-0 grid grid-cols-2" dir="ltr">
          <div className="relative h-full overflow-hidden">
            <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
            <div className="absolute inset-0 bg-linear-to-t from-rose-900/10 to-transparent" />
          </div>
          <div className="flex items-center justify-center p-8 bg-white">
            <TextBlock className="text-center" align="center" />
          </div>
        </div>
      </ShapeMotion>

      <Ring full={full} size="80px" smallSize="22px" className="top-[3%] right-[3%]" color="border-rose-300/30" delay={0.4} />
      <Dots full={full} className="bottom-[3%] left-[3%]" count={6} color="bg-rose-300/40" />
    </Box>
  );
};

/** 4. הגריד — bento grid — INDIGO/BLUE theme */
export const GridShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className={`bg-linear-to-br! from-indigo-50/60 to-blue-50/40 ${full ? "p-4 sm:p-6" : "p-2 sm:p-3"}`}>
      <div dir="ltr" className={`grid grid-cols-2 grid-rows-2 w-full h-full ${full ? "gap-3 sm:gap-4" : "gap-1.5 sm:gap-2"}`}>
        <ShapeMotion initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative row-span-2 overflow-hidden rounded-2xl shadow-lg">
          <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-linear-to-t from-indigo-900/15 to-transparent" />
        </ShapeMotion>
        <ShapeMotion initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-linear-to-br from-indigo-500 to-blue-600 flex items-end p-[10%] rounded-2xl shadow-md">
          <div dir="rtl">
            <h2 className={`${full ? "text-2xl sm:text-3xl lg:text-4xl" : "text-sm sm:text-base"} font-extrabold text-white leading-tight drop-shadow-sm`}>כותרת ראשית</h2>
          </div>
        </ShapeMotion>
        <ShapeMotion initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white flex items-start p-[10%] rounded-2xl shadow-md border border-indigo-100">
          <div dir="rtl" className="text-slate-800">
            <h3 className={`${full ? "text-base sm:text-lg" : "text-xs"} font-semibold mb-2 text-indigo-900`}>פסקה קצרה</h3>
            <p className={`${full ? "text-sm" : "text-[10px]"} leading-tight opacity-80`}>לורם איפסום דולור סיט אמט, קונסקטור אדיפיסינג אלית.</p>
          </div>
        </ShapeMotion>
      </div>
    </Box>
  );
};

/** 5. השלישיות — three columns — EMERALD/GREEN theme */
export const ThirdsShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box>
      <div className="absolute inset-0 grid grid-cols-3 gap-[3px] bg-emerald-50" dir="ltr">
        <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.6, ease: "circOut" }} className="relative overflow-hidden bg-emerald-600 rounded-r-xl">
          <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-linear-to-t from-emerald-900/15 to-transparent" />
        </ShapeMotion>
        <ShapeMotion initial={{ y: "-100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.6, delay: 0.15, ease: "circOut" }} className="relative bg-linear-to-b from-emerald-500 to-emerald-700 flex items-end p-[12%]">
          <TextBlock className="text-right max-w-full" light />
          <Dots full={full} className="top-[8%] right-[8%]" count={6} color="bg-white/30" />
        </ShapeMotion>
        <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.6, delay: 0.3, ease: "circOut" }} className="relative bg-emerald-100 rounded-l-xl flex items-center justify-center">
          <Ring full={full} size="80px" smallSize="22px" className="relative" color="border-emerald-400/40" delay={0.5} />
        </ShapeMotion>
      </div>
    </Box>
  );
};

/** 6. הפינה — L-shaped corner — CORAL/WARM RED theme */
export const CornerShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-red-50/40 via-white to-orange-50/30">
      <GlowBlob full={full} className="bottom-[5%] right-[5%]" color="bg-red-300" size="200px" smallSize="50px" />
      <GlowBlob full={full} className="top-[-5%] left-[30%]" color="bg-orange-200" size="180px" smallSize="45px" />

      <ShapeMotion initial={{ x: "-100%" }} whileInView={{ x: "0%" }} transition={{ duration: 0.8, ease: "circOut" }} className="absolute top-0 left-0 right-[30%] bottom-[10%] bg-red-500 overflow-hidden rounded-br-[100px] shadow-xl">
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
        <div className="absolute inset-0 bg-linear-to-br from-transparent to-red-600/15" />
      </ShapeMotion>

      <FloatingBadge full={full} icon="🔥" label="Hot" sub="Trending" className={full ? "top-[8%] right-[8%]" : "top-[6%] right-[5%]"} delay={0.5} bgColor="bg-red-100" />
      <Ring full={full} size="70px" smallSize="18px" className="bottom-[5%] left-[5%]" color="border-red-300/25" delay={0.7} />

      <div className="absolute inset-y-0 right-0 w-[40%] flex items-center p-[8%]">
        <TextBlock className="text-right" />
      </div>
    </Box>
  );
};

/** 7. הזיגזג — two-column — SKY BLUE theme */
export const ZigzagShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-r! from-sky-50/60 to-blue-50/40">
      <GlowBlob full={full} className="top-[10%] right-[20%]" color="bg-sky-300" size="180px" smallSize="45px" />
      <div className="absolute inset-0 grid grid-cols-2" dir="ltr">
        <ShapeMotion initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="relative h-full overflow-hidden rounded-r-3xl shadow-lg">
          <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-sky-900/5" />
        </ShapeMotion>
        <div className="relative h-full flex items-center justify-center p-[8%]">
          <TextBlock className="text-center" align="center" />
          <Dots full={full} className="top-[8%] right-[8%]" count={9} color="bg-sky-300/40" />
          <Ring full={full} size="90px" smallSize="24px" className="bottom-[8%] right-[8%]" color="border-sky-300/30" delay={0.6} />
        </div>
      </div>
    </Box>
  );
};

/** 8. הפסיפס — mosaic grid — PURPLE/FUCHSIA theme */
export const MosaicShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-purple-50/50 to-fuchsia-50/30">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 w-full h-full gap-2 p-4">
        <ShapeMotion initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="col-span-8 row-span-4 bg-white rounded-2xl overflow-hidden shadow-lg">
          <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-linear-to-t from-purple-900/10 to-transparent" />
        </ShapeMotion>
        <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="col-span-4 row-span-3 bg-linear-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center p-4 shadow-md">
          <span className={`text-white font-bold text-center ${full ? "text-lg" : "text-[8px]"}`}>New Collection</span>
        </ShapeMotion>
        <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="col-span-4 row-span-1 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-100 shadow-sm">
          <span className={`text-purple-600 font-semibold ${full ? "text-sm" : "text-[6px]"}`}>💎 Premium</span>
        </ShapeMotion>
        <div className="col-span-12 row-span-2 flex items-center justify-between px-4">
          <TextBlock className="text-left w-full" align="left" />
        </div>
      </div>
    </Box>
  );
};

/** 9. הספירלה — circular portrait with orbit rings — VIOLET/LAVENDER theme */
export const SpiralShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-violet-50/60 via-white to-purple-50/30">
      <GlowBlob full={full} className="top-[10%] left-[10%]" color="bg-violet-400" size="280px" smallSize="70px" />
      <GlowBlob full={full} className="bottom-[5%] right-[15%]" color="bg-purple-300" size="180px" smallSize="45px" />

      <div className="absolute inset-y-0 left-0 w-[55%] flex items-center justify-center p-[8%]">
        <div className="relative z-10">
          <Ring full={full} size="280px" smallSize="80px" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="border-violet-300/25" delay={0.2} />
          <Ring full={full} size="220px" smallSize="64px" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="border-violet-400/30" delay={0.4} />
          <div className={`${full ? "w-48 h-48 lg:w-64 lg:h-64" : "w-16 h-16"} rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10`}>
            <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
          </div>
        </div>
      </div>

      <FloatingBadge full={full} icon="✦" label="Creative" sub="Studio" className={full ? "top-[15%] left-[40%]" : "top-[12%] left-[35%]"} delay={0.6} bgColor="bg-violet-100" />
      <Dots full={full} className="bottom-[15%] left-[15%]" count={6} color="bg-violet-300/50" />

      <div className="absolute inset-y-0 right-0 w-[45%] flex items-center p-[8%]">
        <TextBlock className="text-right" />
      </div>
    </Box>
  );
};

/** 10. המדרגות — stepped reveal — SLATE BLUE/STEEL theme */
export const StepsShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-r! from-slate-50 to-blue-50/30">
      <GlowBlob full={full} className="top-[5%] left-[40%]" color="bg-blue-300" size="200px" smallSize="50px" />
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative h-full flex items-center justify-center p-8">
          <TextBlock className="text-center" align="center" />
          <Ring full={full} size="90px" smallSize="24px" className="top-[8%] left-[8%]" color="border-blue-300/25" delay={0.4} />
          <Dots full={full} className="bottom-[8%] left-[8%]" count={6} color="bg-blue-300/30" />
        </div>
        <div className="relative h-full">
          <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.0 }} className="absolute bottom-0 left-0 w-[50%] h-[40%] bg-slate-300/30 rounded-t-lg" />
          <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute bottom-0 left-[50%] w-[50%] h-[70%] bg-slate-400/40 rounded-t-lg" />
          <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute bottom-0 left-0 w-full h-[85%] bg-slate-700 overflow-hidden rounded-t-2xl shadow-lg border-4 border-white">
            <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-800/20 to-transparent" />
          </ShapeMotion>
          <FloatingBadge full={full} icon="🚀" label="Launch" sub="Ready" className={full ? "top-[5%] right-[10%]" : "top-[3%] right-[5%]"} delay={0.8} bgColor="bg-blue-100" />
        </div>
      </div>
    </Box>
  );
};

/** 11. הזרקור — THE SPOTLIGHT — hero-style with tilted accent & badges */
export const SpotlightShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-amber-50 via-white to-orange-50">
      <GlowBlob full={full} className="top-[-10%] right-[5%]" color="bg-primary" size="500px" smallSize="140px" />
      <GlowBlob full={full} className="bottom-[10%] left-[5%]" color="bg-orange-400" size="300px" smallSize="80px" />

      <ShapeMotion initial={{ x: "100%", rotate: -15 }} whileInView={{ x: "0%", rotate: -15 }} transition={{ duration: 0.7, ease: "circOut" }} className="absolute bg-primary overflow-hidden" style={{ width: "55%", height: "120%", top: "-10%", right: "-5%", borderRadius: full ? "40px" : "12px" }} />
      <ShapeMotion initial={{ x: "120%", rotate: -15 }} whileInView={{ x: "0%", rotate: -15 }} transition={{ duration: 0.6, ease: "circOut", delay: 0.1 }} className="absolute border-4 border-primary/30" style={{ width: "50%", height: "110%", top: "-5%", right: "0%", borderRadius: full ? "40px" : "12px" }} />

      <ShapeMotion initial={{ y: "30%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: "circOut" }} className="absolute bottom-0 overflow-hidden z-10" style={{ right: full ? "8%" : "5%", width: full ? "40%" : "38%", height: "95%" }}>
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.15))" }} />
      </ShapeMotion>

      <Dots full={full} className={full ? "top-[15%] left-[55%]" : "top-[10%] left-[50%]"} count={full ? 15 : 9} />
      <FloatingBadge full={full} icon="⭐" label="Premium" sub="Quality" className={full ? "top-[18%] right-[8%]" : "top-[15%] right-[5%]"} delay={0.5} />
      <FloatingBadge full={full} icon="✓" label="24/7" sub="Service" className={full ? "bottom-[25%] right-[5%]" : "bottom-[22%] right-[3%]"} delay={0.7} bgColor="bg-green-100" />
      <FloatingBadge full={full} icon="🏆" label="Best" sub="Agency" className={full ? "top-[45%] right-[48%]" : "top-[42%] right-[40%]"} delay={0.9} bgColor="bg-rose-100" />

      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" />
      </div>

      <Ring full={full} size="120px" smallSize="35px" className="bottom-[8%] left-[3%]" delay={0.6} />
      <Ring full={full} size="80px" smallSize="22px" className="bottom-[10%] left-[5%]" delay={0.8} color="border-primary/10" />
    </Box>
  );
};

/* ════════════════════════════════════════════════════════════ */
/* ★ NEW LAYOUTS — inspired by reference images               */
/* ════════════════════════════════════════════════════════════ */

/** 12. הבמה — THE STAGE — torn-paper cutout with doodle elements (inspired by tbh) */
export const StageShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-lime-50/40 via-white to-emerald-50/30">
      {/* Large irregular green accent shape behind person */}
      <ShapeMotion
        initial={{ scale: 0, rotate: 5 }}
        whileInView={{ scale: 1, rotate: 5 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="absolute bg-emerald-400 z-0"
        style={{
          width: "45%", height: "75%",
          top: "10%", right: full ? "5%" : "3%",
          borderRadius: full ? "30% 70% 50% 50% / 40% 60% 40% 60%" : "30% 70% 50% 50% / 40% 60% 40% 60%",
        }}
      />

      {/* Person image — cut out over the shape */}
      <ShapeMotion
        initial={{ y: "20%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "circOut" }}
        className="absolute bottom-0 z-10 overflow-hidden"
        style={{ right: full ? "10%" : "6%", width: full ? "38%" : "36%", height: "90%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 8px 25px rgba(0,0,0,0.2))" }} />
      </ShapeMotion>

      {/* Doodle-style decorations */}
      <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="absolute z-20" style={{ top: full ? "8%" : "5%", right: full ? "15%" : "12%", fontSize: full ? "32px" : "12px" }}>💬</ShapeMotion>
      <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }} className="absolute z-20" style={{ top: full ? "20%" : "15%", right: full ? "48%" : "42%", fontSize: full ? "24px" : "9px" }}>🧩</ShapeMotion>

      {/* Hand-drawn style circle outline */}
      <ShapeMotion
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute rounded-full border-[3px] border-dashed border-slate-800/20"
        style={{ width: full ? "200px" : "55px", height: full ? "130px" : "35px", top: full ? "30%" : "25%", right: full ? "25%" : "20%", transform: "rotate(-10deg)" }}
      />

      {/* Decorative stars/sparkles */}
      <ShapeMotion initial={{ rotate: -20, opacity: 0 }} whileInView={{ rotate: 0, opacity: 0.5 }} transition={{ delay: 0.8 }} className="absolute text-slate-800" style={{ top: full ? "5%" : "3%", right: full ? "40%" : "35%", fontSize: full ? "20px" : "8px" }}>✦</ShapeMotion>
      <ShapeMotion initial={{ rotate: 20, opacity: 0 }} whileInView={{ rotate: 0, opacity: 0.3 }} transition={{ delay: 0.9 }} className="absolute text-slate-800" style={{ bottom: full ? "25%" : "20%", right: full ? "50%" : "42%", fontSize: full ? "16px" : "6px" }}>✧</ShapeMotion>
      <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} transition={{ delay: 0.6 }} className="absolute rounded-full bg-slate-800" style={{ width: full ? "8px" : "3px", height: full ? "8px" : "3px", top: full ? "50%" : "45%", right: full ? "52%" : "45%" }} />

      {/* Text on the left */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" />
      </div>
    </Box>
  );
};

/** 13. הגיבור — THE HERO — bold chevron/arrow behind person (inspired by Crafto) */
export const HeroShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-orange-50/40 via-white to-rose-50/20">
      <GlowBlob full={full} className="top-[20%] right-[20%]" color="bg-orange-400" size="350px" smallSize="90px" />

      {/* Large bold arrow/chevron shape */}
      <ShapeMotion
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: "circOut" }}
        className="absolute bg-orange-500 z-0"
        style={{
          width: "50%", height: "80%",
          top: "10%", right: "-5%",
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 50%)",
        }}
      />

      {/* Secondary arrow outline */}
      <ShapeMotion
        initial={{ x: "80%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 0.3 }}
        transition={{ duration: 0.6, ease: "circOut", delay: 0.1 }}
        className="absolute border-[3px] border-orange-400 z-0"
        style={{
          width: "45%", height: "70%",
          top: "15%", right: "0%",
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 50%)",
        }}
      />

      {/* Person image */}
      <ShapeMotion
        initial={{ y: "20%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
        className="absolute bottom-0 z-10 overflow-hidden"
        style={{ right: full ? "8%" : "5%", width: full ? "35%" : "34%", height: "92%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))" }} />
      </ShapeMotion>

      {/* Floating card note */}
      <ShapeMotion
        initial={{ scale: 0.7, opacity: 0, rotate: 3 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 3 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="absolute bg-amber-200 z-20 shadow-lg"
        style={{
          padding: full ? "14px 20px" : "4px 8px",
          top: full ? "12%" : "8%",
          right: full ? "5%" : "3%",
          borderRadius: full ? "8px" : "4px",
        }}
      >
        <span className={`font-bold text-slate-800 ${full ? "text-sm" : "text-[5px]"}`}>We are creative agency</span>
      </ShapeMotion>

      {/* Check mark badges at bottom */}
      <ShapeMotion
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`absolute z-10 flex items-center gap-2 ${full ? "bottom-[8%] left-[8%]" : "bottom-[5%] left-[5%]"}`}
      >
        <div className={`flex items-center gap-1 ${full ? "text-xs" : "text-[5px]"}`}>
          <span className="text-green-500">✓</span>
          <span className="text-slate-600 font-medium">Conversion strategy</span>
        </div>
      </ShapeMotion>

      <Dots full={full} className="bottom-[20%] left-[45%]" count={6} color="bg-orange-300/40" />

      {/* Text on the left */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" />
      </div>
    </Box>
  );
};

/** 14. הניאון — THE NEON — dark theme with glass-morphism (inspired by Socialised) */
export const NeonShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-slate-900 via-violet-950 to-slate-900">
      {/* Purple glow blobs */}
      <div className="absolute rounded-full bg-violet-500" style={{ width: full ? "400px" : "100px", height: full ? "400px" : "100px", top: "-15%", right: "10%", filter: full ? "blur(80px)" : "blur(25px)", opacity: 0.25 }} />
      <div className="absolute rounded-full bg-purple-600" style={{ width: full ? "300px" : "80px", height: full ? "300px" : "80px", bottom: "5%", left: "5%", filter: full ? "blur(60px)" : "blur(20px)", opacity: 0.2 }} />

      {/* Large dark circle accent */}
      <ShapeMotion
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="absolute bg-violet-800/40 rounded-full"
        style={{ width: "50%", paddingBottom: "50%", top: "8%", right: "-5%" }}
      />

      {/* Person image */}
      <ShapeMotion
        initial={{ y: "30%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "circOut" }}
        className="absolute bottom-0 z-10 overflow-hidden"
        style={{ right: full ? "10%" : "6%", width: full ? "38%" : "36%", height: "90%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 10px 40px rgba(139,92,246,0.3))" }} />
      </ShapeMotion>

      {/* Glass-morphism floating card */}
      <ShapeMotion
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl"
        style={{ padding: full ? "14px 20px" : "4px 8px", top: full ? "15%" : "10%", right: full ? "8%" : "5%" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: full ? "18px" : "7px" }}>🚀</span>
          <div>
            <div className={`${full ? "text-xs font-bold" : "text-[5px] font-bold"} text-white`}>Trending</div>
            <div className={`${full ? "text-[10px]" : "text-[4px]"} text-white/60`}>#1 Solution</div>
          </div>
        </div>
      </ShapeMotion>

      {/* Glass-morphism badge bottom */}
      <ShapeMotion
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="absolute z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
        style={{ padding: full ? "10px 16px" : "3px 6px", bottom: full ? "25%" : "20%", right: full ? "5%" : "3%" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: full ? "14px" : "6px" }}>⚡</span>
          <span className={`${full ? "text-xs font-semibold" : "text-[5px] font-semibold"} text-white`}>24/7 Active</span>
        </div>
      </ShapeMotion>

      {/* Decorative 3D-like floating elements */}
      <ShapeMotion initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 0.9, type: "spring" }} className="absolute z-20" style={{ bottom: full ? "35%" : "30%", left: full ? "45%" : "40%", fontSize: full ? "24px" : "9px" }}>🏀</ShapeMotion>

      {/* Dot grid */}
      <Dots full={full} className={full ? "top-[60%] right-[50%]" : "top-[55%] right-[45%]"} count={6} color="bg-white/20" />

      {/* Text on the left — light for dark bg */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" light />
      </div>
    </Box>
  );
};

/** 15. הקנבס — THE CANVAS — soft gradient with person & floating social badges (inspired by Social Sizzle) */
export const CanvasShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-rose-100/60 via-amber-50/40 to-teal-50/30">
      {/* Soft colorful gradient blob behind person */}
      <div className="absolute rounded-full bg-linear-to-br from-rose-300 to-amber-200" style={{ width: full ? "450px" : "120px", height: full ? "450px" : "120px", top: "-5%", right: "-5%", filter: full ? "blur(60px)" : "blur(20px)", opacity: 0.35 }} />
      <div className="absolute rounded-full bg-teal-200" style={{ width: full ? "200px" : "50px", height: full ? "200px" : "50px", bottom: "10%", right: "30%", filter: full ? "blur(40px)" : "blur(12px)", opacity: 0.25 }} />

      {/* Rounded accent card behind the person */}
      <ShapeMotion
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute bg-white/70 backdrop-blur-sm rounded-3xl border border-white/80 shadow-xl z-0"
        style={{ width: "48%", height: "85%", top: "8%", right: full ? "3%" : "2%" }}
      />

      {/* Person image */}
      <ShapeMotion
        initial={{ y: "20%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "circOut" }}
        className="absolute bottom-0 z-10 overflow-hidden"
        style={{ right: full ? "8%" : "5%", width: full ? "38%" : "36%", height: "90%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.12))" }} />
      </ShapeMotion>

      {/* Floating social badges around person */}
      <FloatingBadge full={full} icon="🏅" label="Best Agency" sub="Awards" className={full ? "top-[28%] right-[40%]" : "top-[25%] right-[35%]"} delay={0.5} bgColor="bg-amber-100" />
      <FloatingBadge full={full} icon="⚡" label="24/7 Service" sub="Free Access" className={full ? "bottom-[20%] right-[3%]" : "bottom-[18%] right-[2%]"} delay={0.7} bgColor="bg-blue-100" />
      <FloatingBadge full={full} icon="❤️" label="10K+" sub="Reviews" className={full ? "top-[10%] right-[15%]" : "top-[8%] right-[12%]"} delay={0.9} bgColor="bg-rose-100" />

      {/* Text on the left */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" />
      </div>
    </Box>
  );
};

/* ════════════════════════════════════════════════════════════ */
/* ★ MORE LAYOUTS — clean, elegant, colorful                  */
/* ════════════════════════════════════════════════════════════ */

/** 16. המראה — THE MIRROR — centered portrait with symmetric mint accents */
export const MirrorShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-b! from-emerald-50/50 via-white to-teal-50/40">
      <GlowBlob full={full} className="top-[5%] left-[30%]" color="bg-teal-300" size="300px" smallSize="80px" />

      {/* Symmetric accent bars */}
      <ShapeMotion initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.6 }} className="absolute left-[8%] top-[10%] bottom-[10%] w-[3px] bg-linear-to-b from-teal-300 to-emerald-400 rounded-full origin-top" />
      <ShapeMotion initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute right-[8%] top-[10%] bottom-[10%] w-[3px] bg-linear-to-b from-teal-300 to-emerald-400 rounded-full origin-top" />

      {/* Central portrait card */}
      <ShapeMotion
        initial={{ y: "20%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: "circOut" }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 overflow-hidden"
        style={{ width: full ? "35%" : "34%", height: "88%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 8px 25px rgba(0,0,0,0.12))" }} />
      </ShapeMotion>

      {/* Frosted glass card behind person */}
      <ShapeMotion initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute left-1/2 -translate-x-1/2 top-[8%] bg-white/60 backdrop-blur-sm rounded-3xl border border-teal-100/60 shadow-lg z-0" style={{ width: "42%", height: "80%" }} />

      {/* Text — left side */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "30%" : "28%", padding: full ? "5%" : "4%" }}>
        <TextBlock className="text-right w-full" align="right" />
      </div>

      {/* Badge — right side */}
      <FloatingBadge full={full} icon="🪞" label="Reflect" sub="Beauty" className={full ? "top-[15%] right-[12%]" : "top-[12%] right-[10%]"} delay={0.6} bgColor="bg-teal-100" />
      <Dots full={full} className={full ? "bottom-[12%] right-[12%]" : "bottom-[10%] right-[10%]"} count={6} color="bg-teal-300/40" />
    </Box>
  );
};

/** 17. הפנינה — THE PEARL — luxurious minimal cream/ivory with soft gold */
export const PearlShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-amber-50/30 via-stone-50 to-yellow-50/20">
      {/* Subtle warm glow */}
      <div className="absolute rounded-full bg-amber-200" style={{ width: full ? "350px" : "90px", height: full ? "350px" : "90px", top: "10%", right: "15%", filter: full ? "blur(70px)" : "blur(22px)", opacity: 0.15 }} />

      {/* Elegant thin gold frame */}
      <ShapeMotion initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="absolute inset-[6%] border border-amber-300/40 rounded-2xl" />
      <ShapeMotion initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="absolute inset-[8%] border border-amber-200/25 rounded-xl" />

      {/* Person — right side, elegant crop */}
      <ShapeMotion
        initial={{ x: "20%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "circOut" }}
        className="absolute top-[10%] bottom-[10%] right-[10%] overflow-hidden rounded-2xl shadow-xl z-10"
        style={{ width: full ? "38%" : "36%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-amber-900/5" />
      </ShapeMotion>

      {/* Text — left side */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "10%" : "7%" }}>
        <TextBlock className="text-right w-full" align="right" />
      </div>

      {/* Minimal decorations */}
      <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="absolute left-[10%] bottom-[15%] h-px bg-amber-300/40 origin-left" style={{ width: full ? "120px" : "35px" }} />
      <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="absolute left-[10%] bottom-[17%] h-px bg-amber-300/25 origin-left" style={{ width: full ? "80px" : "22px" }} />
    </Box>
  );
};

/** 18. הברק — THE LIGHTNING — electric blue/cyan bold energy */
export const LightningShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-slate-900 via-blue-950 to-cyan-950">
      {/* Electric glow blobs */}
      <div className="absolute rounded-full bg-cyan-400" style={{ width: full ? "350px" : "90px", height: full ? "350px" : "90px", top: "-10%", right: "15%", filter: full ? "blur(70px)" : "blur(22px)", opacity: 0.2 }} />
      <div className="absolute rounded-full bg-blue-500" style={{ width: full ? "250px" : "65px", height: full ? "250px" : "65px", bottom: "5%", left: "10%", filter: full ? "blur(50px)" : "blur(16px)", opacity: 0.18 }} />

      {/* Diagonal electric stripe */}
      <ShapeMotion
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="absolute bg-linear-to-r from-cyan-400 to-blue-500 z-0"
        style={{ width: "60%", height: full ? "6px" : "2px", top: "30%", right: "-5%", transform: "rotate(-15deg)" }}
      />
      <ShapeMotion
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "circOut" }}
        className="absolute bg-linear-to-r from-cyan-300 to-blue-400 z-0"
        style={{ width: "50%", height: full ? "3px" : "1px", top: "35%", right: "0%", transform: "rotate(-15deg)" }}
      />

      {/* Person image */}
      <ShapeMotion
        initial={{ y: "25%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
        className="absolute bottom-0 z-10 overflow-hidden"
        style={{ right: full ? "8%" : "5%", width: full ? "38%" : "36%", height: "90%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 8px 30px rgba(34,211,238,0.25))" }} />
      </ShapeMotion>

      {/* Glass badges */}
      <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="absolute z-20 bg-white/10 backdrop-blur-md border border-cyan-400/30 rounded-2xl shadow-xl" style={{ padding: full ? "12px 18px" : "3px 7px", top: full ? "15%" : "10%", right: full ? "8%" : "5%" }}>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: full ? "16px" : "6px" }}>⚡</span>
          <div>
            <div className={`${full ? "text-xs font-bold" : "text-[5px] font-bold"} text-cyan-300`}>Fast</div>
            <div className={`${full ? "text-[10px]" : "text-[4px]"} text-white/50`}>Lightning Speed</div>
          </div>
        </div>
      </ShapeMotion>

      <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: "spring" }} className="absolute z-20 bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-xl" style={{ padding: full ? "10px 14px" : "3px 6px", bottom: full ? "22%" : "18%", right: full ? "5%" : "3%" }}>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: full ? "14px" : "6px" }}>💎</span>
          <span className={`${full ? "text-xs font-semibold" : "text-[5px] font-semibold"} text-blue-300`}>Pro Access</span>
        </div>
      </ShapeMotion>

      <Dots full={full} className={full ? "bottom-[15%] left-[45%]" : "bottom-[12%] left-[40%]"} count={6} color="bg-cyan-400/25" />

      {/* Text on the left — light */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" light />
      </div>
    </Box>
  );
};

/** 19. הקשת — THE ARCH — warm gradient arch with person inside */
export const RainbowShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-b! from-fuchsia-50/50 via-white to-pink-50/30">
      <GlowBlob full={full} className="top-[-5%] left-[25%]" color="bg-fuchsia-300" size="300px" smallSize="80px" />
      <GlowBlob full={full} className="bottom-[10%] right-[10%]" color="bg-pink-200" size="200px" smallSize="50px" />

      {/* Large arch shape */}
      <ShapeMotion
        initial={{ y: "-100%" }}
        whileInView={{ y: "0%" }}
        transition={{ duration: 0.7, ease: "circOut" }}
        className="absolute bg-linear-to-b from-fuchsia-400 to-pink-500 overflow-hidden z-0"
        style={{ width: "55%", height: "80%", top: 0, left: "22.5%", borderRadius: "0 0 50% 50%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
        <div className="absolute inset-0 bg-linear-to-t from-fuchsia-600/20 to-transparent" />
      </ShapeMotion>

      {/* Outline arch echo */}
      <ShapeMotion
        initial={{ y: "-80%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "circOut" }}
        className="absolute border-[3px] border-fuchsia-300 z-0"
        style={{ width: "62%", height: "85%", top: "-3%", left: "19%", borderRadius: "0 0 50% 50%" }}
      />

      <FloatingBadge full={full} icon="💜" label="Trendy" sub="Style" className={full ? "top-[10%] right-[8%]" : "top-[8%] right-[5%]"} delay={0.5} bgColor="bg-fuchsia-100" />
      <Ring full={full} size="70px" smallSize="18px" className="bottom-[10%] left-[8%]" color="border-pink-300/30" delay={0.6} />
      <Dots full={full} className={full ? "bottom-[8%] right-[8%]" : "bottom-[6%] right-[5%]"} count={6} color="bg-fuchsia-300/40" />

      {/* Text — bottom center */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-[6%] z-20">
        <TextBlock className="text-center" align="center" />
      </div>
    </Box>
  );
};

/** 20. השקיעה — THE SUNSET — warm gradient sky with silhouette feel */
export const SunsetShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-b! from-orange-100 via-rose-200/60 to-violet-300/40">
      {/* Sun glow */}
      <div className="absolute rounded-full bg-amber-300" style={{ width: full ? "250px" : "65px", height: full ? "250px" : "65px", top: "8%", left: "25%", filter: full ? "blur(50px)" : "blur(16px)", opacity: 0.35 }} />

      {/* Horizon line */}
      <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8 }} className="absolute left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-amber-400/50 to-transparent" style={{ bottom: "35%" }} />

      {/* Person — right side */}
      <ShapeMotion
        initial={{ y: "15%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "circOut" }}
        className="absolute bottom-0 z-10 overflow-hidden"
        style={{ right: full ? "8%" : "5%", width: full ? "38%" : "36%", height: "92%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" style={{ filter: "drop-shadow(0 6px 25px rgba(0,0,0,0.15))" }} />
      </ShapeMotion>

      {/* Warm floating badges */}
      <FloatingBadge full={full} icon="🌅" label="Golden" sub="Hour" className={full ? "top-[12%] right-[12%]" : "top-[10%] right-[8%]"} delay={0.5} bgColor="bg-orange-100" />
      <Dots full={full} className={full ? "bottom-[40%] right-[50%]" : "bottom-[38%] right-[45%]"} count={6} color="bg-amber-400/30" />
      <Ring full={full} size="90px" smallSize="24px" className="top-[20%] left-[8%]" color="border-amber-300/25" delay={0.6} />

      {/* Text — left side */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10" style={{ width: full ? "48%" : "50%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" />
      </div>
    </Box>
  );
};

/** 21. הצל — THE SHADOW — dramatic dark charcoal with accent color pop */
export const ShadowShape: React.FC = () => {
  const full = useContext(FullScreenCtx);
  return (
    <Box className="bg-linear-to-br! from-slate-800 via-gray-900 to-slate-950">
      {/* Subtle warm accent glow */}
      <div className="absolute rounded-full bg-amber-500" style={{ width: full ? "300px" : "75px", height: full ? "300px" : "75px", bottom: "-10%", right: "20%", filter: full ? "blur(80px)" : "blur(25px)", opacity: 0.12 }} />

      {/* Accent stripe */}
      <ShapeMotion initial={{ height: "0%" }} whileInView={{ height: "100%" }} transition={{ duration: 0.7 }} className="absolute left-[45%] top-0 w-[2px] bg-linear-to-b from-amber-400/60 via-amber-500/30 to-transparent origin-top" />

      {/* Person — left side with dramatic lighting */}
      <ShapeMotion
        initial={{ x: "-20%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "circOut" }}
        className="absolute top-[5%] bottom-[5%] left-[5%] overflow-hidden rounded-2xl z-10"
        style={{ width: full ? "40%" : "38%" }}
      >
        <img src={portraitImage} alt="" className="w-full h-full object-cover object-[center_15%]" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-slate-900/30" />
      </ShapeMotion>

      {/* Elegant thin line decorations */}
      <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="absolute h-px bg-amber-400/30 origin-left" style={{ width: full ? "100px" : "28px", top: full ? "25%" : "22%", right: full ? "10%" : "8%" }} />
      <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="absolute h-px bg-amber-400/20 origin-left" style={{ width: full ? "60px" : "16px", top: full ? "28%" : "25%", right: full ? "10%" : "8%" }} />

      {/* Floating amber badge */}
      <ShapeMotion initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring" }} className="absolute z-20 bg-white/8 backdrop-blur-md border border-amber-400/20 rounded-xl" style={{ padding: full ? "10px 16px" : "3px 6px", top: full ? "15%" : "12%", right: full ? "8%" : "6%" }}>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: full ? "14px" : "6px" }}>✦</span>
          <span className={`${full ? "text-xs font-semibold" : "text-[5px] font-semibold"} text-amber-300`}>Elite Design</span>
        </div>
      </ShapeMotion>

      {/* Text — right side, light for dark bg */}
      <div className="absolute inset-y-0 right-0 flex items-center z-10" style={{ width: full ? "48%" : "48%", padding: full ? "8%" : "6%" }}>
        <TextBlock className="text-right w-full" align="right" light />
      </div>
    </Box>
  );
};

/* ════════════════════════════════════════════════════════════ */

export const shapeMap: Record<string, React.FC> = {
  cube: CubeShape,
  ball: BallShape,
  frame: FrameShape,
  grid: GridShape,
  thirds: ThirdsShape,
  corner: CornerShape,
  zigzag: ZigzagShape,
  mosaic: MosaicShape,
  spiral: SpiralShape,
  steps: StepsShape,
  spotlight: SpotlightShape,
  stage: StageShape,
  hero: HeroShape,
  neon: NeonShape,
  canvas: CanvasShape,
  mirror: MirrorShape,
  pearl: PearlShape,
  lightning: LightningShape,
  rainbow: RainbowShape,
  sunset: SunsetShape,
  shadow: ShadowShape,
};
