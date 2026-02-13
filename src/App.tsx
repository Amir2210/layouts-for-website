import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Crown } from "lucide-react";
import { layouts, type LayoutItem } from "./data";
import Particles from "./Particles";

// Components
import HeroSection from "./components/Hero";
import GallerySection from "./components/Gallery";
import ContactSection from "./components/Contact";
import DetailPage from "./components/DetailPage";

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

/* ─── Main Page (Hero + Gallery + Contact + Footer) ──────────────── */
function MainPage({
  onSelect,
  prefersReduced,
  initialScroll = 0,
  selectedTemplateForContact,
}: {
  onSelect: (item: LayoutItem) => void;
  prefersReduced: boolean | null;
  initialScroll?: number;
  selectedTemplateForContact: LayoutItem | null;
}) {
  useLayoutEffect(() => {
    if (initialScroll > 0) {
      window.scrollTo({ top: initialScroll, behavior: "instant" });
    }
  }, [initialScroll]);

  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.main
      className="min-h-screen bg-transparent font-heebo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.3 }}
    >
      <HeroSection prefersReduced={prefersReduced} onGetStarted={scrollToGallery} />
      <GallerySection onSelect={onSelect} prefersReduced={prefersReduced} />
      <ContactSection selectedTemplate={selectedTemplateForContact} prefersReduced={prefersReduced} />
      <LuxuryFooter />
    </motion.main>
  );
}

/* ─── App ──────────────────────────────────────────────── */
export default function App() {
  const [selected, setSelected] = useState<LayoutItem | null>(null);
  const [inquiryTemplate, setInquiryTemplate] = useState<LayoutItem | null>(null);
  const prefersReduced = useReducedMotion();

  // Ref to store the scroll position before navigating to detail view
  const scrollPositionRef = useRef(0);

  const getItemFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    return layouts.find((l) => l.id === hash) || null;
  }, []);

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const newItem = getItemFromHash();

    // If we are opening a detail item (newItem is present), save current scroll
    if (newItem && !selected) {
      scrollPositionRef.current = window.scrollY;
    }

    setSelected(newItem);

    const onHashChange = () => {
      const nextItem = getItemFromHash();

      // If navigating TO detail view
      if (nextItem && !selected) {
        scrollPositionRef.current = window.scrollY;
      }

      setSelected(nextItem);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [getItemFromHash, selected]);

  // Scroll to top when entering Detail Page
  useEffect(() => {
    if (selected) {
      window.scrollTo(0, 0);
    }
  }, [selected]);

  const openDetail = (item: LayoutItem) => {
    scrollPositionRef.current = window.scrollY;
    window.location.hash = item.id;
  };

  const goBack = () => {
    window.location.hash = "";
  };

  const handleSelectTemplateForInquiry = (item: LayoutItem) => {
    setInquiryTemplate(item);
    goBack();
    // Use timeout to allow view to switch back to main page before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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
            onSelectTemplate={handleSelectTemplateForInquiry}
            prefersReduced={prefersReduced}
          />
        ) : (
          <MainPage
            key="main"
            onSelect={openDetail}
            prefersReduced={prefersReduced}
            initialScroll={scrollPositionRef.current}
            selectedTemplateForContact={inquiryTemplate}
          />
        )}
      </AnimatePresence>
    </>
  );
}
