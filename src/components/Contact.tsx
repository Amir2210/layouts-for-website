import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { type LayoutItem } from "../data";

/* ─── Contact Section ──────────────────────────────────── */
export default function ContactSection({
  selectedTemplate,
  prefersReduced,
}: {
  selectedTemplate: LayoutItem | null;
  prefersReduced: boolean | null;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Smooth scroll data handling
  useEffect(() => {
    if (selectedTemplate) {
      setFormData((prev) => ({
        ...prev,
        message: `שלום, אשמח לקבל פרטים נוספים על תבנית "${selectedTemplate.title}".`,
      }));
    }
  }, [selectedTemplate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here implies backend integration
    alert("תודה על פנייתך! נחזור אליך בהקדם.");
    // Reset form or redirect
    setFormData({ name: "", email: "", message: "" });
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-text-muted">שם מלא</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-text"
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
                  className="w-full px-4 py-3 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-text"
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
                className="w-full px-4 py-3 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-text resize-none"
                placeholder="תוכן ההודעה..."
              />
            </div>

            {selectedTemplate && (
              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">
                  מביע עניין בתבנית: <strong>{selectedTemplate.title}</strong>
                </span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-primary text-black font-bold text-lg rounded-xl shadow-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
            >
              <span>שלח פנייה</span>
              <ArrowLeft size={20} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
