"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { withBase } from "@/lib/basepath";

type InvitationGateProps = {
  visible: boolean;
  onOpen: () => void;
};

const EASE_OPEN: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_DRAMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function InvitationGate({ visible, onOpen }: InvitationGateProps) {
  const [opening, setOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    const exitDelay = prefersReducedMotion ? 300 : 1400;
    window.setTimeout(onOpen, exitDelay);
  };

  const reduced = Boolean(prefersReducedMotion);
  const envelopeImage = isMobile ? withBase("/image/lathumobile.svg") : withBase("/image/lathuweb.svg");

  const frameClass = isMobile
    ? "w-[360px] h-[640px] max-w-[92vw] max-h-[88vh]"
    : "w-[1024.5px] h-[576px] max-w-[94vw] max-h-[88vh]";

  const sealPosition = isMobile
    ? "bottom-[22%] w-[74px] h-[74px]"
    : "bottom-[18%] w-[86px] h-[86px]";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0.15 : 0.6, ease: EASE_DRAMATIC } }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center px-4 md:px-6
            bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#fafafa_100%)]"
        >
          {/* Envelope container */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.96 }}
            animate={
              opening && !reduced
                ? {
                    opacity: [1, 1, 0],
                    y: [0, -40, -80],
                    scale: [1, 0.92, 0.85],
                    rotateX: [0, 8, 15],
                  }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={
              opening
                ? { duration: 1.1, ease: EASE_DRAMATIC, times: [0, 0.5, 1] }
                : { duration: reduced ? 0.15 : 0.55, ease: EASE_OPEN }
            }
            className={`relative ${frameClass}`}
            style={{ perspective: "1200px" }}
            role="button"
            tabIndex={0}
            onClick={handleOpen}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpen();
              }
            }}
          >
            {/* The invitation image itself */}
            <motion.img
              src={envelopeImage}
              alt="Thiệp mời cưới"
              className="absolute inset-0 w-full h-full object-contain rounded-md
                shadow-[0_16px_48px_rgba(138,24,39,0.13),0_4px_14px_rgba(0,0,0,0.06)]"
              animate={
                opening
                  ? { scale: reduced ? 1 : 1.03, rotate: 0 }
                  : reduced
                    ? { scale: 1, y: 0 }
                    : { scale: 1, y: 0, rotate: [0, -0.4, 0.4, -0.3, 0.2, 0] }
              }
              transition={
                opening
                  ? { duration: reduced ? 0.2 : 0.5, ease: EASE_OPEN }
                  : { duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }
              }
              draggable={false}
            />

            {/* Immediate visual feedback on click — flash white */}
            <motion.div
              className="absolute inset-0 rounded-md pointer-events-none bg-white"
              initial={false}
              animate={opening ? { opacity: [0, 0.2, 0] } : { opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.4, ease: "easeOut" }}
            />

            {/* Clickable seal area */}
            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={opening}
              whileTap={{ scale: 0.94 }}
              animate={
                opening
                  ? { scale: 0.85, opacity: 0 }
                  : reduced
                    ? undefined
                    : { scale: [1, 1.06, 1] }
              }
              transition={{
                duration: opening ? 0.3 : 1.4,
                repeat: opening || reduced ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className={`absolute left-1/2 -translate-x-1/2 z-10 rounded-full
                cursor-pointer disabled:cursor-wait focus:outline-none ${sealPosition}`}
              style={{ touchAction: "manipulation" }}
              aria-label="Mở thiệp cưới"
            >
              <span className="sr-only">Mở thiệp cưới</span>
            </motion.button>
          </motion.div>

          {/* Light particles / sparkle when opening */}
          {opening && !reduced && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gold/60 pointer-events-none"
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: (i % 2 === 0 ? 1 : -1) * (30 + i * 20),
                    y: -(40 + i * 15),
                    scale: [0.5, 1.2, 0],
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.08,
                    ease: "easeOut",
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                />
              ))}
            </>
          )}

          {/* Full-screen white overlay that fades in when opening */}
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={opening ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: reduced ? 0.2 : 0.7,
              delay: opening ? (reduced ? 0.1 : 0.6) : 0,
              ease: EASE_DRAMATIC,
            }}
          />

          {/* CTA text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              opening 
                ? { opacity: 0, y: -10 } 
                : { 
                    opacity: [0.4, 1, 0.4], 
                    y: [0, -3, 0],
                    transition: { 
                      opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                      y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    } 
                  }
            }
            className="mt-5 md:mt-7 text-[10px] md:text-xs uppercase tracking-[0.22em] text-gold-muted text-center"
          >
            {opening ? "Đang mở thiệp..." : "Nhấn con dấu để mở thiệp"}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
