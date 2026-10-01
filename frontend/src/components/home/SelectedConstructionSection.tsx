import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { projectsAPI } from '../../services/api';
import { Project } from '../../types';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden mb-4"
        style={{
          aspectRatio: '4/3',
          border: '1px solid #E2DDD4',
        }}
      >
        {project.mainImage?.url ? (
          <img
            src={project.mainImage.url}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: '#F4F1EA' }}
          >
            <p className="text-xs tracking-widest text-[#B8962E] uppercase">
              [PROJECT IMAGE]
            </p>
          </div>
        )}
        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'rgba(184, 150, 46, 0.08)' }}
        />
        {/* Gold bottom line on hover */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-[#B8962E] transition-all duration-500 w-0 group-hover:w-full"
        />
      </div>

      {/* Info */}
      <h3
        className="group-hover:text-[#B8962E] transition-colors duration-200 mb-1"
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#1C1F2E',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {project.name}
      </h3>
      <div className="flex flex-wrap gap-3 text-[#7C8099]" style={{ fontSize: '0.72rem' }}>
        {project.type && (
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
            {project.type}
          </span>
        )}
        {project.location && (
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {project.location}
          </span>
        )}
        {project.year && (
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {project.year}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const SelectedConstructionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    projectsAPI.getAll().then((res) => {
      setProjects(res.data.slice(0, 3));
    }).catch(() => null);
  }, []);

  if (projects.length === 0) return null;

  return (
    <section ref={ref} className="section-padding bg-[#F8F7F4]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 flex items-center justify-center rounded-full"
              style={{ background: '#F5EDD6', border: '1px solid #B8962E' }}
            >
              <span style={{ color: '#B8962E', fontSize: '0.65rem', fontWeight: 700 }}>A</span>
            </div>
            <h2
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#1C1F2E',
                textTransform: 'uppercase',
              }}
            >
              FEATURED CONSTRUCTION PROJECTS
            </h2>
          </div>
          <Link
            to="/construction"
            className="flex items-center gap-1.5 text-[#B8962E] hover:text-[#9A7A20] transition-colors"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            VIEW ALL PROJECTS
            <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedConstructionSection;
