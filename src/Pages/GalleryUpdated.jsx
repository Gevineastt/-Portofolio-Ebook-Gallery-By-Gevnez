import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { ebookService, purchaseService } from '../services/supabase';

export default function Gallery() {
  console.log('✅ GalleryUpdated component loaded!');

  // Auth & UI States
  const { user, isAuthenticated } = useAuth();
  const [ebooks, setEbooks] = useState([]);
  const [filteredEbooks, setFilteredEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [showSynopsisModal, setShowSynopsisModal] = useState(false);

  // Purchase tracking
  const [userPurchases, setUserPurchases] = useState([]);

  // Fetch ebooks on mount
  useEffect(() => {
    console.log('🔍 useEffect running - fetchEbooks called');
    fetchEbooks();
  }, []);

  // Fetch user purchases jika authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserPurchases();
    }
  }, [isAuthenticated, user]);

  // Handle search
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
    console.log('🚀 fetchEbooks() started');
    try {
      setLoading(true);
      const result = await ebookService.getEbooks();
      console.log('📊 Fetch result:', result);

      if (result.success && result.data) {
        console.log('✅ Data fetched successfully:', result.data);
        setEbooks(result.data);
        setFilteredEbooks(result.data);
      } else {
        console.error('❌ Fetch failed:', result.error);
        // Use sample data as fallback
        setEbooks(getSampleEbooks());
        setFilteredEbooks(getSampleEbooks());
      }
    } catch (error) {
      console.error('💥 Error fetching:', error);
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

    // Check if already purchased
    const isPurchased = userPurchases.includes(ebook.id);
    if (isPurchased) {
      // Show synopsis directly
      setSelectedEbook(ebook);
      setShowSynopsisModal(true);
      return;
    }

    // Show payment modal
    setSelectedEbook(ebook);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    // Update purchases list
    setUserPurchases([...userPurchases, paymentData.ebookId]);

    // Show success message and synopsis
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

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <div className="bg-tertiary border-[3px] border-on-surface px-4 py-2 inline-block font-label text-xs font-bold mb-4">
                NEW RELEASES V2.4
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-black mb-4 leading-none">
                karya ebook saya
              </h1>
              <p className="font-body text-lg max-w-2xl text-on-surface/80">
                Sebuah wadah kurasi literasi digital dengan estetika mentah dan kejujuran struktural. Eksplorasi koleksi terbatas kami.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Cari ebook..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-[3px] border-on-surface px-6 py-4 font-body focus:outline-none focus:bg-tertiary transition-colors"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface/50">
                  search
                </span>
              </div>
              <button className="bg-primary text-white border-[3px] border-on-surface px-8 py-4 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                Cari
              </button>
            </div>
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
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" id="ebooks-container">
            {filteredEbooks.length > 0 ? (
              filteredEbooks.map((ebook) => {
                const isPurchased = userPurchases.includes(ebook.id);
                return (
                  <article
                    key={ebook.id}
                    className="bg-white border-[3px] border-on-surface p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col h-full group"
                    style={{ transform: 'rotate(-1.5deg)' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-1.5deg)'}
                  >
                    {/* Cover Image */}
                    <div className="relative mb-6">
                      {ebook.badge && (
                        <div className="absolute -top-3 -right-3 z-10 bg-secondary text-white border-[3px] border-on-surface px-3 py-1 font-label text-xs font-bold">
                          {ebook.badge}
                        </div>
                      )}
                      {isPurchased && (
                        <div className="absolute -top-3 -left-3 z-10 bg-primary text-white border-[3px] border-on-surface px-3 py-1 font-label text-xs font-bold">
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
                      <div className="mb-2">
                        <span className="bg-secondary text-white border-[3px] border-on-surface px-2 py-0.5 font-label text-[10px] uppercase font-bold tracking-wider">
                          {ebook.category || 'GENERAL'}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold mb-4 leading-none">
                        {ebook.title}
                      </h3>

                      <p className="font-body text-sm text-on-surface/80 mb-8 flex-grow leading-relaxed">
                        {ebook.description || 'Deskripsi tidak tersedia'}
                      </p>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-2 border-t-2 border-on-background">
                        <span className="font-label text-sm">
                          Rp {ebook.price?.toLocaleString('id-ID') || '49.000'}
                        </span>
                        <button
                          onClick={() => handleReadClick(ebook)}
                          className="bg-primary text-white border-[3px] border-on-surface px-3 py-1 font-display font-bold text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                        >
                          {isPurchased ? 'BACA' : 'BACA SINOPSIS'}
                        </button>
                      </div>
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

        {/* CTA Section */}
        {!loading && (
          <section className="bg-primary border-[3px] border-on-surface shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-12 text-center mb-20">
            <h2 className="font-display text-4xl font-black text-white mb-4">Gabung Perlawanan Literasi</h2>
            <p className="font-body text-lg text-white mb-8 max-w-2xl mx-auto">
              Dapatkan update koleksi terbaru kami langsung di kotak masukmu.
            </p>
            <button className="bg-white text-primary border-[3px] border-on-surface px-10 py-4 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              Daftar Newsletter
            </button>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t-[3px] border-on-surface bg-secondary">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 w-full max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="font-display text-3xl font-black text-primary mb-2">GEVINEST</div>
            <div className="font-label text-xs text-surface opacity-80">© 2024 E-BOOK GALLERY. RADICAL INFRASTRUCTURE.</div>
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
            <div className="mb-4 pb-4 border-b-[3px] border-on-surface">
              <span className="bg-secondary text-white border-[3px] border-on-surface px-2 py-1 font-label text-xs uppercase font-bold">
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

// Sample ebooks data (fallback)
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
      synopsis: 'Penjelajahan visual dan filosofis tentang arsitektur brutalist kontemporer.',
      price: 49000,
      badge: 'HOT',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+2'
    },
    {
      id: 3,
      title: 'Kode Sebagai Puisi Visual',
      category: 'PROGRAMMING',
      description: 'Mengapa estetika dalam penulisan kode sama pentingnya',
      synopsis: 'Eksplorasi tentang keindahan dalam kode dan pentingnya desain dalam programming.',
      price: 49000,
      badge: 'CORE',
      cover_image_url: 'https://via.placeholder.com/300x400?text=Ebook+3'
    },
  ];
}