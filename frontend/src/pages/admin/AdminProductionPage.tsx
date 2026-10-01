import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, Upload, X, Loader2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { productionsAPI } from '../../services/api';
import { Production } from '../../types';

const ProductionForm = ({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Production>;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}) => {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: initial || {} });

  const submit = async (data: any) => {
    setSaving(true);
    try { await onSave(data); } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="admin-card mb-6">
      <h3 className="text-white text-lg font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        {initial?._id ? 'Edit Film' : 'Add New Film'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Film Title *</label>
          <input {...register('title', { required: true })} className="admin-input" placeholder="Film title" id="film-title" />
        </div>
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Year</label>
          <input {...register('year')} className="admin-input" placeholder="e.g. 2023" id="film-year" />
        </div>
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Production Role</label>
          <input {...register('productionRole')} className="admin-input" placeholder="e.g. Producer, Co-Producer" id="film-role" />
        </div>
        <div className="md:col-span-2">
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Contribution</label>
          <textarea {...register('contribution')} className="admin-textarea" rows={3} placeholder="Describe the contribution..." id="film-contribution" />
        </div>
        <div className="md:col-span-2">
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Film Arts Details</label>
          <textarea {...register('filmArtsDetails')} className="admin-textarea" rows={3} placeholder="Film arts, technical details..." id="film-arts" />
        </div>
        <div className="md:col-span-2">
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Description</label>
          <textarea {...register('description')} className="admin-textarea" rows={4} placeholder="Film description..." id="film-description" />
        </div>
      </div>
      <div className="flex gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button type="submit" id="film-save" disabled={saving} className="btn-primary">
          {saving ? <><Loader2 size={14} className="animate-spin" /> SAVING...</> : <><Save size={14} /> {initial?._id ? 'UPDATE' : 'CREATE'} FILM</>}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">CANCEL</button>
      </div>
    </form>
  );
};

const FilmImageRow = ({ film, onRefresh }: { film: Production; onRefresh: () => void }) => {
  const posterRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const upload = async (type: 'poster' | 'add', files: File[]) => {
    setUploading(type);
    try {
      if (type === 'poster') await productionsAPI.uploadPoster(film._id, files[0]);
      else for (const f of files) await productionsAPI.uploadImage(film._id, f);
      toast.success('Uploaded.');
      onRefresh();
    } catch { toast.error('Upload failed.'); }
    finally { setUploading(null); }
  };

  const deleteImage = async (publicId: string) => {
    try {
      await productionsAPI.deleteImage(film._id, publicId);
      toast.success('Image deleted.');
      onRefresh();
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="mt-4 p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="flex flex-wrap gap-3 mb-4">
        <input ref={posterRef} type="file" accept="image/*" className="hidden" onChange={(e) => upload('poster', Array.from(e.target.files || []))} />
        <button onClick={() => posterRef.current?.click()} disabled={!!uploading} className="btn-outline text-xs py-2 px-4">
          {uploading === 'poster' ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
          {film.mainPoster?.url ? 'REPLACE POSTER' : 'SET POSTER'}
        </button>
        <input ref={addRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload('add', Array.from(e.target.files || []))} />
        <button onClick={() => addRef.current?.click()} disabled={!!uploading} className="btn-outline text-xs py-2 px-4">
          {uploading === 'add' ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
          ADD IMAGES
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {film.mainPoster?.url && (
          <div className="relative group">
            <img src={film.mainPoster.url} alt="Poster" className="w-14 h-20 object-cover" />
            <span className="absolute top-0 left-0 bg-maroon-700 text-white text-xs px-1">POSTER</span>
          </div>
        )}
        {film.additionalImages?.map((img) => (
          <div key={img.publicId} className="relative group">
            <img src={img.url} alt="" className="w-20 h-14 object-cover" />
            <button onClick={() => deleteImage(img.publicId)} className="absolute top-0 right-0 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminProductionPage = () => {
  const [films, setFilms] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editFilm, setEditFilm] = useState<Production | null>(null);
  const [expandedImages, setExpandedImages] = useState<string | null>(null);

  const fetchFilms = async () => {
    setLoading(true);
    try { const res = await productionsAPI.getAll(); setFilms(res.data); }
    catch { toast.error('Failed to load.'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    document.title = 'Production | Ravisha Groups 2 Admin';
    fetchFilms();
  }, []);

  const handleCreate = async (data: Partial<Production>) => {
    try { await productionsAPI.create(data); toast.success('Film created.'); setShowForm(false); fetchFilms(); }
    catch { toast.error('Failed to create.'); }
  };

  const handleUpdate = async (data: Partial<Production>) => {
    if (!editFilm) return;
    try { await productionsAPI.update(editFilm._id, data); toast.success('Film updated.'); setEditFilm(null); fetchFilms(); }
    catch { toast.error('Failed to update.'); }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try { await productionsAPI.delete(id); toast.success('Film deleted.'); fetchFilms(); }
    catch { toast.error('Failed to delete.'); }
  };

  const toggleFeature = async (id: string) => {
    try { await productionsAPI.toggleFeature(id); fetchFilms(); }
    catch { toast.error('Failed to update.'); }
  };

  return (
    <div className="admin-body min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-stone-600 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>DIVISION 02</p>
            <h1 className="text-white text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Cinema Production</h1>
          </div>
          <button onClick={() => { setShowForm(true); setEditFilm(null); }} id="add-film-btn" className="btn-primary">
            <Plus size={14} /> ADD FILM
          </button>
        </div>

        <AnimatePresence>
          {(showForm || editFilm) && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ProductionForm
                initial={editFilm || undefined}
                onSave={editFilm ? handleUpdate : handleCreate}
                onCancel={() => { setShowForm(false); setEditFilm(null); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin" /></div>
        ) : films.length === 0 ? (
          <div className="admin-card text-center py-16">
            <p className="text-stone-500 text-sm tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>NO FILMS YET</p>
            <p className="text-stone-700 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Click "+ ADD FILM" to create your first cinema production.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {films.map((film) => (
              <motion.div key={film._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-card">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-20 flex-shrink-0 overflow-hidden" style={{ background: '#1a1a1b' }}>
                    {film.mainPoster?.url ? (
                      <img src={film.mainPoster.url} alt={film.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-stone-700 text-xs text-center">NO<br />POSTER</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white text-base font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{film.title}</h3>
                        <div className="flex flex-wrap gap-3 mt-1 text-stone-600 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {film.year && <span>{film.year}</span>}
                          {film.productionRole && <span>• {film.productionRole}</span>}
                        </div>
                        {film.featured && (
                          <span className="inline-flex items-center gap-1 mt-1 text-yellow-500 text-xs tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <Star size={10} fill="currentColor" /> FEATURED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => toggleFeature(film._id)} className={`p-2 border transition-colors ${film.featured ? 'border-yellow-600/40 text-yellow-500 bg-yellow-500/10' : 'border-white/10 text-stone-600 hover:text-yellow-500'}`}>
                          <Star size={14} fill={film.featured ? 'currentColor' : 'none'} />
                        </button>
                        <button onClick={() => { setEditFilm(film); setShowForm(false); }} className="p-2 border border-white/10 text-stone-500 hover:text-white transition-colors" id={`edit-film-${film._id}`}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(film._id, film.title)} className="p-2 border border-white/10 text-stone-500 hover:text-red-500 transition-colors" id={`delete-film-${film._id}`}>
                          <Trash2 size={14} />
                        </button>
                        <button onClick={() => setExpandedImages(expandedImages === film._id ? null : film._id)} className="p-2 border border-white/10 text-stone-500 hover:text-white transition-colors">
                          {expandedImages === film._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedImages === film._id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <FilmImageRow film={film} onRefresh={fetchFilms} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProductionPage;
