import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Crown } from "lucide-react";
import { layouts, type LayoutItem } from "./data";
import { shapeMap, FullScreenCtx } from "./shapes";
import Particles from "./Particles";

/* ─── Frame sequence ──────────────────────────────────── */
const frameModules = import.meta.glob<{ default: string }>(
  "./assets/ezgif-frame-*.jpg",
  { eager: true }
);
const frameSources = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default);

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

/* ─── Hero Section (scroll-driven frame sequence) ─────── */
function HeroSection({
  prefersReduced,
}: {
  prefersReduced: boolean | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);
  const [ready, setReady] = useState(false);

  /* Preload every frame into Image objects */
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    const load = async () => {
      await Promise.all(
        frameSources.map(
          (src, i) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                imgs[i] = img;
                resolve();
              };
              img.onerror = () => resolve();
            })
        )
      );
      if (!cancelled) {
        imagesRef.current = imgs;
        setReady(true);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Draw the correct frame based on scroll position */
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFrames = imagesRef.current.length;

    const drawFrame = (index: number) => {
      if (index === lastFrameRef.current) return;
      lastFrameRef.current = index;
      const img = imagesRef.current[index];
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* cover-fit the image */
      const scale = Math.max(w / img.width, h / img.height);
      const iw = img.width * scale;
      const ih = img.height * scale;
      ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const frameIdx = Math.min(
        Math.floor(progress * totalFrames),
        totalFrames - 1
      );
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIdx));
    };

    drawFrame(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  const fadeUp = (delay: number) =>
    prefersReduced
      ? { initial: {}, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "500vh" }}
      aria-labelledby="hero-heading"
    >
      <div className="sticky top-0 h-screen w-full">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

        {/* Gold vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,20,0.7) 100%)",
          }}
        />

        {/* Text overlay */}
        <div className="relative z-10 flex items-center justify-center h-full px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Premium badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-black/50 backdrop-blur-md mb-8 gold-glow"
              {...fadeUp(0.1)}
            >
              <Crown size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary tracking-widest uppercase">
                קולקציית פרימיום
              </span>
              <Sparkles size={14} className="text-primary/60" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
              {...fadeUp(0.2)}
            >
              תבניות עיצוב
              <br />
              <span className="text-gold-gradient">ברמה אחרת</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-xl sm:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
              {...fadeUp(0.35)}
            >
              גלו אוסף מובחר של תבניות עיצוב מקצועיות — כל אחת מעוצבת בקפידה
              להעניק לאתר שלכם מראה יוקרתי ונקי.
            </motion.p>

            {/* Decorative gold line */}
            <motion.div
              className="mt-10 mx-auto w-24 divider-gold"
              {...fadeUp(0.45)}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 1, duration: 0.8 }}
        >
          <span className="text-xs font-medium text-white/40 tracking-widest uppercase">
            גלול למטה
          </span>
          <ChevronDown size={20} className="text-primary/60 animate-bounce-slow" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Gallery Section ──────────────────────────────────── */
function GallerySection({
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

/* ─── Footer ──────────────────────────────────────────── */
function LuxuryFooter() {
  return (
    <footer className="relative px-8 pt-20 pb-12" aria-label="Footer">
      {/* Top divider */}
      <div className="max-w-6xl mx-auto">
        <div className="divider-gold mb-12" />

        <div className="flex flex-col items-center gap-6 text-center">
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <Crown size={20} className="text-primary" />
            <span className="text-xl font-extrabold text-gold-gradient tracking-wide">
              Layout Gallery
            </span>
          </div>

          {/* Tagline */}
          <p className="text-text-subtle text-sm max-w-md leading-relaxed">
            אוסף מובחר של תבניות עיצוב מקצועיות — מעוצב בקפידה עם דגש על יוקרה,
            פשטות ואלגנטיות.
          </p>

          {/* Decorative dots */}
          <div className="flex items-center gap-2 my-4" aria-hidden="true">
            <div className="w-1 h-1 rounded-full bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="w-1 h-1 rounded-full bg-primary/30" />
          </div>

          {/* Copyright */}
          <p className="text-text-subtle/60 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} — כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page (Hero + Gallery + Footer) ──────────────── */
function MainPage({
  onSelect,
  prefersReduced,
}: {
  onSelect: (item: LayoutItem) => void;
  prefersReduced: boolean | null;
}) {
  return (
    <motion.main
      className="min-h-screen bg-transparent font-heebo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.3 }}
    >
      <HeroSection prefersReduced={prefersReduced} />
      <GallerySection onSelect={onSelect} prefersReduced={prefersReduced} />
      <LuxuryFooter />
    </motion.main>
  );
}

/* ─── Detail Page ──────────────────────────────────────── */
function DetailPage({
  item,
  onBack,
  prefersReduced,
}: {
  item: LayoutItem;
  onBack: () => void;
  prefersReduced: boolean | null;
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
    </motion.div>
  );
}

/* ─── App ──────────────────────────────────────────────── */
export default function App() {
  const [selected, setSelected] = useState<LayoutItem | null>(null);
  const prefersReduced = useReducedMotion();

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
    <>
      {/* Particles background — gold-toned for luxury feel */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <Particles
          particleColors={["#C9A96E", "#D8BC86", "#A88B52"]}
          particleCount={150}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
          <DetailPage
            key={selected.id}
            item={selected}
            onBack={goBack}
            prefersReduced={prefersReduced}
          />
        ) : (
          <MainPage
            key="main"
            onSelect={openDetail}
            prefersReduced={prefersReduced}
          />
        )}
      </AnimatePresence>
    </>
  );
}
