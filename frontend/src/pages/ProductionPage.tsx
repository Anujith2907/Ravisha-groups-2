import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, Calendar, Star, Play } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { productionsAPI } from '../services/api';
import { Production } from '../types';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const FilmDetail = ({
  film,
  onClose,
}: {
  film: Production;
  onClose: () => void;
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const slides = [
    ...(film.mainPoster?.url ? [{ src: film.mainPoster.url }] : []),
    ...(film.stills || []).map((img) => ({
      src: typeof img === 'string' ? img : img.url,
    })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-md"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-12 h-12 border border-[#E2DDD4] bg-white flex items-center justify-center hover:border-[#B8962E] hover:text-[#B8962E] transition-all shadow-md"
        id="film-detail-close"
      >
        <X size={20} className="text-[#1C1F2E]" />
      </button>

      <div className="container-wide py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Left Poster */}
            <div className="lg:col-span-4">
              {film.mainPoster?.url && (
                <div
                  className="relative overflow-hidden rounded-sm border border-[#E2DDD4] cursor-pointer group shadow-xl"
                  style={{ aspectRatio: '2/3' }}
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={film.mainPoster.url}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#1C1F2E] font-bold text-xs px-4 py-2 tracking-widest uppercase shadow-lg">
                      VIEW POSTER
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="lg:col-span-8">
              <span className="section-label block mb-3">
                {Array.isArray(film.genre) ? film.genre.join(' • ') : (film.genre || 'FEATURE FILM')}
              </span>
              <h2
                className="text-[#1C1F2E] mb-4"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                }}
              >
                {film.title}
              </h2>
              <div className="gold-rule mb-6" />

              <div className="flex flex-wrap gap-6 text-[#7C8099] text-sm mb-8">
                {film.year && (
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#B8962E]" /> {film.year}
                  </span>
                )}
                {film.director && (
                  <span className="flex items-center gap-2">
                    <Film size={16} className="text-[#B8962E]" /> Directed by {film.director}
                  </span>
                )}
                {film.productionRole && (
                  <span className="flex items-center gap-2 font-bold text-[#B8962E]">
                    <Star size={16} /> {film.productionRole}
                  </span>
                )}
              </div>

              <h3
                className="text-lg font-bold text-[#1C1F2E] mb-3"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                SYNOPSIS
              </h3>
              <p
                className="text-[#4A4E5A] leading-relaxed text-base mb-8 whitespace-pre-line"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {film.synopsis}
              </p>

              {/* Cast & Crew */}
              {film.cast && film.cast.length > 0 && (
                <div className="bg-[#F8F7F4] p-6 rounded-sm border border-[#E2DDD4] mb-8">
                  <h4
                    className="text-xs font-bold text-[#1C1F2E] tracking-widest uppercase mb-4"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    KEY CAST & CREW
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    {film.cast.map((c: any, i: number) => (
                      <div key={i}>
                        <span className="font-bold text-[#1C1F2E] block">
                          {typeof c === 'string' ? c : c.name}
                        </span>
                        {typeof c !== 'string' && c.role && (
                          <span className="text-[#7C8099] text-xs">{c.role}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trailer Button */}
              {film.trailerUrl && (
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <Play size={16} /> WATCH TRAILER
                </a>
              )}
            </div>
          </div>

          {/* Stills Gallery */}
          {film.stills && film.stills.length > 0 && (
            <div>
              <h3
                className="text-lg font-bold text-[#1C1F2E] mb-6"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                PRODUCTION STILLS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {film.stills.map((img: any, index: number) => (
                  <div
                    key={index}
                    className="relative overflow-hidden cursor-pointer group aspect-video rounded-sm border border-[#E2DDD4]"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <img
                      src={typeof img === 'string' ? img : img.url}
                      alt={`${film.title} Still ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
      />
    </motion.div>
  );
};

const ProductionPage = () => {
  const [films, setFilms] = useState<Production[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedFilm, setSelectedFilm] = useState<Production | null>(null);

  useEffect(() => {
    document.title = 'Cinema Production Division | Ravisha Groups 2';
    productionsAPI.getAll().then((res) => setFilms(res.data)).catch(() => null);
  }, []);

  const roles = ['all', ...Array.from(new Set(films.map((f) => f.productionRole).filter(Boolean)))];
  const filteredFilms =
    selectedRole === 'all'
      ? films
      : films.filter((f) => f.productionRole === selectedRole);

  return (
    <div className="min-h-screen bg-white text-[#1C1F2E]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-[#1C1F2E] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url("/production-bg.jpg")' }}
        />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <h1

              className="text-white mb-4"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              CINEMA PRODUCTION
            </h1>
            <p
              className="text-[#D4B04A] font-bold text-sm tracking-widest uppercase mb-6"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              CREATING STORIES. SHAPING CINEMA.
            </p>
            <p
              className="text-stone-300 text-base leading-relaxed"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Bringing compelling narratives to life through creative production, artistic direction, and strategic cinema investments across major Indian film industries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content — only rendered if films exist */}
      {films.length > 0 && (
        <section className="py-12 lg:py-16 bg-[#F8F7F4]">
          <div className="container-wide">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E2DDD4]">
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all ${
                      selectedRole === role
                        ? 'bg-[#B8962E] text-white shadow-sm'
                        : 'bg-white text-[#1C1F2E] border border-[#E2DDD4] hover:border-[#B8962E]'
                    }`}
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {role === 'all' ? 'All Productions' : role}
                  </button>
                ))}
              </div>

              <span className="text-xs text-[#7C8099] font-medium tracking-wider uppercase">
                Showing {filteredFilms.length} Films
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFilms.map((film, index) => (
                <motion.div
                  key={film._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => setSelectedFilm(film)}
                  className="group cursor-pointer bg-white border border-[#E2DDD4] rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-[2/3]">
                    {film.mainPoster?.url ? (
                      <img
                        src={film.mainPoster.url}
                        alt={film.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F4F1EA] flex items-center justify-center">
                        <Film size={36} className="text-[#B8962E]/50" />
                      </div>
                    )}
                    {film.productionRole && (
                      <div className="absolute top-4 right-4 bg-[#1C1F2E] text-[#D4B04A] text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-sm border border-[#B8962E]/30">
                        {film.productionRole}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {film.year && (
                        <span className="text-[11px] font-bold text-[#B8962E] tracking-widest uppercase block mb-1">
                          RELEASED {film.year}
                        </span>
                      )}
                      <h3
                        className="text-lg font-bold text-[#1C1F2E] group-hover:text-[#B8962E] transition-colors mb-2"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        {film.title}
                      </h3>
                      <p
                        className="text-xs text-[#4A4E5A] line-clamp-2 leading-relaxed mb-4"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {film.synopsis}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#EDE9E2] flex items-center justify-between text-xs text-[#7C8099]">
                      {film.director ? (
                        <span className="truncate max-w-[180px]">Dir: {film.director}</span>
                      ) : <span />}
                      <span className="font-bold text-[#B8962E] tracking-wider uppercase text-[10px] group-hover:translate-x-1 transition-transform">
                        EXPLORE FILM →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Film Detail Modal */}
      <AnimatePresence>
        {selectedFilm && (
          <FilmDetail
            film={selectedFilm}
            onClose={() => setSelectedFilm(null)}
          />
        )}
      </AnimatePresence>

      {/* Industry Connections */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10">
            <p className="section-label mb-3">COLLABORATIONS</p>
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#1C1F2E',
              }}
            >
              INDUSTRY CONNECTIONS
            </h2>
            <div className="gold-rule mt-4" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                title: 'With Aravind Akash',
                description:
                  'Celebrating a memorable association with actor Aravind Akash and the world of Tamil cinema.',
                image: '/cinema-aravind-akash.jpg',
                objectPosition: 'center top',
              },
              {
                title: 'With Suresh Chandra Menon',
                description:
                  'With acclaimed filmmaker Suresh Chandra Menon, celebrating creativity, innovation, and inspiring industry collaborations.',
                image: '/cinema-suresh-chandra-menon-1.jpg',
                objectPosition: 'center top',
              },
              {
                title: 'With K. Bhagyaraj',
                description:
                  'An inspiring moment with legendary actor-director K. Bhagyaraj, whose contributions continue to influence generations of filmmakers.',
                image: '/cinema-k-bhagyaraj.jpg',
                objectPosition: 'center 5%',
              },
              {
                title: 'With Mani Ratnam',
                description:
                  'Honored to meet iconic filmmaker Mani Ratnam, a visionary storyteller who has redefined Indian cinema.',
                image: '/cinema-mani-ratnam.jpg',
                objectPosition: 'center 5%',
              },
              {
                title: 'With Mohanlal',
                description:
                  'A distinguished collaboration with Mohanlal, one of Indian cinema’s most celebrated actors.',
                image: '/cinema-mohanlal.jpg',
                objectPosition: 'center 65%',
              },
              {
                title: 'With Suresh Chandra Menon',
                description:
                  'Another memorable interaction with acclaimed filmmaker Suresh Chandra Menon, reflecting a shared passion for cinematic excellence and creative leadership.',
                image: '/cinema-suresh-chandra-menon-2.jpg',
                objectPosition: 'center 15%',
              },
              {
                title: 'With Rajinikanth, Director Shankar & Atlee — Endhiran',
                description:
                  'A memorable journey alongside Actor Rajinikanth, Director Shankar, and Atlee during the making of Endhiran 1.',
                image: '/cinema-endhiran-group.jpg',
                objectPosition: 'center 20%',
              },
              {
                title: 'Endhiran — Behind the Scenes with Rajinikanth, Shankar & Atlee',
                description:
                  'Celebrating unforgettable moments with the Endhiran cast and crew.',
                image: '/cinema-endhiran-rajinikanth.jpg',
                objectPosition: 'center 15%',
              },
            ].map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden mb-4"
                  style={{
                    aspectRatio: '4/3',
                    border: '1px solid #E2DDD4',
                    boxShadow: '0 2px 18px 0 rgba(28,31,46,0.07)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: item.objectPosition }}
                    loading="lazy"
                  />
                  {/* Gold bottom line on hover */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#B8962E] transition-all duration-500 w-0 group-hover:w-full" />
                  {/* Gold corner accents */}
                  <div
                    className="absolute top-0 left-0 w-10 h-10"
                    style={{ borderTop: '2px solid #B8962E', borderLeft: '2px solid #B8962E' }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-10 h-10"
                    style={{ borderBottom: '2px solid #B8962E', borderRight: '2px solid #B8962E' }}
                  />
                </div>

                {/* Info */}
                <h3
                  className="group-hover:text-[#B8962E] transition-colors duration-200 mb-1"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#1C1F2E',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.82rem',
                    color: '#7C8099',
                    lineHeight: 1.7,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductionPage;
