import type { Metadata } from 'next';
import './globals.css';
import GradientBackground from '@/components/GradientBackground';

export const metadata: Metadata = {
  title: 'Museum Of Us - Happy 21st Birthday',
  description: 'Galeri foto museum interaktif dan kado ulang tahun spesial.',
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
