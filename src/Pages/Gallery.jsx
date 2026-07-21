import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { ebookService, purchaseService } from '../services/supabase';

export default function Gallery() {
  console.log('✅ Gallery component loaded!');

  const { user, isAuthenticated } = useAuth();
  const [ebooks, setEbooks] = useState([]);
  const [filteredEbooks, setFilteredEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [showSynopsisModal, setShowSynopsisModal] = useState(false);

  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    console.log('🚀 Fetching ebooks...');
    fetchEbooks();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserPurchases();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEbooks(ebooks);
    } else {
      const filtered = ebooks.filter(ebook =>
        ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ebook.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEbooks(filtered);
    }
  }, [searchQuery, ebooks]);

  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const result = await ebookService.getEbooks();
      console.log('📊 Fetch result:', result);

      if (result.success && result.data) {
        console.log('✅ Data fetched:', result.data);
        setEbooks(result.data);
        setFilteredEbooks(result.data);
      } else {
        console.error('❌ Fetch failed:', result.error);
        setEbooks(getSampleEbooks());
        setFilteredEbooks(getSampleEbooks());
      }
    } catch (error) {
      console.error('💥 Error:', error);
      setEbooks(getSampleEbooks());
      setFilteredEbooks(getSampleEbooks());
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPurchases = async () => {
    try {
      const result = await purchaseService.getUserPurchases(user.id);
      if (result.success) {
        setUserPurchases(result.data.map(p => p.ebook_id));
      }
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const handleReadClick = async (ebook) => {
    if (!isAuthenticated) {
      setSelectedEbook(ebook);
      setShowLoginModal(true);
      return;
    }

    const isPurchased = userPurchases.includes(ebook.id);
    if (isPurchased) {
      setSelectedEbook(ebook);
      setShowSynopsisModal(true);
      return;
    }

    setSelectedEbook(ebook);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    setUserPurchases([...userPurchases, paymentData.ebookId]);
    setTimeout(() => {
      setSelectedEbook(ebooks.find(e => e.id === paymentData.ebookId));
      setShowSynopsisModal(true);
    }, 500);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (selectedEbook) {
      handleReadClick(selectedEbook);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body">
      <Navbar />

      {/* Marquee Banner */}
      <section className="border-y-[3px] border-on-surface overflow-hidden py-3 mb-12" style={{ backgroundColor: '#1F3A5F' }}>
        <div className="flex whitespace-nowrap">
          <div className="flex gap-8 items-center animate-marquee">
            <span className="font-display text-2xl font-black uppercase tracking-widest text-white">E-novel by Gevinest</span>
            <span className="font-display text-2xl font-black uppercase tracking-widest text-white">E-novel by Gevinest</span>
            <span className="font-display text-2xl font-black uppercase tracking-widest text-white">E-novel by Gevinest</span>
            <span className="font-display text-2xl font-black uppercase tracking-widest text-white">E-novel by Gevinest</span>
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-tertiary border-[3px] border-on-surface px-4 py-1 font-label text-xs font-bold mb-4">NEW RELEASES V2.4</span>
            <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
              karya ebook saya
            </h1>
            <p className="text-lg md:text-xl font-body max-w-xl mb-8 leading-relaxed opacity-90">
              Sebuah wadah kurasi literasi digital dengan estetika mentah dan kejujuran struktural. Eksplorasi koleksi terbatas kami.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white border-[3px] border-on-surface px-8 py-4 font-display font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase">
                Jelajahi Sekarang
              </button>
              <button className="bg-white text-on-surface border-[3px] border-on-surface px-8 py-4 font-display font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase">
                Dokumentasi
              </button>
            </div>
          </div>

          {/* Read News Box */}
          <div className="bg-primary border-[3px] border-on-surface p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-label text-xs uppercase text-white mb-3 font-bold">📰 READ NEWS</p>
            <p className="font-body text-white leading-relaxed mb-6">
              Kolaborasi eksklusif bersama kreator lokal untuk menciptakan karya yang bernilai tinggi dan menginspirasi pembaca di seluruh nusantara.
            </p>
            <button className="bg-white text-primary border-[3px] border-on-surface px-6 py-2 font-display font-bold text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              BACA SELENGKAPNYA
            </button>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-12">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-[3px] border-on-surface px-6 py-4 font-body focus:outline-none focus:bg-tertiary transition-colors"
              />
            </div>
            <button className="bg-primary text-white border-[3px] border-on-surface px-8 py-4 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              CARI
            </button>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <p className="font-display text-2xl font-black">Loading...</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredEbooks.length > 0 ? (
              filteredEbooks.map((ebook, index) => {
                const isPurchased = userPurchases.includes(ebook.id);
                const isRotateLeft = index % 2 === 0;

                return (
                  <article
                    key={ebook.id}
                    className="bg-white border-[3px] border-on-surface p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full group hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    style={{ transform: isRotateLeft ? 'rotate(-1.5deg)' : 'rotate(1.2deg)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = isRotateLeft ? 'rotate(-1.5deg)' : 'rotate(1.2deg)';
                    }}
                  >
                    {/* Cover Image */}
                    <div className="relative mb-6">
                      {ebook.badge && (
                        <div className="absolute -top-3 -right-3 z-10 bg-primary text-white border-[3px] border-on-surface px-3 py-1 font-label text-xs font-bold">
                          {ebook.badge}
                        </div>
                      )}
                      {isPurchased && (
                        <div className="absolute -top-3 -left-3 z-10 bg-secondary text-white border-[3px] border-on-surface px-3 py-1 font-label text-xs font-bold">
                          ✓ SUDAH BELI
                        </div>
                      )}
                      <img
                        className="w-full aspect-[3/4] object-cover border-[3px] border-on-surface"
                        src={ebook.cover_image_url || 'https://via.placeholder.com/300x400'}
                        alt={ebook.title}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                      {/* Category */}
                      <div className="mb-3">
                        <span className="bg-primary text-white border-[3px] border-on-surface px-2 py-0.5 font-label text-[10px] uppercase font-bold tracking-wider">
                          {ebook.category || 'UMUM'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl font-bold mb-4 leading-none">
                        {ebook.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-sm text-on-surface/80 mb-8 flex-grow leading-relaxed">
                        {ebook.description || 'Deskripsi tidak tersedia'}
                      </p>

                      {/* Button */}
                      <button
                        onClick={() => handleReadClick(ebook)}
                        className="w-full bg-primary text-white border-[3px] border-on-surface py-3 font-display font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                      >
                        baca sinopsis
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="font-display text-2xl font-black">Tidak ada hasil pencarian</p>
              </div>
            )}
          </section>
        )}

        {/* Newsletter Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-on-surface text-surface border-[3px] border-on-surface p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 uppercase">Gabung Perlawanan Literasi.</h2>
            <p className="font-body text-lg mb-10 opacity-80 max-w-2xl">Dapatkan update koleksi terbaru kami langsung di kotak masukmu. Tanpa spam, hanya konten mentah berkualitas tinggi.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                className="flex-grow bg-white text-on-surface border-[3px] border-on-surface px-6 py-4 font-label focus:outline-none"
                placeholder="ALAMAT EMAIL ANDA"
                type="email"
              />
              <button className="bg-primary text-white border-[3px] border-on-surface px-10 py-4 font-display font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" type="submit">
                DAFTAR
              </button>
            </form>
          </div>
          <div className="md:col-span-4 bg-tertiary border-[3px] border-on-surface p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center items-center text-center">
            <span className="text-7xl mb-4">⚡</span>
            <h3 className="font-display text-2xl font-black mb-2 uppercase">ULTRA FAST</h3>
            <p className="font-label text-sm font-bold uppercase tracking-widest">Digital Infrastructure</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-[3px] border-on-surface mt-20" style={{ backgroundColor: '#1F3A5F' }}>
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 w-full max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="font-display text-3xl font-black text-primary mb-2">KARYA EBOOK SAYA</div>
            <div className="font-label text-xs text-surface opacity-80">© 2024 KARYA EBOOK SAYA. RADICAL INFRASTRUCTURE.</div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold font-label text-xs mb-2">NAVIGASI</span>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm" href="#">INSTAGRAM</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm" href="#">TWITTER</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm" href="#">GITHUB</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold font-label text-xs mb-2">LEGAL</span>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm uppercase" href="#">Privacy Policy</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm uppercase" href="#">Terms of Service</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm uppercase" href="#">Contact</a>
            </div>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
            <div className="border-[3px] border-on-surface p-2 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
              <span className="text-on-surface">📤</span>
            </div>
            <div className="border-[3px] border-on-surface p-2 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
              <span className="text-on-surface">👤</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        ebook={selectedEbook}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Synopsis Modal */}
      {showSynopsisModal && selectedEbook && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-surface border-[3px] border-on-surface p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full relative">
            <button
              className="absolute top-4 right-4 text-3xl font-bold"
              onClick={() => setShowSynopsisModal(false)}
            >
              ✕
            </button>

            <h2 className="font-display text-4xl font-black mb-4">{selectedEbook.title}</h2>
            <div className="mb-6 pb-6 border-b-[3px] border-on-surface">
              <span className="bg-primary text-white border-[3px] border-on-surface px-2 py-1 font-label text-xs uppercase font-bold">
                {selectedEbook.category}
              </span>
            </div>

            <p className="font-body text-lg mb-8 leading-relaxed">
              {selectedEbook.synopsis || selectedEbook.description}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowSynopsisModal(false)}
                className="flex-1 bg-primary text-white border-[3px] border-on-surface px-8 py-4 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                BACA SEKARANG
              </button>
              <button
                onClick={() => setShowSynopsisModal(false)}
                className="flex-1 bg-white text-on-surface border-[3px] border-on-surface px-8 py-4 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getSampleEbooks() {
  return [
    {
      id: 1,
      title: 'Kedaulatan Digital di Era AI',
      category: 'TEKNOLOGI',
      description: 'Menelusuri bagaimana kecerdasan buatan mengubah struktur kekuasaan global',
      synopsis: 'Buku ini menganalisis dampak AI terhadap privasi dan kekuasaan dalam dekade mendatang.',
      price: 49000,
      badge: 'PREMIUM',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+1'
    },
    {
      id: 2,
      title: 'Manifesto Beton Modern',
      category: 'ARSITEKTUR',
      description: 'Analisis mendalam mengenai kembalinya gaya arsitektur brutalist',
      synopsis: 'Penjelajahan visual tentang arsitektur brutalist kontemporer.',
      price: 49000,
      badge: 'HOT',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+2'
    },
    {
      id: 3,
      title: 'Kode Sebagai Puisi Visual',
      category: 'PROGRAMMING',
      description: 'Mengapa estetika dalam penulisan kode sama pentingnya',
      synopsis: 'Eksplorasi tentang keindahan dalam kode.',
      price: 49000,
      badge: 'CORE',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+3'
    },
    {
      id: 4,
      title: 'Jiwa Minimalis di Dunia Bising',
      category: 'FILOSOFI',
      description: 'Strategi praktis untuk menyaring distraksi digital',
      synopsis: 'Temukan kembali esensi kehidupan melalui restriksi yang disengaja.',
      price: 49000,
      badge: 'NEW',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+4'
    },
    {
      id: 5,
      title: 'Teori Warna Radikal',
      category: 'DESIGN',
      description: 'Mendobrak aturan warna konvensional untuk visual yang provokatif',
      synopsis: 'Ciptakan identitas visual yang tak terlupakan.',
      price: 49000,
      badge: 'NEW',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+5'
    },
    {
      id: 6,
      title: 'Koloni Mars: Hari Terakhir',
      category: 'FIKSI',
      description: 'Narasi mencekam tentang perjuangan hidup di planet merah',
      synopsis: 'Pasokan oksigen menipis, politik bumi retak.',
      price: 49000,
      badge: 'PREMIUM',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+6'
    },
  ];
}