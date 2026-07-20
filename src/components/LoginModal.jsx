import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const { login, signup, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success;
      if (isSignup) {
        success = await signup(email, password);
      } else {
        success = await login(email, password);
      }

      if (success) {
        setEmail('');
        setPassword('');
        if (onSuccess) onSuccess();
        onClose();
      } else {
        setError(authError || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-surface border-[3px] border-on-surface p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-md w-full relative">
        <button
          className="absolute top-4 right-4 text-3xl font-bold hover:opacity-70 transition-opacity"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="font-display text-3xl font-black mb-2">
          {isSignup ? 'Daftar' : 'Login'}
        </h2>
        <p className="font-body text-sm text-on-surface/70 mb-6">
          {isSignup
            ? 'Buat akun baru untuk membaca e-book eksklusif'
            : 'Masuk dengan email dan password'}
        </p>

        {error && (
          <div className="bg-red-100 border-[2px] border-red-500 text-red-700 px-4 py-3 mb-4 font-body text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-xs uppercase block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              className="w-full border-[3px] border-on-surface px-4 py-3 font-body focus:outline-none focus:bg-tertiary transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label className="font-label text-xs uppercase block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full border-[3px] border-on-surface px-4 py-3 font-body focus:outline-none focus:bg-tertiary transition-colors"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white border-[3px] border-on-surface px-6 py-3 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : isSignup ? 'Daftar' : 'Login'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t-[3px] border-on-surface text-center">
          <p className="font-body text-sm text-on-surface/70 mb-2">
            {isSignup ? 'Sudah punya akun?' : 'Belum punya akun?'}
          </p>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="font-label text-sm font-bold text-primary hover:underline"
          >
            {isSignup ? 'Login di sini' : 'Daftar di sini'}
          </button>
        </div>
      </div>
    </div>
  );
}