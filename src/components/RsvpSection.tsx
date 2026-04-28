"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import { fadeUpVariants, getEnterDistance, motionTokens } from "@/lib/motion";
import { SacredUnityCross } from "@/components/CatholicOrnaments";

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold mx-auto"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function RsvpSection() {
  const prefersReducedMotion = useReducedMotion();
  const enterDistance = getEnterDistance(Boolean(prefersReducedMotion), true);

  const [formData, setFormData] = useState({
    name: "",
    attending: true,
    guests: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const triggerConfetti = () => {
    const isSmallDevice = window.matchMedia("(max-width: 768px)").matches;
    confetti({
      particleCount: isSmallDevice ? 80 : 150,
      spread: isSmallDevice ? 55 : 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#fdfbf7", "#2c3e50"],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { supabase, isSupabaseConfigured } = await import("@/lib/supabase");
      if (!isSupabaseConfigured) {
        throw new Error("Thiếu cấu hình Supabase. Vui lòng cấu hình biến môi trường.");
      }

      const { error } = await supabase.from("rsvp").insert([
        {
          name: formData.name,
          attending: formData.attending,
          guests: formData.attending ? formData.guests : 0,
          message: formData.message || null,
        },
      ]);

      if (error) throw error;
      setSubmitted(true);
      triggerConfetti();
    } catch (err: unknown) {
      console.error("RSVP submission error:", err);
      const message =
        err instanceof Error ? err.message : "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="section-padding text-center relative overflow-hidden section-bg-nenphu section-bg-nenmobile"
    >
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              variants={fadeUpVariants(enterDistance)}
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.base }}
            >
              <SacredUnityCross size={40} className="text-gold mx-auto mb-6" />
              <h2 className="font-serif text-navy text-3xl md:text-5xl font-normal tracking-[0.08em] md:tracking-wider mb-3 uppercase">
                Xác Nhận Tham Dự
              </h2>
              <div className="divider-gold" />
              <p className="font-serif text-sm md:text-base italic mt-5 md:mt-6 mb-9 md:mb-12 max-w-md mx-auto leading-relaxed opacity-90">
                &ldquo;Hãy cùng chúng tôi ghi lại khoảnh khắc đẹp nhất trong đời, 
                nơi hai tâm hồn trở nên một trước mặt Chúa.&rdquo;
              </p>

              {/* RSVP Card */}
              <div className="rsvp-card rounded-sm shadow-xl p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 text-left">
                  {/* Name */}
                  <div className="group">
                    <label
                      htmlFor="rsvp-name"
                      className="block text-[10px] text-gold-muted tracking-[0.2em] uppercase mb-3 font-bold group-focus-within:text-gold transition-colors"
                    >
                      Quý danh của bạn
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-4 text-base border-b border-gold-pale/50 focus:border-gold transition-all bg-transparent font-serif italic"
                      placeholder="Nhập tên của bạn..."
                    />
                  </div>

                  {/* Attending radio */}
                  <div className="space-y-4">
                    <p className="text-[10px] text-gold-muted tracking-[0.2em] uppercase font-bold">
                      Bạn sẽ tham dự?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, attending: true })
                        }
                        className={`radio-option py-4 rounded-sm border ${
                          formData.attending 
                            ? "bg-[#8a1827]/5 border-[#8a1827]" 
                            : "border-border-light/30"
                        } transition-all`}
                      >
                        <span className="radio-dot">
                          <span className={`${formData.attending ? "radio-dot-inner scale-100" : "scale-0"} transition-transform`} />
                        </span>
                        <span className={`font-serif text-sm ${formData.attending ? "text-navy font-medium" : "text-charcoal-light"}`}>
                          Chắc chắn tham dự
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, attending: false })
                        }
                        className={`radio-option py-4 rounded-sm border ${
                          !formData.attending 
                            ? "bg-[#8a1827]/5 border-[#8a1827]" 
                            : "border-border-light/30"
                        } transition-all`}
                      >
                        <span className="radio-dot">
                          <span className={`${!formData.attending ? "radio-dot-inner scale-100" : "scale-0"} transition-transform`} />
                        </span>
                        <span className={`font-serif text-sm ${!formData.attending ? "text-navy font-medium" : "text-charcoal-light"}`}>
                          Rất tiếc vắng mặt
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Number of guests — only show if attending */}
                  <AnimatePresence>
                    {formData.attending && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label
                          htmlFor="rsvp-guests"
                          className="block text-[10px] text-gold-muted tracking-[0.2em] uppercase mb-3 font-bold"
                        >
                          Số người đi cùng
                        </label>
                        <select
                          id="rsvp-guests"
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              guests: Number(e.target.value),
                            })
                          }
                          className="w-full px-4 py-4 text-base border border-gold-pale/30 rounded-sm focus:border-gold outline-none font-serif bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} người {n > 1 ? "(bao gồm cả bạn)" : ""}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="rsvp-message"
                      className="block text-[10px] text-gold-muted tracking-[0.2em] uppercase mb-3 font-bold"
                    >
                      Lời chúc & Ghi chú
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-4 text-base border border-gold-pale/30 rounded-sm focus:border-gold outline-none resize-none font-serif italic"
                      placeholder="Gửi lời chúc thân thương đến chúng mình..."
                    />
                  </div>

                  {/* Submit */}
                  <div className="text-center pt-6">
                    {submitError ? (
                      <p className="mb-4 text-xs text-[#8a1827] tracking-wide">{submitError}</p>
                    ) : null}
                    <motion.button
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto px-12 py-4 shadow-lg disabled:opacity-50"
                    >
                      <HeartIcon className={isSubmitting ? "animate-pulse" : ""} />
                      {isSubmitting ? "ĐANG GỬI XÁC NHẬN..." : "GỬI XÁC NHẬN THAM DỰ"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto py-12"
            >
              <div className="rsvp-card text-center py-16 px-8 rounded-sm shadow-2xl border border-gold/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="mb-8"
                >
                  <CheckCircleIcon />
                </motion.div>
                <h2 className="font-serif text-navy text-3xl md:text-5xl font-normal tracking-wide mb-6">
                  Cảm ơn bạn!
                </h2>
                <div className="divider-gold mx-auto" />
                <p className="text-navy text-lg leading-relaxed mt-10 font-serif italic max-w-sm mx-auto">
                  Sự hiện diện của bạn là món quà quý giá nhất đối với chúng tôi.
                  Hẹn gặp bạn trong ngày trọng đại!
                </p>
                <motion.p 
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-gold mt-12 text-4xl"
                >
                  ♥
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

