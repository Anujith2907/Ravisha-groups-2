import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { settingsAPI } from '../../services/api';
import { Settings } from '../../types';

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm<Settings>();

  useEffect(() => {
    document.title = 'Settings | Ravisha Groups 2 Admin';
    settingsAPI.get().then((res) => {
      reset(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: Settings) => {
    setSaving(true);
    try {
      await settingsAPI.update(data);
      toast.success('Settings saved.');
    } catch {
      toast.error('Failed to save settings.');
    } finally {
      setSaving(false);
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
          <p className="text-stone-600 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>CONFIGURATION</p>
          <h1 className="text-white text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Settings</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
          {/* Company Info */}
          <div className="admin-card">
            <h2 className="text-white text-sm tracking-widest uppercase mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>COMPANY INFORMATION</h2>
            <div className="space-y-4">
              <div>
                <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Company Name</label>
                <input {...register('companyName')} className="admin-input" id="settings-company-name" />
              </div>
              <div>
                <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Email</label>
                <input {...register('email')} type="email" className="admin-input" id="settings-email" />
              </div>
              <div>
                <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Phone</label>
                <input {...register('phone')} className="admin-input" id="settings-phone" />
              </div>
              <div>
                <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Address</label>
                <textarea {...register('address')} className="admin-textarea" rows={4} id="settings-address" />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="admin-card">
            <h2 className="text-white text-sm tracking-widest uppercase mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>SOCIAL MEDIA</h2>
            <div className="space-y-4">
              {(['instagram', 'facebook', 'youtube', 'twitter', 'linkedin'] as const).map((platform) => (
                <div key={platform}>
                  <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {platform.toUpperCase()}
                  </label>
                  <input
                    {...register(`socialMedia.${platform}` as keyof Settings)}
                    className="admin-input"
                    placeholder={`https://${platform}.com/ravishagroups2`}
                    id={`settings-${platform}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="admin-card">
            <h2 className="text-white text-sm tracking-widest uppercase mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>SEO METADATA</h2>
            <div className="space-y-4">
              <div>
                <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Page Title</label>
                <input {...register('seo.title' as keyof Settings)} className="admin-input" id="settings-seo-title" />
              </div>
              <div>
                <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Meta Description</label>
                <textarea {...register('seo.description' as keyof Settings)} className="admin-textarea" rows={3} id="settings-seo-description" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            id="settings-save"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? <><Loader2 size={14} className="animate-spin" /> SAVING...</> : <><Save size={14} /> SAVE SETTINGS</>}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminSettingsPage;
