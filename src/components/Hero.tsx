import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, ChevronDown } from "lucide-react";

/* ─── Frame sequence ──────────────────────────────────── */
const frameModules = import.meta.glob<{ default: string }>(
  "../assets/ezgif-frame-*.jpg",
  { eager: true }
);

const frameSources = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default);

export default function HeroSection({
  prefersReduced,
  onGetStarted,
}: {
  prefersReduced: boolean | null;
  onGetStarted: () => void;
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
      style={{ height: "350vh" }}
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
              <span className="text-white">ברמה אחרת</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-xl sm:text-2xl text-white leading-relaxed max-w-2xl mx-auto"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
              {...fadeUp(0.35)}
            >
              גלו אוסף מובחר של תבניות עיצוב מקצועיות — כל אחת מעוצבת בקפידה
              להעניק לאתר שלכם מראה יוקרתי ונקי.
            </motion.p>

            {/* Button and Line */}
            <motion.div
              className="flex flex-col items-center gap-8 mt-10"
              {...fadeUp(0.45)}
            >
              <button
                onClick={onGetStarted}
                className="px-10 py-4 bg-primary text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(201,169,110,0.4)] hover:shadow-[0_0_35px_rgba(201,169,110,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                התחל עכשיו
              </button>
              <div className="w-24 divider-gold" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
          onClick={onGetStarted}
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
