import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImFolderDownload } from "react-icons/im";
import { Helmet } from "react-helmet";
import {
  MagazineViewContainer,
  SectionHeader,
  TitleWrapper,
  PageTitle,
  MagazineGrid,
  MagazineCard,
  MagazineImageWrapper,
  MagazineImage,
  DownloadButton,
} from "../magzines-singleview/Modules/MagzineIdview.styles";
import { FontSizeContext } from "../../../context/FontSizeProvider";
import { LanguageContext } from "../../../context/LanguageContext";
import { specialPublications } from "../../../config/specialPublicationData";

const translations = {
  Kannada: {
    title: "ಸ್ಪೆಷಲ್ ಪಬ್ಲಿಕೇಶನ್",
    download: "ಡೌನ್‌ಲೋಡ್",
  },
  English: {
    title: "Special Publication",
    download: "Download",
  },
  Hindi: {
    title: "स्पेशल पब्लिकेशन",
    download: "डाउनलोड",
  },
};

const getPublicationTitle = (publication, language) =>
  publication?.title?.[language] || publication?.title?.English || "";

export default function SpecialPublicationView() {
  const { fontSize } = useContext(FontSizeContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const t = translations[language] || translations.English;

  const handleDownload = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <MagazineViewContainer
      style={{ fontSize: `${fontSize}%` }}
      role="region"
      aria-label={t.title}
    >
      <Helmet>
        <title>{t.title} | Karnataka Varthe</title>
        <meta name="description" content={t.title} />
        <meta property="og:title" content={`${t.title} | Karnataka Varthe`} />
        <meta property="og:description" content={t.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <SectionHeader style={{ justifyContent: "flex-start" }}>
        <TitleWrapper>
          <PageTitle>{t.title}</PageTitle>
        </TitleWrapper>
      </SectionHeader>

      <MagazineGrid
        role="list"
        aria-label={t.title}
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
          maxWidth: "640px",
          margin: 0,
          padding: 0,
        }}
      >
        {specialPublications.map((publication) => {
          const publicationTitle = getPublicationTitle(publication, language);

          return (
            <MagazineCard
              key={publication.id}
              role="listitem"
              onClick={() => navigate(`/specialpublication/${publication.id}`)}
              style={{ cursor: "pointer" }}
            >
              <MagazineImageWrapper>
                <MagazineImage
                  src={publication.cover}
                  alt={publicationTitle}
                  loading="lazy"
                />
              </MagazineImageWrapper>

              <DownloadButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(publication.pdf);
                }}
                aria-label={`${t.download} ${publicationTitle}`}
              >
                <ImFolderDownload aria-hidden="true" />
                {t.download}
              </DownloadButton>
            </MagazineCard>
          );
        })}
      </MagazineGrid>
    </MagazineViewContainer>
  );
}
