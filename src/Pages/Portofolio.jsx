import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  useEffect(() => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('hidden', !isMenuOpen);
    };
    mobileMenuBtn?.addEventListener('click', toggleMenu);

    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      const move = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rotateX = ((y - rect.height/2) / (rect.height/2)) * -15;
        const rotateY = ((x - rect.width/2) / (rect.width/2)) * 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      };
      const leave = () => { card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)'; };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
    });

    return () => { mobileMenuBtn?.removeEventListener('click', toggleMenu); };
  }, []);

  return (
    <div className="font-body-md text-body-md overflow-x-hidden relative">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-layout-margin py-unit-2 bg-surface brutalist-border border-t-0 border-l-0 border-r-0 shadow-[0px_3px_0px_0px_rgba(28,27,27,1)]">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full brutalist-border">
            <img alt="Logo" className="h-full w-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDADZo5sTXBB3OhWMAIalgDEaPfj9XufU-Qy7RtsVHMYyGhh8J4UI4erRGBzfSwW-54dvDDEfMKQBP6bu8TI3tkVdXxzrvLehMhPZpmaX95f7Ld0CVUOkEHQTSqcQpYb0d1JXNvu5he1sm56RiF7KWTAVpMJnAnfkKOFZGOIyXfb1wDTy7zj4bQBJTm2QsznbH92TWZdjsu98vKJQbwkpOtMVD-hyNxQXimbLvxAH6XtcBn_P17ZruxRqF3PP6tJD_WMBm2iJO192E" />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-unit-6">
          <Link className="font-label-md text-label-md text-on-surface hover:text-primary transition-all" to="/gallery">📚 e-book gallery</Link>
          <a className="font-label-md text-label-md text-on-surface hover:text-primary transition-all" href="#about">about</a>
          <a className="font-label-md text-label-md text-on-surface hover:text-primary transition-all" href="#pendidikan">pendidikan</a>
          <a className="font-label-md text-label-md text-on-surface hover:text-primary transition-all" href="#keahlian">keahlian</a>
          <a className="font-label-md text-label-md text-on-surface hover:text-primary transition-all" href="#karya">karya</a>
          <a className="font-label-md text-label-md text-on-surface hover:text-primary transition-all" href="#kontak">kontak</a>
          <button className="bg-brand-coral brutalist-border brutalist-shadow px-unit-4 py-unit-1 font-label-md text-label-md text-white brutalist-shadow-hover transition-all">Resume</button>
        </div>
        <button className="md:hidden brutalist-border p-unit-1" id="mobile-menu-btn">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </nav>

      <div className="fixed inset-0 z-40 bg-brand-offwhite flex flex-col items-center justify-center gap-unit-6 p-layout-margin hidden" id="mobile-menu">
        <a href="#about">about</a><a href="#pendidikan">pendidikan</a><a href="#keahlian">keahlian</a><a href="#karya">karya</a><a href="#kontak">kontak</a>
      </div>

      <main className="container mx-auto px-layout-margin py-unit-8 space-y-unit-8">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-unit-8 items-center">
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative bg-brand-navy brutalist-border brutalist-shadow w-72 h-80 md:w-80 md:h-96 group overflow-hidden brutalist-shadow-hover shadow-[10px_10px_0px_0px_#1c1b1b] ml-8 md:ml-20">
              <img className="w-full h-full object-cover transition-all duration-100" alt="Portrait" src="/Foto Profile .jpeg" />
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-brand-yellow transition-all"></div>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col items-start gap-unit-4">
            <div className="bg-brand-yellow brutalist-border px-unit-4 py-unit-1 font-label-md text-label-md">
              Informatics Student &amp; e-novel desinger & writer
            </div>
            <h1 className="font-headline-xl text-headline-xl md:text-[64px] leading-none">
              halo, saya <span className="text-brand-coral">Gerardus Malvin</span>
            </h1>
            <p className="font-body-lg text-body-lg max-w-xl">
              Saya adalah seorang mahasiswa Informatika yang memiliki ketertarikan dalam dunia desain dan penulisan e-novel.
            </p>
            <div className="running-border-wrapper brutalist-shadow brutalist-shadow-hover">
              <div className="running-border-line"></div>
              <div className="running-border-content">
                <Link to="/gallery" className="group bg-brand-coral brutalist-border px-unit-8 py-unit-4 font-headline-md text-headline-md text-white transition-all flex items-center gap-unit-2">
                  lihat karya E-novel <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* section About, Pendidikan, Keahlian, Karya — tempel & ganti class→className seperti pola di atas */}
      </main>

      <footer className="w-full brutalist-border border-b-0 border-l-0 border-r-0 px-layout-margin py-unit-6 mt-unit-6 bg-brand-navy" id="kontak">
        {/* isi footer sama, class→className */}
      </footer>
    </div>
  );
}