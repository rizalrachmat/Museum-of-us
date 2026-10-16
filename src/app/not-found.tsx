import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      color: '#FFFFFF',
      fontFamily: "'Cinzel', serif",
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>404</h1>
      <p style={{ fontSize: '18px', marginBottom: '24px' }}>Halaman tidak ditemukan</p>
      <Link href="/" style={{
        padding: '10px 24px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#FFFFFF',
        textDecoration: 'none'
      }}>
        Kembali ke Galeri
      </Link>
    </div>
  );
}
