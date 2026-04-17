"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import InvitationGate from "@/components/InvitationGate";
import SectionTransition from "@/components/SectionTransition";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingPetals from "@/components/FloatingPetals";
import AudioPlayer from "@/components/AudioPlayer";

import SacramentSection from "@/components/SacramentSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import RsvpSection from "@/components/RsvpSection";

export default function Home() {
  const [invitationOpened, setInvitationOpened] = useState(false);

  return (
    <>
      <InvitationGate visible={!invitationOpened} onOpen={() => setInvitationOpened(true)} />
      <ScrollProgress />
      <FloatingPetals />
      <AudioPlayer autoPlay={invitationOpened} />
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: invitationOpened ? 1 : 0, 
        }}
        transition={{ duration: 0.5, delay: invitationOpened ? 0.15 : 0 }}
        className="pt-0"
      >
        {/* Hero fades in first with a gentle scale-up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={invitationOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTransition>
            <HeroSection />
          </SectionTransition>
        </motion.div>

        {/* Remaining sections appear with a stagger */}
        {[SacramentSection, EventsSection, GallerySection, RsvpSection].map(
          (Section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={invitationOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <SectionTransition>
                <Section />
              </SectionTransition>
            </motion.div>
          )
        )}
      </motion.main>
      <Footer />
    </>
  );
}

