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
];

export const getDefaultPublication = (language) =>
  specialPublications.find((item) => item.defaultFor.includes(language)) ||
  specialPublications[1];

export const getPublicationById = (id) =>
  specialPublications.find((item) => item.id === id);
