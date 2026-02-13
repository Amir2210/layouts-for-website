import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { layouts, type LayoutItem } from "../data";
import { shapeMap } from "../shapes";

/* ─── Gallery Card ─────────────────────────────────────── */
function GalleryCard({
  item,
  index,
  onSelect,
  prefersReduced,
}: {
  item: LayoutItem;
  index: number;
  onSelect: (item: LayoutItem) => void;
  prefersReduced: boolean | null;
}) {
  const Shape = shapeMap[item.id];

  return (
    <article
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(item);
      }}
      className="group cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`תבנית: ${item.title}`}
    >
      <motion.figure
        className="relative bg-surface-card/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/60 transition-all duration-500 group-hover:border-primary/40 group-hover:gold-glow-strong"
        whileHover={prefersReduced ? {} : { y: -6, scale: 1.02 }}
        whileTap={prefersReduced ? {} : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {/* Card number badge */}
        <div className="absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-primary/20 text-xs font-bold text-primary/70 group-hover:text-primary group-hover:border-primary/40 transition-all duration-300">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="aspect-4/3">{Shape && <Shape />}</div>

        {/* Gold shimmer overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/8 group-hover:via-transparent group-hover:to-primary/4 transition-all duration-500 pointer-events-none" />

        {/* Bottom gradient for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.figure>

      {/* Card title with gold accent on hover */}
      <div className="mt-5 text-center">
        <p className="text-lg font-bold text-text-muted group-hover:text-primary transition-colors duration-300">
          {item.title}
        </p>
        <div className="mt-2 mx-auto w-0 group-hover:w-12 h-px bg-primary/50 transition-all duration-500" />
      </div>
    </article>
  );
}

/* ─── Animation variants ──────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 240, damping: 24 },
  },
};

const instantVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/* ─── Gallery Section ──────────────────────────────────── */
export default function GallerySection({
  onSelect,
  prefersReduced,
}: {
  onSelect: (item: LayoutItem) => void;
  prefersReduced: boolean | null;
}) {
  return (
    <section
      id="gallery"
      className="relative px-8 pt-32 pb-24 lg:pt-40 lg:pb-32"
      aria-labelledby="gallery-heading"
    >
      {/* Top gradient transition from hero black to surface */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header — luxury treatment */}
        <header className="text-center mb-20">
          {/* Decorative top accent */}
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <div className="w-12 divider-gold" />
            <Sparkles size={16} className="text-primary/50 animate-shimmer" />
            <div className="w-12 divider-gold" />
          </div>

          <h2
            id="gallery-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-text">בחרו את </span>
            <span className="text-gold-gradient">התבנית שלכם</span>
          </h2>

          <p className="mt-5 text-text-muted text-lg sm:text-xl">
            {layouts.length} תבניות מקצועיות מוכנות לשימוש
          </p>

          {/* Decorative bottom accent */}
          <div className="mt-8 mx-auto w-32 divider-gold" aria-hidden="true" />
        </header>

        {/* Layout grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={prefersReduced ? { hidden: {}, show: {} } : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {layouts.map((item, index) => (
            <motion.div
              key={item.id}
              variants={prefersReduced ? instantVariants : cardVariants}
            >
              <GalleryCard
                item={item}
                index={index}
                onSelect={onSelect}
                prefersReduced={prefersReduced}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
