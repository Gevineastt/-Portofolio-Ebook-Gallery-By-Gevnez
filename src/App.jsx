import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Portofolio from './Pages/Portofolio';
import Gallery from './Pages/Gallery';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Halaman utama (root) langsung menampilkan Portofolio */}
          <Route path="/" element={<Portofolio />} />

          {/* 2. Mengubah "/Portofolio" menjadi "/portfolio" (huruf kecil semua) */}
          <Route path="/portfolio" element={<Portofolio />} />

          {/* 3. Halaman Gallery */}
          <Route path="/gallery" element={<Gallery />} />

          {/* 4. Pengaman: Jika rute tidak ditemukan, arahkan kembali ke halaman utama */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;