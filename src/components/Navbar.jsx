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
          className="font-display text-2xl font-black uppercase text-primary tracking-tighter cursor-pointer flex items-center"
          onClick={() => navigate('/')}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb3q1VtCDDVdzkDCYW3fpjSJTK8M6Wdd3lgEK7SNYEOSEnFHqFUeNW2S-BBR87nF-ig44tlgVeJXkcencDWNwUQ5_i5vFPPh6P62duF8jMCOilRwBlWrMOxrES3g9QYJop4QgrhQS39QUR_ECqhRxf8A0bw6POCa4CvwbfDOrPtorBCFbsTu2f1fikWVuun0RYBEqmozyJ7HypgOEwcEr2JswiDiYzBMsw-YberYAOyOULQm7hIrWqiBe57rggtiPWHe_tTkUDuE11"
            alt="Gevinest Logo"
            className="h-8 w-8 inline-block mr-2 align-middle rounded-full object-cover"
          />
          KARYA EBOOK SAYA
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => navigate('/gallery')}
            className="text-primary underline decoration-[3px] underline-offset-8 font-label text-sm uppercase font-bold"
          >
            GALLERY
          </button>
          <a
            href="/#profile"
            className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all uppercase px-2 py-1"
          >
            PROFILE
          </a>
          <a
            href="/#collections"
            className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all uppercase px-2 py-1"
          >
            COLLECTIONS
          </a>
          <a
            href="/#about"
            className="text-on-surface font-label text-sm hover:bg-primary-container hover:text-on-primary-container transition-all uppercase px-2 py-1"
          >
            ABOUT
          </a>

          {/* Search Bar */}
          <div className="flex items-center border-[3px] border-on-surface bg-white px-3 py-1 gap-2">
            <span className="material-symbols-outlined text-on-surface text-sm">search</span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 font-label text-sm w-32 outline-none"
            />
          </div>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex gap-2 items-center">
              <span className="font-label text-xs text-on-surface/70">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-secondary text-white border-[3px] border-on-surface px-6 py-2 font-label text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-primary text-white border-[3px] border-on-surface px-6 py-2 font-label text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase font-bold"
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
              navigate('/gallery');
              setIsMenuOpen(false);
            }}
            className="font-display text-2xl text-primary font-bold hover:opacity-80 transition-all text-left uppercase"
          >
            GALLERY
          </button>
          <a
            href="/#profile"
            className="font-display text-2xl text-on-surface hover:text-primary transition-all uppercase"
          >
            PROFILE
          </a>
          <a
            href="/#collections"
            className="font-display text-2xl text-on-surface hover:text-primary transition-all uppercase"
          >
            COLLECTIONS
          </a>
          <a
            href="/#about"
            className="font-display text-2xl text-on-surface hover:text-primary transition-all uppercase"
          >
            ABOUT
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