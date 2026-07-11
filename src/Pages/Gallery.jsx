import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  useEffect(() => {
    const cards = document.querySelectorAll('article');
    cards.forEach(card => {
      const enter = () => { card.style.transform = 'rotate(0deg) scale(1.02)'; };
      const leave = () => {
        card.style.transform = card.classList.contains('rotate-left')
          ? 'rotate(-1.5deg)' : 'rotate(1.2deg)';
      };
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
    });
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary selection:text-white">
      <header className="w-full top-0 sticky bg-surface border-b-[3px] border-on-surface shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50">
        <nav className="flex justify-between items-center px-6 py-4 w-full max-w-full">
          <div className="font-display text-2xl font-black uppercase text-primary tracking-tighter flex items-center">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb3q1VtCDDVdzkDCYW3fpjSJTK8M6Wdd3lgEK7SNYEOSEnFHqFUeNW2S-BBR87nF-ig44tlgVeJXkcencDWNwUQ5_i5vFPPh6P62duF8jMCOilRwBlWrMOxrES3g9QYJop4QgrhQS39QUR_ECqhRxf8A0bw6POCa4CvwbfDOrPtorBCFbsTu2f1fikWVuun0RYBEqmozyJ7HypgOEwcEr2JswiDiYzBMsw-YberYAOyOULQm7hIrWqiBe57rggtiPWHe_tTkUDuE11" alt="Gevinest Logo" className="h-8 w-8 inline-block mr-2 align-middle rounded-full object-cover" />
            KARYA EBOOK SAYA
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-primary underline decoration-[3px] underline-offset-8 font-label text-sm" href="#">GALLERY</a>
            <Link className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all" to="/">PROFILE</Link>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#">COLLECTIONS</a>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#">ABOUT</a>
            <div className="flex items-center brutal-border bg-white px-3 py-1 gap-2">
              <span className="material-symbols-outlined text-on-surface text-sm">search</span>
              <input className="bg-transparent border-none focus:ring-0 font-label text-sm w-32" placeholder="Search..." type="text" />
            </div>
            <button className="bg-primary text-white brutal-border px-6 py-2 font-label text-sm hard-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
              LOGIN
            </button>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </div>
        </nav>
      </header>

      <section className="bg-tertiary border-t-[3px] border-b-[3px] border-on-surface overflow-hidden py-2" style={{ backgroundColor: '#1F3A5F' }}>
        <div className="flex whitespace-nowrap">
          <div className="flex gap-8 items-center animate-marquee">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="font-display text-2xl font-black uppercase tracking-widest text-white">E-novel by Gevinest</span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="mb-20 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-tertiary brutal-border px-4 py-1 font-label text-xs font-bold mb-4">NEW RELEASES V2.4</span>
            <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">karya ebook saya</h1>
            <p className="text-xl md:text-2xl font-body max-w-xl mb-8 leading-relaxed opacity-90">
              Sebuah wadah kurasi literasi digital dengan estetika mentah dan kejujuran struktural. Eksplorasi koleksi terbatas kami.
            </p>
            <div className="flex flex-wrap gap-4">
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
              <p className="font-body text-white/90 text-lg mb-6">Kami menolak kelembutan digital demi kejujuran visual.</p>
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
        {/* Ebook Grid & Newsletter section — tempel dari kode kamu, ganti class→className seperti pola di atas */}
      </main>

      <footer className="w-full bottom-0 border-t-[3px] border-on-surface mt-20" style={{ backgroundColor: '#1F3A5F' }}>
        {/* isi footer sama seperti sebelumnya, tinggal ganti class jadi className */}
      </footer>
    </div>
  );
}