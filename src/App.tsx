import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { layouts, type LayoutItem } from "./data";
import { shapeMap, FullScreenCtx } from "./shapes";

/* ─── Gallery Card ─────────────────────────────────────── */
function GalleryCard({
  item,
  onSelect,
}: {
  item: LayoutItem;
  onSelect: (item: LayoutItem) => void;
}) {
  const Shape = shapeMap[item.id];

  return (
    <div onClick={() => onSelect(item)} className="group cursor-pointer">
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-slate-300/80"
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div className="aspect-4/3">
          {Shape && <Shape />}
        </div>

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/3 transition-colors duration-300 pointer-events-none" />
      </motion.div>

      <p className="mt-3 text-center text-base font-semibold text-slate-700 group-hover:text-primary transition-colors duration-300">
        {item.title}
      </p>
    </div>
  );
}

/* ─── Stagger container variants ──────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

/* ─── Gallery Page ─────────────────────────────────────── */
function GalleryPage({
  onSelect,
}: {
  onSelect: (item: LayoutItem) => void;
}) {
  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-heebo flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-5xl w-full mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center tracking-tight"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          גלריית תבניות עיצוב
        </motion.h1>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {layouts.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <GalleryCard item={item} onSelect={onSelect} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Detail Page ──────────────────────────────────────── */
function DetailPage({
  item,
  onBack,
}: {
  item: LayoutItem;
  onBack: () => void;
}) {
  const Shape = shapeMap[item.id];

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Shape — full bleed, with full-screen text scaling */}
      <FullScreenCtx.Provider value={true}>
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {Shape && <Shape />}
        </motion.div>
      </FullScreenCtx.Provider>

      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-200"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        aria-label="חזרה"
        title="חזרה (Esc)"
      >
        <ArrowRight size={18} className="text-slate-600" />
      </motion.button>
    </motion.div>
  );
}

/* ─── App ──────────────────────────────────────────────── */
export default function App() {
  const [selected, setSelected] = useState<LayoutItem | null>(null);

  const getItemFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    return layouts.find((l) => l.id === hash) || null;
  }, []);

  useEffect(() => {
    setSelected(getItemFromHash());
    const onHashChange = () => setSelected(getItemFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [getItemFromHash]);

  const openDetail = (item: LayoutItem) => {
    window.location.hash = item.id;
  };

  const goBack = () => {
    window.location.hash = "";
  };

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <DetailPage key={selected.id} item={selected} onBack={goBack} />
      ) : (
        <GalleryPage key="gallery" onSelect={openDetail} />
      )}
    </AnimatePresence>
  );
}
