"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { fadeUpVariants, getEnterDistance, motionTokens, staggerContainer } from "@/lib/motion";
import {
  SacredUnityCross,
  OliveBranch,
} from "@/components/CatholicOrnaments";
import { WEDDING_CALENDAR_EVENTS } from "@/lib/wedding-calendar-events";
import { getGoogleCalendarUrl, getIcsUrl } from "@/lib/calendar-links";

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const CHURCH_MAP_URL =
  "https://www.google.com/maps/place/Nh%C3%A0+th%E1%BB%9D+Gi%C3%A1o+X%E1%BB%A9+Tr%E1%BA%A1i+L%C3%AA/@18.4178942,105.7732459,17z/data=!3m1!4b1!4m6!3m5!1s0x3139b356ae6af28f:0x747fb333ead9b7f7!8m2!3d18.4178891!4d105.7758262!16s%2Fg%2F11bwfm7191";

const CHURCH_CALENDAR_ICS_HREF = "/api/calendar/church";

export default function SacramentSection() {
  const prefersReducedMotion = useReducedMotion();
  const enterDistance = getEnterDistance(Boolean(prefersReducedMotion), true);

  return (
    <section
      id="bi-tich"
      className="section-padding relative overflow-hidden section-bg-nenphu section-bg-nenmobile"
    >
      {/* Background olive branches */}
      <div className="absolute left-0 bottom-0 opacity-[0.1]">
        <OliveBranch className="w-64 text-sage" />
      </div>
      <div className="absolute right-0 top-0 opacity-[0.1]">
        <OliveBranch flip className="w-64 text-sage" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto relative z-10 px-4"
      >
        {/* Title */}
        <motion.div 
          variants={fadeUpVariants(enterDistance)}
          className="text-center mb-10 md:mb-16"
        >
          <SacredUnityCross size={48} className="text-gold mx-auto mb-8" />
          <p className="!font-script text-gold text-3xl md:text-5xl mb-3 md:mb-4">
            Sacraméntum Matrimónii
          </p>
          <h2 className="font-serif text-navy text-3xl md:text-5xl font-normal tracking-[0.06em] md:tracking-wider mt-2 uppercase">
            Hiệp thông Thánh Lễ
          </h2>
          <div className="divider-gold mt-6" />
        </motion.div>

        {/* Combined Layout: Meaning + Event Details */}
        <motion.div
          variants={fadeUpVariants(enterDistance)}
          className="bg-transparent border border-border-light/40 shadow-[0_10px_40px_rgba(27,42,74,0.04)] grid grid-cols-1 md:grid-cols-2 overflow-hidden min-h-[550px] rounded-sm"
        >
          
          {/* Left: Event Details (The Church & Time) */}
          <motion.div 
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: motionTokens.duration.base, delay: 0.12 }}
            className="p-8 md:p-14 bg-transparent flex flex-col items-center text-center relative w-full h-full"
          >
            {/* Top Area */}
            <div className="flex flex-col items-center justify-center flex-1 w-full">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center"
              >
                <SacredUnityCross size={40} className="text-gold" />
              </motion.div>

              <h3 className="font-serif !text-gold text-3xl md:text-5xl font-medium px-2 tracking-wide uppercase">
                Giáo xứ Trại Lê
              </h3>
            </div>

            {/* Symmetrical Diamond Divider */}
            <div className="w-full flex items-center justify-center gap-3 md:gap-4 my-8 md:my-10">
              <div className="w-10 h-px bg-gold-muted/40"></div>
              <div className="w-2 h-2 bg-gold/50 rotate-45"></div>
              <div className="w-10 h-px bg-gold-muted/40"></div>
            </div>

            {/* Bottom Area */}
            <div className="flex flex-col items-center justify-start flex-1 w-full">
              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                <p className="font-serif text-lg md:text-2xl font-bold tracking-widest text-navy uppercase">
                  19:30 — Thứ Tư
                </p>
                <p className="font-serif text-xl md:text-2xl font-bold text-navy tracking-widest">
                  29 . 04 . 2026
                </p>
                <p className="text-sm leading-relaxed max-w-[260px] mx-auto font-serif italic text-charcoal px-1 mt-4 md:mt-6">
                  Lễ cưới tại Nhà thờ Giáo xứ Trại Lê, <br />tỉnh Hà Tĩnh
                </p>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 w-full justify-center px-0 mt-auto">
                <a
                  href={getGoogleCalendarUrl(WEDDING_CALENDAR_EVENTS.church)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-sm flex items-center justify-center gap-1.5 py-3 shadow-md hover:shadow-lg transition-all border-none bg-[#8a1827] text-white hover:bg-[#6e151e] text-[9px] font-bold"
                >
                  GOOGLE
                </a>
                <a
                  href={getIcsUrl("church")}
                  className="btn-primary btn-sm flex items-center justify-center gap-1.5 py-3 shadow-md hover:shadow-lg transition-all border-none bg-[#8a1827] text-white hover:bg-[#6e151e] text-[9px] font-bold"
                >
                  IPHONE
                </a>
                <a
                  href={CHURCH_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline border-border text-navy hover:bg-beige hover:border-gold-pale btn-sm flex items-center justify-center gap-2 py-3 shadow-sm hover:shadow-md transition-all col-span-2 mt-1"
                >
                  <MapPinIcon />
                  <span className="tracking-[0.2em] text-[10px]">Chỉ đường</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Sacred Meaning & Prayer */}
          <motion.div 
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: motionTokens.duration.base, delay: 0.24 }}
            className="p-8 md:p-14 bg-transparent flex flex-col items-center text-center border-t md:border-t-0 md:border-l border-border-light/40 relative w-full h-full"
          >
            {/* Background cross decoration */}
            <div className="absolute top-12 opacity-30">
              <SacredUnityCross size={24} className="text-gold-muted" />
            </div>
            
            {/* Top Area */}
            <div className="flex flex-col items-center justify-center flex-1 w-full pt-4 md:pt-0">
              <blockquote className="font-serif text-charcoal text-[13px] md:text-sm leading-8 md:leading-9 italic max-w-sm relative px-3 md:px-6">
                <span className="absolute -top-4 -left-2 text-gold-muted text-4xl opacity-20 font-serif">&ldquo;</span>
                Do giao ước hôn nhân, một người nam và một người nữ tạo thành một sự hiệp thông trọn cả cuộc sống; tự bản chất, giao ước ấy hướng về lợi ích của đôi bạn, cũng như đến việc sinh sản và giáo dục con cái; Chúa Kitô đã nâng giao ước hôn nhân giữa hai người đã được Rửa Tội lên hàng bí tích.
                <span className="block text-[10px] text-gold-muted tracking-[0.25em] font-sans not-italic uppercase mt-6 font-bold">
                  — Giáo Luật, điều 1055, khoản 1
                </span>
              </blockquote>
            </div>

            {/* Symmetrical Diamond Divider */}
            <div className="w-full flex items-center justify-center gap-3 md:gap-4 my-8 md:my-10">
              <div className="w-10 h-px bg-gold-muted/40"></div>
              <div className="w-2 h-2 bg-gold/50 rotate-45"></div>
              <div className="w-10 h-px bg-gold-muted/40"></div>
            </div>

            {/* Bottom Area */}
            <div className="flex flex-col items-center justify-start flex-1 w-full">
              <h4 className="!font-script text-navy text-4xl md:text-5xl mb-6 md:mb-8">
                Tình Yêu Trong Chúa
              </h4>
              <p className="font-serif text-charcoal text-[13px] md:text-base leading-relaxed md:leading-loose italic max-w-[280px] md:max-w-md mx-auto px-2">
                "Lạy Chúa, xin chúc lành cho tình yêu của chúng con. Xin cho chúng con
                biết trân trọng nhau, cùng nhau xây dựng tổ ấm hạnh phúc 
                trên nền tảng đức tin và lòng mến."
              </p>
              <div className="mt-8 flex flex-col items-center">
                <p className="text-[#8a1827] font-serif text-lg md:text-xl italic mb-2 tracking-wide">Amen</p>
                <div className="w-1 h-8 bg-gradient-to-b from-[#8a1827]/40 to-transparent"></div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
}

