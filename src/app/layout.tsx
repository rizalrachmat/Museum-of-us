import type { Metadata } from 'next';
import './globals.css';
import GradientBackground from '@/components/GradientBackground';

export const metadata: Metadata = {
  metadataBase: new URL('https://museum-of-us-two.vercel.app'),
  title: 'Museum Of Us - Happy 21st Birthday',
  description: 'Museum cinta interaktif berisi galeri kenangan berharga, surat-surat manis, dan kejutan ulang tahun ke-21 spesial untuk Jiaa.',
  openGraph: {
    title: 'Museum Of Us - Happy 21st Birthday',
    description: 'Museum cinta interaktif berisi galeri kenangan berharga, surat-surat manis, dan kejutan ulang tahun ke-21 spesial untuk Jiaa.',
    url: 'https://museum-of-us-two.vercel.app',
    siteName: 'Museum Of Us',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Museum Of Us - Happy 21st Birthday',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Museum Of Us - Happy 21st Birthday',
    description: 'Museum cinta interaktif berisi galeri kenangan berharga, surat-surat manis, dan kejutan ulang tahun ke-21 spesial untuk Jiaa.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen relative antialiased selection:bg-[#9370DB] selection:text-white">
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
