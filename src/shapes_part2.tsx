import React, { useContext } from "react";
import { FullScreenCtx, ShapeMotion, Box, TextBlock } from "./shapes";

/* 41. Radar */
export const RadarShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-[10%] rounded-full border-2 border-primary/50" />
    <ShapeMotion initial={{ rotate: 0 }} whileInView={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full border-t-2 border-r-2 border-transparent border-t-primary/80 bg-gradient-to-tr from-transparent to-primary/20" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 42. Prism */
export const PrismShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-green-500/20 to-blue-500/20 mix-blend-overlay" />
    <ShapeMotion initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: 0.8 }} className="absolute top-[20%] left-[20%] w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent border-b-primary/40" />
    <div className="absolute inset-0 flex items-end p-[10%]"><TextBlock className="text-right" /></div>
  </Box>
);

/* 43. Target */
export const TargetShape: React.FC = () => (
  <Box>
    {[100, 80, 60, 40, 20].map((size, i) => (
      <ShapeMotion key={size} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.1 }} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${i % 2 === 0 ? "border-primary bg-primary/10" : "border-primary/50 bg-white"}`} style={{ width: `${size}%`, height: `${size}%` }} />
    ))}
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 44. Stream */
export const StreamShape: React.FC = () => (
  <Box>
    {[0, 1, 2, 3].map((i) => (
      <ShapeMotion key={i} initial={{ x: "-100%" }} whileInView={{ x: "0%" }} transition={{ duration: 1 + i * 0.2, repeat: Infinity, ease: "linear" }} className="absolute h-[25%] bg-primary/20" style={{ top: `${i * 25}%`, width: "200%", left: i % 2 === 0 ? "-100%" : "0" }} />
    ))}
    <div className="absolute inset-0 flex items-center p-[10%]"><TextBlock /></div>
  </Box>
);

/* 45. Cavern */
export const CavernShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: "-100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.8 }} className="absolute top-0 left-0 right-0 h-[40%] bg-primary skew-y-6 origin-top-left" />
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.8 }} className="absolute bottom-0 left-0 right-0 h-[40%] bg-primary/50 -skew-y-6 origin-bottom-right" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 46. Ladder */
export const LadderShape: React.FC = () => (
  <Box>
    <div className="absolute inset-y-0 left-[20%] w-2 bg-primary/30" />
    <div className="absolute inset-y-0 right-[20%] w-2 bg-primary/30" />
    {[10, 30, 50, 70, 90].map((top, i) => (
      <ShapeMotion key={top} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: i * 0.1 }} className="absolute left-[20%] right-[20%] h-2 bg-primary" style={{ top: `${top}%` }} />
    ))}
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center bg-white/80 p-4 rounded" align="center" /></div>
  </Box>
);

/* 47. Circuit */
export const CircuitShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} className="absolute inset-0 stroke-primary stroke-2 fill-none">
      <svg className="w-full h-full"><path d="M10,10 H90 V90 H10 Z M50,10 V90 M10,50 H90" /></svg>
    </ShapeMotion>
    {[20, 50, 80].map((p, i) => <div key={i} className="absolute w-3 h-3 bg-primary rounded-full" style={{ top: `${p}%`, left: `${p}%` }} />)}
    <div className="absolute inset-0 flex items-end p-[10%]"><TextBlock className="text-right" /></div>
  </Box>
);

/* 48. Mesh */
export const MeshShape: React.FC = () => (
  <Box>
    <div className="grid grid-cols-6 grid-rows-6 w-full h-full gap-1 p-2">
      {Array.from({ length: 36 }).map((_, i) => (
        <ShapeMotion key={i} initial={{ opacity: 0 }} whileInView={{ opacity: Math.random() }} transition={{ duration: 1 }} className="bg-primary rounded-full" />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center bg-white/80 p-2" align="center" /></div>
  </Box>
);

/* 49. Void */
export const VoidShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 1.5 }} whileInView={{ scale: 1 }} className="absolute inset-0 bg-primary" />
    <div className="absolute inset-[20%] bg-white rounded-full flex items-center justify-center shadow-inner">
      <TextBlock className="text-center text-primary" align="center" />
    </div>
  </Box>
);

/* 50. Spot */
export const SpotShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 51. Stripe */
export const StripeShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 0.8 }} className="absolute top-[40%] height-[20%] left-0 right-0 bg-primary h-[20%]" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-white text-center" align="center" light /></div>
  </Box>
);

/* 52. Checkers */
export const CheckersShape: React.FC = () => (
  <Box>
    <div className="grid grid-cols-4 grid-rows-4 w-full h-full">
      {Array.from({ length: 16 }).map((_, i) => (
        <ShapeMotion key={i} initial={{ opacity: 0 }} whileInView={{ opacity: (Math.floor(i / 4) + i) % 2 === 0 ? 0.2 : 0 }} className="bg-primary" />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 53. Clock */
export const ClockShape: React.FC = () => (
  <Box>
    <div className="absolute inset-[10%] border-4 border-primary/20 rounded-full" />
    <ShapeMotion initial={{ rotate: 0 }} whileInView={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 w-[2px] h-[35%] bg-primary origin-bottom -translate-x-1/2 -translate-y-full" />
    <ShapeMotion initial={{ rotate: 0 }} whileInView={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 w-[4px] h-[25%] bg-primary/60 origin-bottom -translate-x-1/2 -translate-y-full" />
    <div className="absolute inset-0 flex items-end p-4"><TextBlock className="text-center w-full" align="center" /></div>
  </Box>
);

/* 54. Fan */
export const FanShape: React.FC = () => (
  <Box>
    <ShapeMotion animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-[20%]">
      {[0, 120, 240].map((deg) => (
        <div key={deg} className="absolute top-1/2 left-1/2 w-[50%] h-[20%] bg-primary/30 rounded-full -translate-y-1/2 origin-left" style={{ transform: `rotate(${deg}deg) translateY(-50%)` }} />
      ))}
    </ShapeMotion>
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 55. Door */
export const DoorShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} className="absolute top-[15%] bottom-0 left-[25%] right-[25%] bg-primary/20 border-t-8 border-x-8 border-primary/40 origin-bottom" />
    <div className="absolute inset-0 flex items-center justify-center pt-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 56. Scroll */
export const ScrollShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ height: "0%" }} whileInView={{ height: "80%" }} transition={{ duration: 1 }} className="absolute top-[10%] left-[15%] right-[15%] bg-primary/10 border-x-4 border-primary/30" />
    <ShapeMotion initial={{ y: -20 }} whileInView={{ y: 0 }} className="absolute top-[5%] left-[10%] right-[10%] h-8 bg-primary rounded-full" />
    <ShapeMotion initial={{ y: 20 }} whileInView={{ y: 0 }} className="absolute bottom-[5%] left-[10%] right-[10%] h-8 bg-primary rounded-full transition-all duration-1000" style={{ top: "auto" }} />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center max-w-[60%]" align="center" /></div>
  </Box>
);

/* 57. Island */
export const IslandShape: React.FC = () => (
  <Box>
    <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-blue-100/50" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[30%] bg-amber-200/50 rounded-full" />
    <ShapeMotion initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-4 h-16 bg-primary" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-20 h-20 bg-green-400/30 rounded-full -translate-y-full" />
    <div className="absolute inset-0 flex items-start p-[10%]"><TextBlock /></div>
  </Box>
);

/* 58. Cloud */
export const CloudShape: React.FC = () => (
  <Box className="bg-sky-50">
    <ShapeMotion initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="absolute top-[20%] right-[10%] w-24 h-12 bg-white rounded-full shadow-sm" />
    <ShapeMotion initial={{ x: -30 }} whileInView={{ x: 0 }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} className="absolute top-[40%] left-[10%] w-32 h-16 bg-white rounded-full shadow-sm" />
    <div className="absolute inset-0 flex items-end justify-center pb-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 59. Forest */
export const ForestShape: React.FC = () => (
  <Box>
    {[-20, 0, 20, 40].map((x, i) => (
      <ShapeMotion key={i} initial={{ height: 0 }} whileInView={{ height: `${40 + i * 10}%` }} transition={{ delay: i * 0.1 }} className="absolute bottom-0 w-8 bg-primary/60 rounded-t-full" style={{ left: `${20 + x + i * 15}%` }} />
    ))}
    <div className="absolute inset-0 flex items-start justify-center pt-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 60. Mountain */
export const MountainShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "40%" }} className="absolute inset-0 bg-primary/20" style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }} />
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "60%" }} transition={{ delay: 0.1 }} className="absolute inset-0 bg-primary/40" style={{ clipPath: "polygon(20% 100%, 70% 20%, 100% 100%)" }} />
    <div className="absolute inset-0 flex items-start justify-end p-[5%]"><TextBlock className="text-right" /></div>
  </Box>
);

/* 61. Valley */
export const ValleyShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ x: "-100%" }} whileInView={{ x: "0%" }} className="absolute top-0 bottom-0 left-0 w-[50%] bg-primary/30" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
    <ShapeMotion initial={{ x: "100%" }} whileInView={{ x: "0%" }} className="absolute top-0 bottom-0 right-0 w-[50%] bg-primary/30" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
    <div className="absolute inset-0 flex items-start justify-center pt-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 62. Sunrise */
export const SunriseShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-primary rounded-t-full" />
    {[0, 45, 90, 135, 180].map((deg) => (
      <ShapeMotion key={deg} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="absolute bottom-0 left-1/2 w-1 h-[50%] bg-primary/20 origin-bottom" style={{ transform: `translateX(-50%) rotate(${deg - 90}deg)` }} />
    ))}
    <div className="absolute inset-0 flex items-center justify-center pb-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 63. Sunset */
export const SunsetShape: React.FC = () => (
  <Box className="bg-orange-50">
    <ShapeMotion initial={{ y: "-100%" }} whileInView={{ y: "0%" }} transition={{ duration: 1.5 }} className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[50%] h-[25%] bg-primary/80 rounded-t-full" />
    <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-primary/40" />
    <div className="absolute inset-0 flex items-end justify-center pb-[10%]"><TextBlock className="text-center" align="center" light /></div>
  </Box>
);

/* 64. Star */
export const StarShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-primary" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
    <div className="absolute inset-0 flex items-end justify-center pb-[5%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 65. Shield */
export const ShieldShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute top-[10%] left-[25%] right-[25%] bottom-[10%] bg-primary/20 rounded-b-full border-4 border-primary" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[25%] left-[35%] right-[35%] bottom-[25%] bg-primary/40 rounded-b-full" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 66. Banner */
export const BannerShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} className="absolute top-[20%] left-[10%] right-[10%] h-[20%] bg-primary" />
    <ShapeMotion initial={{ y: -10 }} whileInView={{ y: 0 }} className="absolute top-[20%] left-[10%] w-4 h-[60%] bg-primary/50" />
    <div className="absolute top-[20%] left-[10%] right-[10%] h-[20%] flex items-center justify-center"><span className="text-white font-bold text-xl uppercase tracking-widest">Layouts</span></div>
    <div className="absolute inset-0 flex items-center justify-center pt-[30%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 67. Arrow */
export const ArrowShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ x: "-100%" }} whileInView={{ x: "0%" }} className="absolute top-[40%] left-[10%] right-[30%] h-[20%] bg-primary/40" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute top-[20%] right-[10%] w-[20%] h-[60%] bg-primary" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }} />
    <div className="absolute inset-0 flex items-end justify-center pb-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 68. Plus */
export const PlusShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} className="absolute top-[45%] left-[20%] right-[20%] h-[10%] bg-primary" />
    <ShapeMotion initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} className="absolute top-[20%] bottom-[20%] left-[45%] right-[45%] bg-primary" />
    <div className="absolute inset-0 flex items-start justify-start p-[10%]"><TextBlock /></div>
  </Box>
);

/* 69. Minus */
export const MinusShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} className="absolute top-[45%] left-[20%] right-[20%] h-[10%] bg-primary" />
    <div className="absolute inset-0 flex items-end justify-center pb-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 70. Divide */
export const DivideShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} className="absolute top-[48%] left-[20%] right-[20%] h-[4%] bg-primary" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute top-[30%] left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
    <div className="absolute inset-0 flex items-center justify-end pr-[10%]"><TextBlock className="text-right" /></div>
  </Box>
);

/* 71. Equal */
export const EqualShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} className="absolute top-[40%] left-[20%] right-[20%] h-[5%] bg-primary" />
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.1 }} className="absolute top-[55%] left-[20%] right-[20%] h-[5%] bg-primary" />
    <div className="absolute inset-0 flex items-center justify-center pt-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 72. Percent */
export const PercentShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ rotate: 45, scale: 0 }} whileInView={{ rotate: 45, scale: 1 }} className="absolute top-[10%] bottom-[10%] left-[48%] w-[4%] bg-primary" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute top-[20%] left-[30%] w-8 h-8 border-4 border-primary rounded-full" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute bottom-[20%] right-[30%] w-8 h-8 border-4 border-primary rounded-full" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 73. Quote */
export const QuoteShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="absolute top-[20%] left-[20%] text-9xl text-primary/20 font-serif leading-none">“</ShapeMotion>
    <div className="absolute inset-0 flex items-center justify-center p-[20%]"><TextBlock className="text-center italic" align="center" /></div>
  </Box>
);

/* 74. Bracket */
export const BracketShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ x: -20 }} whileInView={{ x: 0 }} className="absolute top-[20%] bottom-[20%] left-[20%] w-8 border-l-4 border-t-4 border-b-4 border-primary/50" />
    <ShapeMotion initial={{ x: 20 }} whileInView={{ x: 0 }} className="absolute top-[20%] bottom-[20%] right-[20%] w-8 border-r-4 border-t-4 border-b-4 border-primary/50" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 75. Slash */
export const SlashShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleY: 0, rotate: 20 }} whileInView={{ scaleY: 1, rotate: 20 }} className="absolute top-0 bottom-0 left-1/2 w-[5%] bg-primary/30 origin-center" />
    <div className="absolute inset-0 flex items-center justify-between px-[10%]">
      <div className="w-[40%]"><TextBlock /></div>
      <div className="w-[40%]"><TextBlock align="left" /></div>
    </div>
  </Box>
);

/* 76. Hash */
export const HashShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} className="absolute top-[35%] left-[20%] right-[20%] h-[2%] bg-primary/40" />
    <ShapeMotion initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.1 }} className="absolute top-[65%] left-[20%] right-[20%] h-[2%] bg-primary/40" />
    <ShapeMotion initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} className="absolute top-[20%] bottom-[20%] left-[35%] w-[2%] bg-primary/40" />
    <ShapeMotion initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ delay: 0.1 }} className="absolute top-[20%] bottom-[20%] right-[35%] w-[2%] bg-primary/40" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 77. At */
export const AtShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} className="absolute inset-[15%] stroke-primary stroke-[3] fill-none">
      <svg className="w-full h-full"><path d="M50,50 m-20,0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0" /></svg>
    </ShapeMotion>
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 78. Ampersand */
export const AmpersandShape: React.FC = () => (
  <Box>
    <div className="absolute inset-0 flex items-center justify-center text-[150px] text-primary/10 font-serif font-bold">&</div>
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 79. Question */
export const QuestionShape: React.FC = () => (
  <Box>
    <div className="absolute inset-0 flex items-center justify-center text-[150px] text-primary/10 font-bold">?</div>
    <div className="absolute inset-0 flex items-end justify-center pb-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 80. Exclamation */
export const ExclamationShape: React.FC = () => (
  <Box>
    <div className="absolute inset-0 flex items-center justify-center text-[150px] text-primary/10 font-bold">!</div>
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 81. Drop */
export const DropShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[30%] h-[40%] bg-blue-400/30 rounded-t-full rounded-b-[40%]" />
    <div className="absolute inset-0 flex items-end justify-center pb-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 82. Leaf */
export const LeafShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-green-500/20 rounded-tr-[100px] rounded-bl-[100px]" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 83. Flower */
export const FlowerShape: React.FC = () => (
  <Box>
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <ShapeMotion key={deg} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.1 }} className="absolute top-1/2 left-1/2 w-[25%] h-[25%] bg-primary/20 rounded-full origin-center" style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-50%)` }} />
    ))}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] bg-primary rounded-full" />
    <div className="absolute inset-0 flex items-end justify-center pb-[5%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 84. Tree */
export const TreeShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "60%" }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 bg-amber-700/50" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-green-600/30 rounded-full" />
    <div className="absolute inset-0 flex items-center justify-center pt-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 85. Root */
export const RootShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "50%" }} className="absolute top-0 left-1/2 -translate-x-1/2 w-2 bg-amber-800/40" />
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "30%" }} transition={{ delay: 0.2 }} className="absolute top-[30%] left-1/2 w-1 bg-amber-800/40 rotate-45 origin-top" />
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "30%" }} transition={{ delay: 0.2 }} className="absolute top-[30%] left-1/2 w-1 bg-amber-800/40 -rotate-45 origin-top" />
    <div className="absolute inset-0 flex items-end justify-center pb-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 86. Seed */
export const SeedShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-900 rounded-full" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 87. Sprout */
export const SproutShape: React.FC = () => (
  <Box>
    <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-amber-100" />
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "30%" }} className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2 bg-green-500" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute bottom-[50%] left-1/2 w-6 h-6 bg-green-500 rounded-tr-xl rounded-bl-xl origin-bottom-left" />
    <div className="absolute inset-0 flex items-start justify-center pt-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 88. Bloom */
export const BloomShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1 }} className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] bg-gradient-to-t from-pink-300/30 to-purple-300/30 rounded-full blur-xl" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 89. Cactus */
export const CactusShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "60%" }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[15%] bg-green-600/50 rounded-t-full" />
    <ShapeMotion initial={{ width: 0 }} whileInView={{ width: "30%" }} transition={{ delay: 0.2 }} className="absolute bottom-[30%] left-[57%] h-[10%] bg-green-600/50 rounded-r-full" />
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "15%" }} transition={{ delay: 0.4 }} className="absolute bottom-[35%] left-[82%] w-[10%] bg-green-600/50 rounded-t-full" />
    <div className="absolute inset-0 flex items-start justify-center pt-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 90. Palm */
export const PalmShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ height: 0 }} whileInView={{ height: "70%" }} className="absolute bottom-0 right-[20%] w-[5%] bg-amber-700/60 -rotate-6 origin-bottom" />
    {[0, 45, 90, 135].map((deg) => (
      <ShapeMotion key={deg} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute top-[10%] right-[20%] w-[30%] h-[10%] bg-green-600/40 rounded-full origin-left" style={{ transform: `rotate(${deg - 45}deg)` }} />
    ))}
    <div className="absolute inset-0 flex items-end left-[10%] pb-[10%] w-[50%]"><TextBlock className="text-left" /></div>
  </Box>
);

/* 91. Ocean */
export const OceanShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: "20%" }} whileInView={{ y: "0%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="absolute bottom-[-10%] left-[-10%] right-[-10%] h-[40%] bg-blue-500/20 rounded-[50%]" />
    <ShapeMotion initial={{ y: "20%" }} whileInView={{ y: "0%" }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[-10%] left-[-10%] right-[-10%] h-[30%] bg-blue-600/20 rounded-[50%]" />
    <div className="absolute inset-0 flex items-start justify-center pt-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 92. River */
export const RiverShape: React.FC = () => (
  <Box>
    <svg className="absolute inset-0 w-full h-full stroke-blue-400/40 fill-none stroke-[20]">
      <ShapeMotion initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }}>
        <path d="M-10,20 Q50,50 110,80" />
      </ShapeMotion>
    </svg>
    <div className="absolute inset-0 flex items-start justify-end p-[10%]"><TextBlock className="text-right" /></div>
  </Box>
);

/* 93. Lake */
export const LakeShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} className="absolute bottom-[10%] left-[10%] right-[10%] h-[30%] bg-blue-300/20 rounded-[100%]" />
    <div className="absolute inset-0 flex items-start justify-center pt-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 94. Rain */
export const RainShape: React.FC = () => (
  <Box>
    {Array.from({ length: 20 }).map((_, i) => (
      <ShapeMotion key={i} initial={{ y: -50, opacity: 0 }} animate={{ y: 500, opacity: 1 }} transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "linear", delay: Math.random() }} className="absolute w-[2px] h-8 bg-blue-400/60" style={{ left: `${Math.random() * 100}%` }} />
    ))}
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 95. Snow */
export const SnowShape: React.FC = () => (
  <Box className="bg-slate-900">
    {Array.from({ length: 20 }).map((_, i) => (
      <ShapeMotion key={i} initial={{ y: -50 }} animate={{ y: 500 }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }} className="absolute w-2 h-2 bg-white rounded-full opacity-80" style={{ left: `${Math.random() * 100}%` }} />
    ))}
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" light /></div>
  </Box>
);

/* 96. Wind */
export const WindShape: React.FC = () => (
  <Box>
    {[10, 30, 50, 70].map((y, i) => (
      <ShapeMotion key={i} initial={{ x: "100%", opacity: 0 }} whileInView={{ x: "-100%", opacity: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }} className="absolute left-0 w-[50%] h-[2px] bg-slate-400/50" style={{ top: `${y}%` }} />
    ))}
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 97. Fire */
export const FireShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1.1, 0.9] }} transition={{ duration: 0.5, repeat: Infinity }} className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[30%] h-[40%] bg-orange-500/50 rounded-full blur-md" />
    <ShapeMotion initial={{ scale: 0.8 }} animate={{ scale: [0.9, 1.2, 0.8] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[20%] h-[30%] bg-red-500/50 rounded-full blur-md" />
    <div className="absolute inset-0 flex items-start justify-center pt-[20%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 98. Ice */
export const IceShape: React.FC = () => (
  <Box>
    <div className="absolute inset-0 bg-blue-50/50" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute top-[20%] left-[20%] w-[30%] h-[40%] bg-white/40 skew-x-12 backdrop-blur-sm border border-white" />
    <ShapeMotion initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-[20%] right-[20%] w-[40%] h-[30%] bg-white/30 -skew-x-12 backdrop-blur-sm border border-white" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 99. Earth */
export const EarthShape: React.FC = () => (
  <Box>
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "30%" }} className="absolute inset-0 bg-amber-900/20" />
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "50%" }} transition={{ delay: 0.1 }} className="absolute inset-0 bg-amber-800/30" />
    <ShapeMotion initial={{ y: "100%" }} whileInView={{ y: "70%" }} transition={{ delay: 0.2 }} className="absolute inset-0 bg-amber-700/40" />
    <div className="absolute inset-0 flex items-start justify-center pt-[10%]"><TextBlock className="text-center" align="center" /></div>
  </Box>
);

/* 100. Sky */
export const SkyShape: React.FC = () => (
  <Box className="bg-sky-100">
    <div className="absolute inset-0 bg-gradient-to-b from-blue-300/50 to-white" />
    <div className="absolute inset-0 flex items-center justify-center"><TextBlock className="text-center" align="center" /></div>
  </Box>
);
