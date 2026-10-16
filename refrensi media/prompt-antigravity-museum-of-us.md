# Prompt: Website "Museum Of Us"

## 1. Tujuan
Buat website interaktif satu halaman bernama **"Museum Of Us"**, kado ulang tahun berupa galeri foto bergaya museum. Pengunjung mengklik bingkai foto di dinding galeri, lalu muncul popup berisi surat singkat. Desain mengikuti prototype Figma (aset gambar dan screenshot tiap frame terlampir). Bahasa teks: Indonesia (teks persis seperti di bawah, jangan diubah atau dikoreksi ejaannya).

## 2. Struktur halaman
- **Halaman utama (Desktop 1):** latar memakai gradien ungu dari file terlampir (lihat bagian 5), judul "Museum Of Us" di tengah atas (font serif tinggi/condensed, putih). Di bawahnya ada dinding berpola bunga ungu dengan bingkai kayu terang di sekelilingnya. Di dinding tergantung 21 bingkai foto emas ornamen dengan bentuk beragam (oval, bulat, persegi, ornamen berukir), masing-masing berisi satu foto. Di bawah dinding ada gambar kucing bertopi ulang tahun yang memegang kue/bunga ungu.
- **Popup surat (Desktop 2 sampai 22):** 21 popup, satu per bingkai. Saat bingkai diklik, latar galeri meredup (overlay gelap) dan surat muncul di tengah. Judul dan dinding tetap terlihat samar di belakang. Tiap popup punya dekorasi kertas sendiri (lihat bagian 4).
- **Halaman ulang tahun (Desktop 23):** halaman penuh yang dibuka dengan mengklik kucing di Desktop 1. Latarnya memakai gradien yang sama dengan halaman lain. Judul dan teks surat ditempatkan di kartu kertas putih/krem agar tetap mudah dibaca di atas gradien.

## 3. Navigasi dan interaksi
- Setiap frame (Desktop 2 sampai 23) punya ikon panah kembali (↩) di pojok kanan atas. **Ikon ini selalu kembali ke Desktop 1 (galeri utama).**
- Bingkai ke popup: [ISI: pasangan bingkai ke Desktop N]. Jika tidak diisi, urutkan bingkai dari kiri ke kanan, atas ke bawah, lalu petakan ke Desktop 2 sampai 22 secara berurutan. Simpan pemetaan di satu array konfigurasi supaya mudah diubah.
- Kucing di Desktop 1 membuka Desktop 23. Beri kucing animasi kecil yang berulang pelan (misalnya bergoyang atau naik turun sedikit) sebagai petunjuk bahwa ia bisa diklik. Saat diklik, halaman 23 terbuka dengan transisi halus (misalnya fade dan sedikit zoom, tidak memuat ulang halaman).
- Hover pada bingkai: efek kecil (misalnya sedikit membesar atau bersinar) agar terlihat bisa diklik.
- Transisi popup (dibuat menarik, mengikuti nuansa prototype Figma): overlay gelap memudar masuk sekitar 250 ms. Surat muncul dari bawah tengah dengan skala 0.85 ke 1 dan sedikit rotasi menuju sudut miringnya sendiri, memakai gerak spring atau ease-out sekitar 450 ms. Dekorasi surat (pita, bunga, bintang, kupu-kupu) muncul menyusul dengan jeda bertahap (stagger) sekitar 60 ms. Saat ditutup, gerakan dibalik lebih cepat. Hormati pengaturan `prefers-reduced-motion` (kurangi menjadi fade sederhana). Jika Figma saya memakai pengaturan transisi tertentu, ikuti itu: [OPSIONAL ISI: instan / dissolve / smart animate].
- Desktop 23: kotak abu-abu di kanan hanyalah penanda posisi di Figma, jangan ditampilkan. Di tempat itu buat **animasi kue ulang tahun** yang memang ingin saya miliki, dengan gaya ungu dan krem yang serasi dengan tema. Kue bertingkat muncul dengan animasi masuk saat halaman terbuka, lilin menyala dengan api yang berkedip halus, dan ada percikan atau konfeti kecil yang jatuh pelan. Teks di dalam kotak ("buatkan saya animasi kue ulang tahun di sini") adalah catatan untuk pembuat kode, jangan ditampilkan di website.

## 4. Isi tiap popup (teks persis dan gaya dekorasi)
- **Desktop 2:** kertas krem bergaris biru dengan ilustrasi ombak biru di bagian bawah. Teks: "Foto bersama sezal dan iput, first time aku membelikan hewan kepada wanita seumuran, kamu sangat terlihat happy mendapatkan itu, walaupun umur mereka ga panjang tapi aku senang melihat mu bahagia"
- **Desktop 3:** amplop kraft dengan segel hati merah, surat krem agak miring di atasnya. Teks: "bunga kedua ku yang masih memiliki wangi mu, jujur aku masih suka nyium bunga ini untuk merasakan wangi mu, makasi ya telah memberikan ku bunga after sidang pei dan makasi juga sudah menemaniku menyelesaikan pei, dukungan mental mu akan aku kenang"
- **Desktop 4:** kertas kotak-kotak dengan border kain kotak merah, bunga hibiscus di pojok kanan atas, bintang merah tua di kiri bawah. Teks: "menjemput mu pulang bekerja, part yg mungkin kamu kira kamu ngerepotin aku, tapi jujur aku suka sekali dengar kata “jemput aku dong” kaya di butuhkan kamu adalah hal yg membuat aku berkesan di hidup mu. jangan malu lagi ya untuk ngomong -" lalu daftar baris: "-“jemput aku”", "-“temenin aku”", "-“anterin aku”", lalu "kamu layak ngomong itu dengan ku"
- **Desktop 5:** kertas renda krem dengan pita merah di pojok kiri atas. Teks: "pantai batu karas salah satu perjalanan terjauh kita walaupun tidak berdua ya, tetapi aku akan berusaha mengajak mu lebih jauh dari rumah, semoga kita tetap bersama ya untuk me wujudkan perjalanan itu"
- **Desktop 6:** kertas putih keunguan tegak, dua pita hitam (kiri bawah dan kanan atas). Teks: "Foto punggung mu di beraga, Di sini aku ingin banyak banyak makasi karena akhirnya aku bisa merasakan ke bandung bersama teman bukan keluarga, oh iya makasi juga udh mengenali ku dengan mamet, hamdan, jeni dan my sahabat pita dan indra, sekali lagi big thanks ya, btw di sini kamu cantik sekali tapi sayang kita tidak foto berdua"
- **Desktop 7:** amplop airmail (pinggir garis merah putih) dengan gambar hati merah. Teks: "mobil vw kodok salah satu dream car aku setelah sudah sukses, dua moment keren dream car dan dream girlfriend"
- **Desktop 8:** kertas bergaris dengan bingkai ornamen melengkung bertepi merah. Teks: "kamu mirip sekali dengan catwomen kamu tanguh sama seperti catwomen dan aku berharap kamu akan tetap tanguh ya walaupun kisah mu belum menjadi cerita industry per film an"
- **Desktop 9:** kertas bergaris krem di atas kertas merah, paku payung merah, bintang emas dan gunting kecil. Teks: "Bsc entah ini kali pertama atau kedua kita ke bsc, tapi aku selalu ingat kamu lah tour guide aku di bsc"
- **Desktop 10:** amplop ungu dengan renda putih dan pita, buket bunga violet. Teks: "lagi dan lagi teazzi, dan lagi lagi dengan pose lucu mu itu baju lucu mu itu, semoga aku masih bisa lihat kamu mengenakan baju lucu itu ya"
- **Desktop 11:** amplop dan kertas ungu dengan bunga daisy pink dan kupu-kupu. Teks: "bunga pertama ku, jujur ini aku masih ga nyangka kaya “eh emang cowo pantes ya dapet bunga”, tetapi berkat kamu aku mendapatkan bunga pertama ku yg akan abadi di lemari ku, ini lucu sekali aku masih berulang kali menatap bunga itu, makasi yaa"
- **Desktop 12:** kertas pink-ungu miring dengan hiasan bunga kecil. Teks: "Foto terbagus menurutku, lautan indah dan wanita indah itu menjadi kombinasi yang pas untuk menjadikan ini dokumentasi yang sempurna"
- **Desktop 13:** kertas bergaris di atas kain gingham ungu, kupu-kupu, lavender, stiker stik game ungu. Teks: "and ya foto kedua di urban forest, aku ga nyangka kamu ngomong “sini foto bareng” di situ ada rasa salting dikit yg awalnya aku hanya paparazzi in kamu ternyata aku di ajak foto ya walaupun kacanya kependekan"
- **Desktop 14:** kertas sobek berlubang di atas kertas ungu, pita ungu, piringan hitam, folder ungu. Teks: "Foto di softball gbk, dalam perjalanan ke sana kamu melakukan adengan yg bisa di bilang bukan teman, kamu ngerangkul megang tangan meluk, ya memang tujuan nya bercandain fahmi tapi entah kenapa itu salah satu hal yg membuat aku suka kamu"
- **Desktop 15:** clipboard dengan klip logam dan bintang perak, kertas ungu di atas kertas grid. Teks: "Foto booth pertama kita, di sini kita masih cangung, dan masih nyari pose di tik tok walaupun pose apapun kamu tetap lucu hehe, btw dulu aku masih berfikir temenan foto booth berdua aman lah ya"
- **Desktop 16:** kertas putih bertekstur dengan tepi sobek di atas kertas ungu, bintang ungu dan emas. Teks: "foto dengan topi chopper, aku selalu ingat hal ini “Boku wa doctor Tony Tony Chopper” kamu ngomong itu dan dengan nada lucumu itu tersimpan rapih di memory ingatan ku, terlalu di anime animekan tapi lucu mau denger lagi dong hehe"
- **Desktop 17:** kertas bergaris krem di atas gingham ungu, ilustrasi biola ungu. Teks: "BA teazzi, outfit lucu mu itu mengambarkan kalau kamu suka sekali teazzi"
- **Desktop 18:** kertas putih dengan renda ungu dan pita di atas. Teks: "foto dengan eskrim itu dan kamu masih memakai kacamata lucuu sekali, eskrim nya pun kalah manis dengan senyum mu ini"
- **Desktop 19:** kertas renda krem dengan bintang kuning, bintang ungu, dan kancing ungu. Teks (terbaca dari screenshot kecil, mohon dicek ulang): "tentang foto ini ada 2 judul yg bagus : judul pertama seseorang yang sedang memotret wanita cantik dengan busana lucunya itu, lalu judul ke dua seseorang yang sedang mengabadikan dunia nya, hahaha terlalu berharap kisahnya sama seperti yg ada di otaknya ya, kacau deh gua"
- **Desktop 20:** kertas putih bertekstur bersegel ungu, bunga ungu transparan di pojok. Teks: "kamu dengan ke inginan membeli hirono, aku harap kamu bisa memilikinya ya nanti entah itu dariku atau dari usaha mu"
- **Desktop 21:** kertas krem dengan ilustrasi lavender di sisi kiri. Teks: "foto after nonton spidermen kali pertama kita menonton bioskop dan semoga tidak menjadi akhir kita menonton bioskop bersama karena masih banyak film yg harus kita nonton bersama"
- **Desktop 22:** amplop lavender dengan kartu pink bertepi manik-manik dan bunga ungu besar. Teks: "summarecon perjalanan lumayan jauh yg kita lalu berdua dan aku ingin meminta maaf karena mengajak mu melakukan perjalanan jauh padahal kamu baru sembuh, sekali lagi maaf yaa"
- **Desktop 23:** halaman putih. Judul: "SELAMAT ULANG TAHUN JIAA". Isi: "selamat ulang tahun ya makasi sudah bertahan sejauh ini, terhadap masalah yang kamu ceritakan kepada ku entah itu tentang keluarga atau tentang perselingkuhan 5 kali itu, aku sangat bangga kepada mu karena sudah melewati badai itu , dan aku akan selalu bangga tidak hanya bangga aku selalu ada di belakang mu, sekali lagi selamat menunaikan umur 21 ya ♥". Di kanan ada kotak untuk animasi kue ulang tahun.

## 5. Spesifikasi visual
- Font judul dan teks: serif klasik sesuai Figma [ISI nama font dari panel Design]. Teks surat berukuran sedang, rata kiri, warna gelap.
- Warna: dinding ungu bermotif bunga, bingkai kayu terang kuning-oranye, bingkai foto emas. [ISI kode hex dari Figma].
- Ukuran desain acuan: [ISI ukuran frame Desktop dari Figma].
- Popup berada di atas overlay gelap semi-transparan (misalnya hitam keunguan sekitar 60 persen), dengan judul dan dinding terlihat samar di belakang.

### Latar (background) semua halaman
Gunakan gradien dari file terlampir `gradient-background.html` (dibuat dengan FeralUI gradient studio) sebagai latar di **setiap halaman**: galeri (Desktop 1), tahap popup (Desktop 2 sampai 22, di bawah overlay), dan halaman ulang tahun (Desktop 23).
- Warna gradien: VIOLET `#7058A3`, EDO PURPLE `#745399`, EDO PURPLE `#745399`, ANCIENT PURPLE `#895B8A`.
- File itu berupa SVG berukuran 1920x1080 (`preserveAspectRatio="xMidYMid slice"`) yang berisi satu gambar gradien (`<image id="Field">` berisi data base64) dan lapisan grain tipis (opacity 0.03, `mix-blend-mode: overlay`). Pindahkan gambar gradien itu menjadi file aset di `public/` (misalnya `bg-gradient.jpg`), lalu buat satu komponen `GradientBackground` berposisi `fixed` memenuhi layar (`inset: 0`, gambar `object-fit: cover`) dengan lapisan grain di atasnya. Taruh komponen itu di layout utama supaya semua halaman otomatis memakainya.
- Sediakan cadangan berupa CSS gradient dari empat warna di atas dan warna dasar `#7058A3` pada `body`, kalau gambar belum termuat.
- Pastikan judul "Museum Of Us" dan elemen putih lainnya tetap terbaca di atas gradien ini.

### Responsif (HP dan mode miring)
- Tampilan harus nyaman di desktop, tablet, dan HP. Target utama untuk HP adalah **mode miring (landscape)**.
- Landscape di HP: seluruh galeri harus muat dalam satu layar tanpa scroll. Gunakan satuan `dvh` dan `dvw`, hormati `env(safe-area-inset-*)` untuk poni layar, dan pertahankan rasio dinding galeri (misalnya dengan skala proporsional) agar posisi bingkai dan area klik tidak bergeser. Posisikan area klik bingkai dalam persentase.
- Portrait di HP: tampilkan petunjuk ramah dengan ikon HP berputar yang mengajak memiringkan HP, dan sediakan tombol untuk menutup petunjuk itu jika pengunjung tetap ingin melanjutkan.
- Popup: tinggi maksimum sekitar 85 persen tinggi layar, ukuran teks menyesuaikan layar, dan kalau teks lebih panjang dari kertas, isi surat bisa di-scroll di dalam popup.
- Tombol kembali (↩) berukuran minimal 44x44 px agar mudah disentuh. Efek hover hanya untuk perangkat yang mendukung hover, dan di layar sentuh cukup ketuk.
- Halaman 23 di HP landscape: teks dan animasi kue berdampingan seperti di desktop, dengan scroll jika perlu.

## 6. Aset
Gunakan file yang saya lampirkan: foto tiap bingkai, gambar bingkai emas, dinding ungu, kucing, serta dekorasi tiap popup (kertas, amplop, pita, bunga, kupu-kupu, dan lain-lain), ditambah `gradient-background.html` untuk latar. Beri nama file sesuai nomor frame supaya mudah dipasangkan.

## 7. Teknis
- Gunakan **Next.js** (App Router) dengan TypeScript. **Tidak perlu database** dan tidak perlu backend: semua data statis. Website harus bisa dijalankan secara statis (misalnya `output: "export"`) dan mudah di-deploy ke hosting statis seperti Vercel.
- Aset gambar disimpan di `public/` dan dimuat dengan `next/image` bila cocok. Untuk animasi boleh memakai CSS atau library seperti Framer Motion.
- Seluruh data bingkai, popup, dan teks disimpan dalam satu file konfigurasi (array objek, misalnya `data/letters.ts`) agar mudah diedit.
- Semua navigasi tanpa reload halaman (popup dan perpindahan ke halaman 23 ditangani di sisi klien).
- Pastikan ikon kembali selalu terlihat dan berfungsi di setiap popup dan di halaman Desktop 23.
