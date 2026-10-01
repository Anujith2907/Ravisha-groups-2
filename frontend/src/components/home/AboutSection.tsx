import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Eye, ShieldCheck, Leaf } from 'lucide-react';
import { contentAPI } from '../../services/api';
import { SiteContent } from '../../types';

const DEFAULT_DESCRIPTION =
  'Ravisha Groups is a diversified enterprise with strong presence in Construction and Cinema Production. With a vision to build a better tomorrow and create impactful stories today, we blend business excellence with creativity and innovation. Our commitment is to deliver quality, inspire trust and contribute to society.';

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
      <div className="py-10 lg:py-12">
        <div className="container-wide">
          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            {/* Left — Description + Image + Quote */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.97rem', color: '#4A4E5A', lineHeight: 1.9 }}>
                {description}
              </p>

              {/* Inline image — full width */}
              <div
                className="w-full rounded-lg overflow-hidden relative flex-1 min-h-[260px]"
                style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}
              >
                <img
                  src="/about-building.jpg"
                  alt="Ravisha Construction Building"
                  className="w-full h-full object-cover block"
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(to top, rgba(28,31,46,0.85) 0%, transparent 100%)' }}>
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

            {/* Right — Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 flex flex-col justify-between gap-4"
            >
              {pillars.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="bg-white rounded-lg p-6 border hover:shadow-md transition-all duration-300 flex-1 flex flex-col justify-center"
                  style={{ borderColor: '#E8E3D8', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}>
                      <Icon size={18} style={{ color: '#B8962E' }} />
                    </div>
                    <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', color: '#1C1F2E' }}>{title}</h4>
                  </div>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.88rem', color: '#4A4E5A', lineHeight: 1.8 }}>{text}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
