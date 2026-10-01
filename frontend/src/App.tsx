import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Suspense, lazy } from 'react';

// Public pages
import HomePage from './pages/HomePage';
import ConstructionPage from './pages/ConstructionPage';
import ProductionPage from './pages/ProductionPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin pages (lazy loaded)
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminFounderPage = lazy(() => import('./pages/admin/AdminFounderPage'));
const AdminConstructionPage = lazy(() => import('./pages/admin/AdminConstructionPage'));
const AdminProductionPage = lazy(() => import('./pages/admin/AdminProductionPage'));
const AdminGalleryPage = lazy(() => import('./pages/admin/AdminGalleryPage'));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));

import ProtectedRoute from './components/admin/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: { primary: '#8B1A1A', secondary: '#fff' },
            },
          }}
        />

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/production" element={<ProductionPage />} />

            {/* Admin - Public login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin - Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/founder"
              element={
                <ProtectedRoute>
                  <AdminFounderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/construction"
              element={
                <ProtectedRoute>
                  <AdminConstructionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/production"
              element={
                <ProtectedRoute>
                  <AdminProductionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/gallery"
              element={
                <ProtectedRoute>
                  <AdminGalleryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/inquiries"
              element={
                <ProtectedRoute>
                  <AdminInquiriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/settings"
              element={
                <ProtectedRoute>
                  <AdminSettingsPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
