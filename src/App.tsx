import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { layouts, type LayoutItem } from "./data";
import { shapeMap } from "./shapes";

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
    <motion.div
      onClick={() => onSelect(item)}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200/60">
        <div className="aspect-4/3">
          {Shape && <Shape />}
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
      </div>
    </motion.div>
  );
}

/* ─── Gallery Page ─────────────────────────────────────── */
function GalleryPage({ onSelect }: { onSelect: (item: LayoutItem) => void }) {
  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-heebo flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main className="flex-1 flex items-start justify-center">
        <div className="max-w-6xl w-full px-6 py-10">
          {/* Page title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900">
              גלריית תבניות עיצוב
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              לחצו על תבנית כדי לצפות בה בגודל מלא
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {layouts.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
              >
                <GalleryCard item={item} onSelect={onSelect} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-slate-400">
        נבנה עם ❤️ עבור הלקוח &middot; גלריית תבניות עיצוב
      </footer>
    </motion.div>
  );
}

/* ─── Detail Page (full-screen shape) ──────────────────── */
function DetailPage({
  item,
  onBack,
}: {
  item: LayoutItem;
  onBack: () => void;
}) {
  const Shape = shapeMap[item.id];

  return (
    <motion.div
      className="fixed inset-0 bg-white font-heebo"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Shape fills the entire page */}
      <div className="w-full h-full">
        {Shape && <Shape />}
      </div>

      {/* Back button — top-right (RTL) */}
      <motion.button
        onClick={onBack}
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-slate-200/60 rounded-xl shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-200"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: 0.2 }}
        aria-label="חזרה"
      >
        <ArrowRight size={18} className="text-slate-600" />
      </motion.button>

    </motion.div>
  );
}

/* ─── App — hash-based routing ─────────────────────────── */
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
