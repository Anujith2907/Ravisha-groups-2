import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const InquirySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      {/* Dark CTA Banner */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: '#1C1F2E' }}
      >
        {/* Split background: construction left, cinema right */}
        <div className="absolute inset-0 flex z-0">
          <div
            className="w-1/2 h-full bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url("/hero-construction.png")' }}
          />
          <div
            className="w-1/2 h-full bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url("/hero-cinema.png")' }}
          />
        </div>
        {/* Center fade blend */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(28,31,46,0.85) 0%, rgba(28,31,46,0.4) 70%, transparent 100%)',
          }}
        />

        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="section-label mb-2" style={{ color: '#D4B04A' }}>GET IN TOUCH</p>
              <h2
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                }}
              >
                LET'S BUILD. LET'S CREATE.
              </h2>
              <p
                className="mt-2"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                Connect with Ravisha Groups 2 for business, construction and cinema opportunities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('inquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-gold flex items-center gap-2"
              >
                <Phone size={14} />
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section id="inquiry" ref={ref} className="py-10 bg-white overflow-hidden">
        <div className="container-wide px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="section-label mb-3">REACH US</p>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 700,
                color: '#1C1F2E',
                letterSpacing: '0.04em',
              }}
            >
              GET IN TOUCH
            </h2>
            <div className="gold-rule mx-auto mb-6" />

            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.95rem',
                color: '#4A4E5A',
                lineHeight: 1.8,
              }}
            >
              Have a construction requirement, cinema production proposal or business inquiry? Get in touch with Ravisha Groups 2 and we'll get back to you promptly.
            </p>
          </motion.div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-sm transition-all duration-300 hover:shadow-lg"
              style={{ background: '#FDFBF7', border: '1px solid #E2DDD4' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
                style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}
              >
                <MapPin size={20} style={{ color: '#B8962E' }} />
              </div>
              <h3
                className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1C1F2E' }}
              >
                OFFICE LOCATION
              </h3>
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.88rem',
                  color: '#4A4E5A',
                  lineHeight: 1.6,
                }}
              >
                No. C2/5, 2nd floor, South Sivan Kovil street,<br />
                Puliyur Housing Board, Kodambakkam,<br />
                Chennai - 600 024.
              </p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-sm transition-all duration-300 hover:shadow-lg"
              style={{ background: '#FDFBF7', border: '1px solid #E2DDD4' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
                style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}
              >
                <Mail size={20} style={{ color: '#B8962E' }} />
              </div>
              <h3
                className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1C1F2E' }}
              >
                EMAIL ADDRESS
              </h3>
              <a
                href="mailto:ravishagroups2@gmail.com"
                className="hover:text-[#B8962E] transition-colors"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.88rem',
                  color: '#4A4E5A',
                }}
              >
                ravishagroups2@gmail.com
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-center text-center p-6 rounded-sm transition-all duration-300 hover:shadow-lg"
              style={{ background: '#FDFBF7', border: '1px solid #E2DDD4' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
                style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}
              >
                <Phone size={20} style={{ color: '#B8962E' }} />
              </div>
              <h3
                className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1C1F2E' }}
              >
                PHONE NUMBERS
              </h3>
              <div className="flex flex-col gap-1">
                {[
                  { display: '+91 98412 75113', tel: '+919841275113' },
                  { display: '+91 73974 99035', tel: '+917397499035' },
                  { display: '+91 90031 44864', tel: '+919003144864' },
                ].map(({ display, tel }) => (
                  <a
                    key={tel}
                    href={`tel:${tel}`}
                    className="hover:text-[#B8962E] transition-colors"
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: '0.88rem',
                      color: '#4A4E5A',
                    }}
                  >
                    {display}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InquirySection;
