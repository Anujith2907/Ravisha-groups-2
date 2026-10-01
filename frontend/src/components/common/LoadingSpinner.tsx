const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-stone-950 z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin" />
      <p className="text-stone-400 text-xs tracking-widest uppercase font-body">Loading</p>
    </div>
  </div>
);

export default LoadingSpinner;
