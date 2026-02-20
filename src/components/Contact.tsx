import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ─── Contact Section ──────────────────────────────────── */
export default function ContactSection({
  prefersReduced,
}: {
  prefersReduced: boolean | null;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!GOOGLE_SHEETS_URL) {
      console.error("Missing VITE_GOOGLE_SHEETS_URL env variable");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" }),
    };

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative px-8 py-24 bg-surface-card"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-surface/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border shadow-2xl"
        >
          <header className="text-center mb-10">
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-extrabold text-gold-gradient mb-4">
              צור קשר
            </h2>
            <p className="text-text-muted">
              השאירו פרטים ונחזור אליכם בהקדם עם הצעה מותאמת אישית.
            </p>
          </header>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <fieldset disabled={status === "loading"} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-text-muted">שם מלא</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-text disabled:opacity-50"
                    placeholder="ישראל ישראלי"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-text-muted">אימייל</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-text disabled:opacity-50"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-text-muted">הודעה</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-text resize-none disabled:opacity-50"
                  placeholder="תוכן ההודעה..."
                />
              </div>

              <motion.button
                whileHover={status === "loading" ? {} : { scale: 1.02 }}
                whileTap={status === "loading" ? {} : { scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-primary text-black font-bold text-lg rounded-xl shadow-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>שולח...</span>
                  </>
                ) : (
                  <>
                    <span>שלח פנייה</span>
                    <ArrowLeft size={20} />
                  </>
                )}
              </motion.button>
            </fieldset>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
                  className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/30"
                  role="alert"
                >
                  <CheckCircle size={20} className="text-green-400 shrink-0" />
                  <span className="text-sm text-green-300 font-medium">
                    תודה על פנייתך! נחזור אליך בהקדם.
                  </span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 rounded-lg border border-red-500/30"
                  role="alert"
                >
                  <AlertCircle size={20} className="text-red-400 shrink-0" />
                  <span className="text-sm text-red-300 font-medium">
                    אירעה שגיאה בשליחה. אנא נסו שוב מאוחר יותר.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
