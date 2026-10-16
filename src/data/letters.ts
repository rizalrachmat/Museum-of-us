export interface FrameHotspot {
  id: number;
  desktopId: number;
  title: string;
  coords: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  shape: 'oval' | 'rect';
  text: string;
  decorationDescription: string;
  imageSrc: string;
}

export interface BirthdayLetter {
  id: number;
  title: string;
  content: string;
  note: string;
  imageSrc: string;
}

export const GALLERY_FRAMES: FrameHotspot[] = [
  {
    id: 1,
    desktopId: 2,
    title: "Bunga kedua ku",
    coords: { "left": "4.24%", "top": "27.61%", "width": "7.59%", "height": "13.04%" },
    shape: "oval",
    text: "bunga kedua ku yang masih memiliki wangi mu, jujur aku masih suka nyium bunga ini untuk merasakan wangi mu, makasi ya telah memberikan ku bunga after sidang pei dan makasi juga sudah menemaniku menyelesaikan pei, dukungan mental mu akan aku kenang",
    imageSrc: "/assets/desktop-2.png",
    decorationDescription: ""
  },
  {
    id: 2,
    desktopId: 3,
    title: "Pantai batu karas",
    coords:{"left":"14.51%","top":"23.77%","width":"10.38%","height":"19.17%"},
    shape: "rect",
    text: "pantai batu karas salah satu perjalanan terjauh kita walaupun tidak berdua ya, tetapi aku akan berusaha mengajak mu lebih jauh dari rumah, semoga kita tetap bersama ya untuk me wujudkan perjalanan itu",
    decorationDescription: "",
    imageSrc: "/assets/desktop-3.png"
  },
  {
    id: 3,
    desktopId: 4,
    title: "Catwomen",
    coords: {"left":"28.13%","top":"23.01%","width":"13.39%","height":"23.77%"},
    shape: "oval",
    text: "kamu mirip sekali dengan catwomen kamu tanguh sama seperti catwomen dan aku berharap kamu akan tetap tanguh ya walaupun kisah mu belum menjadi cerita industry per film an",
    decorationDescription: "",
    imageSrc: "/assets/desktop-4.png"
  },
  {
    id: 4,
    desktopId: 5,
    title: "Bunga pertama ku",
    coords: {"left":"45.42%","top":"23.31%","width":"9.71%","height":"11.66%"},
    shape: "rect",
    text: "bunga pertama ku, jujur ini aku masih ga nyangka kaya \"eh emang cowo pantes ya dapet bunga\", tetapi berkat kamu aku mendapatkan bunga pertama ku yg akan abadi di lemari ku, ini lucu sekali aku masih berulang kali menatap bunga itu, makasi yaa",
    decorationDescription: "",
    imageSrc: "/assets/desktop-5.png"
  },
  {
    id: 5,
    desktopId: 6,
    title: "Topi chopper",
    coords: {"left":"60.16%","top":"22.70%","width":"12.39%","height":"23.01%"},
    shape: "oval",
    text: "foto dengan topi chopper, aku selalu ingat hal ini \"Boku wa doctor Tony Tony Chopper\" kamu ngomong itu dan dengan nada lucumu itu tersimpan rapih di memory ingatan ku, terlalu di anime animekan tapi lucu mau denger lagi dong hehe",
    decorationDescription: "",
    imageSrc: "/assets/desktop-6.png"
  },
  {
    id: 6,
    desktopId: 7,
    title: "Dua judul",
    coords: {"left":"76.23%","top":"24.85%","width":"10.38%","height":"18.56%"},
    shape: "rect",
    text: "tentang foto ini ada 2 judul yg bagus : judul pertama seseorang yang sedang memotret wanita cantik dengan busana lucunya itu, lalu judul ke dua seseorang yang sedang mengabadikan dunia nya, hahaha terlalu berharap kisahnya sama seperti judul yg ada di otaknya ya, kacau deh gua",
    decorationDescription: "",
    imageSrc: "/assets/desktop-7.png"
  },
  {
    id: 7,
    desktopId: 8,
    title: "Perjalanan Summarecon",
    coords: {"left":"89.51%","top":"28.37%","width":"7.59%","height":"13.50%"},
    shape: "oval",
    text: "summarecon perjalanan lumayan jauh yg kita lalu berdua dan aku ingin meminta maaf karena mengajak mu melakukan perjalanan jauh padahal kamu baru sembuh, sekali lagi maaf yaa",
    decorationDescription: "",
    imageSrc: "/assets/desktop-8.png"
  },
  {
    id: 8,
    desktopId: 9,
    title: "Menjemput mu pulang bekerja",
    coords: {"left":"4.24%","top":"44.33%","width":"6.92%","height":"10.74%"},
    shape: "rect",
    text: "menjemput mu pulang bekerja, part yg mungkin kamu kira kamu ngerepotin aku, tapi jujur aku suka sekali dengar kata “jemput aku dong” kaya di butuhkan kamu adalah hal yg membuat aku berkesan di hidup mu. jangan malu lagi ya untuk ngomong “jemput aku” “temenin aku” “anterin aku” kamu layak ngomong itu dengan ku ",
    decorationDescription: "",
    imageSrc: "/assets/desktop-9.png"
  },
  {
    id: 9,
    desktopId: 10,
    title: "Beraga",
    coords: {"left":"15.51%","top":"45.71%","width":"8.37%","height":"11.20%"},
    shape: "oval",
    text: "foto punggung mu di beraga, Di sini aku ingin banyak banyak makasi karena akhirnya aku bisa merasakan ke bandung bersama teman bukan keluarga, oh iya makasi juga udh mengenali ku dengan mamet, hamdan, jeni dan my sahabat pita dan indra, sekali lagi big thanks ya, btw di sini kamu cantik sekali tapi sayang kita tidak foto berdua",
    decorationDescription: "",
    imageSrc: "/assets/desktop-10.png"
  },
  {
    id: 10,
    desktopId: 11,
    title: "Bintaro Xchange",
    coords: {"left":"27.46%","top":"48.16%","width":"13.50%","height":"11.66%"},
    shape: "rect",
    text: "Bxc entah ini kali pertama atau kedua kita ke bxc, tapi aku selalu ingat kamu lah tour guide aku di bxc",
    decorationDescription: "",
    imageSrc: "/assets/desktop-11.png"
  },
  {
    id: 11,
    desktopId: 12,
    title: "Foto terbagus menurutku",
    coords: {"left":"44.53%","top":"37.73%","width":"11.83%","height":"21.32%"},
    shape: "rect",
    text: "Foto terbagus menurutku, lautan indah dan wanita indah itu menjadi kombinasi yang pas untuk menjadikan ini dokumentasi yang sempurna",
    decorationDescription: "",
    imageSrc: "/assets/desktop-12.png"
  },
  {
    id: 12,
    desktopId: 13,
    title: "Foto booth pertama kita ",
    coords: {"left":"59.93%","top":"48.16%","width":"13.73%","height":"11.66%"},
    shape: "rect",
    text: "Foto booth pertama kita, di sini kita masih cangung, dan masih nyari pose di tik tok walaupun pose apapun kamu tetap lucu hehe, btw dulu aku masih berfikir temenan foto booth berdua aman lah ya",
    decorationDescription: "",
    imageSrc: "/assets/desktop-13.png"
  },
  {
    id: 13,
    desktopId: 14,
    title: "Eskrim",
    coords: {"left":"76.67%","top":"46.63%","width":"8.37%","height":"10.89%"},
    shape: "oval",
    text: "foto dengan eskrim itu dan kamu masih memakai kacamata lucuu sekali, eskrim nya pun kalah manis dengan senyum mu ini",
    decorationDescription: "",
    imageSrc: "/assets/desktop-14.png"
  },
  {
    id: 14,
    desktopId: 15,
    title: "After Movie",
    coords: {"left":"89.96%","top":"45.09%","width":"6.58%","height":"10.28%"},
    shape: "rect",
    text: "foto after nonton spidermen kali pertama kita menonton bioskop dan semoga tidak menjadi akhir kita menonton bioskop bersama karena masih banyak film yg harus kita nonton bersama",
    decorationDescription: "",
    imageSrc: "/assets/desktop-15.png"
  },
  {
    id: 15,
    desktopId: 16,
    title: "Sezal & Iput",
    coords: {"left":"5.80%","top":"57.67%","width":"8.93%","height":"12.88%"},
    shape: "rect",
    text: "Foto bersama sezal dan iput, first time aku membelikan hewan kepada wanita seumuran,  kamu sangat terlihat happy mendapatkan itu, walaupun umur mereka ga panjang tapi aku senang melihat mu bahagia",
    decorationDescription: "",
    imageSrc: "/assets/desktop-16.png"
  },
  {
    id: 16,
    desktopId: 17,
    title: "Dream Car",
    coords: {"left":"16.85%","top":"57.98%","width":"9.04%","height":"16.41%"},
    shape: "oval",
    text: "mobil vw kodok salah satu dream car aku setelah sudah sukses, dua moment keren dream car dan dream girlfriend",
    decorationDescription: "",
    imageSrc: "/assets/desktop-17.png"
  },
  {
    id: 17,
    desktopId: 18,
    title: "Baju Lucuuuu",
    coords: {"left":"31.81%","top":"61.04%","width":"6.36%","height":"10.74%"},
    shape: "rect",
    text: "lagi dan lagi teazzi, dan lagi lagi dengan pose lucu mu itu baju lucu mu itu, semoga aku masih bisa lihat kamu mengenekan baju lucu itu ya",
    decorationDescription: "",
    imageSrc: "/assets/desktop-18.png"
  },
  {
    id: 18,
    desktopId: 19,
    title: "Urban Forest",
    coords: {"left":"45.09%","top":"61.04%","width":"9.93%","height":"11.04%"},
    shape: "rect",
    text: "and ya foto di urban forest, aku ga nyangka kamu ngomong “sini foto bareng” di situ ada rasa salting dikit yg awalnya aku hanya paparazzi in kamu ternyata aku di ajak foto ya, walaupun kacanya kependekan hehe",
    decorationDescription: "",
    imageSrc: "/assets/desktop-19.png"
  },
  {
    id: 19,
    desktopId: 20,
    title: "Softball GBK",
    coords: {"left":"63.39%","top":"61.50%","width":"6.36%","height":"10.43%"},
    shape: "rect",
    text: "Foto di softball gbk, dalam perjalanan ke sana kamu melakukan adengan yg bisa di bilang bukan teman, kamu ngerangkul megang tangan meluk, ya memang tujuan nya bercandain fahmi tapi entah kenapa itu salah satu hal yg membuat aku suka kamu",
    decorationDescription: "",
    imageSrc: "/assets/desktop-20.png"
  },
  {
    id: 20,
    desktopId: 21,
    title: "Teazzi",
    coords: {"left":"73.77%","top":"58.90%","width":"8.93%","height":"16.41%"},
    shape: "oval",
    text: "Outfit lucu mu itu mengambarkan kalau kamu suka sekali teazzi ",
    decorationDescription: "",
    imageSrc: "/assets/desktop-21.png"
  },
  {
    id: 21,
    desktopId: 22,
    title: "Hirrono",
    coords: {"left":"84.71%","top":"59.05%","width":"8.93%","height":"12.73%"},
    shape: "rect",
    text: "kamu dengan ke inginan membeli hirono, aku harap kamu bisa memilikinya ya nanti entah itu dariku atau dari usaha mu",
    decorationDescription: "",
    imageSrc: "/assets/desktop-22.png"
  }
];

export const CAT_HOTSPOT = {
  id: "cat",
  title: "Kucing Ulang Tahun",
  coords: {"left":"46.54%","top":"76.69%","width":"11.16%","height":"22.70%"},
  targetDesktopId: 23
};

export const BIRTHDAY_DATA: BirthdayLetter = {
  id: 23,
  title: "SELAMAT ULANG TAHUN JIAA",
  content: "selamat ulang tahun ya makasi sudah bertahan sejauh ini, terhadap masalah yang kamu ceritakan kepada ku entah itu tentang keluarga atau tentang perselingkuhan 5 kali itu, aku sangat bangga kepada mu karena sudah melewati badai itu , dan aku akan selalu bangga tidak hanya bangga aku selalu ada di belakang mu, sekali lagi selamat menunaikan umur 21 ya 🖤",
  note: "Spesial untuk Kamu",
  imageSrc: "/assets/desktop-23.png"
};
