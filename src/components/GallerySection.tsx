"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, getEnterDistance, motionTokens, staggerContainer } from "@/lib/motion";
import { SacredUnityCross } from "@/components/CatholicOrnaments";
import { withBase } from "@/lib/basepath";

export default function GallerySection() {
  /*
   * Masonry-style photo grid with varied sizes.
   * Each photo has a layout class: gallery-large, gallery-tall, gallery-wide, or default (1x1).
   */
  /*
   * Ảnh cưới chụp ở định dạng dọc (portrait). Bố cục masonry đã được thiết kế để
   * tận dụng tối đa chiều dọc: "tall" span 2 hàng rất hợp với ảnh dọc,
   * "large" (2x2) để tạo điểm nhấn, những ô còn lại là hình vuông cắt mềm.
   */
  const photos: {
    id: number;
    url: string;
    alt: string;
    layout: "large" | "tall" | "wide" | "normal";
  }[] = [
    { id: 1, url: withBase("/image/gallery-ultra/01.jpg"), alt: "Khoảnh khắc 01", layout: "tall" },
    { id: 2, url: withBase("/image/gallery-ultra/07.jpg"), alt: "Khoảnh khắc 02", layout: "normal" },
    { id: 3, url: withBase("/image/gallery-ultra/11.jpg"), alt: "Khoảnh khắc 03", layout: "tall" },
    { id: 4, url: withBase("/image/gallery-ultra/15.jpg"), alt: "Khoảnh khắc 04", layout: "large" },
    { id: 5, url: withBase("/image/gallery-ultra/04.jpg"), alt: "Khoảnh khắc 05", layout: "normal" },
    { id: 6, url: withBase("/image/gallery-ultra/09.jpg"), alt: "Khoảnh khắc 06", layout: "tall" },
    { id: 7, url: withBase("/image/gallery-ultra/18.jpg"), alt: "Khoảnh khắc 07", layout: "normal" },
    { id: 8, url: withBase("/image/gallery-ultra/20.jpg"), alt: "Khoảnh khắc 08", layout: "normal" },
    { id: 9, url: withBase("/image/gallery-ultra/13.jpg"), alt: "Khoảnh khắc 09", layout: "tall" },
    { id: 10, url: withBase("/image/gallery-ultra/22.jpg"), alt: "Khoảnh khắc 10", layout: "large" },
    { id: 11, url: withBase("/image/gallery-ultra/02.jpg"), alt: "Khoảnh khắc 11", layout: "normal" },
    { id: 12, url: withBase("/image/gallery-ultra/17.jpg"), alt: "Khoảnh khắc 12", layout: "tall" },
    { id: 13, url: withBase("/image/gallery-ultra/19.jpg"), alt: "Khoảnh khắc 13", layout: "normal" },
    { id: 14, url: withBase("/image/gallery-ultra/23.jpg"), alt: "Khoảnh khắc 14", layout: "normal" },
  ];

  const layoutClassMap = {
    large: "gallery-large",
    tall: "gallery-tall",
    wide: "gallery-wide",
    normal: "",
  };
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const enterDistance = getEnterDistance(Boolean(prefersReducedMotion), true);

  return (
    <section id="album" className="section-padding text-center section-bg-nenphu section-bg-nenmobile">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.14 }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div
          variants={fadeUpVariants(enterDistance)}
        >
          <SacredUnityCross size={40} className="text-gold mx-auto mb-6" />
          <h2 className="font-serif text-navy text-3xl md:text-5xl font-normal tracking-[0.08em] md:tracking-wider mb-2 md:mb-3 uppercase">
            Album Kỷ Niệm
          </h2>
          <div className="divider-gold" />
          <p className="font-serif text-sm italic mt-5 md:mt-6 mb-10 md:mb-16 max-w-md mx-auto leading-relaxed opacity-80">
            &ldquo;Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng.&rdquo;
          </p>
        </motion.div>

        {/* Masonry Photo Grid */}
        <motion.div variants={fadeUpVariants(enterDistance)} className="gallery-grid">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: motionTokens.duration.base, delay: index * 0.08 }}
              className={`gallery-item ${layoutClassMap[photo.layout]} group`}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="w-full h-full relative overflow-hidden bg-beige-light text-left cursor-zoom-in"
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                {/* Visual Label on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-navy/60 to-transparent translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-[10px] tracking-[0.14em] md:tracking-widest uppercase font-light">
                    {photo.alt}
                  </p>
                </div>

                {/* Corner detail */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p 
          variants={fadeUpVariants(enterDistance)}
          className="text-navy text-[10px] tracking-[0.16em] md:tracking-[0.2em] mt-10 md:mt-16 uppercase italic"
        >
          Love Is Patient, Love Is Kind
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {selectedPhoto ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[220] bg-navy/75 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.94, y: prefersReducedMotion ? 0 : 18 }}
              transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.soft }}
              className="relative w-full max-w-4xl max-h-[88vh] rounded-sm overflow-hidden shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selectedPhoto.url} alt={selectedPhoto.alt} className="w-full h-full object-contain bg-black/20" />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 text-navy flex items-center justify-center"
                aria-label="Đóng ảnh"
              >
                ✕
              </button>
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs tracking-[0.1em] uppercase bg-black/30 px-3 py-2 rounded-sm">
                {selectedPhoto.alt}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

