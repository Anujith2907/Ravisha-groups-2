import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit2, Trash2, Star, Upload, X, Loader2, Save, ChevronDown, ChevronUp,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { projectsAPI } from '../../services/api';
import { Project } from '../../types';

const STATUSES = ['', 'Completed', 'Ongoing', 'Upcoming'];

const ProjectForm = ({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Project>;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}) => {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: initial || {} });

  const submit = async (data: any) => {
    setSaving(true);
    try {
      await onSave(data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="admin-card mb-6">
      <h3 className="text-white text-lg font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        {initial?._id ? 'Edit Project' : 'Add New Project'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Project Name *</label>
          <input {...register('name', { required: true })} className="admin-input" placeholder="Project name" id="project-name" />
        </div>
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Project Type</label>
          <input {...register('type')} className="admin-input" placeholder="e.g. Residential, Commercial" id="project-type" />
        </div>
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Location</label>
          <input {...register('location')} className="admin-input" placeholder="City, State" id="project-location" />
        </div>
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Year</label>
          <input {...register('year')} className="admin-input" placeholder="e.g. 2023" id="project-year" />
        </div>
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Status</label>
          <select {...register('status')} className="admin-select" id="project-status">
            {STATUSES.map((s) => <option key={s} value={s}>{s || '— Select —'}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Description</label>
          <textarea {...register('description')} className="admin-textarea" rows={4} placeholder="Project description..." id="project-description" />
        </div>
        <div className="md:col-span-2">
          <label className="text-stone-500 text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Construction Details</label>
          <textarea {...register('constructionDetails')} className="admin-textarea" rows={3} placeholder="Construction details, materials, specs..." id="project-details" />
        </div>
      </div>
      <div className="flex gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button type="submit" id="project-save" disabled={saving} className="btn-primary">
          {saving ? <><Loader2 size={14} className="animate-spin" /> SAVING...</> : <><Save size={14} /> {initial?._id ? 'UPDATE' : 'CREATE'} PROJECT</>}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">CANCEL</button>
      </div>
    </form>
  );
};

const ImageUploadRow = ({ project, onRefresh }: { project: Project; onRefresh: () => void }) => {
  const mainRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<'main' | 'add' | null>(null);

  const uploadMain = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading('main');
    try {
      await projectsAPI.uploadMainImage(project._id, file);
      toast.success('Main image uploaded.');
      onRefresh();
    } catch { toast.error('Upload failed.'); }
    finally { setUploading(null); if (mainRef.current) mainRef.current.value = ''; }
  };

  const uploadAdditional = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploading('add');
    try {
      for (const file of files) await projectsAPI.uploadImage(project._id, file);
      toast.success(`${files.length} image(s) uploaded.`);
      onRefresh();
    } catch { toast.error('Upload failed.'); }
    finally { setUploading(null); if (addRef.current) addRef.current.value = ''; }
  };

  const deleteImage = async (publicId: string) => {
    try {
      await projectsAPI.deleteImage(project._id, publicId);
      toast.success('Image deleted.');
      onRefresh();
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="mt-4 p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="flex flex-wrap gap-3 mb-4">
        <input ref={mainRef} type="file" accept="image/*" className="hidden" onChange={uploadMain} id={`main-img-${project._id}`} />
        <button onClick={() => mainRef.current?.click()} disabled={!!uploading} className="btn-outline text-xs py-2 px-4">
          {uploading === 'main' ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
          {project.mainImage?.url ? 'REPLACE MAIN' : 'SET MAIN IMAGE'}
        </button>
        <input ref={addRef} type="file" accept="image/*" multiple className="hidden" onChange={uploadAdditional} id={`add-img-${project._id}`} />
        <button onClick={() => addRef.current?.click()} disabled={!!uploading} className="btn-outline text-xs py-2 px-4">
          {uploading === 'add' ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
          ADD IMAGES
        </button>
      </div>
      {/* Image thumbnails */}
      <div className="flex flex-wrap gap-3">
        {project.mainImage?.url && (
          <div className="relative group">
            <img src={project.mainImage.url} alt="Main" className="w-20 h-14 object-cover" />
            <span className="absolute top-0 left-0 bg-maroon-700 text-white text-xs px-1">MAIN</span>
          </div>
        )}
        {project.additionalImages?.map((img) => (
          <div key={img.publicId} className="relative group">
            <img src={img.url} alt="" className="w-20 h-14 object-cover" />
            <button
              onClick={() => deleteImage(img.publicId)}
              className="absolute top-0 right-0 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminConstructionPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [expandedImages, setExpandedImages] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data);
    } catch { toast.error('Failed to load projects.'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    document.title = 'Construction | Ravisha Groups 2 Admin';
    fetchProjects();
  }, []);

  const handleCreate = async (data: Partial<Project>) => {
    try {
      await projectsAPI.create(data);
      toast.success('Project created.');
      setShowForm(false);
      fetchProjects();
    } catch { toast.error('Failed to create.'); }
  };

  const handleUpdate = async (data: Partial<Project>) => {
    if (!editProject) return;
    try {
      await projectsAPI.update(editProject._id, data);
      toast.success('Project updated.');
      setEditProject(null);
      fetchProjects();
    } catch { toast.error('Failed to update.'); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted.');
      fetchProjects();
    } catch { toast.error('Failed to delete.'); }
  };

  const toggleFeature = async (id: string) => {
    try {
      await projectsAPI.toggleFeature(id);
      fetchProjects();
    } catch { toast.error('Failed to update.'); }
  };

  return (
    <div className="admin-body min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-stone-600 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>DIVISION 01</p>
            <h1 className="text-white text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Construction Projects</h1>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditProject(null); }}
            id="add-project-btn"
            className="btn-primary"
          >
            <Plus size={14} /> ADD PROJECT
          </button>
        </div>

        <AnimatePresence>
          {(showForm || editProject) && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ProjectForm
                initial={editProject || undefined}
                onSave={editProject ? handleUpdate : handleCreate}
                onCancel={() => { setShowForm(false); setEditProject(null); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin" /></div>
        ) : projects.length === 0 ? (
          <div className="admin-card text-center py-16">
            <p className="text-stone-500 text-sm tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>NO PROJECTS YET</p>
            <p className="text-stone-700 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Click "+ ADD PROJECT" to create your first construction project.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="admin-card"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-14 flex-shrink-0 overflow-hidden" style={{ background: '#1a1a1b' }}>
                    {project.mainImage?.url ? (
                      <img src={project.mainImage.url} alt={project.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-stone-700 text-xs">NO IMG</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white text-base font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          {project.name}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-1 text-stone-600 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {project.type && <span>{project.type}</span>}
                          {project.location && <span>• {project.location}</span>}
                          {project.year && <span>• {project.year}</span>}
                          {project.status && <span className="text-maroon-700">• {project.status}</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleFeature(project._id)}
                          title={project.featured ? 'Unfeature' : 'Feature on Homepage'}
                          className={`p-2 border transition-colors ${project.featured ? 'border-yellow-600/40 text-yellow-500 bg-yellow-500/10' : 'border-white/10 text-stone-600 hover:text-yellow-500'}`}
                        >
                          <Star size={14} fill={project.featured ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => { setEditProject(project); setShowForm(false); }}
                          className="p-2 border border-white/10 text-stone-500 hover:text-white hover:border-white/30 transition-colors"
                          id={`edit-project-${project._id}`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id, project.name)}
                          className="p-2 border border-white/10 text-stone-500 hover:text-red-500 hover:border-red-500/30 transition-colors"
                          id={`delete-project-${project._id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          onClick={() => setExpandedImages(expandedImages === project._id ? null : project._id)}
                          className="p-2 border border-white/10 text-stone-500 hover:text-white transition-colors"
                          title="Manage Images"
                        >
                          {expandedImages === project._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 mt-2 text-yellow-500 text-xs tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Star size={10} fill="currentColor" /> FEATURED ON HOMEPAGE
                      </span>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedImages === project._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <ImageUploadRow project={project} onRefresh={fetchProjects} />
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

export default AdminConstructionPage;
