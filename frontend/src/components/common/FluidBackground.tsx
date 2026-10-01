import React from 'react';

const FluidBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`} style={{ background: '#040714' }}>
      {/* Dynamic Fluid Gradient Blobs (Navy Blue, Cyan Silk, Deep Indigo, Subtle Maroon Glow) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Blob 1: Top-Right Deep Cyan/Blue Silk */}
        <div
          className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-80"
          style={{
            background: 'radial-gradient(circle at center, rgba(2, 132, 199, 0.5) 0%, rgba(30, 58, 138, 0.3) 45%, rgba(4, 7, 20, 0) 70%)',
            filter: 'blur(90px)',
            animation: 'fluidMorph 24s ease-in-out infinite alternate',
          }}
        />

        {/* Blob 2: Bottom-Left Electric Silk Aura */}
        <div
          className="absolute -bottom-[15%] -left-[10%] w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full opacity-75"
          style={{
            background: 'radial-gradient(circle at center, rgba(3, 105, 161, 0.45) 0%, rgba(139, 26, 26, 0.25) 50%, rgba(4, 7, 20, 0) 75%)',
            filter: 'blur(100px)',
            animation: 'fluidMorph 30s ease-in-out infinite reverse',
          }}
        />

        {/* Blob 3: Center Glowing Ribbon */}
        <div
          className="absolute top-[30%] left-[15%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.35) 0%, rgba(16, 185, 129, 0.15) 50%, rgba(4, 7, 20, 0) 70%)',
            filter: 'blur(110px)',
            animation: 'fluidMorph 20s ease-in-out infinite',
          }}
        />

        {/* Silk Wave Vignette Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(4, 7, 20, 0.85) 100%)',
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FluidBackground;
