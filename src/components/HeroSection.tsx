"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, getEnterDistance, motionTokens, staggerContainer } from "@/lib/motion";
import {
  SacredUnityCross,
  CrossDivider,
} from "@/components/CatholicOrnaments";
import { useReducedMotion } from "framer-motion";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const enterDistance = getEnterDistance(Boolean(prefersReducedMotion), true);

  return (
    <section
      id="hero"
      className="section-bg-hero relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Main container */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 w-full flex flex-col items-center justify-center h-full pt-24 md:pt-36 pb-16 md:pb-20">
        {/* Content */}
        <div className="hero-content-shell relative z-10 w-full">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            {/* Sacred Cross */}
            <motion.div variants={fadeUpVariants(enterDistance)}>
              <SacredUnityCross size={42} className="text-gold mx-auto mb-6" />
            </motion.div>

            {/* Sacrament label */}
            <motion.p
              variants={fadeUpVariants(enterDistance)}
              className="text-gold-muted text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mb-8 md:mb-10 font-bold"
            >
              Bí Tích Hôn Phối
            </motion.p>

            {/* Names of Couple */}
            <motion.div variants={fadeUpVariants(enterDistance)} className="mb-10 md:mb-12">
              <p className="hero-couple-names !font-script text-navy text-3xl md:text-5xl tracking-wide leading-tight flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4">
                <span className="whitespace-nowrap">Giuse Nguyễn Văn Thường</span>
                <motion.span
                  className="text-[#8a1827] font-serif italic text-2xl md:text-4xl my-1 md:my-0"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.14, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  &amp;
                </motion.span>
                <span className="whitespace-nowrap">Terexa Phạm Thị Nhàn</span>
              </p>
            </motion.div>

            {/* Decorative cross divider */}
            <motion.div variants={fadeUpVariants(enterDistance)}>
              <CrossDivider className="my-6 md:my-8 opacity-60 scale-75" />
            </motion.div>

            {/* Bible quote */}
            <motion.blockquote
              variants={fadeUpVariants(enterDistance)}
              className="font-serif text-sm md:text-xl italic leading-relaxed max-w-xl mx-auto mb-4 px-2 md:px-4"
            >
              &ldquo;Sự gì Thiên Chúa đã phối hợp, loài người không được phân
              ly.&rdquo;
            </motion.blockquote>
            <motion.p
              variants={fadeUpVariants(enterDistance)}
              className="text-gold-muted text-[10px] md:text-xs tracking-[0.18em] md:tracking-[0.25em] mb-10 md:mb-12 uppercase font-medium"
            >
              — Tin Mừng Mát-thêu 19, 6
            </motion.p>

            {/* Bottom text */}
            <motion.p
              variants={fadeUpVariants(enterDistance)}
              className="text-charcoal-light text-[10px] md:text-xs tracking-[0.16em] md:tracking-[0.25em] mt-6 md:mt-8 uppercase opacity-80 font-medium"
            >
              Trước sự chứng giám của Thiên Chúa và Hội Thánh
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: motionTokens.duration.slow * 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-muted opacity-40 cursor-pointer"
        onClick={() => document.getElementById("bi-tich")?.scrollIntoView({ behavior: "smooth" })}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}


