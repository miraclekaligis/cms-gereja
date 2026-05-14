import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext';
import { useApi } from './hooks/useApi';

const Layout = () => {
  const { data } = useApi('/halaman');
  const footerText = data.find((item) => item.key === 'footer_text')?.value;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/jemaat" element={<ProtectedRoute><JemaatManager /></ProtectedRoute>} />
        <Route path="/admin/jadwal" element={<ProtectedRoute><JadwalManager /></ProtectedRoute>} />
        <Route path="/admin/pengumuman" element={<ProtectedRoute><PengumumanManager /></ProtectedRoute>} />
        <Route path="/admin/halaman" element={<ProtectedRoute><HalamanManager /></ProtectedRoute>} />
      </Routes>
      <Footer footerText={footerText} />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
