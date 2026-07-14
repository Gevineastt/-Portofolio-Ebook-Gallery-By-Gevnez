import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Gallery() {
  const [ebooks, setEbooks] = useState([]);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [showSynopsisModal, setShowSynopsisModal] = useState(false);
  const navigate = useNavigate();

  // Sample data - nanti akan replace dengan Supabase
  useEffect(() => {
    const sampleEbooks = [
      {
        id: 1,
        title: 'Kedaulatan Digital di Era AI',
        category: 'TEKNOLOGI',
        synopsis: 'Menelusuri bagaimana kecerdasan buatan mengubah struktur kekuasaan global dan privasi individu dalam dekade mendatang.',
        price: 49000,
        badge: 'PREMIUM',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo5Qx0Mlmyn7_rMhr5AqQyB6HquI1XRDU3miB5ZK8tRKAaW5KAtDMTMWrbsS3LxJ98AUPoYdW-BUdFLaE9Yxzbw9up1H4JnKDBySDPKx68nz8OYy41F7q3ne8sraamD8mVMNS2Sn5OXeAErAXGtHL8_tj34f8B2mWlUyXX6w25F0uS7JzyxdYCFBilTU9CkAIhPfuPMVTLCKqiO9srUyCkm4cIQQBNwmWWVD2PePvqqaAT3JXpMrQw9WWtaEO7q3-XixcSwbSk0Vgz'
      },
      {
        id: 2,
        title: 'Manifesto Beton Modern',
        category: 'ARSITEKTUR',
        synopsis: 'Analisis mendalam mengenai kembalinya gaya arsitektur brutalist dalam desain urban kontemporer dan dampaknya pada psikologi warga.',
        price: 49000,
        badge: 'HOT',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7ShCLIoshoSpNEEZL5k-Hwez1AoU7G9HWG-_qROQIURa3S83Y4dObVS5fJCXthObi1SId9rok5XgugSXMlKIFBF77J7STVoBLaEAPjggWkQ-niXM7YsRbbdMkQZQZfaV4vCTNTAG3XSQENPmbEPJ2rN1ED3Cb3BO5ASyuta9dCCLP4nignZnKuzwmBHAkaVhbtlrqoOP2603nYe0B0UomsIHz_4-G1Xr0-K3bDD0RbfRUaYKETu2BNKMoAQJIU6AKDseqNVmtiwyw'
      },
      {
        id: 3,
        title: 'Kode Sebagai Puisi Visual',
        category: 'PROGRAMMING',
        synopsis: 'Mengapa estetika dalam penulisan kode sumber sama pentingnya dengan fungsionalitasnya dalam ekosistem open source.',
        price: 49000,
        badge: 'CORE',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzETqi3k3h-TB07htbhTBbihcWnpnnfNtEvNE0-9re8NHTLRRZZSRbr8RtXta9at8SeA4spSpBAtRbyT0RqZUQQpEdOmgimESxgCxkKeL2xwoOo4350orKhnc-xYfH0Cmsggo6KedUW0fPKMjh_kOb-DvcJbecP8IjnSUC0_go3FAEeZijxqNWsLnQi0M85ecQYplMzo5ROFyyUNfkhSBOTYBpqUafzWh0crn-6ejELRDdavbKf2KMAPYDWPVjfE4WBYgCyTCBcWlr'
      },
      {
        id: 4,
        title: 'Jiwa Minimalis di Dunia Bising',
        category: 'FILOSOFI',
        synopsis: 'Strategi praktis untuk menyaring distraksi digital dan menemukan kembali esensi kehidupan melalui restriksi yang disengaja.',
        price: 49000,
        badge: null,
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4TEmoBYMO6UyVDJ9IS1nJIHcEGkr2iBGpSdWI1747xGHXR_WICYhv5zfmhyQr0qpe16pXUuNBqntTndM5v9LW5kJcMkGImAzsGilpY9t0q9P_I5kxHxKXnXf6k9J0Ftuq3EGJDLrrFCipXCgonr2gCvDGZa3auHsX8ALRIbqguHZPavBSNDlDPUd9ik_1rpwqNKRUpojwPS_DTpef1WvzFyi18zqvOSJPu7l_uBqlNoACpfXZEelhcqE72P6hfrFtajR1IKFwPa5c'
      },
      {
        id: 5,
        title: 'Teori Warna Radikal',
        category: 'DESIGN',
        synopsis: 'Mendobrak aturan warna konvensional untuk menciptakan identitas visual yang provokatif dan tak terlupakan.',
        price: 49000,
        badge: 'NEW',
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBfjA35ybTYtSVtqxSIV3xHt0cTvbYHxQG2yLKoeTv1IxyLf6lEGDPO_mXvd8n13B37N7stTI2K47t-Q1Bv4f5Yv0ZjFhoMJCKQ7fqvLj1Hnh6AxT4aXoQYXmG0Z3BE2OslIm5puTnVHaZm5JmTqb3nP-pLVpmrmmw8isGAOQnJqLyPzQB34ODUCDymztOcvDrvOz4VZ-MjnQRLIVZawCxM49muWevUCbUvwt0aFHG3rieaS8xs7vr1JbmsF5JueqmDOxGTAf9wUVu'
      },
      {
        id: 6,
        title: 'Koloni Mars: Hari Terakhir',
        category: 'FIKSI',
        synopsis: 'Narasi mencekam tentang perjuangan hidup di planet merah saat pasokan oksigen mulai menipis dan politik bumi mulai retak.',
        price: 49000,
        badge: null,
        cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPnrLOdOBFMMfH2RKhqmqVdlldYAy6MUXFplnMD6ya-itENMO_4sfVuadkSQJFbuVUKYVQb6lqdw2YDEr-RvWnk4ZMFkk_D8qLrOqQ8z7NtgI_Q4PPE69yjxvCbduE_dlOZLaE17J6mGEDPNiknkUpnXzq8rzoIohP7xabIXkZs0TMO9m7xd6_cAKxaZ4U5glq_MCKKrJvUtNFYSyYdKjdkz5BlaRbWpmLvNVuZbpi2xIyNC_1fRocILcsKf5ETCgH-8tFhBnkOj5I'
      }
    ];
    setEbooks(sampleEbooks);
  }, []);

  const handleReadClick = (ebook) => {
    setSelectedEbook(ebook);
    setShowSynopsisModal(true);
  };

  const getBadgeClass = (badge) => {
    if (badge === 'HOT') return 'bg-tertiary text-on-surface';
    if (badge === 'NEW') return 'bg-primary text-white';
    return 'bg-secondary text-white';
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary selection:text-white min-h-screen">
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hard-shadow {
            box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
        }
        .hard-shadow-sm {
            box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
        }
        .brutal-border {
            border: 3px solid #000000;
        }
        .rotate-left { transform: rotate(-1.5deg); }
        .rotate-right { transform: rotate(1.2deg); }
        .rotate-hover { transition: all 0.2s ease-in-out; }
      `}</style>

      {/* TopNavBar */}
      <header className="w-full top-0 sticky bg-surface border-b-[3px] border-on-surface shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50">
        <nav className="flex justify-between items-center px-6 py-4 w-full max-w-full">
          <div
            className="font-display text-2xl font-black uppercase text-primary tracking-tighter flex items-center cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb3q1VtCDDVdzkDCYW3fpjSJTK8M6Wdd3lgEK7SNYEOSEnFHqFUeNW2S-BBR87nF-ig44tlgVeJXkcencDWNwUQ5_i5vFPPh6P62duF8jMCOilRwBlWrMOxrES3g9QYJop4QgrhQS39QUR_ECqhRxf8A0bw6POCa4CvwbfDOrPtorBCFbsTu2f1fikWVuun0RYBEqmozyJ7HypgOEwcEr2JswiDiYzBMsw-YberYAOyOULQm7hIrWqiBe57rggtiPWHe_tTkUDuE11" alt="Gevinest Logo" className="h-8 w-8 inline-block mr-2 align-middle rounded-full object-cover" />
            KARYA EBOOK SAYA
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <Link className="text-primary underline decoration-[3px] underline-offset-8 font-label text-sm" to="/">GALLERY</Link>
            <Link className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" to="/portfolio">PROFILE</Link>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#collections">COLLECTIONS</a>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#about">ABOUT</a>
            <div className="flex items-center brutal-border bg-white px-3 py-1 gap-2">
              <span className="material-symbols-outlined text-on-surface text-sm">search</span>
              <input className="bg-transparent border-none focus:ring-0 font-label text-sm w-32 outline-none" placeholder="Search..." type="text" />
            </div>
            <Link
              to="/portfolio"
              className="bg-primary text-white brutal-border px-6 py-2 font-label text-sm hard-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              LIHAT PORTOFOLIO
            </Link>
          </div>
          {/* Mobile Menu Toggle Icon */}
          <div className="md:hidden brutal-border p-1 bg-white cursor-pointer" onClick={() => navigate('/portfolio')}>
            <span className="material-symbols-outlined text-3xl block">menu</span>
          </div>
        </nav>
      </header>

      {/* Marquee Banner */}
      <section className="bg-tertiary border-t-[3px] border-b-[3px] border-on-surface overflow-hidden py-2" style={{ backgroundColor: '#1F3A5F' }}>
        <div className="flex whitespace-nowrap">
          <div className="flex gap-8 items-center animate-marquee">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="font-display text-2xl font-black uppercase tracking-widest text-white">E-novel by Gevinest</span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="mb-20 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-tertiary brutal-border px-4 py-1 font-label text-xs font-bold mb-4">NEW RELEASES V2.4</span>
            <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
              karya ebook saya
            </h1>
            <p className="text-xl md:text-2xl font-body max-w-xl mb-8 leading-relaxed opacity-90">
              Sebuah wadah kurasi literasi digital dengan estetika mentah dan kejujuran struktural. Eksplorasi koleksi terbatas kami.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="bg-primary text-white brutal-border px-8 py-4 font-display font-bold text-lg hard-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase">
                Jelajahi Sekarang
              </button>
              <button className="bg-white text-on-surface brutal-border px-8 py-4 font-display font-bold text-lg hard-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase">
                Dokumentasi
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-primary brutal-border p-8 hard-shadow rotate-right">
              <h2 className="font-display text-3xl font-black text-white mb-4">Misi Kami.</h2>
              <p className="font-body text-white/90 text-lg mb-6">Kami menolak kelembutan digital demi kejujuran visual. Setiap elemen dibingkai dengan bobot berat untuk menandakan permanensi fungsional.</p>
              <div className="w-full bg-black h-4 relative">
                <div className="absolute left-0 top-0 h-full bg-tertiary w-3/4"></div>
              </div>
              <div className="flex justify-between mt-2 font-label text-xs text-white uppercase">
                <span>System Load</span>
                <span>Stable 99%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ebook Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" id="ebooks-container">
          {ebooks.map((ebook, index) => {
            const isRotateLeft = index % 2 === 0;
            const rotateClass = isRotateLeft ? 'rotate-left' : 'rotate-right';
            const defaultRotation = isRotateLeft ? 'rotate(-1.5deg)' : 'rotate(1.2deg)';

            return (
              <article 
                key={ebook.id}
                className={`bg-white brutal-border p-6 hard-shadow ${rotateClass} rotate-hover flex flex-col h-full`}
                style={{ transform: defaultRotation }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = defaultRotation;
                }}
              >
                <div className="relative mb-6">
                  {ebook.badge && (
                    <div className={`absolute -top-3 -right-3 z-10 ${getBadgeClass(ebook.badge)} brutal-border px-3 py-1 font-label text-xs font-bold`}>
                      {ebook.badge}
                    </div>
                  )}
                  <img 
                    className="w-full aspect-[3/4] object-cover brutal-border" 
                    src={ebook.cover} 
                    alt={ebook.title} 
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="bg-secondary text-white brutal-border px-2 py-0.5 font-label text-[10px] uppercase font-bold tracking-wider">
                      {ebook.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 leading-none">{ebook.title}</h3>
                  <p className="font-body text-sm text-on-surface/80 mb-8 flex-grow leading-relaxed">
                    {ebook.synopsis}
                  </p>
                  <button 
                    onClick={() => handleReadClick(ebook)}
                    className="w-full bg-primary text-white brutal-border py-3 font-display font-bold uppercase hard-shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                  >
                    baca sinopsis
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {/* Newsletter Section */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-on-surface text-surface brutal-border p-12 hard-shadow">
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 uppercase">Gabung Perlawanan Literasi.</h2>
            <p className="font-body text-lg mb-10 opacity-80 max-w-2xl">Dapatkan update koleksi terbaru kami langsung di kotak masukmu. Tanpa spam, hanya konten mentah berkualitas tinggi.</p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-grow bg-white text-on-surface brutal-border px-6 py-4 font-label focus:ring-primary focus:border-primary outline-none" placeholder="ALAMAT EMAIL ANDA" type="email" />
              <button className="bg-primary text-white brutal-border px-10 py-4 font-display font-bold uppercase hard-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" type="submit">
                DAFTAR
              </button>
            </form>
          </div>
          <div className="md:col-span-4 bg-tertiary brutal-border p-8 hard-shadow flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-7xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <h3 className="font-display text-2xl font-black mb-2 uppercase">ULTRA FAST</h3>
            <p className="font-label text-sm font-bold uppercase tracking-widest">Digital Infrastructure</p>
          </div>
        </section>
      </main>

      {/* Synopsis Modal */}
      {showSynopsisModal && selectedEbook && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-surface brutal-border p-8 hard-shadow max-w-2xl w-full relative">
            <button 
              className="absolute top-4 right-4 text-3xl font-bold cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setShowSynopsisModal(false)}
            >
              ✕
            </button>

            <h2 className="font-display text-4xl font-black mb-4">{selectedEbook.title}</h2>
            <p className="font-body text-lg mb-8 leading-relaxed">
              {selectedEbook.synopsis}
            </p>

            <div className="flex gap-4">
              <button 
                className="bg-primary text-white brutal-border px-8 py-4 font-display font-bold uppercase hard-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                LANJUTKAN KE LOGIN
              </button>
              <button 
                onClick={() => setShowSynopsisModal(false)}
                className="bg-white text-on-surface brutal-border px-8 py-4 font-display font-bold uppercase hard-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t-[3px] border-on-surface mt-20" style={{ backgroundColor: '#1F3A5F' }}>
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 w-full max-w-7xl mx-auto text-white">
          <div className="mb-8 md:mb-0">
            <div className="font-display text-3xl font-black text-primary mb-2">KARYA EBOOK SAYA</div>
            <div className="font-label text-xs text-surface opacity-80">© 2024 KARYA EBOOK SAYA. RADICAL INFRASTRUCTURE.</div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold font-label text-xs mb-2">NAVIGASI</span>
              <Link className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm text-left" to="/">HOME</Link>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm text-left" href="/#about">PROFILE</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm text-left" href="/#karya">COLLECTIONS</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm text-left" href="/#about">ABOUT</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold font-label text-xs mb-2">LEGAL</span>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm uppercase text-left" href="#">Privacy Policy</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm uppercase text-left" href="#">Terms of Service</a>
              <a className="text-surface opacity-80 hover:text-primary transition-colors font-label text-sm uppercase text-left" href="#">Contact</a>
            </div>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
            <div className="brutal-border p-2 bg-white hard-shadow-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-on-surface">
              <span className="material-symbols-outlined text-on-surface">share</span>
            </div>
            <div className="brutal-border p-2 bg-white hard-shadow-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-on-surface">
              <span className="material-symbols-outlined text-on-surface">account_circle</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}