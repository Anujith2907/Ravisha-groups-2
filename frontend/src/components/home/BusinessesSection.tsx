import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Film, CheckCircle2, TrendingUp, Users, Star } from 'lucide-react';

const constructionHighlights = [
  'Residential & Commercial Buildings',
  'Premium Interior Construction',
  'End-to-End Project Management',
  'Quality-Assured Delivery',
];

const cinemaHighlights = [
  'Feature Film Productions',
  'Collaborations with Top Directors',
  'Tamil Cinema Excellence',
  'Award-Winning Projects',
];

const constructionStats = [
  { icon: Building2, value: '25+', label: 'Projects Completed' },
  { icon: TrendingUp, value: '15+', label: 'Buildings Delivered' },
  { icon: Users, value: '100+', label: 'Happy Clients' },
];

const cinemaStats = [
  { icon: Film, value: '65+', label: 'Film Productions' },
  { icon: Star, value: '25+', label: 'Years of Experience' },
  { icon: Users, value: '50+', label: 'Industry Collaborations' },
];

const BusinessesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="businesses" ref={ref} className="py-10 lg:py-16" style={{ background: '#F8F7F4' }}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="section-label mb-3">WHAT WE DO</p>
          <h2
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontWeight: 700,
              color: '#1C1F2E',
              letterSpacing: '0.05em',
            }}
          >
            OUR BUSINESSES
          </h2>
          <div className="flex items-center justify-center gap-4 mt-3 mb-4">
            <div style={{ height: 1, width: 60, background: '#E2DDD4' }} />
            <div style={{ width: 8, height: 8, background: '#B8962E', transform: 'rotate(45deg)' }} />
            <div style={{ height: 1, width: 60, background: '#E2DDD4' }} />
          </div>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '0.9rem',
            color: '#7C8099',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.8,
          }}>
            Two powerful verticals — one shared vision of excellence, quality and lasting impact.
          </p>
        </motion.div>

        {/* Business Cards */}
        <div className="flex flex-col gap-8">

          {/* ── Construction Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg"
            style={{ border: '1px solid #E2DDD4', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' }}
          >
            {/* Image with overlay */}
            <div
              className="relative h-72 lg:h-auto bg-cover bg-center"
              style={{ backgroundImage: 'url("/business-construction.png")', minHeight: 320 }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(28,31,46,0.55) 0%, transparent 60%)' }} />
              {/* Mini stat pills on image */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                {constructionStats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)' }}>
                    <Icon size={13} style={{ color: '#B8962E' }} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#1C1F2E' }}>
                      {value} {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 bg-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-full" style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}>
                  <Building2 size={20} style={{ color: '#B8962E' }} />
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.25rem', fontWeight: 700, color: '#1C1F2E', letterSpacing: '0.06em' }}>
                  CONSTRUCTION
                </h3>
              </div>

              <p className="mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.9rem', color: '#4A4E5A', lineHeight: 1.85 }}>
                Building spaces that stand for quality, strength and lasting value. Our construction division delivers excellence from foundation to finish — combining modern engineering with meticulous craftsmanship across residential and commercial projects.
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-2 mb-7">
                {constructionHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 size={14} style={{ color: '#B8962E', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.8rem', color: '#4A4E5A', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Gold rule + CTA */}
              <div className="flex items-center gap-4">
                <div style={{ height: 1.5, width: 40, background: '#B8962E' }} />
                <Link to="/construction" className="btn-outline-gold inline-flex self-start">
                  EXPLORE CONSTRUCTION
                  <ArrowRight size={13} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ── Cinema Production Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg"
            style={{ border: '1px solid #E2DDD4', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' }}
          >
            {/* Content — LEFT */}
            <div className="p-8 lg:p-12 bg-[#1C1F2E] flex flex-col justify-center order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-full" style={{ background: 'rgba(184,150,46,0.15)', border: '1px solid #B8962E' }}>
                  <Film size={20} style={{ color: '#B8962E' }} />
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em' }}>
                  CINEMA PRODUCTION
                </h3>
              </div>

              <p className="mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>
                Creating films that move audiences, support bold artistic visions and contribute to the rich heritage of Tamil cinema. We produce stories that resonate, endure and inspire generations.
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-2 mb-7">
                {cinemaHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 size={14} style={{ color: '#B8962E', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div style={{ height: 1.5, width: 40, background: '#B8962E' }} />
                <Link to="/production" className="btn-gold inline-flex self-start">
                  EXPLORE CINEMA
                  <ArrowRight size={13} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Image — RIGHT */}
            <div
              className="relative h-72 lg:h-auto bg-cover bg-center order-1 lg:order-2"
              style={{ backgroundImage: 'url("/business-cinema.png")', minHeight: 320 }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(225deg, rgba(28,31,46,0.5) 0%, transparent 60%)' }} />
              <div className="absolute top-6 right-6 px-4 py-2 rounded-sm" style={{ background: '#B8962E' }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', color: '#fff', textTransform: 'uppercase' }}>
                  Tamil Cinema
                </span>
              </div>
              <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                {cinemaStats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)' }}>
                    <Icon size={13} style={{ color: '#B8962E' }} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#1C1F2E' }}>
                      {value} {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessesSection;
