import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#080808' }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,26,26,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,26,26,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="bg-white/95 px-5 py-2.5 rounded border border-white/30 shadow-lg inline-block mx-auto mb-6">
            <img
              src="/logo.png"
              alt="Ravisha Groups 2"
              className="h-14 w-auto object-contain"
            />
          </div>
          <p
            className="text-stone-500 text-xs tracking-widest uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ADMIN PANEL
          </p>
          <div className="w-8 h-px bg-maroon-700 mx-auto mt-4" />
        </div>

        {/* Form card */}
        <div
          className="p-8"
          style={{
            background: '#111112',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h1
            className="text-white text-2xl font-light mb-8"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Sign In
          </h1>

          {error && (
            <div
              className="flex items-center gap-3 p-4 mb-6 border"
              style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)' }}
            >
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
                type="email"
                placeholder="Email Address"
                className="admin-input"
                id="admin-email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...register('password', { required: 'Password is required' })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="admin-input pr-12"
                id="admin-password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
                id="toggle-password"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              id="admin-login-submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
            >
              {loading ? (
                <><Loader2 size={14} className="animate-spin" /> SIGNING IN...</>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center text-stone-700 text-xs mt-8 tracking-widest"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          RAVISHA GROUPS 2 — RESTRICTED ACCESS
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
