const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'public', 'assets');
const publicDir = path.join(rootDir, 'public');
const appDir = path.join(rootDir, 'src', 'app');

async function optimizeImages() {
  console.log('🚀 Memulai proses optimasi gambar untuk Museum Of Us...\n');

  const inputPng = path.join(assetsDir, 'desktop-1-clean.png');
  const outputWebp = path.join(assetsDir, 'desktop-1-clean.webp');
  const outputOgJpg = path.join(publicDir, 'og-image.jpg');
  const outputIconPng = path.join(appDir, 'icon.png');

  if (!fs.existsSync(inputPng)) {
    console.error(`❌ File tidak ditemukan: ${inputPng}`);
    process.exit(1);
  }

  // 1. Konversi desktop-1-clean.png ke WebP (kualitas ~80)
  console.log('1️⃣ Mengonversi desktop-1-clean.png ke WebP (kualitas 80)...');
  await sharp(inputPng)
    .webp({ quality: 80, effort: 6 })
    .toFile(outputWebp);

  const pngStats = fs.statSync(inputPng);
  const webpStats = fs.statSync(outputWebp);
  console.log(`   ✓ WebP berhasil dibuat: public/assets/desktop-1-clean.webp`);
  console.log(`   - Ukuran asli PNG: ${(pngStats.size / 1024).toFixed(1)} KB`);
  console.log(`   - Ukuran baru WebP: ${(webpStats.size / 1024).toFixed(1)} KB (hemat ${((1 - webpStats.size / pngStats.size) * 100).toFixed(1)}%)\n`);

  // 2. Buat gambar Open Graph preview (1200x630 px, format JPG, < 300 KB)
  console.log('2️⃣ Membuat Open Graph preview image (1200x630 px JPG, < 300 KB)...');
  await sharp(inputPng)
    .resize(1200, 630, {
      fit: 'contain',
      background: { r: 116, g: 83, b: 153, alpha: 1 }, // #745399 warna tema museum
    })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(outputOgJpg);

  const ogStats = fs.statSync(outputOgJpg);
  console.log(`   ✓ OG Image berhasil dibuat: public/og-image.jpg`);
  console.log(`   - Dimensi: 1200x630 px`);
  console.log(`   - Ukuran file: ${(ogStats.size / 1024).toFixed(1)} KB (Target: < 300 KB untuk WhatsApp) - STATUS: ${ogStats.size < 300 * 1024 ? 'LULUS ✅' : 'TERLALU BESAR ❌'}\n`);

  // 3. Buat Favicon (src/app/icon.png - Hati emas / ungu tema museum)
  console.log('3️⃣ Membuat favicon src/app/icon.png...');
  const iconSvg = `
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#745399"/>
    <path d="M32 47.5C32 47.5 17 38.2 17 26.5C17 20.7 21.7 16 27.5 16C30.2 16 32 17.5 32 17.5C32 17.5 33.8 16 36.5 16C42.3 16 47 20.7 47 26.5C47 38.2 32 47.5 32 47.5Z" fill="#F3CE6E" stroke="#FFF2B2" stroke-width="2"/>
    <circle cx="25" cy="23" r="2.5" fill="#FFFFFF" fill-opacity="0.8"/>
  </svg>
  `;

  await sharp(Buffer.from(iconSvg))
    .png()
    .toFile(outputIconPng);

  console.log(`   ✓ Favicon berhasil dibuat: src/app/icon.png\n`);

  console.log('🎉 Semua optimasi gambar selesai dengan sempurna!');
}

optimizeImages().catch((err) => {
  console.error('❌ Gagal menjalankan optimasi gambar:', err);
  process.exit(1);
});
