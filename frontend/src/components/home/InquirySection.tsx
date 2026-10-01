import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react';
import { inquiriesAPI } from '../../services/api';

interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}

const INQUIRY_TYPES = [
  'Construction',
  'Cinema Production',
  'Business Partnership',
  'General Inquiry',
  'Other',
];

const InquirySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>();

  const onSubmit = async (data: InquiryFormData) => {
    setStatus('loading');
    try {
      await inquiriesAPI.submit(data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

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
                Connect with Ravisha Groups for business, construction and cinema opportunities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('inquiry-form');
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

      {/* Contact Form Section */}
      <section id="inquiry" ref={ref} className="section-padding bg-white overflow-hidden">
        <div className="container-wide px-4 sm:px-8 md:px-12 lg:px-16">
          <div id="inquiry-form" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <p className="section-label mb-3">REACH US</p>
              <h2
                className="mb-5"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#1C1F2E',
                  letterSpacing: '0.04em',
                }}
              >
                GET IN TOUCH
              </h2>
              <div className="gold-rule mb-6" />

              <p
                className="mb-8"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.9rem',
                  color: '#4A4E5A',
                  lineHeight: 1.8,
                }}
              >
                Have a construction requirement, cinema production proposal or business inquiry? Get in touch with Ravisha Groups and we'll get back to you promptly.
              </p>

              {/* Contact details */}
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-sm" style={{ background: '#FDFBF7', border: '1px solid #E2DDD4' }}>
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                    style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}
                  >
                    <MapPin size={15} style={{ color: '#B8962E' }} />
                  </div>
                  <div>
                    <h4
                      className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1C1F2E' }}
                    >
                      OFFICE LOCATION
                    </h4>
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
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-sm" style={{ background: '#FDFBF7', border: '1px solid #E2DDD4' }}>
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}
                  >
                    <Mail size={15} style={{ color: '#B8962E' }} />
                  </div>
                  <div>
                    <h4
                      className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1C1F2E' }}
                    >
                      EMAIL ADDRESS
                    </h4>
                    <a
                      href="mailto:ravishagroups2@gmail.com"
                      className="hover:text-[#B8962E] transition-colors block"
                      style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '0.88rem',
                        color: '#4A4E5A',
                      }}
                    >
                      ravishagroups2@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-sm" style={{ background: '#FDFBF7', border: '1px solid #E2DDD4' }}>
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}
                  >
                    <Phone size={15} style={{ color: '#B8962E' }} />
                  </div>
                  <div>
                    <h4
                      className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1C1F2E' }}
                    >
                      PHONE NUMBER
                    </h4>
                    <a
                      href="tel:+919003144864"
                      className="hover:text-[#B8962E] transition-colors block"
                      style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '0.88rem',
                        color: '#4A4E5A',
                      }}
                    >
                      +91 90031 44864
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {status === 'success' ? (
                <div
                  className="flex flex-col items-center justify-center py-20 text-center border rounded-sm"
                  style={{ borderColor: '#B8962E', background: '#F5EDD6' }}
                >
                  <CheckCircle size={40} className="mb-6" style={{ color: '#B8962E' }} />
                  <h3
                    className="text-[#1C1F2E] text-xl font-bold mb-3"
                    style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}
                  >
                    THANK YOU
                  </h3>
                  <p
                    className="text-[#4A4E5A] text-sm max-w-xs leading-relaxed"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Your inquiry has been received. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-[#B8962E] text-xs tracking-widest uppercase font-bold hover:text-[#9A7A20] transition-colors"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {status === 'error' && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-sm border"
                      style={{ borderColor: '#EF4444', background: 'rgba(239,68,68,0.05)' }}
                    >
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                      <p
                        className="text-red-600 text-sm"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  <div>
                    <input
                      {...register('fullName', { required: 'Full name is required' })}
                      placeholder="FULL NAME *"
                      className="input-light"
                      id="inquiry-fullName"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                      })}
                      placeholder="EMAIL ADDRESS *"
                      type="email"
                      className="input-light"
                      id="inquiry-email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        minLength: { value: 6, message: 'Enter a valid phone number' },
                      })}
                      placeholder="PHONE NUMBER *"
                      type="tel"
                      className="input-light"
                      id="inquiry-phone"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <select
                      {...register('inquiryType', { required: 'Please select an inquiry type' })}
                      className="input-light"
                      id="inquiry-type"
                      style={{ cursor: 'pointer', appearance: 'none' }}
                    >
                      <option value="">INQUIRY TYPE *</option>
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p className="text-red-500 text-xs mt-1">{errors.inquiryType.message}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      {...register('message', {
                        required: 'Please provide your inquiry details',
                        minLength: { value: 10, message: 'Please provide more detail (min 10 chars)' },
                      })}
                      placeholder="INQUIRY DETAILS *"
                      rows={5}
                      className="input-light"
                      style={{ resize: 'vertical', minHeight: 120 }}
                      id="inquiry-message"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    id="inquiry-submit"
                    disabled={status === 'loading'}
                    className="btn-primary group"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        SUBMITTING...
                      </>
                    ) : (
                      <>
                        SUBMIT INQUIRY
                        <Send size={14} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p
                    className="text-center"
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: '0.72rem',
                      color: '#7C8099',
                    }}
                  >
                    * Required fields. We'll respond within 24 hours.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InquirySection;
