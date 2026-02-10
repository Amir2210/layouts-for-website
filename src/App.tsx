import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
  onSelect,
  prefersReduced,
}: {
  item: LayoutItem;
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
        className="relative bg-surface-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10"
        whileHover={prefersReduced ? {} : { y: -4, scale: 1.01 }}
        whileTap={prefersReduced ? {} : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div className="aspect-4/3">{Shape && <Shape />}</div>

        {/* Subtle gold overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />
      </motion.figure>

      <p className="mt-4 text-center text-lg font-semibold text-text-muted group-hover:text-primary transition-colors duration-300">
        {item.title}
      </p>
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

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Text overlay */}
        <div className="relative z-10 flex items-center justify-center h-full px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Premium badge */}
            <motion.div
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-primary/30 bg-black/40 backdrop-blur-sm mb-8 text-base"
              {...fadeUp(0.1)}
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-base font-medium text-primary tracking-wide">
                קולקציית פרימיום
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg"
              {...fadeUp(0.2)}
            >
              תבניות עיצוב
              <br />
              <span className="text-primary">ברמה אחרת</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-xl sm:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
              {...fadeUp(0.35)}
            >
              גלו אוסף מובחר של תבניות עיצוב מקצועיות — כל אחת מעוצבת בקפידה
              להעניק לאתר שלכם מראה יוקרתי ונקי.
            </motion.p>
          </div>
        </div>
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
      className="px-8 py-24 lg:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <header className="text-center mb-16">
          <h2
            id="gallery-heading"
            className="text-3xl sm:text-4xl font-bold text-text tracking-tight"
          >
            בחרו את התבנית שלכם
          </h2>
          <p className="mt-4 text-text-muted text-lg sm:text-xl">
            {layouts.length} תבניות מקצועיות מוכנות לשימוש
          </p>
          <div
            className="mt-8 mx-auto w-16 h-0.5 bg-primary/40 rounded-full"
            aria-hidden="true"
          />
        </header>

        {/* Layout grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={prefersReduced ? { hidden: {}, show: {} } : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {layouts.map((item) => (
            <motion.div
              key={item.id}
              variants={prefersReduced ? instantVariants : cardVariants}
            >
              <GalleryCard
                item={item}
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

/* ─── Main Page (Hero + Gallery) ───────────────────────── */
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

      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center bg-surface/80 hover:bg-surface border border-border rounded-2xl shadow-lg backdrop-blur-md transition-all duration-200"
        initial={prefersReduced ? {} : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReduced ? { duration: 0 } : { delay: 0.25, duration: 0.3 }
        }
        aria-label="חזרה לגלריה"
        title="חזרה (Esc)"
      >
        <ArrowRight size={18} className="text-text" />
      </motion.button>
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
