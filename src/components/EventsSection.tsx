"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import type { EventCard } from "@/lib/types";
import { fadeUpVariants, getEnterDistance, motionTokens, staggerContainer } from "@/lib/motion";
import {
  SacredUnityCross,
  OliveBranch,
} from "@/components/CatholicOrnaments";
import { withBase } from "@/lib/basepath";
import { WEDDING_CALENDAR_EVENTS } from "@/lib/wedding-calendar-events";
import { getGoogleCalendarUrl, getIcsUrl } from "@/lib/calendar-links";

/* ── Inline SVG Icons for buttons ── */

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

/* ── Event Data (tư gia — phần Bí Tích hiển thị lễ nhà thờ riêng) ── */
const events: EventCard[] = [
  {
    id: "le-vu-quy",
    title: "Lễ Vu Quy",
    subtitle: "Tư Gia Nhà Gái",
    imageUrl: withBase("/image/gallery-ultra/18.jpg"),
    datetime: "09:30 — Thứ Năm, 30/04/2026",
    venue: "Tư Gia Nhà Gái",
    address: "Xóm Ban Long, xã Xuân Lộc, tỉnh Hà Tĩnh",
    mapUrl:
      "https://www.google.com/maps/place/Gia%CC%81o+Ho%CC%A3+Vinh+Long/@18.4108224,105.7707017,17z/data=!3m1!4b1!4m6!3m5!1s0x3139b34e3333f69d:0xc6a00b50db6febfd!8m2!3d18.4108173!4d105.773282!16s%2Fg%2F11h9tv6x92",
    calendarUrl: "/api/calendar/le-vu-quy",
  },
  {
    id: "le-thanh-hon",
    title: "Lễ Thành Hôn",
    subtitle: "Tư Gia Nhà Trai",
    imageUrl: withBase("/image/gallery-ultra/12.jpg"),
    datetime: "09:30 — Thứ Bảy, 02/05/2026",
    venue: "Tư Gia Nhà Trai",
    address: "Tổ dân phố 17, phường Hà Huy Tập, tỉnh Hà Tĩnh",
    mapUrl:
      "https://www.google.com/maps/place/Nh%C3%A0+Th%E1%BB%9D+Gi%C3%A1o+X%E1%BB%A9+V%C4%83n+H%C3%B2a/@18.3194924,105.8356303,13z/data=!4m9!1m2!2m1!1zVOG7lSBkw6JuIHBo4buRIDE3LCBwaMaw4budbmcgSMOgIEh1eSBU4bqtcCwgdOG7iW5oIEjDoCBUxKluaA!3m5!1s0x313851e2c3c950fb:0xfd516f8e9eafc6ac!8m2!3d18.3195031!4d105.8890802!16s%2Fg%2F11b7kg402v",
    calendarUrl: "/api/calendar/le-thanh-hon",
  },
];

/* ── Component ── */
export default function EventsSection() {
  const prefersReducedMotion = useReducedMotion();
  const enterDistance = getEnterDistance(Boolean(prefersReducedMotion), true);

  return (
    <section
      id="su-kien"
      className="section-padding text-center relative overflow-hidden section-bg-nenphu section-bg-nenmobile"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto relative z-10 px-4"
      >
        {/* Sacred Heading */}
        <motion.div 
          variants={fadeUpVariants(enterDistance)}
          className="mb-10 md:mb-20"
        >
          <SacredUnityCross size={40} className="text-gold mx-auto mb-8" />
          <h2 className="font-serif text-navy text-3xl md:text-5xl font-normal tracking-[0.08em] md:tracking-[0.2em] mb-3 md:mb-4 uppercase">
            Lễ Vu Quy & Lễ Thành Hôn
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-gold-muted opacity-30"></div>
            <p className="!font-script text-gold text-xl md:text-4xl">Chung vui cùng gia đình</p>
            <div className="w-16 h-px bg-gold-muted opacity-30"></div>
          </div>
        </motion.div>

        {/* Hai sự kiện tư gia */}
        <motion.div variants={fadeUpVariants(enterDistance)} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div 
              key={event.id} 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: motionTokens.duration.base, delay: index * 0.14 }}
              className="bg-transparent p-4 md:p-8 border border-border-light/40 shadow-[0_4px_20px_rgba(27,42,74,0.02)] flex flex-col items-center transition-all duration-500 hover:shadow-[0_15px_45px_rgba(184,147,31,0.1)] hover:-translate-y-1 md:hover:-translate-y-2 rounded-sm"
            >
              {/* Top labeling: Header */}
              <div className="text-center mb-6 md:mb-8 w-full">
                <p className="text-[10px] text-gold-muted tracking-[0.4em] uppercase mb-2 font-bold">
                  {event.title}
                </p>
                <h3 className="font-serif text-navy text-xl md:text-2xl font-normal tracking-tight">
                  {event.subtitle}
                </h3>
              </div>

              {/* The "Centerpiece" Square Image */}
              <div className="w-full aspect-square mb-6 md:mb-8 relative group overflow-hidden border border-gold-pale/30 p-1.5 md:p-2 bg-transparent">
                <div className="w-full h-full overflow-hidden relative rounded-sm">
                  <img 
                    src={event.imageUrl} 
                    alt={`${event.title} ${event.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                {/* Visual corners for a "framed" feel */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold/30"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold/30"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold/30"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold/30"></div>
              </div>

              {/* Bottom information: Time & Venue */}
              <div className="text-center flex-grow flex flex-col items-center">
                <p className="font-serif text-navy text-sm md:text-base font-medium tracking-wide mb-4">
                  {event.datetime}
                </p>
                
                <div className="w-8 h-px bg-gold-muted/40 mb-4 mx-auto"></div>
                
                <p className="font-serif text-navy text-sm md:text-base font-semibold leading-tight mb-2">
                  {event.venue}
                </p>
                <p className="text-charcoal-light text-[12px] leading-relaxed max-w-[240px] font-serif italic">
                  {event.address}
                </p>
              </div>

              {/* Action Buttons: Footer of the card */}
              <div className="mt-7 md:mt-10 grid grid-cols-2 gap-2 md:gap-3 w-full px-0 md:px-1">
                <motion.a
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={getGoogleCalendarUrl(WEDDING_CALENDAR_EVENTS[event.id])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm py-3 px-1 flex items-center justify-center gap-1.5 text-[9px] font-bold"
                >
                  GOOGLE
                </motion.a>
                <motion.a
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={getIcsUrl(event.id)}
                  className="btn-outline btn-sm py-3 px-1 flex items-center justify-center gap-1.5 text-[9px] font-bold"
                >
                  IPHONE
                </motion.a>
                <motion.a
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-sm col-span-2 text-[10px] py-3 flex items-center justify-center gap-2 shadow-sm mt-1"
                >
                  <MapPinIcon />
                  XEM BẢN ĐỒ
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

