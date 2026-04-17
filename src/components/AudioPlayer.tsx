"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { withBase } from "@/lib/basepath";

export default function AudioPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && !isPlaying && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Auto-play failed:", err));
    }
  }, [autoPlay]);

  useEffect(() => {
    // Functional test audio track
    const audioPath = withBase("/audio/" + encodeURIComponent("Westlife - My Love (Lyrics).mp3"));
    const audio = new Audio(audioPath); 
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play failed, user interaction needed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={togglePlay}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      className="fixed bottom-6 right-6 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#faece6]/80 backdrop-blur-md border border-[#8a1827]/40 shadow-[0_4px_12px_rgba(110,21,30,0.15)] flex items-center justify-center text-[#8a1827] transition-colors hover:bg-white"
    >
      {isPlaying ? (
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          {/* Mâm đĩa than mini */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <circle cx="12" cy="12" r="10" />
             <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        </motion.div>
      ) : (
        // Play icon
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="ml-1">
           <polygon points="6 4 20 12 6 20 6 4" />
        </svg>
      )}
      
      {/* Ripple effect when playing */}
      {isPlaying && (
        <motion.div 
          className="absolute inset-0 rounded-full border border-[#8a1827]/50"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
