export const navaKarnatakaPdfByLang = {
  Kannada: {
    href: "https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/magazinePdfs%2FNavakarnataka%203%20years%20book%20cover%20print%201.pdf?alt=media&token=007ae8d1-9951-4ec1-8aba-704c1119a11b",
    label: "ನವ ಕರ್ನಾಟಕ",
  },
  English: {
    href: "https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/magazinePdfs%2FNavaKarnataka_ENG_Final_Print.pdf?alt=media&token=f722faaf-9391-4c50-b925-b21fca598c2b",
    label: "Nava Karnataka",
  },
  Hindi: {
    href: "https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/magazinePdfs%2FNavaKarnataka_ENG_Final_Print.pdf?alt=media&token=f722faaf-9391-4c50-b925-b21fca598c2b",
    label: "Nava Karnataka",
  },
};

export const specialPublications = [
  {
    id: "nava-karnataka-kannada",
    defaultFor: ["Kannada"],
    title: {
      English: "Nava Karnataka",
      Kannada: "ನವ ಕರ್ನಾಟಕ",
      Hindi: "Nava Karnataka",
    },
    pdf: navaKarnatakaPdfByLang.Kannada.href,
    cover: "/special-publication/navakarnatak-english.png",
  },
  {
    id: "nava-karnataka-english",
    defaultFor: ["English", "Hindi"],
    title: {
      English: "Nava Karnataka",
      Kannada: "ನವ ಕರ್ನಾಟಕ",
      Hindi: "Nava Karnataka",
    },
    pdf: navaKarnatakaPdfByLang.English.href,
    cover: "/special-publication/navkarnatak-english.png",
  },
  {
    id: "five-guarantee-schemes",
    defaultFor: [],
    title: {
      English: "Progress of the Government's Five Guarantee Schemes",
      Kannada: "Progress of the Government's Five Guarantee Schemes",
      Hindi: "Progress of the Government's Five Guarantee Schemes",
    },
    pdf: "https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/Nava%20Karnataka_3%20year_english_PPT-8.pdf?alt=media&token=1d3f4f2f-c19f-4966-afcf-e1dafdb94039",
    cover: "/special-publication/five-guarantee-schemes.png",
  },
  {
    id: "drudha-karnatakada-sankalpa",
    defaultFor: [],
    title: {
      English: "Drudha Karnatakada Sankalpa",
      Kannada: "Drudha Karnatakada Sankalpa",
      Hindi: "Drudha Karnatakada Sankalpa",
    },
    pdf: "https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/100%20Days%20Booklet%20-%20English.pdf?alt=media&token=aae5047c-d6ea-436c-b2d4-f986b52f3f4e",
    cover: "/special-publication/drudha-karnatakada-sankalpa.png",
  },
  {
    id: "drudha-karnatakada-sankalpa-kannada",
    defaultFor: [],
    title: {
      English: "Drudha Karnatakada Sankalpa",
      Kannada: "ದೃಢ ಕರ್ನಾಟಕದ ಸಂಕಲ್ಪ",
      Hindi: "Drudha Karnatakada Sankalpa",
    },
    pdf: "https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/100%20Days%20Booklet%20-%20Kannada.pdf?alt=media&token=55771910-920e-4655-8237-5a768b4a202e",
    cover: "/special-publication/drudha-karnatakada-sankalpa-kannada.png",
  },
];

export const getDefaultPublication = (language) =>
  specialPublications.find((item) => item.defaultFor.includes(language)) ||
  specialPublications[1];

export const getPublicationById = (id) =>
  specialPublications.find((item) => item.id === id);
