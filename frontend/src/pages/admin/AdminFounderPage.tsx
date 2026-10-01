import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Save, Loader2, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { founderAPI } from '../../services/api';
import { Founder } from '../../types';

const AdminFounderPage = () => {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<Partial<Founder>>();

  useEffect(() => {
    document.title = 'Founder | Ravisha Groups 2 Admin';
    founderAPI.get().then((res) => {
      setFounder(res.data);
      reset(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: Partial<Founder>) => {
    setSaving(true);
    try {
      const res = await founderAPI.update(data);
      setFounder(res.data.founder);
      toast.success('Founder information saved.');
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await founderAPI.uploadImage(file);
      setFounder((prev) => prev ? { ...prev, image: res.data.image } : prev);
      toast.success('Photo uploaded successfully.');
    } catch {
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = async () => {
    if (!window.confirm('Delete founder photo?')) return;
    try {
      await founderAPI.deleteImage();
      setFounder((prev) => prev ? { ...prev, image: { url: '', publicId: '' } } : prev);
      toast.success('Photo deleted.');
    } catch {
      toast.error('Failed to delete photo.');
    }
  };

  if (loading) {
    return (
      <div className="admin-body min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 ml-60 p-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="admin-body min-h-screen flex">
      <AdminSidebar />

      <main className="flex-1 ml-60 p-8">
        <div className="mb-8">
          <p className="text-stone-600 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            MANAGEMENT
          </p>
          <h1 className="text-white text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Founder
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo management */}
          <div className="admin-card">
            <h2 className="text-white text-sm tracking-widest uppercase mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              FOUNDER PHOTO
            </h2>

            {/* Preview */}
            <div
              className="aspect-[3/4] mb-4 overflow-hidden border"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {founder?.image?.url ? (
                <img
                  src={founder.image.url}
                  alt="Founder"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: '#1a1a1b' }}
                >
                  <p className="text-stone-600 text-xs tracking-widest uppercase text-center px-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    NO PHOTO<br />UPLOADED
                  </p>
                </div>
              )}
            </div>

            {/* Upload button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageUpload}
              id="founder-photo-input"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="btn-outline w-full justify-center mb-3 text-xs"
            >
              {uploading ? (
                <><Loader2 size={14} className="animate-spin" /> UPLOADING...</>
              ) : (
                <><Upload size={14} /> UPLOAD PHOTO</>
              )}
            </button>

            {founder?.image?.url && (
              <button
                onClick={handleDeleteImage}
                className="flex items-center justify-center gap-2 w-full py-2 text-red-500/70 hover:text-red-500 transition-colors text-xs tracking-widest border border-red-500/10 hover:border-red-500/30"
                style={{ fontFamily: 'Inter, sans-serif' }}
                id="delete-founder-photo"
              >
                <Trash2 size={14} />
                DELETE PHOTO
              </button>
            )}

            <p className="text-stone-700 text-xs mt-4 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              JPG, PNG, WebP · Max 10MB
            </p>
          </div>

          {/* Information form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="admin-card">
              <h2 className="text-white text-sm tracking-widest uppercase mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                FOUNDER INFORMATION
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    className="admin-input"
                    placeholder="[Founder Full Name]"
                    id="founder-name"
                  />
                </div>

                <div>
                  <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Designation / Title
                  </label>
                  <input
                    {...register('designation')}
                    className="admin-input"
                    placeholder="[e.g. Founder & Managing Director]"
                    id="founder-designation"
                  />
                </div>

                <div>
                  <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Biography
                  </label>
                  <textarea
                    {...register('biography')}
                    className="admin-textarea"
                    rows={6}
                    placeholder="[Founder biography...]"
                    id="founder-biography"
                  />
                </div>

                <div>
                  <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Vision
                  </label>
                  <textarea
                    {...register('vision')}
                    className="admin-textarea"
                    rows={4}
                    placeholder="[Founder vision statement...]"
                    id="founder-vision"
                  />
                </div>

                <div>
                  <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Quote
                  </label>
                  <textarea
                    {...register('quote')}
                    className="admin-textarea"
                    rows={3}
                    placeholder='["A quote from the founder..."]'
                    id="founder-quote"
                  />
                </div>

                <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <button
                    type="submit"
                    id="founder-save"
                    disabled={saving}
                    className="btn-primary"
                  >
                    {saving ? (
                      <><Loader2 size={14} className="animate-spin" /> SAVING...</>
                    ) : (
                      <><Save size={14} /> SAVE CHANGES</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminFounderPage;
