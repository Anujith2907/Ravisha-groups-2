import { Building2, Film, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', marginTop: 0 }}
    >
      {/* ── Background: Layered images with seamless center blend ── */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Construction image — full width, anchored left */}
        <div
          className="absolute inset-0 bg-cover scale-105"
          style={{
            backgroundImage: 'url("/exact-building.png")',
            backgroundPosition: 'left center',
          }}
        />

        {/* Layer 2: Cinema image — full width, vibrant right side */}
        <div
          className="absolute inset-0 bg-cover scale-105 brightness-110 contrast-105"
          style={{
            backgroundImage: 'url("/production-bg.jpg")',
            backgroundPosition: 'right center',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 70%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* Layer 3: Dark navy cinematic overlay — lighter gradient to let right side shine */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(10,15,32,0.48) 0%, rgba(10,15,32,0.3) 50%, rgba(10,15,32,0.18) 100%)',
          }}
        />
      </div>

      {/* Dark center vignette — lighter to keep images visible */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(5,10,28,0.4) 0%, rgba(5,10,28,0.12) 55%, transparent 100%)',
        }}
      />

      {/* Top & bottom edge darkening */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,12,28,0.5) 0%, transparent 22%, transparent 68%, rgba(8,12,28,0.65) 100%)',

        }}
      />

      {/* Content Container */}
      <div className="relative z-20 container-wide h-full flex flex-col items-center justify-center min-h-[100vh] text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          {/* RAVISHA Heading — bright white */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(3rem, 8.5vw, 6.5rem)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              lineHeight: 0.95,
              color: '#FFFFFF',
              textShadow: '0 4px 32px rgba(0,0,0,0.7)',
            }}
          >
            RAVISHA
          </motion.h1>

          {/* GROUPS 2 with gold side rules */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="flex items-center justify-center gap-4 w-full max-w-md my-3"
          >
            <div style={{ flex: 1, height: 1.5, background: '#C9A038', opacity: 0.85 }} />
            <span
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                fontWeight: 700,
                letterSpacing: '0.48em',
                color: '#C9A038',
                textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              }}
            >
              GROUPS 2
            </span>
            <div style={{ flex: 1, height: 1.5, background: '#C9A038', opacity: 0.85 }} />
          </motion.div>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-5 mb-9 space-y-1"
          >
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)',
                fontWeight: 800,
                letterSpacing: '0.22em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              BUILDING FOUNDATIONS.
            </p>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)',
                fontWeight: 800,
                letterSpacing: '0.22em',
                color: '#C9A038',
                textTransform: 'uppercase',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              CREATING STORIES.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            {/* Construction Button — Gold */}
            <Link
              to="/construction"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:brightness-110"
              style={{
                background: '#C9A038',
                color: '#111827',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              <Building2 size={15} />
              EXPLORE CONSTRUCTION
            </Link>

            {/* Cinema Button — Dark Navy */}
            <Link
              to="/production"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#2d3f60]"
              style={{
                background: '#1E2D4F',
                color: '#FFFFFF',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: '1.5px solid rgba(255,255,255,0.15)',
              }}
            >
              <Film size={15} />
              EXPLORE CINEMA
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer"
        onClick={() => scrollToSection('founder')}
      >
        <span
          className="text-[9px] font-bold tracking-widest text-white/70 mb-1 uppercase"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-white/70" />
        </motion.div>
      </motion.div>

      {/* Bottom curve — seamless into founder section */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%', height: '70px' }}
        >
          <path
            d="M0,0 C360,70 1080,70 1440,0 L1440,70 L0,70 Z"
            fill="#F7F5F0"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
