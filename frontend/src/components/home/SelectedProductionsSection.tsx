import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productionsAPI } from '../../services/api';
import { Production } from '../../types';

const fallbackFilms: Production[] = [
  {
    _id: 'fallback-1',
    title: 'ENTHIRAN / ROBOT',
    year: '2010',
    productionRole: 'Executive Production & Art Direction',
    contribution: 'Art direction and production coordination for 200+ scenes',
    filmArtsDetails: 'Set management & creative production',
    description: 'A groundbreaking sci-fi epic featuring state-of-the-art visual effects and set design.',
    genre: 'Sci-Fi • Action',
    director: 'S. Shankar',
    synopsis: 'A groundbreaking sci-fi epic featuring state-of-the-art visual effects and set design.',
    mainPoster: { url: '/cinema-suresh-chandra-menon-1.jpg', publicId: 'f1' },
    mainImage: { url: '/cinema-suresh-chandra-menon-1.jpg', publicId: 'f1' },
    additionalImages: [],
    featured: true,
    order: 1,
    createdAt: '',
  },
  {
    _id: 'fallback-2',
    title: 'KABALI',
    year: '2016',
    productionRole: 'Production Coordination',
    contribution: 'Overseeing international film units',
    filmArtsDetails: 'Production coordination across Malaysia & India',
    description: 'A massive international production shot across Malaysia and India.',
    genre: 'Action • Drama',
    director: 'Pa. Ranjith',
    synopsis: 'A massive international production shot across Malaysia and India.',
    mainPoster: { url: '/cinema-suresh-chandra-menon-2.jpg', publicId: 'f2' },
    mainImage: { url: '/cinema-suresh-chandra-menon-2.jpg', publicId: 'f2' },
    additionalImages: [],
    featured: true,
    order: 2,
    createdAt: '',
  },
  {
    _id: 'fallback-3',
    title: 'VISHWAROOPAM',
    year: '2013',
    productionRole: 'Set Management & Production',
    contribution: 'Set management and logistics',
    filmArtsDetails: 'Art direction and international set coordination',
    description: 'High-octane spy action film produced on an international scale.',
    genre: 'Action • Thriller',
    director: 'Kamal Haasan',
    synopsis: 'High-octane spy action film produced on an international scale.',
    mainPoster: { url: '/cinema-mani-ratnam.jpg', publicId: 'f3' },
    mainImage: { url: '/cinema-mani-ratnam.jpg', publicId: 'f3' },
    additionalImages: [],
    featured: true,
    order: 3,
    createdAt: '',
  },
];

const FilmCard = ({ film, index }: { film: Production; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer bg-white border border-[#E2DDD4] rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Poster / Image Container */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/10' }}
      >
        <img
          src={film.mainPoster?.url || '/production-bg.jpg'}
          alt={film.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: 'center 10%' }}
          loading="lazy"
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-30 group-hover:opacity-10"
          style={{ background: 'linear-gradient(to top, rgba(28,31,46,0.8) 0%, transparent 60%)' }}
        />
        {/* Production Role Badge */}
        {film.productionRole && (
          <div className="absolute top-3 right-3 bg-[#1C1F2E]/90 text-[#D4B04A] text-[9px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm border border-[#B8962E]/30 backdrop-blur-xs">
            {film.productionRole}
          </div>
        )}
        {/* Gold bottom line on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-[#B8962E] transition-all duration-500 w-0 group-hover:w-full" />
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {film.year && (
            <span className="text-[10px] font-bold text-[#B8962E] tracking-widest uppercase block mb-1">
              {film.year} • CINEMA PRODUCTION
            </span>
          )}
          <h3
            className="group-hover:text-[#B8962E] transition-colors duration-200 text-base font-bold text-[#1C1F2E] mb-2"
            style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.04em' }}
          >
            {film.title}
          </h3>
          <p
            className="text-xs text-[#4A4E5A] line-clamp-2 leading-relaxed mb-3"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {film.synopsis}
          </p>
        </div>

        <div className="pt-3 border-t border-[#EDE9E2] flex items-center justify-between text-xs text-[#7C8099]">
          {film.director && (
            <span className="text-[11px] font-medium text-[#4A4E5A]">Dir: {film.director}</span>
          )}
          <span className="font-bold text-[#B8962E] tracking-wider uppercase text-[10px] group-hover:translate-x-1 transition-transform ml-auto">
            EXPLORE →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SelectedProductionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [films, setFilms] = useState<Production[]>([]);

  useEffect(() => {
    productionsAPI.getAll().then((res) => {
      if (res.data && res.data.length > 0) {
        setFilms(res.data.slice(0, 3));
      } else {
        setFilms(fallbackFilms);
      }
    }).catch(() => {
      setFilms(fallbackFilms);
    });
  }, []);

  const displayFilms = films.length > 0 ? films : fallbackFilms;

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-white border-t border-[#EDE9E2]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="section-label">CINEMA DIVISION</span>
              <div className="w-8 h-[1.5px] bg-[#B8962E]" />
            </div>
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#1C1F2E',
                letterSpacing: '0.04em',
              }}
            >
              FEATURED FILM PRODUCTIONS
            </h2>
          </div>
          <Link
            to="/production"
            className="inline-flex items-center gap-2 text-[#B8962E] hover:text-[#9A7A20] font-bold text-xs tracking-widest uppercase transition-colors"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            VIEW ALL PRODUCTIONS
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayFilms.map((film, i) => (
            <Link key={film._id} to="/production">
              <FilmCard film={film} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedProductionsSection;
