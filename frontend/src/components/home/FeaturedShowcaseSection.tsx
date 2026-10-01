import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { projectsAPI, productionsAPI } from '../../services/api';
import { Project, Production } from '../../types';

// Fallback initial data to guarantee the homepage ALWAYS displays the exact reference UI cards
const DEFAULT_PROJECTS: Partial<Project>[] = [
  {
    _id: 'p1',
    name: 'Ravisha Heights',
    type: 'Residential Building',
    location: 'Chennai',
    year: '2023',
    mainImage: { url: '/construction-bg.jpg', publicId: 'p1' },
    status: 'Completed',
  },
  {
    _id: 'p2',
    name: 'Ravisha Corporate Tower',
    type: 'Commercial Building',
    location: 'Bengaluru',
    year: '2022',
    mainImage: { url: '/construction-bg.jpg', publicId: 'p2' },
    status: 'Completed',
  },
  {
    _id: 'p3',
    name: 'Ravisha Residency',
    type: 'Luxury Apartments',
    location: 'Coimbatore',
    year: '2021',
    mainImage: { url: '/construction-bg.jpg', publicId: 'p3' },
    status: 'Completed',
  },
];

const DEFAULT_FILMS: Partial<Production>[] = [
  {
    _id: 'f1',
    title: 'Veliyoram',
    productionRole: 'Production Contribution',
    year: '2023',
    mainPoster: { url: '/production-bg.jpg', publicId: 'f1' },
  },
  {
    _id: 'f2',
    title: 'The Silence',
    productionRole: 'Co-Produced',
    year: '2022',
    mainPoster: { url: '/production-bg.jpg', publicId: 'f2' },
  },
  {
    _id: 'f3',
    title: 'Pirivu',
    productionRole: 'Production Contribution',
    year: '2021',
    mainPoster: { url: '/production-bg.jpg', publicId: 'f3' },
  },
];

const FeaturedShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [projects, setProjects] = useState<Partial<Project>[]>(DEFAULT_PROJECTS);
  const [films, setFilms] = useState<Partial<Production>[]>(DEFAULT_FILMS);

  useEffect(() => {
    projectsAPI
      .getAll(true)
      .then((res) => {
        if (res.data && res.data.length > 0) setProjects(res.data.slice(0, 3));
      })
      .catch(() => null);

    productionsAPI
      .getAll(true)
      .then((res) => {
        if (res.data && res.data.length > 0) setFilms(res.data.slice(0, 3));
      })
      .catch(() => null);
  }, []);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-[#040712]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT CONTAINER: FEATURED CONSTRUCTION PROJECTS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="p-6 md:p-8 rounded-xl border border-amber-500/20 bg-stone-950/80 shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Box Header */}
              <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-amber-500/20">
                <h3
                  className="text-lg md:text-xl font-bold tracking-wider text-amber-400 uppercase"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  FEATURED CONSTRUCTION PROJECTS
                </h3>
                <Link
                  to="/construction"
                  className="flex items-center gap-1.5 text-xs font-bold text-stone-300 hover:text-amber-400 uppercase tracking-widest transition-colors"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span>VIEW PROJECTS</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* 3 Project Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <Link
                    key={proj._id}
                    to="/construction"
                    className="group overflow-hidden rounded-lg border border-amber-500/20 bg-stone-900/60 p-3 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] rounded overflow-hidden mb-3 relative">
                      <img
                        src={proj.mainImage?.url || '/construction-bg.jpg'}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    <div>
                      <h4
                        className="text-white font-bold text-sm mb-1 group-hover:text-amber-300 transition-colors line-clamp-1"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        {proj.name}
                      </h4>
                      <p className="text-stone-400 text-[11px] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {proj.type}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-stone-500" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {proj.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={9} /> {proj.location}
                          </span>
                        )}
                        {proj.year && (
                          <span className="flex items-center gap-1">
                            <Calendar size={9} /> {proj.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTAINER: FEATURED FILM PRODUCTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="p-6 md:p-8 rounded-xl border border-amber-500/20 bg-stone-950/80 shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Box Header */}
              <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-amber-500/20">
                <h3
                  className="text-lg md:text-xl font-bold tracking-wider text-amber-400 uppercase"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  FEATURED FILM PRODUCTIONS
                </h3>
                <Link
                  to="/production"
                  className="flex items-center gap-1.5 text-xs font-bold text-stone-300 hover:text-amber-400 uppercase tracking-widest transition-colors"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span>VIEW PRODUCTIONS</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* 3 Film Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {films.map((film) => (
                  <Link
                    key={film._id}
                    to="/production"
                    className="group overflow-hidden rounded-lg border border-amber-500/20 bg-stone-900/60 p-3 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="aspect-[3/4] rounded overflow-hidden mb-3 relative">
                      <img
                        src={film.mainPoster?.url || '/production-bg.jpg'}
                        alt={film.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4
                          className="text-amber-300 font-extrabold text-sm tracking-wider uppercase drop-shadow-md"
                          style={{ fontFamily: 'Cinzel, serif' }}
                        >
                          {film.title}
                        </h4>
                      </div>
                    </div>
                    <div>
                      <p className="text-stone-300 text-[11px] font-semibold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {film.productionRole}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-stone-500" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        <Calendar size={9} />
                        <span>{film.year}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedShowcaseSection;
