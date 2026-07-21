import { useState } from 'react';

export default function PaymentModal({
  isOpen,
  onClose,
  ebook,
  onPaymentSuccess
}) {
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleVerification = () => {
    setError('');

    if (verificationCode.trim()) {
      setPaymentVerified(true);
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess({
            ebookId: ebook.id,
            amount: ebook.price,
            status: 'success',
            timestamp: new Date().toISOString(),
          });
        }
        onClose();
      }, 1500);
    } else {
      setError('Masukkan kode verifikasi dari e-banking kamu');
    }
  };

  if (!isOpen || !ebook) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-surface border-[3px] border-on-surface p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-3xl font-bold hover:opacity-70 transition-opacity"
          onClick={onClose}
          disabled={paymentVerified}
        >
          ✕
        </button>

        <h2 className="font-display text-3xl font-black mb-2">
          {paymentVerified ? '✓ Pembayaran Berhasil' : 'Pembayaran QRIS'}
        </h2>
        <p className="font-body text-sm text-on-surface/70 mb-6">
          {paymentVerified
            ? 'E-book kamu sudah bisa dibaca sekarang!'
            : 'Scan kode QR di bawah dengan e-banking kamu'}
        </p>

        {paymentVerified ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="font-display text-2xl font-black mb-4">{ebook.title}</h3>
            <p className="font-body text-sm text-on-surface/70 mb-6">
              Terima kasih! Kamu sekarang memiliki akses ke e-book ini.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-primary text-white border-[3px] border-on-surface px-6 py-3 font-display font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              Tutup
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 pb-6 border-b-[3px] border-on-surface">
              <div className="flex justify-between mb-2">
                <span className="font-body font-bold">{ebook.title}</span>
                <span className="font-display font-black text-primary">
                  Rp {ebook.price?.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="font-body text-xs text-on-surface/70">{ebook.category}</p>
            </div>

            {error && (
              <div className="bg-red-100 border-[2px] border-red-500 text-red-700 px-4 py-3 mb-4 font-body text-sm">
                {error}
              </div>
            )}

            <div className="bg-on-surface/5 border-[3px] border-on-surface p-6 mb-6 flex flex-col items-center">
              <p className="font-label text-xs uppercase mb-4 text-on-surface/70">
                Scan dengan e-banking kamu
              </p>
              <div className="w-64 h-64 bg-gray-300 border-[2px] border-on-surface flex items-center justify-center">
                <p className="text-on-surface/50">QRIS Placeholder</p>
              </div>
              <p className="font-body text-xs text-on-surface/70 mt-4 text-center">
                Gunakan aplikasi bank yang menerima pembayaran QRIS
              </p>
            </div>

            <div className="mb-6">
              <label className="font-label text-xs uppercase block mb-2">
                Kode Verifikasi (opsional)
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Masukkan kode dari e-banking (jika ada)"
                className="w-full border-[3px] border-on-surface px-4 py-3 font-body focus:outline-none focus:bg-tertiary transition-colors"
              />
              <p className="font-body text-xs text-on-surface/70 mt-2">
                Kalau sudah bayar, masukkan kode untuk verifikasi instant
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleVerification}
                className="w-full bg-primary text-white border-[3px] border-on-surface px-6 py-3 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                Verifikasi Pembayaran
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white text-on-surface border-[3px] border-on-surface px-6 py-3 font-display font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                Batal
              </button>
            </div>

            <div className="mt-6 pt-6 border-t-[3px] border-on-surface">
              <p className="font-body text-xs text-on-surface/70">
                <strong>Tips:</strong> Pembayaran biasanya terverifikasi dalam beberapa detik. Jika belum terupdate, tunggu beberapa menit atau hubungi support.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}