import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Crown, CheckCircle } from "lucide-react";
import { type LayoutItem } from "../data";
import { shapeMap, FullScreenCtx } from "../shapes";

/* ─── Detail Page ──────────────────────────────────────── */
export default function DetailPage({
  item,
  onBack,
  onSelectTemplate,
  prefersReduced,
}: {
  item: LayoutItem;
  onBack: () => void;
  onSelectTemplate: (item: LayoutItem) => void;
  prefersReduced: boolean | null;
}) {
  const Shape = shapeMap[item.id];
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  /* Escape key to go back */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onBack]);

  return (
    <motion.div
      className="fixed inset-0 bg-white font-heebo"
      role="dialog"
      aria-label={`תצוגת תבנית: ${item.title}`}
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? {} : { opacity: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
    >
      {/* Shape — full bleed, with full-screen text scaling */}
      <FullScreenCtx.Provider value={true}>
        <motion.div
          className="w-full h-full"
          initial={prefersReduced ? {} : { scale: 1.02 }}
          animate={{ scale: 1 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {Shape && <Shape />}
        </motion.div>
      </FullScreenCtx.Provider>

      {/* Top bar with gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/30 to-transparent pointer-events-none z-5" />

      {/* Back button — luxury gold accent */}
      <motion.button
        onClick={onBack}
        className="absolute top-6 right-6 z-10 flex items-center gap-3 px-5 py-3 bg-surface/90 hover:bg-surface border border-primary/20 hover:border-primary/40 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-300 hover:gold-glow group"
        initial={prefersReduced ? {} : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReduced ? { duration: 0 } : { delay: 0.25, duration: 0.4 }
        }
        aria-label="חזרה לגלריה"
        title="חזרה (Esc)"
      >
        <ArrowRight size={16} className="text-primary group-hover:translate-x-0.5 transition-transform duration-200" />
        <span className="text-sm font-semibold text-text/80 group-hover:text-text transition-colors duration-200">
          חזרה
        </span>
      </motion.button>

      {/* Layout title badge */}
      <motion.div
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-surface/90 border border-border/50 rounded-xl backdrop-blur-md"
        initial={prefersReduced ? {} : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReduced ? { duration: 0 } : { delay: 0.35, duration: 0.4 }
        }
      >
        <Crown size={14} className="text-primary" />
        <span className="text-sm font-bold text-primary">{item.title}</span>
      </motion.div>

      {/* "I Want This Template" Floating Action Button */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <button
          onClick={() => onSelectTemplate(item)}
          onMouseEnter={() => setIsHoveringCTA(true)}
          onMouseLeave={() => setIsHoveringCTA(false)}
          className="relative px-8 py-4 bg-black/80 backdrop-blur-md text-primary border border-primary/40 rounded-full shadow-2xl flex items-center gap-3 overflow-hidden group hover:bg-black transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold tracking-wide uppercase">אני רוצה את התבנית הזו</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
