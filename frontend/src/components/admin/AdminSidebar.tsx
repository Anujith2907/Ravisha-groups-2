import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  HardHat,
  Film,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { label: 'DASHBOARD', href: '/admin/dashboard', icon: <LayoutDashboard size={16} />, end: true },
  { label: 'FOUNDER', href: '/admin/dashboard/founder', icon: <User size={16} /> },
  { label: 'CONSTRUCTION', href: '/admin/dashboard/construction', icon: <HardHat size={16} /> },
  { label: 'PRODUCTION', href: '/admin/dashboard/production', icon: <Film size={16} /> },
  { label: 'GALLERY', href: '/admin/dashboard/gallery', icon: <ImageIcon size={16} /> },
  { label: 'INQUIRIES', href: '/admin/dashboard/inquiries', icon: <MessageSquare size={16} /> },
  { label: 'SETTINGS', href: '/admin/dashboard/settings', icon: <Settings size={16} /> },
];

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-60 flex flex-col z-40"
      style={{
        background: '#0d0d0d',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo / Brand */}
      <div
        className="p-6 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="bg-white/95 px-3 py-1.5 rounded border border-white/30 mb-2 inline-block">
          <img
            src="/logo.png"
            alt="Ravisha Groups 2"
            className="h-8 w-auto object-contain"
          />
        </div>
        <p
          className="text-stone-600 text-xs tracking-widest uppercase mt-2"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          ADMIN PANEL
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-xs tracking-widest transition-all duration-200 group ${
                isActive
                  ? 'text-white bg-maroon-700/10 border-r-2 border-maroon-700'
                  : 'text-stone-500 hover:text-white hover:bg-white/3'
              }`
            }
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-maroon-700' : 'group-hover:text-maroon-700 transition-colors'}>
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div
        className="p-4 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-3 mb-4 px-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{ background: 'rgba(139,26,26,0.3)', color: '#8B1A1A' }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <p className="text-white text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              {user?.name || 'Admin'}
            </p>
            <p className="text-stone-600 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              {user?.email || ''}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-stone-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-xs tracking-widest"
          style={{ fontFamily: 'Inter, sans-serif' }}
          id="admin-logout"
        >
          <LogOut size={16} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
