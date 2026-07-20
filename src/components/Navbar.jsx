import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full top-0 sticky bg-surface border-b-[3px] border-on-surface shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50">
      <nav className="flex justify-between items-center px-6 py-4 w-full max-w-full">
        <div
          className="font-display text-2xl font-black uppercase text-primary tracking-tighter cursor-pointer"
          onClick={() => navigate('/')}
        >
          GV
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => navigate('/')}
            className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1"
          >
            home
          </button>
          <a
            href="/#about"
            className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1"
          >
            about
          </a>
          <a
            href="/#keahlian"
            className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1"
          >
            keahlian
          </a>
          <button
            onClick={() => navigate('/gallery')}
            className="text-primary underline decoration-[3px] underline-offset-8 font-label text-sm font-bold"
          >
            📚 e-book gallery
          </button>
          <a
            href="/#kontak"
            className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all px-2 py-1"
          >
            kontak
          </a>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex gap-2 items-center">
              <span className="font-label text-xs text-on-surface/70">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-secondary text-white border-[3px] border-on-surface px-4 py-2 font-label text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-primary text-white border-[3px] border-on-surface px-6 py-2 font-label text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase font-bold"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden border-[3px] border-on-surface p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t-[3px] border-on-surface p-6 flex flex-col gap-6">
          <button
            onClick={() => {
              navigate('/');
              setIsMenuOpen(false);
            }}
            className="font-display text-2xl text-on-surface hover:text-primary transition-all text-left"
          >
            home
          </button>
          <a
            href="/#about"
            className="font-display text-2xl text-on-surface hover:text-primary transition-all"
          >
            about
          </a>
          <a
            href="/#keahlian"
            className="font-display text-2xl text-on-surface hover:text-primary transition-all"
          >
            keahlian
          </a>
          <button
            onClick={() => {
              navigate('/gallery');
              setIsMenuOpen(false);
            }}
            className="font-display text-2xl text-primary font-bold hover:opacity-80 transition-all text-left"
          >
            📚 e-book gallery
          </button>
          <a
            href="/#kontak"
            className="font-display text-2xl text-on-surface hover:text-primary transition-all"
          >
            kontak
          </a>

          {/* Mobile Auth Section */}
          <div className="border-t-[3px] border-on-surface pt-6">
            {isAuthenticated ? (
              <>
                <p className="font-body text-sm text-on-surface/70 mb-4">{user?.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-secondary text-white border-[3px] border-on-surface px-8 py-4 font-display font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-primary text-white border-[3px] border-on-surface px-8 py-4 font-display font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
}