import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#1C1F2E', color: '#FFFFFF' }}>
      {/* Compact single row */}
      <div className="container-wide py-6">
        <div className="flex flex-wrap items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/logo-ravisha2.jpg"
              alt="Ravisha Groups"
              className="h-12 w-auto object-contain"
              style={{ mixBlendMode: 'screen', opacity: 0.95 }}
            />
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              Building Foundations.<br />Creating Stories.
            </p>
          </div>

          {/* Social Icons only */}
          <div className="flex items-center gap-2">
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Youtube, label: 'YouTube' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#B8962E] transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <Icon size={12} style={{ color: 'rgba(255,255,255,0.6)' }} />
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-wide py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
            © {currentYear} Ravisha Groups. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms & Conditions'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#B8962E] transition-colors"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
