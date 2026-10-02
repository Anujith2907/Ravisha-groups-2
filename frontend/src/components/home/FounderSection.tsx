import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { founderAPI } from '../../services/api';
import { Founder } from '../../types';

const FounderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [founder, setFounder] = useState<Founder | null>(null);

  useEffect(() => {
    founderAPI.get().then((res) => setFounder(res.data)).catch(() => null);
  }, []);

  const name = founder?.name || 'D. RAVIKAANTH';
  const designation = founder?.designation || 'FOUNDER & MANAGING DIRECTOR';
  const imageUrl = founder?.image?.url || '/founder.jpg';

  return (
    <section
      id="founder"
      ref={ref}
      className="relative overflow-hidden py-10 lg:py-16"
      style={{ background: '#F7F5F0' }}
    >
      {/* Background Graphic Watermark (Subtle R watermark top right) */}
      <div
        className="absolute top-0 right-0 pointer-events-none select-none opacity-5"
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '28rem',
          lineHeight: 0.8,
          color: '#1C1F2E',
          fontWeight: 700,
        }}
      >
        R
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left — Founder Photo with Gold Frame and Bottom Ribbon */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex flex-col items-center lg:items-start"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Outer Gold Frame */}
              <div
                className="relative p-2 bg-white rounded-sm shadow-xl"
                style={{
                  border: '2px solid #B8962E',
                  boxShadow: '0 12px 35px rgba(28,31,46,0.08)',
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '4/5' }}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Dark Banner at Bottom Left */}
              <div
                className="relative -mt-6 z-20 w-[105%] -ml-[2.5%] px-6 py-4 bg-[#1C1F2E] shadow-xl flex items-center justify-center border-t-2 border-[#B8962E]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                }}
              >
                <p
                  className="text-[#D4B04A] text-sm sm:text-base font-serif italic tracking-widest text-center"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Vision &nbsp;•&nbsp; Integrity &nbsp;•&nbsp; Excellence
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — CEO Message Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Category Label */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-[#B8962E] text-xs font-bold tracking-[0.25em] uppercase"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                LEADERSHIP
              </span>
              <div className="w-8 h-[1.5px] bg-[#B8962E]" />
            </div>

            {/* Title */}
            <h2
              className="text-[#1C1F2E] mb-4"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
              }}
            >
              CEO MESSAGE
            </h2>

            {/* Quote Icon */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[#B8962E] text-3xl font-serif leading-none"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                ”
              </span>
              <div className="w-10 h-[1.5px] bg-[#B8962E]/40" />
            </div>

            {/* Message Paragraphs */}
            <div
              className="space-y-4 text-[#4A4E5A] text-sm sm:text-base leading-relaxed mb-8"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              <p>
                At Ravisha Groups 2, we believe in creating value that lasts for generations.
                From constructing exceptional infrastructure to producing meaningful cinema,
                our journey is driven by passion, integrity and a commitment to excellence.
              </p>
              <p>
                Our success is built on a strong team, trusted partnerships and a customer-first
                approach. We embrace innovation, sustainable practices and forward-thinking
                strategies to meet the evolving needs of our clients and communities.
              </p>
              <p>
                As we move forward, our focus remains on building long-term value, fostering growth
                and setting new benchmarks across industries. We are grateful for the trust and
                support of our stakeholders and remain dedicated to shaping a better, brighter future.
              </p>
              
              <ul className="list-disc pl-5 mt-6 space-y-2 text-[#4A4E5A] marker:text-[#B8962E]">
                <li>Over 30 years of experience in the film industry.</li>
                <li>Worked as a Co-Producer, Executive Producer, Art Director, and Production Manager across 200+ films.</li>
                <li>Serving as the Manager for Actor, Director, and Cinematographer Suresh Menon for more than 25 years.</li>
                <li>Has been associated with the production and set work of several notable films, including Enthiran, Vishwaroopam, Kabali, Kaththi, Billa, Valimai, Miruthan, and many others.</li>
                <li>Brings extensive hands-on experience in film production, set management, art direction, production coordination, and overall film operations.</li>
              </ul>
            </div>

            {/* Signature & Side Quote Box */}
            <div className="flex flex-wrap items-end justify-between gap-6 pt-4 border-t border-[#E2DDD4]">
              {/* Name & Designation */}
              <div>
                <p
                  className="text-[#B8962E] text-xl font-bold italic tracking-wide"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {name}
                </p>
                <p
                  className="text-[#1C1F2E] text-[11px] font-bold tracking-[0.18em] uppercase mt-1"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {designation}
                </p>
              </div>

              {/* Quote Callout Box */}
              <div className="pl-4 border-l-2 border-[#B8962E]">
                <p
                  className="text-[#4A4E5A] text-sm italic font-serif leading-snug"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  <span className="text-[#B8962E] text-base font-bold mr-1">“</span>
                  Building today
                  <br />
                  for a better tomorrow.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
