import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HardHat, Film, MessageSquare, Image as ImageIcon, ExternalLink, ArrowRight } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { projectsAPI, productionsAPI, inquiriesAPI, mediaAPI } from '../../services/api';

interface Stats {
  projects: number;
  productions: number;
  inquiries: number;
  newInquiries: number;
  media: number;
}

const StatCard = ({
  label,
  value,
  icon,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  href: string;
  accent?: boolean;
}) => (
  <Link to={href}>
    <motion.div
      whileHover={{ y: -2 }}
      className="admin-card cursor-pointer group transition-all duration-300 hover:border-maroon-700/30"
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-10 h-10 flex items-center justify-center border transition-colors group-hover:bg-maroon-700 group-hover:border-maroon-700"
          style={{
            borderColor: accent ? 'rgba(139,26,26,0.4)' : 'rgba(255,255,255,0.08)',
            color: accent ? '#8B1A1A' : '#6B7280',
          }}
        >
          {icon}
        </div>
        <ArrowRight size={14} className="text-stone-700 group-hover:text-maroon-700 transition-colors" />
      </div>
      <p
        className="text-3xl font-light text-white mb-1"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        {value}
      </p>
      <p
        className="text-stone-500 text-xs tracking-widest uppercase"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </p>
      {accent && (
        <div className="h-0.5 bg-maroon-700 mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
  </Link>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    productions: 0,
    inquiries: 0,
    newInquiries: 0,
    media: 0,
  });

  useEffect(() => {
    document.title = 'Dashboard | Ravisha Groups 2 Admin';
    const fetchStats = async () => {
      try {
        const [proj, prod, inq, med] = await Promise.allSettled([
          projectsAPI.getAll(),
          productionsAPI.getAll(),
          inquiriesAPI.getStats(),
          mediaAPI.getAll(),
        ]);
        setStats({
          projects: proj.status === 'fulfilled' ? (proj.value as any).data?.length || 0 : 0,
          productions: prod.status === 'fulfilled' ? (prod.value as any).data?.length || 0 : 0,
          inquiries: inq.status === 'fulfilled' ? (inq.value as any).data?.total || 0 : 0,
          newInquiries: inq.status === 'fulfilled' ? (inq.value as any).data?.new || 0 : 0,
          media: med.status === 'fulfilled' ? (med.value as any).data?.length || 0 : 0,
        });
      } catch (_) {}
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-body min-h-screen flex">
      <AdminSidebar />

      <main className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p
              className="text-stone-600 text-xs tracking-widest uppercase mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              WELCOME BACK
            </p>
            <h1
              className="text-white text-3xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Dashboard
            </h1>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs tracking-widest uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ExternalLink size={14} />
            VIEW SITE
          </a>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Projects"
            value={stats.projects}
            icon={<HardHat size={16} />}
            href="/admin/dashboard/construction"
          />
          <StatCard
            label="Total Productions"
            value={stats.productions}
            icon={<Film size={16} />}
            href="/admin/dashboard/production"
          />
          <StatCard
            label="Media Files"
            value={stats.media}
            icon={<ImageIcon size={16} />}
            href="/admin/dashboard/gallery"
          />
          <StatCard
            label="New Inquiries"
            value={stats.newInquiries}
            icon={<MessageSquare size={16} />}
            href="/admin/dashboard/inquiries"
            accent={stats.newInquiries > 0}
          />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-card">
            <h2
              className="text-white text-lg font-light mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Edit Founder Information', href: '/admin/dashboard/founder' },
                { label: 'Add Construction Project', href: '/admin/dashboard/construction' },
                { label: 'Add Film / Production', href: '/admin/dashboard/production' },
                { label: 'Upload Gallery Images', href: '/admin/dashboard/gallery' },
                { label: 'Manage Inquiries', href: '/admin/dashboard/inquiries' },
                { label: 'Site Settings', href: '/admin/dashboard/settings' },
              ].map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  className="flex items-center justify-between py-3 px-4 hover:bg-white/3 transition-colors group border border-transparent hover:border-white/5"
                >
                  <span
                    className="text-stone-400 group-hover:text-white transition-colors text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {action.label}
                  </span>
                  <ArrowRight size={14} className="text-stone-700 group-hover:text-maroon-700 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <h2
              className="text-white text-lg font-light mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              About This Panel
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Content Management',
                  desc: 'Edit all website content without touching code.',
                },
                {
                  title: 'Image Storage',
                  desc: 'All images are stored securely on Cloudinary.',
                },
                {
                  title: 'Inquiries',
                  desc: `${stats.newInquiries} new inquiry${stats.newInquiries !== 1 ? 'ies' : ''} awaiting review.`,
                },
                {
                  title: 'Public Website',
                  desc: 'Changes here appear immediately on the public site.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 pb-4 border-b last:border-0 last:pb-0"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="w-1.5 h-1.5 bg-maroon-700 rounded-full flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-white text-sm mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.title}
                    </p>
                    <p className="text-stone-600 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
