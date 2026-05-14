import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Beranda from './pages/Public/Beranda';
import Jadwal from './pages/Public/Jadwal';
import Pengumuman from './pages/Public/Pengumuman';
import Tentang from './pages/Public/Tentang';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import JemaatManager from './pages/Admin/JemaatManager';
import JadwalManager from './pages/Admin/JadwalManager';
import PengumumanManager from './pages/Admin/PengumumanManager';
import HalamanManager from './pages/Admin/HalamanManager';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="container">{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Beranda /></PublicLayout>} />
        <Route path="/jadwal" element={<PublicLayout><Jadwal /></PublicLayout>} />
        <Route path="/pengumuman" element={<PublicLayout><Pengumuman /></PublicLayout>} />
        <Route path="/tentang" element={<PublicLayout><Tentang /></PublicLayout>} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/jemaat"
          element={<ProtectedRoute><JemaatManager /></ProtectedRoute>}
        />
        <Route
          path="/admin/jadwal"
          element={<ProtectedRoute><JadwalManager /></ProtectedRoute>}
        />
        <Route
          path="/admin/pengumuman"
          element={<ProtectedRoute><PengumumanManager /></ProtectedRoute>}
        />
        <Route
          path="/admin/halaman"
          element={<ProtectedRoute><HalamanManager /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
