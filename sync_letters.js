const fs = require('fs');
const path = require('path');

const projectDir = 'C:\\Users\\HP\\website museum of us';
const refLettersDir = path.join(projectDir, 'refrensi media', 'letters');
const pubLettersDir = path.join(projectDir, 'public', 'letters');

if (!fs.existsSync(refLettersDir)) {
  fs.mkdirSync(refLettersDir, { recursive: true });
}
if (!fs.existsSync(pubLettersDir)) {
  fs.mkdirSync(pubLettersDir, { recursive: true });
}

const found = [];
const missing = [];

for (let i = 2; i <= 22; i++) {
  const numStr = i < 10 ? `0${i}` : `${i}`;
  const filename = `letter-${numStr}.png`;
  const src = path.join(refLettersDir, filename);
  const dst = path.join(pubLettersDir, filename);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    found.push(filename);
  } else if (fs.existsSync(dst)) {
    found.push(filename);
  } else {
    missing.push(filename);
  }
}

console.log('========================================================');
console.log('   MUSEUM OF US - STATUS ASSET SURAT (letter-NN.png)    ');
console.log('========================================================');
if (found.length > 0) {
  console.log(`[OK] Ditemukan (${found.length}/21):`, found.join(', '));
} else {
  console.log('[INFO] Belum ada file letter-NN.png di refrensi media/letters/');
}

if (missing.length > 0) {
  console.log(`[FALLBACK AKTIF] Belum ada (${missing.length}/21 file):`);
  console.log('  ' + missing.join(', '));
  console.log('-> Popup untuk nomor-nomor di atas sementara memakai');
  console.log('   desain kartu kertas krem elegan dengan teks surat.');
  console.log('-> Untuk memasukkan surat dari Figma: simpan file PNG transparan');
  console.log('   ke: refrensi media/letters/letter-02.png dst.');
}
console.log('========================================================\n');
