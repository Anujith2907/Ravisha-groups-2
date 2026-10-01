import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { mediaAPI } from '../../services/api';
import { Media } from '../../types';

const CATEGORIES = ['construction', 'production', 'founder', 'general'] as const;
type Category = typeof CATEGORIES[number];

const AdminGalleryPage = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [uploadCategory, setUploadCategory] = useState<Category>('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await mediaAPI.getAll(selectedCategory === 'all' ? undefined : selectedCategory);
      setMedia(res.data);
    } catch { toast.error('Failed to load media.'); }
    finally { setLoading(false); }
  }, [selectedCategory]);

  useEffect(() => {
    document.title = 'Gallery | Ravisha Groups 2 Admin';
    fetchMedia();
  }, [fetchMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        await mediaAPI.upload(file, uploadCategory);
      }
      toast.success(`${files.length} image(s) uploaded.`);
      fetchMedia();
    } catch { toast.error('Upload failed.'); }
    finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image permanently?')) return;
    try {
      await mediaAPI.delete(id);
      toast.success('Image deleted.');
      setMedia((prev) => prev.filter((m) => m._id !== id));
    } catch { toast.error('Failed to delete.'); }
  };

  const filteredMedia = media;

  return (
    <div className="admin-body min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="mb-8">
          <p className="text-stone-600 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>MEDIA</p>
          <h1 className="text-white text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gallery Management</h1>
        </div>

        {/* Upload controls */}
        <div className="admin-card mb-8">
          <h2 className="text-white text-sm tracking-widest uppercase mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>UPLOAD IMAGES</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Category</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value as Category)}
                className="admin-select w-48"
                id="gallery-category-select"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="pt-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleUpload}
                id="gallery-upload-input"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn-primary"
                id="gallery-upload-btn"
              >
                {uploading ? (
                  <><Loader2 size={14} className="animate-spin" /> UPLOADING...</>
                ) : (
                  <><Upload size={14} /> UPLOAD IMAGES</>
                )}
              </button>
            </div>
          </div>
          <p className="text-stone-700 text-xs mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            Supported: JPG, PNG, WebP · Max 10MB each · Multiple files supported
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all ${
                selectedCategory === cat
                  ? 'border-maroon-700 text-maroon-700 bg-maroon-700/10'
                  : 'border-white/10 text-stone-500 hover:border-white/30 hover:text-white'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
              id={`filter-${cat}`}
            >
              {cat === 'all' ? 'ALL' : cat.toUpperCase()}
            </button>
          ))}
          <span className="ml-auto text-stone-600 text-xs self-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            {filteredMedia.length} {filteredMedia.length === 1 ? 'IMAGE' : 'IMAGES'}
          </span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="admin-card text-center py-16">
            <p className="text-stone-500 text-sm tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>NO IMAGES IN THIS CATEGORY</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group aspect-square overflow-hidden border"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <img
                  src={item.url}
                  alt={item.alt || 'Gallery image'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <span
                    className="text-white text-xs tracking-widest uppercase px-2 py-0.5"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(139,26,26,0.7)',
                    }}
                  >
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-600/80 text-white hover:bg-red-600 transition-colors rounded-sm"
                    title="Delete image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminGalleryPage;
