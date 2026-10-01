import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Building2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { projectsAPI } from '../services/api';
import { Project } from '../types';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ProjectDetail = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = [
    ...(project.mainImage?.url ? [{ src: project.mainImage.url }] : []),
    ...project.additionalImages.map((img) => ({ src: img.url })),
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
        id="project-detail-close"
      >
        <X size={20} className="text-[#1C1F2E]" />
      </button>

      <div className="container-wide py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category + name */}
          <div className="mb-10">
            {project.type && (
              <span className="section-label block mb-3">{project.type}</span>
            )}
            <h2
              className="text-[#1C1F2E] mb-4"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
              }}
            >
              {project.name}
            </h2>
            <div className="gold-rule mb-6" />
            <div className="flex flex-wrap gap-6 text-[#7C8099] text-sm">
              {project.location && (
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#B8962E]" /> {project.location}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#B8962E]" /> {project.year}
                </span>
              )}
            </div>
          </div>

          {/* Main Image */}
          {project.mainImage?.url && (
            <div
              className="relative overflow-hidden mb-12 cursor-pointer group rounded-sm border border-[#E2DDD4]"
              style={{ aspectRatio: '16/9', maxHeight: '550px' }}
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
            >
              <img
                src={project.mainImage.url}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-[#1C1F2E] font-bold text-xs px-4 py-2 tracking-widest uppercase shadow-lg">
                  ENLARGE IMAGE
                </span>
              </div>
            </div>
          )}

          {/* Details & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h3
                className="text-lg font-bold text-[#1C1F2E] mb-4"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                PROJECT OVERVIEW
              </h3>
              <p
                className="text-[#4A4E5A] leading-relaxed whitespace-pre-line text-base"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {project.description}
              </p>
            </div>

            <div className="bg-[#F8F7F4] p-8 rounded-sm border border-[#E2DDD4] h-fit">
              <h3
                className="text-sm font-bold text-[#1C1F2E] tracking-widest uppercase mb-6"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                PROJECT SPECIFICATIONS
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[#7C8099] block text-xs tracking-wider uppercase mb-1">
                    Client
                  </span>
                  <span className="font-medium text-[#1C1F2E]">
                    {project.client || 'Ravisha Groups'}
                  </span>
                </div>
                <div>
                  <span className="text-[#7C8099] block text-xs tracking-wider uppercase mb-1">
                    Status
                  </span>
                  <span className="font-medium text-[#B8962E] capitalize">
                    {project.status}
                  </span>
                </div>
                {project.area && (
                  <div>
                    <span className="text-[#7C8099] block text-xs tracking-wider uppercase mb-1">
                      Built-up Area
                    </span>
                    <span className="font-medium text-[#1C1F2E]">{project.area}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gallery */}
          {project.additionalImages && project.additionalImages.length > 0 && (
            <div>
              <h3
                className="text-lg font-bold text-[#1C1F2E] mb-6"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                GALLERY
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.additionalImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden cursor-pointer group aspect-square rounded-sm border border-[#E2DDD4]"
                    onClick={() => {
                      setLightboxIndex(index + (project.mainImage ? 1 : 0));
                      setLightboxOpen(true);
                    }}
                  >
                    <img
                      src={img.url}
                      alt={`${project.name} ${index + 1}`}
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
        index={lightboxIndex}
        slides={allImages}
      />
    </motion.div>
  );
};

const ConstructionPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.title = 'Construction Division | Ravisha Groups';
    projectsAPI.getAll().then((res) => setProjects(res.data)).catch(() => null);
  }, []);

  const types = ['all', ...Array.from(new Set(projects.map((p) => p.type).filter(Boolean)))];
  const filteredProjects =
    selectedType === 'all'
      ? projects
      : projects.filter((p) => p.type === selectedType);

  return (
    <div className="min-h-screen bg-white text-[#1C1F2E]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-[#1C1F2E] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url("/construction-bg.jpg")' }}
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
              CONSTRUCTION
            </h1>
            <p
              className="text-[#D4B04A] font-bold text-sm tracking-widest uppercase mb-6"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              BUILT WITH VISION. CRAFTED TO LAST.
            </p>
            <p
              className="text-stone-300 text-base leading-relaxed"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Delivering premium architectural marvels, modern residential complexes, and strategic commercial developments with unyielding structural integrity and aesthetic precision.
            </p>
          </div>
        </div>
      </section>

      {/* Main Projects Content — only rendered if projects exist */}
      {projects.length > 0 && (
        <section className="py-12 lg:py-16 bg-[#F8F7F4]">
          <div className="container-wide">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E2DDD4]">
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all ${
                      selectedType === type
                        ? 'bg-[#B8962E] text-white shadow-sm'
                        : 'bg-white text-[#1C1F2E] border border-[#E2DDD4] hover:border-[#B8962E]'
                    }`}
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {type === 'all' ? 'All Projects' : type}
                  </button>
                ))}
              </div>

              <span className="text-xs text-[#7C8099] font-medium tracking-wider uppercase">
                Showing {filteredProjects.length} Projects
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-white border border-[#E2DDD4] rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    {project.mainImage?.url ? (
                      <img
                        src={project.mainImage.url}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F4F1EA] flex items-center justify-center">
                        <Building2 size={32} className="text-[#B8962E]/50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-[#1C1F2E] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-sm">
                      {project.status}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {project.type && (
                        <span className="text-[11px] font-bold text-[#B8962E] tracking-widest uppercase block mb-1">
                          {project.type}
                        </span>
                      )}
                      <h3
                        className="text-lg font-bold text-[#1C1F2E] group-hover:text-[#B8962E] transition-colors mb-2"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        {project.name}
                      </h3>
                      <p
                        className="text-xs text-[#4A4E5A] line-clamp-2 leading-relaxed mb-4"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#EDE9E2] flex items-center justify-between text-xs text-[#7C8099]">
                      {project.location ? (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-[#B8962E]" /> {project.location}
                        </span>
                      ) : <span />}
                      <span className="font-bold text-[#B8962E] tracking-wider uppercase text-[10px] group-hover:translate-x-1 transition-transform">
                        VIEW DETAILS →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Interiors Gallery */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10">
            <p className="section-label mb-3">INTERIORS</p>
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#1C1F2E',
              }}
            >
              OUR INTERIORS
            </h2>
            <div className="gold-rule mt-4" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                title: 'Living Room',
                description: 'Elegant interiors crafted for modern and comfortable living.',
                image: '/interior-living-room.jpg',
              },
              {
                title: 'Kitchen',
                description: 'A thoughtfully designed modular kitchen blending style, functionality, and convenience.',
                image: '/interior-kitchen.jpg',
              },
              {
                title: 'Bedroom',
                description: 'A serene and sophisticated bedroom designed for comfort and relaxation.',
                image: '/interior-bedroom.jpg',
              },
              {
                title: 'Living & Dining',
                description: 'Spacious, contemporary interiors designed for seamless living and memorable moments.',
                image: '/interior-living-dining.jpg',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
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
                    aspectRatio: '16/10',
                    border: '1px solid #E2DDD4',
                    boxShadow: '0 2px 18px 0 rgba(28,31,46,0.06)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

export default ConstructionPage;
