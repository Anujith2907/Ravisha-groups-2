import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, Phone, Archive, Trash2, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { inquiriesAPI } from '../../services/api';
import { Inquiry } from '../../types';

const STATUS_CONFIG = {
  NEW: { label: 'NEW', color: '#8B1A1A', bg: 'rgba(139,26,26,0.15)', border: 'rgba(139,26,26,0.3)' },
  READ: { label: 'READ', color: '#6B7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.2)' },
  CONTACTED: { label: 'CONTACTED', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
  CLOSED: { label: 'CLOSED', color: '#374151', bg: 'rgba(55,65,81,0.1)', border: 'rgba(55,65,81,0.2)' },
};

const STATUSES = ['NEW', 'READ', 'CONTACTED', 'CLOSED'] as const;

const InquiryRow = ({
  inquiry,
  onStatusChange,
  onDelete,
  onView,
}: {
  inquiry: Inquiry;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onView: (inquiry: Inquiry) => void;
}) => {
  const cfg = STATUS_CONFIG[inquiry.status];
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b hover:bg-white/2 transition-colors"
      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <td className="p-4">
        <p className="text-white text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{inquiry.fullName}</p>
        <p className="text-stone-500 text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{inquiry.email}</p>
      </td>
      <td className="p-4">
        <p className="text-stone-400 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{inquiry.phone}</p>
      </td>
      <td className="p-4">
        <span
          className="text-xs tracking-widest uppercase px-2 py-1"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#8B1A1A',
            background: 'rgba(139,26,26,0.1)',
            border: '1px solid rgba(139,26,26,0.2)',
          }}
        >
          {inquiry.inquiryType}
        </span>
      </td>
      <td className="p-4">
        <span
          className="text-xs tracking-widest uppercase px-2 py-1 border"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: cfg.color,
            background: cfg.bg,
            borderColor: cfg.border,
          }}
        >
          {cfg.label}
        </span>
      </td>
      <td className="p-4 text-stone-500 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
        {new Date(inquiry.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(inquiry)}
            className="p-1.5 text-stone-500 hover:text-white transition-colors"
            title="View"
          >
            <Eye size={14} />
          </button>
          <select
            value={inquiry.status}
            onChange={(e) => onStatusChange(inquiry._id, e.target.value)}
            className="text-xs bg-transparent border border-white/10 text-stone-400 px-2 py-1 rounded-none"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {STATUSES.map((s) => <option key={s} value={s} style={{ background: '#1a1a1b' }}>{s}</option>)}
          </select>
          <button
            onClick={() => onDelete(inquiry._id)}
            className="p-1.5 text-stone-500 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

const InquiryDetail = ({ inquiry, onClose }: { inquiry: Inquiry; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
    <div
      className="admin-card max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-white text-xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Inquiry Details
        </h3>
        <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors">✕</button>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Name', value: inquiry.fullName },
          { label: 'Email', value: inquiry.email },
          { label: 'Phone', value: inquiry.phone },
          { label: 'Type', value: inquiry.inquiryType },
          { label: 'Status', value: inquiry.status },
          { label: 'Date', value: new Date(inquiry.createdAt).toLocaleString('en-IN') },
        ].map(({ label, value }) => (
          <div key={label} className="pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <p className="text-stone-500 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</p>
            <p className="text-white text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{value}</p>
          </div>
        ))}
        <div>
          <p className="text-stone-500 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>MESSAGE</p>
          <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
            {inquiry.message}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const AdminInquiriesPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [viewInquiry, setViewInquiry] = useState<Inquiry | null>(null);
  const [stats, setStats] = useState({ new: 0, total: 0 });

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const [res, statsRes] = await Promise.all([
        inquiriesAPI.getAll({ status: statusFilter || undefined, search: search || undefined }),
        inquiriesAPI.getStats(),
      ]);
      setInquiries(res.data.inquiries);
      setStats(statsRes.data);
    } catch { toast.error('Failed to load.'); }
    finally { setLoading(false); }
  }, [statusFilter, search]);

  useEffect(() => {
    document.title = 'Inquiries | Ravisha Groups 2 Admin';
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await inquiriesAPI.updateStatus(id, status);
      fetchInquiries();
    } catch { toast.error('Update failed.'); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await inquiriesAPI.delete(id);
      toast.success('Inquiry deleted.');
      fetchInquiries();
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="admin-body min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-stone-600 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>CONTACT</p>
            <h1 className="text-white text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Inquiries</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-light text-maroon-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{stats.new}</p>
            <p className="text-stone-500 text-xs tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>NEW INQUIRIES</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
            <input
              type="text"
              placeholder="Search name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 w-56"
              id="inquiry-search"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select w-40"
            id="inquiry-status-filter"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="admin-card overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {['NAME / EMAIL', 'PHONE', 'TYPE', 'STATUS', 'DATE', 'ACTIONS'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-stone-600 text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12">
                  <div className="w-6 h-6 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin mx-auto" />
                </td></tr>
              ) : inquiries.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-stone-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  No inquiries found.
                </td></tr>
              ) : (
                inquiries.map((inq) => (
                  <InquiryRow
                    key={inq._id}
                    inquiry={inq}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onView={setViewInquiry}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {viewInquiry && (
        <InquiryDetail
          inquiry={viewInquiry}
          onClose={() => setViewInquiry(null)}
        />
      )}
    </div>
  );
};

export default AdminInquiriesPage;
