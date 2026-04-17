"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SacredUnityCross } from "@/components/CatholicOrnaments";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["#hero", "#bi-tich", "#su-kien", "#album", "#rsvp"];
    const sections = sectionIds
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -45% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const links = [
    { label: "Bí Tích", href: "#bi-tich" },
    { label: "Sự kiện", href: "#su-kien" },
    { label: "Album", href: "#album" },
    { label: "RSVP", href: "#rsvp" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-gold-pale/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-0 md:px-6 pr-2 md:pr-6 flex items-center justify-between">
        {/* Logo — Cross + Names */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline group px-4 md:px-0"
        >
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-3"
          >
            <SacredUnityCross size={18} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="mobile-brand !font-script text-navy text-xl md:text-2xl tracking-wide group-hover:text-gold transition-colors whitespace-nowrap flex items-center gap-2">
              Văn Thường
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-navy group-hover:scale-125 transition-transform"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Thị Nhàn
            </span>
          </motion.div>
        </Link>

        {/* Navigation Links — Desktop */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          {links.map((link, i) => (
            <motion.li 
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <a
                href={link.href}
                className={`font-bold text-sm tracking-[0.2em] uppercase no-underline transition-all duration-300 relative group ${
                  activeSection === link.href ? "!text-gold" : "!text-[#6e151e] hover:!text-gold"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${
                    activeSection === link.href ? "w-full bg-gold" : "w-0 bg-[#6e151e] group-hover:w-full"
                  }`}
                />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-navy p-3 rounded-sm hover:text-gold transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-border-light overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-3 py-6 list-none m-0 px-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-bold text-sm tracking-[0.14em] uppercase no-underline transition-colors py-2 px-3 ${
                      activeSection === link.href ? "!text-gold" : "!text-[#6e151e] hover:!text-gold"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

