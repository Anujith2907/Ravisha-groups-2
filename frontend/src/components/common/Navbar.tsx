import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '/', section: null },
  { label: 'FOUNDER', href: '/#founder', section: 'founder' },
  {
    label: 'OUR BUSINESSES',
    href: '/#businesses',
    section: 'businesses',
    dropdown: [
      { label: 'Construction', href: '/construction' },
      { label: 'Cinema Production', href: '/production' },
    ],
  },
  { label: 'ABOUT US', href: '/#about', section: 'about' },
];



const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleNavClick = (href: string, section: string | null) => {
    setMenuOpen(false);
    setDropdownOpen(false);
    if (section && location.pathname === '/') {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.split('#')[0]) && href !== '/';
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : 'navbar-hero'}`}
        style={{ padding: scrolled ? '0.35rem 0' : '0.6rem 0' }}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/logo.png"
              alt="Ravisha Groups 2"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>


          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 py-1 group">
                    <span
                      className={`text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 ${
                        scrolled
                          ? 'nav-blink hover:text-[#B8962E]'
                          : 'text-white/90 hover:text-[#C9A038]'
                      }`}
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      {link.label}
                    </span>
                    <ChevronDown size={11} className={scrolled ? 'text-[#B8962E]' : 'text-[#C9A038]'} style={{ marginTop: 1 }} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-1 bg-white border border-[#E2DDD4] shadow-lg rounded min-w-[180px] z-50"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="block px-4 py-3 text-[11px] font-bold tracking-widest uppercase text-[#1C1F2E]/70 hover:text-[#B8962E] hover:bg-[#F8F7F4] transition-colors border-b border-[#EDE9E2] last:border-0"
                            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link.href, link.section)}
                  className="relative group py-1"
                >
                  <span
                    className={`text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 ${
                      scrolled
                        ? isActive(link.href) ? 'nav-blink-active' : 'nav-blink'
                        : isActive(link.href) ? 'text-[#C9A038]' : 'text-white/90 hover:text-[#C9A038]'
                    }`}
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#C9A038] transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            ))}

            {/* Contact Us Button — gold outline on dark hero, animated when scrolled */}
            {scrolled ? (
              <Link
                to="/#inquiry"
                onClick={() => handleNavClick('/#inquiry', 'inquiry')}
                className="ml-2 btn-animated-gold"
              >
                <span>CONTACT US</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B04A] animate-ping" />
              </Link>
            ) : (
              <Link
                to="/#inquiry"
                onClick={() => handleNavClick('/#inquiry', 'inquiry')}
                className="ml-2 px-4 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#C9A038] hover:text-[#0D1322] hover:border-[#C9A038]"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  border: '1.5px solid rgba(201,160,56,0.8)',
                  color: '#C9A038',
                  borderRadius: '4px',
                }}
              >
                CONTACT US
              </Link>
            )}


          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 ${scrolled ? 'text-[#1C1F2E]' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-white"
            style={{ paddingTop: '5rem' }}
          >
            <div className="container-wide flex flex-col gap-0 pt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => handleNavClick(link.href, link.section)}
                    className="block py-4 border-b border-[#E2DDD4]"
                  >
                    <span
                      className="text-lg font-semibold text-[#1C1F2E] tracking-wider hover:text-[#B8962E] transition-colors"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="container-wide mt-auto pb-12">
              <Link
                to="/#inquiry"
                onClick={() => handleNavClick('/#inquiry', 'inquiry')}
                className="btn-gold w-full justify-center text-center mt-6"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
