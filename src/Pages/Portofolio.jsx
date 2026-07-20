import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        document.body.style.overflow = 'auto';
      }
    };
    mobileMenuBtn?.addEventListener('click', toggleMenu);

    const menuLinks = document.querySelectorAll('#mobile-menu a');
    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
      document.body.style.overflow = 'auto';
      isMenuOpen = false;
    };
    menuLinks.forEach(link => link.addEventListener('click', closeMenu));

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    const tiltHandlers = [];
    tiltCards.forEach(card => {
      const move = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -15;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
        const shadowX = 6 + (rotateY / 2);
        const shadowY = 6 - (rotateX / 2);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
        card.style.boxShadow = `${shadowX}px ${shadowY}px 0px 0px #1c1b1b`;
        card.style.zIndex = '10';
      };
      const leave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.boxShadow = '6px 6px 0px 0px #1c1b1b';
        card.style.zIndex = '1';
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      tiltHandlers.push({ card, move, leave });
    });

    // Floating Dots Canvas
    const canvas = canvasRef.current;
    let animationId;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      const particleCount = 60;
      const colors = ['#e8643c', '#465f86', '#1c1b1b', '#8c716a'];
      let mouse = { x: null, y: null, radius: 150 };

      const resize = () => {
        if (canvas.parentElement) {
          canvas.width = canvas.parentElement.offsetWidth;
          canvas.height = canvas.parentElement.offsetHeight;
        }
      };

      class Particle {
        constructor() { this.init(); }
        init() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = (Math.random() - 0.5) * 0.5;
          this.speedY = (Math.random() - 0.5) * 0.5;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x > canvas.width) this.x = 0;
          if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0;
          if (this.y < 0) this.y = canvas.height;
          if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x, dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
              const force = (mouse.radius - distance) / mouse.radius;
              this.x -= (dx / distance) * force * 2;
              this.y -= (dy / distance) * force * 2;
            }
          }
        }
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const createParticles = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animationId = requestAnimationFrame(animate);
      };

      resize();
      createParticles();
      animate();

      const handleResize = () => { resize(); createParticles(); };
      window.addEventListener('resize', handleResize);

      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      };
      const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

      canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        mobileMenuBtn?.removeEventListener('click', toggleMenu);
        menuLinks.forEach(link => link.removeEventListener('click', closeMenu));
        tiltHandlers.forEach(({ card, move, leave }) => {
          card.removeEventListener('mousemove', move);
          card.removeEventListener('mouseleave', leave);
        });
        window.removeEventListener('resize', handleResize);
        canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
        cancelAnimationFrame(animationId);
      };
    }
  }, []);

  return (
    <div className="font-body-md text-body-md overflow-x-hidden relative" style={{ overflow: 'auto' }}>
      <style>{`
        .brutalist-border { border: 3px solid #1c1b1b; }
        .brutalist-shadow { box-shadow: 6px 6px 0px 0px #1c1b1b; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease-in-out; }
        .brutalist-shadow-hover:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0px 0px #1c1b1b; }
        .brutalist-shadow-hover:active { transform: translate(4px, 4px); box-shadow: 2px 2px 0px 0px #1c1b1b; }
        .tilt-card { transform-style: preserve-3d; perspective: 1000px; }
        @keyframes ticker-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ticker-container { overflow: hidden; width: 100%; position: relative; }
        .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ticker-scroll var(--speed, 30s) linear infinite;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .track-pendidikan { --speed: 28s; }
        .track-keahlian  { --speed: 42s; }
        .track-karya     { --speed: 38s; }
        #dots-canvas { width: 100%; height: 100%; display: block; }
        @keyframes rotate-border { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .running-border-wrapper { position: relative; padding: 4px; overflow: hidden; display: inline-flex; background: #1c1b1b; }
        .running-border-line { position: absolute; width: 150%; height: 150%; top: -25%; left: -25%; background: conic-gradient(transparent, transparent 20%, #FFD93D 40%, #E8643C 50%, #FFD93D 60%, transparent 80%, transparent); animation: rotate-border 4s linear infinite; z-index: 0; }
        .running-border-content { position: relative; z-index: 10; width: 100%; height: 100%; }
      `}</style>

      {/* Section 1: TopNavBar */}
      <header className="w-full top-0 sticky bg-surface border-b-[3px] border-on-surface shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50">
        <nav className="flex justify-between items-center px-6 py-4 w-full max-w-full">
          <div
            className="font-display text-2xl font-black uppercase text-primary tracking-tighter flex items-center cursor-pointer select-none"
            onClick={() => navigate('/portfolio')}
          >
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb3q1VtCDDVdzkDCYW3fpjSJTK8M6Wdd3lgEK7SNYEOSEnFHqFUeNW2S-BBR87nF-ig44tlgVeJXkcencDWNwUQ5_i5vFPPh6P62duF8jMCOilRwBlWrMOxrES3g9QYJop4QgrhQS39QUR_ECqhRxf8A0bw6POCa4CvwbfDOrPtorBCFbsTu2f1fikWVuun0RYBEqmozyJ7HypgOEwcEr2JswiDiYzBMsw-YberYAOyOULQm7hIrWqiBe57rggtiPWHe_tTkUDuE11" alt="Gevinest Logo" className="h-8 w-8 inline-block mr-2 align-middle rounded-full object-cover" />
            PORTFOLIO
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-primary underline decoration-[3px] underline-offset-8 font-label text-sm" href="#">PROFILE</a>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#about">ABOUT</a>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#pendidikan">PENDIDIKAN</a>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#keahlian">KEAHLIAN</a>
            <a className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1" href="#karya">KARYA</a>
            <button
              onClick={() => setShowResumeModal(true)}
              className="bg-primary text-white brutal-border px-6 py-2 font-label text-sm hard-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              RESUME
            </button>
          </div>
          <button className="md:hidden brutal-border p-1 bg-white cursor-pointer" id="mobile-menu-btn">
            <span className="material-symbols-outlined text-3xl block">menu</span>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className="fixed inset-0 z-40 bg-brand-offwhite flex flex-col items-center justify-center gap-unit-6 p-layout-margin hidden" id="mobile-menu">
        <a className="font-headline-lg text-headline-lg-mobile text-on-surface" href="#">PROFILE</a>
        <a className="font-headline-lg text-headline-lg-mobile text-on-surface" href="#about">ABOUT</a>
        <a className="font-headline-lg text-headline-lg-mobile text-on-surface" href="#pendidikan">PENDIDIKAN</a>
        <a className="font-headline-lg text-headline-lg-mobile text-on-surface" href="#keahlian">KEAHLIAN</a>
        <a className="font-headline-lg text-headline-lg-mobile text-on-surface" href="#karya">KARYA</a>
        <button
          onClick={() => setShowResumeModal(true)}
          className="bg-brand-coral brutalist-border brutalist-shadow px-unit-8 py-unit-4 font-headline-md text-headline-md text-white brutalist-shadow-hover"
        >
          RESUME
        </button>
      </div>

      <main className="container mx-auto px-layout-margin py-unit-8 space-y-unit-8">
        {/* Section 2: Hero */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-unit-8 items-center">
          <div className="md:col-span-5 flex justify-center md:justify-center">
            <div className="relative bg-brand-navy brutalist-border w-72 h-80 md:w-80 md:h-96 group overflow-hidden brutalist-shadow-hover shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-[3px] border-on-background">
              <img className="w-full h-full object-cover transition-all duration-500" alt="Portrait of Gerardus Malvin" src="/Foto Profile .jpeg" />
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-brand-yellow transition-all"></div>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col items-start gap-unit-4">
            <div className="bg-brand-yellow brutalist-border px-unit-4 py-unit-1 font-label-md text-label-md">
              informatics student &amp; Writer
            </div>
            <h1 className="font-headline-xl text-headline-xl md:text-[64px] leading-none">
              halo, saya <span className="text-brand-coral">Gerardus Malvin</span>
            </h1>
            <p className="font-body-lg text-body-lg max-w-xl">
              Seorang mahasiswa Teknik Informatika yang memiliki rasa ketertarikan dalam dunia teknologi .
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

        {/* Section 3: Tentang Saya */}
        <section className="pt-unit-4" id="about">
          <div className="flex flex-col lg:flex-row gap-unit-8 items-start">
            {/* Narrower Tentang Saya Box (approx 65% width) */}
            <div className="lg:w-2/3 bg-brand-coral brutalist-border brutalist-shadow p-unit-6 md:p-unit-8 flex flex-col md:flex-row gap-unit-6 items-center brutalist-shadow-hover tilt-card">
              <div className="flex-1 space-y-unit-2">
                <h2 className="font-headline-lg text-headline-lg text-white">tentang saya</h2>
                <p className="font-body-lg text-body-lg text-white leading-relaxed">
                  Saya percaya bahwa teknologi tidak harus membosankan. Melalui latar belakang Informatika, saya menggabungkan logika pemrograman yang kuat dengan estetika desain yang tajam. Saat ini saya sedang mendalami bagaimana menciptakan sistem desain yang efisien dan aksesibel bagi semua orang.
                </p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <span className="material-symbols-outlined text-[80px] text-white/40 select-none" style={{ fontVariationSettings: '"FILL" 1' }}>terminal</span>
              </div>
            </div>
            {/* Statistic Cards Container (approx 35% width) */}
            <div className="lg:w-1/3 flex flex-row lg:flex-col gap-unit-6 w-full h-full">
              {/* Card 1: Proyek Selesai */}
              <div className="flex-1 brutalist-border brutalist-shadow flex flex-col items-center justify-center text-center p-unit-6 brutalist-shadow-hover transition-all h-full bg-brand-yellow">
                <span className="font-headline-xl text-headline-xl leading-none">16+</span>
                <span className="font-label-sm text-label-sm uppercase mt-unit-2">Proyek Selesai</span>
              </div>
              {/* Card 2: Tahun Belajar */}
              <div className="flex-1 bg-surface-dim brutalist-border brutalist-shadow flex flex-col items-center justify-center text-center p-unit-6 brutalist-shadow-hover transition-all h-full">
                <span className="font-headline-xl text-headline-xl leading-none">04+</span>
                <span className="font-label-sm text-label-sm uppercase mt-unit-2">Tahun Belajar</span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-brand-navy brutalist-border border-l-0 border-r-0 py-unit-4 overflow-hidden ticker-container">
          <div className="ticker-track flex items-center gap-unit-8" style={{ '--speed': '25s' }}>
            {[1, 2, 3, 4].map(i => (
              <span key={i} aria-hidden={i > 1 ? 'true' : undefined} className="font-headline-md text-headline-md text-white uppercase whitespace-nowrap flex-shrink-0">
                e-book &nbsp;•&nbsp; tech &nbsp;•&nbsp; Photograph &nbsp;•&nbsp; philosophy &nbsp;•&nbsp; programming &nbsp;•&nbsp; design &nbsp;•&nbsp; UI/UX &nbsp;•&nbsp; creative &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </section>

        {/* Floating Dots Wrapper: Pendidikan, Keahlian, Karya */}
        <div className="relative w-full overflow-hidden rounded-xl brutalist-border bg-[#fcf9f8]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <canvas ref={canvasRef} id="dots-canvas" width="1227" height="1435"></canvas>
          </div>
          <div className="relative z-10 p-unit-4 md:p-unit-8 space-y-unit-12">

            {/* Section 4: Pendidikan */}
            <section className="space-y-unit-4" id="pendidikan">
              <h2 className="text-4xl font-black uppercase tracking-tighter border-b-4 border-on-background inline-block bg-background shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] px-2 mb-unit-2">pendidikan</h2>
              <div className="ticker-container py-4">
                <div className="ticker-track track-pendidikan gap-unit-6">
                  {[1, 2].map(i => (
                    <div key={i} className="flex gap-unit-6">
                      <div className="min-w-[400px] md:min-w-[600px] bg-white brutalist-border brutalist-shadow p-unit-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-unit-2 brutalist-shadow-hover transition-all">
                        <div className="space-y-unit-1">
                          <h3 className="font-headline-md text-headline-md">Universitas Sanata Dharma</h3>
                          <p className="font-body-md text-body-md text-on-surface-variant italic">Sarjana Teknik Informatika</p>
                        </div>
                        <div className="bg-brand-navy text-white px-unit-4 py-unit-1 brutalist-border font-label-md">2024 — Sekarang</div>
                      </div>
                      <div className="min-w-[400px] md:min-w-[600px] bg-white brutalist-border brutalist-shadow p-unit-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-unit-2 brutalist-shadow-hover transition-all">
                        <div className="space-y-unit-1">
                          <h3 className="font-headline-md text-headline-md">SMA Negeri 1 Yogyakarta</h3>
                          <p className="font-body-md text-body-md text-on-surface-variant italic">Ilmu Pengetahuan Alam</p>
                        </div>
                        <div className="bg-brand-navy text-white px-unit-4 py-unit-1 brutalist-border font-label-md">2018 — 2021</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 5: Keahlian */}
            <section className="space-y-unit-4" id="keahlian">
              <h2 className="text-4xl font-black uppercase tracking-tighter border-b-4 border-on-background inline-block bg-background shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] px-2 mb-unit-2">keahlian</h2>
              <div className="ticker-container py-4">
                <div className="ticker-track track-keahlian gap-unit-6">
                  {[1, 2].map(setNum => (
                    <div key={setNum} className="flex gap-unit-6 h-[480px]">
                      <div className="grid grid-cols-2 grid-rows-2 gap-unit-6 w-[600px]">
                        <a className="col-span-2 bg-brand-coral text-white brutalist-border brutalist-shadow p-unit-4 flex items-center justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-primary" href="#skill-react">
                          <span className="font-headline-lg text-headline-lg uppercase">React.js</span>
                          <span className="material-symbols-outlined text-6xl opacity-40">code</span>
                        </a>
                        <a className="bg-brand-offwhite text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-white" href="#skill-python">
                          <span className="font-headline-md text-headline-md uppercase">Python</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">terminal</span>
                        </a>
                        <a className="bg-brand-yellow text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-tertiary-fixed" href="#skill-figma">
                          <span className="font-headline-md text-headline-md uppercase">Figma</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">draw</span>
                        </a>
                      </div>
                      <a className="w-[400px] bg-brand-navy text-white brutalist-border brutalist-shadow p-unit-6 flex flex-col items-center justify-center text-center gap-unit-4 brutalist-shadow-hover tilt-card transition-colors hover:bg-secondary" href="#skill-uiux">
                        <span className="material-symbols-outlined text-[100px] opacity-40">brush</span>
                        <span className="font-headline-xl text-headline-xl uppercase leading-none">UI/UX Design</span>
                      </a>
                      <div className="flex flex-col gap-unit-6 w-[350px]">
                        <div className="flex-1 bg-brand-yellow text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card">
                          <span className="font-label-md text-label-md uppercase">Tailwind CSS</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">palette</span>
                        </div>
                        <div className="flex-[1.5] bg-brand-coral text-white brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card">
                          <span className="font-headline-md text-headline-md uppercase">Laravel</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">database</span>
                        </div>
                      </div>
                      <div className="w-[300px] bg-brand-offwhite text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card">
                        <span className="font-label-md text-label-md uppercase">Git / GitHub</span>
                        <span className="material-symbols-outlined text-6xl opacity-40 self-end">account_tree</span>
                      </div>
                      <div className="grid grid-cols-2 gap-unit-6 w-[600px]">
                        <a className="bg-brand-offwhite text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-white" href="#skill-communication">
                          <span className="font-headline-md text-headline-md uppercase">Good Communication</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">chat</span>
                        </a>
                        <a className="bg-brand-yellow text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-tertiary-fixed" href="#skill-teamwork">
                          <span className="font-headline-md text-headline-md uppercase">Team Working</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">groups</span>
                        </a>
                        <a className="bg-brand-coral text-white brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-primary" href="#skill-critical">
                          <span className="font-headline-md text-headline-md uppercase">Critical Thinking</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">psychology</span>
                        </a>
                        <a className="bg-brand-offwhite text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-white" href="#skill-problem">
                          <span className="font-headline-md text-headline-md uppercase">Problem Solving</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">build</span>
                        </a>
                        <a className="bg-brand-yellow text-on-background brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-tertiary-fixed" href="#skill-content">
                          <span className="font-headline-md text-headline-md uppercase">Content Writer</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">edit_note</span>
                        </a>
                        <a className="bg-brand-coral text-white brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card transition-colors hover:bg-primary" href="#skill-book">
                          <span className="font-headline-md text-headline-md uppercase">Book Writer</span>
                          <span className="material-symbols-outlined text-4xl opacity-40">menu_book</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 6: Karya */}
            <section className="space-y-unit-4" id="karya">
              <h2 className="text-4xl font-black uppercase tracking-tighter border-b-4 border-on-background inline-block bg-background shadow-[4px_4px_0px_0px_rgba(28,27,27,1)] px-2 mb-unit-2">karya pilihan</h2>
              <div className="ticker-container py-4">
                <div className="ticker-track track-karya gap-unit-6">
                  {[1, 2].map(blockNum => (
                    <div key={blockNum} className="flex gap-unit-6">
                      <a className="w-[500px] h-[400px] bg-brand-offwhite brutalist-border brutalist-shadow group relative overflow-hidden flex flex-col brutalist-shadow-hover tilt-card" href="#project-fintech">
                        <div className="h-2/3 w-full bg-surface-container overflow-hidden">
                          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="E-novel Design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXgdwAsN7Bq4zfr9pRaeYB5WxDQ6zNlXV-MEWI62ZspJkpaPrWvsihoCnoIhqNKK-qVtwPg-xPaGJ1wXHisvPn8GZuQxrgXzagF3f8Tbinhi6ySJw1vM-ttoLySwx1yXQaExfuKyoVP2rxneh1edUdPyQVeOXDT1qO2h3tyoBBnU4hXEGd1ms1aX9CxgDJ0qq-34FRlxH7ltgt8I_A2OTQDjPAf-MUWGAKUAH3tpyk8l5sIfUpvujzsKT6OBMDGMjVw_KrYI9EvgU" />
                        </div>
                        <div className="p-unit-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-headline-md text-headline-md">E-novel Design &amp; Writer</h3>
                            <p className="font-label-sm text-label-sm opacity-70">UI/UX Design • 2023</p>
                          </div>
                          <div className="mt-unit-2 text-brand-coral font-bold flex items-center gap-1 group-hover:underline">
                            View Case Study <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </div>
                        </div>
                      </a>
                      <div className="w-[500px] h-[400px] flex flex-col gap-unit-6">
                        <a className="flex-1 bg-brand-yellow brutalist-border brutalist-shadow group flex items-center p-unit-4 gap-unit-4 brutalist-shadow-hover tilt-card transition-colors hover:bg-tertiary-fixed" href="#project-edulearn">
                          <div className="flex-1">
                            <h3 className="font-headline-md text-headline-md">Camera Rent Project</h3>
                            <div className="flex gap-2 mt-2">
                              <span className="bg-on-background text-white px-2 py-1 text-[10px] font-bold">LARAVEL</span>
                              <span className="bg-on-background text-white px-2 py-1 text-[10px] font-bold">SQL</span>
                            </div>
                          </div>
                          <div className="w-20 h-20 brutalist-border bg-white rotate-3 overflow-hidden">
                            <img className="w-full h-full object-cover grayscale" alt="Camera Rent Screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPZ_I7sBQwjiZnF8HKZ2DCFAvTQ7jVHkc7KlnWs1aRcJxDA09ZpzVnoYXKtwmJ3TkW3xzmvCJGnRJvzxTz1zLYcCbYuiiMGsZal1wTDoxY24AcTRQgmptbfjvyCwaOfkmt2fYqkIwwrX3GhTvoGTXMdS2CgIP70P2jr25NrgTHlHjutbdCepD4maJb7B6quhvGmVfVf1gXJA710ZA9FHq5NpedjoZKLKsSV6aOc0C9KGExfgki8b59IdTjCEzCePRAm3oJmZtrnWE" />
                          </div>
                        </a>
                        <div className="flex-1 flex gap-unit-6">
                          <div className="flex-1 bg-brand-navy text-white brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card">
                            <h3 className="font-label-md text-label-md uppercase">Pet Tracker IoT</h3>
                            <span className="material-symbols-outlined text-4xl">pets</span>
                          </div>
                          <div className="flex-1 bg-brand-coral text-white brutalist-border brutalist-shadow p-unit-4 flex flex-col justify-between brutalist-shadow-hover tilt-card">
                            <h3 className="font-label-md text-label-md uppercase">Design System</h3>
                            <span className="material-symbols-outlined text-4xl">category</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full brutalist-border border-b-0 border-l-0 border-r-0 px-layout-margin py-unit-6 mt-unit-6 bg-brand-navy" id="kontak">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-unit-6">
          <div className="space-y-unit-2">
            <div className="font-headline-md text-headline-md text-white uppercase">GEVINEST</div>
            <p className="font-body-md text-body-md max-w-sm text-white">Mari berdiskusi tentang proyek selanjutnya.</p>
            <a className="inline-block font-headline-md text-headline-md text-white hover:underline underline-offset-4 brutalist-shadow-hover p-1" href="mailto:halo@gevinest88.id">halo@gevinest88.id</a>
          </div>
          <div className="flex flex-col gap-unit-2">
            <p className="font-label-md text-label-md uppercase border-b-2 border-white text-white">Ikuti Saya</p>
            <div className="flex gap-unit-4">
              <a className="text-white/80 hover:text-white transition-colors font-label-md text-label-md" href="#">LinkedIn</a>
              <a className="text-white/80 hover:text-white transition-colors font-label-md text-label-md" href="#">GitHub</a>
              <a className="text-white/80 hover:text-white transition-colors font-label-md text-label-md" href="#">Dribbble</a>
              <a className="text-white/80 hover:text-white transition-colors font-label-md text-label-md" href="#">Instagram</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-unit-6 pt-unit-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-unit-2 text-white/60">
          <span className="font-label-sm text-label-sm">© 2024 Informatics Student. Built with Code &amp; Grit.</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase">Tersedia untuk proyek baru</span>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-surface brutalist-border p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-3xl font-bold cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setShowResumeModal(false)}
            >
              ✕
            </button>

            <h2 className="font-display text-4xl font-black mb-4">RESUME / CV</h2>
            <p className="font-body text-lg mb-6 text-on-surface/80">
              Berikut adalah salinan digital resume saya. Anda juga dapat mengunduh versi lengkapnya dalam format PDF.
            </p>

            <div className="space-y-6 brutalist-border p-6 bg-white mb-6">
              <div>
                <h3 className="font-display text-xl font-bold border-b-2 border-on-surface pb-1 uppercase text-primary">Profil Singkat</h3>
                <p className="font-body text-sm mt-2 leading-relaxed text-on-surface/90">
                  Mahasiswa Teknik Informatika di Universitas Gadjah Mada yang memiliki minat besar pada pengembangan Front-End, UI/UX Design, dan Creative Writing (desain & penulisan E-book/E-novel).
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold border-b-2 border-on-surface pb-1 uppercase text-primary">Pendidikan</h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <h4 className="font-display text-sm font-bold">Universitas Gadjah Mada (2021 — Sekarang)</h4>
                    <p className="font-body text-xs italic text-on-surface-variant">Sarjana Teknik Informatika</p>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold">SMA Negeri 1 Yogyakarta (2018 — 2021)</h4>
                    <p className="font-body text-xs italic text-on-surface-variant">Ilmu Pengetahuan Alam</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold border-b-2 border-on-surface pb-1 uppercase text-primary">Keahlian Utama</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-brand-yellow brutalist-border px-2 py-1 font-label text-xs text-on-surface">React.js</span>
                  <span className="bg-brand-coral text-white brutalist-border px-2 py-1 font-label text-xs">Tailwind CSS</span>
                  <span className="bg-brand-navy text-white brutalist-border px-2 py-1 font-label text-xs">UI/UX Design</span>
                  <span className="bg-surface-dim brutalist-border px-2 py-1 font-label text-xs text-on-surface">Python</span>
                  <span className="bg-brand-yellow brutalist-border px-2 py-1 font-label text-xs text-on-surface">Figma</span>
                  <span className="bg-brand-coral text-white brutalist-border px-2 py-1 font-label text-xs">Laravel</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/cv-gerardus-malvin.pdf"
                download
                className="bg-primary text-white brutalist-border px-8 py-4 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">download</span> Unduh Resume (PDF)
              </a>
              <button
                onClick={() => setShowResumeModal(false)}
                className="bg-white text-on-surface brutalist-border px-8 py-4 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}