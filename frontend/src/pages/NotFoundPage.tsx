import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{ background: '#0A0A0A' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-maroon-700 text-xs tracking-widest uppercase mb-8"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          ERROR 404
        </p>
        <h1
          className="text-hero text-white mb-6 opacity-20"
          style={{ fontSize: 'clamp(6rem, 20vw, 18rem)' }}
        >
          404
        </h1>
        <h2
          className="text-display text-white mb-4 -mt-8"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          PAGE NOT FOUND
        </h2>
        <p
          className="text-stone-500 text-sm mb-12"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn-primary group">
          <Home size={14} />
          BACK TO HOME
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
