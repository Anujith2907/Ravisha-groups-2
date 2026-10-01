import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Building, Film, Award, Target, Eye, ShieldCheck, Leaf } from 'lucide-react';
import { contentAPI } from '../../services/api';
import { SiteContent } from '../../types';

const DEFAULT_DESCRIPTION =
  'Ravisha Groups is a diversified enterprise with strong presence in Construction and Cinema Production. With a vision to build a better tomorrow and create impactful stories today, we blend business excellence with creativity and innovation. Our commitment is to deliver quality, inspire trust and contribute to society.';

const stats = [
  { icon: Building2, value: '25+', label: 'PROJECTS COMPLETED' },
  { icon: Building, value: '15+', label: 'BUILDINGS DELIVERED' },
  { icon: Film, value: '10+', label: 'FILM PRODUCTIONS' },
  { icon: Award, value: '10+', label: 'YEARS OF EXPERIENCE' },
];

const pillars = [
  {
    icon: Eye,
    title: 'OUR VISION',
    text: 'To be a nationally recognised conglomerate known for building spaces that inspire living and producing stories that move hearts — combining architectural excellence with cinematic legacy.',
  },
  {
    icon: Target,
    title: 'OUR MISSION',
    text: 'To deliver world-class construction solutions and impactful Tamil cinema, upholding the highest standards of quality, integrity and innovation in everything we create.',
  },
  {
    icon: ShieldCheck,
    title: 'OUR COMMITMENT',
    text: 'Building trust with every client, partner and community we serve — through transparency, reliable delivery and a genuine passion for excellence.',
  },
  {
    icon: Leaf,
    title: 'SUSTAINABILITY',
    text: "Integrating responsible practices across our construction and production work — building for today with accountability to future generations.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    contentAPI.get().then((res) => setContent(res.data)).catch(() => null);
  }, []);

  const heading = content?.about?.heading || 'ABOUT RAVISHA GROUPS';
  const description = content?.about?.description || DEFAULT_DESCRIPTION;

  return (
    <section id="about" ref={ref} className="overflow-hidden" style={{ background: '#F7F5F0' }}>

      {/* ── Top: Heading + Description + Stats ── */}
      <div className="py-16 lg:py-20">
        <div className="container-wide">
          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-[1.5px] bg-[#B8962E]" />
            <p className="section-label" style={{ color: '#B8962E' }}>WHO WE ARE</p>
            <div className="flex-1 h-[1px] bg-[#E2DDD4]" />
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                fontWeight: 700,
                color: '#1C1F2E',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              {heading}
            </h2>
            <div className="w-12 h-[1.5px] bg-[#B8962E]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left — Description + Image */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.97rem', color: '#4A4E5A', lineHeight: 1.9 }}>
                {description}
              </p>

              {/* Inline image */}
              <div
                className="w-full rounded-lg overflow-hidden relative"
                style={{ height: 220, boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url("/ravisha-building-new.png")' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,31,46,0.6) 0%, transparent 60%)' }} />
                <div className="absolute bottom-4 left-4">
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>RAVISHA CONSTRUCTION</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>Chennai, Tamil Nadu</p>
                </div>
              </div>

              {/* Quote block */}
              <div className="p-5 rounded-sm" style={{ background: '#1C1F2E', borderLeft: '4px solid #B8962E' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontStyle: 'italic', color: '#fff', lineHeight: 1.7 }}>
                  "We don't just build structures or produce films — we create legacies that stand the test of time."
                </p>
                <p className="mt-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', color: '#B8962E', textTransform: 'uppercase' }}>
                  — D. Ravikaanth, Founder & CEO
                </p>
              </div>
            </motion.div>

            {/* Right — Stats + Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col gap-8"
            >
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex flex-col items-center text-center p-5 bg-white rounded-lg border transition-transform duration-300 hover:-translate-y-1"
                    style={{ borderColor: '#E8E3D8', boxShadow: '0 4px 20px rgba(28,31,46,0.04)' }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#F9F5EC', border: '1px solid #B8962E', boxShadow: '0 2px 8px rgba(184,150,46,0.15)' }}>
                      <Icon size={20} style={{ color: '#B8962E' }} />
                    </div>
                    <p className="mb-1 font-bold" style={{ fontFamily: 'Cinzel, serif', fontSize: '1.75rem', color: '#B8962E', lineHeight: 1 }}>{value}</p>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.6rem', fontWeight: 700, color: '#4A4E5A', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.4 }}>{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Vision / Mission / Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map(({ icon: Icon, title, text }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="bg-white rounded-lg p-5 border hover:shadow-md transition-shadow duration-300"
                    style={{ borderColor: '#E8E3D8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}>
                        <Icon size={16} style={{ color: '#B8962E' }} />
                      </div>
                      <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#1C1F2E' }}>{title}</h4>
                    </div>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.82rem', color: '#4A4E5A', lineHeight: 1.75 }}>{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
