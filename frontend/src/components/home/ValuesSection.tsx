import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Star, Lightbulb, Users as Handshake, Leaf } from 'lucide-react';
import { contentAPI } from '../../services/api';
import { ValueItem } from '../../types';

const DEFAULT_VALUES: ValueItem[] = [
  {
    title: 'INTEGRITY',
    description: 'Doing what is right, always.',
    icon: 'shield',
  },
  {
    title: 'EXCELLENCE',
    description: 'Striving for the highest standards.',
    icon: 'star',
  },
  {
    title: 'INNOVATION',
    description: 'Turning ideas into impact.',
    icon: 'lightbulb',
  },
  {
    title: 'TRUST',
    description: 'Building lasting relationships.',
    icon: 'handshake',
  },
  {
    title: 'SUSTAINABILITY',
    description: 'Growing responsibly for future generations.',
    icon: 'leaf',
  },
];

const ICONS_MAP: Record<string, typeof ShieldCheck> = {
  shield: ShieldCheck,
  star: Star,
  lightbulb: Lightbulb,
  handshake: Handshake,
  leaf: Leaf,
};

const ValuesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [values, setValues] = useState<ValueItem[]>(DEFAULT_VALUES);

  useEffect(() => {
    contentAPI
      .get()
      .then((res) => {
        if (res.data?.values?.items?.length > 0) setValues(res.data.values.items);
      })
      .catch(() => null);
  }, []);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#F7F5F0] border-t border-[#E8E3D8]">
      <div className="container-wide">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Header Title with Gold Rules */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-[1.5px] bg-[#B8962E]" />
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#1C1F2E',
                letterSpacing: '0.04em',
              }}
            >
              OUR VALUES
            </h2>
            <div className="w-12 h-[1.5px] bg-[#B8962E]" />
          </div>

          {/* Subtitle */}
          <p
            className="text-[#7C8099] italic font-serif text-sm sm:text-base mt-2"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Guiding principles for a better tomorrow.
          </p>
        </motion.div>

        {/* 5 Value Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0">
          {values.map((val, i) => {
            const Icon = ICONS_MAP[val.icon] || ShieldCheck;
            const isLast = i === values.length - 1;

            return (
              <motion.div
                key={val.title || i}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className={`flex flex-col items-center text-center px-4 py-6 ${
                  !isLast ? 'lg:border-r lg:border-[#E2DDD4]' : ''
                }`}
              >
                {/* Circular Gold Icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 hover:scale-110"
                  style={{
                    background: '#F9F5EC',
                    border: '1px solid #B8962E',
                    boxShadow: '0 2px 10px rgba(184,150,46,0.15)',
                  }}
                >
                  <Icon size={22} style={{ color: '#B8962E' }} />
                </div>

                {/* Title */}
                <h3
                  className="mb-2 font-bold"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.88rem',
                    color: '#1C1F2E',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {val.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs text-[#4A4E5A] leading-relaxed max-w-[200px]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ValuesSection;
