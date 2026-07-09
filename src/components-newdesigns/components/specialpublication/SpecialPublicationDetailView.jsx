import React, { useContext, useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { ImFolderDownload } from "react-icons/im";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import {
  MagazineViewContainer,
  SectionHeader,
  TitleWrapper,
  PageTitle,
  Breadcrumb,
  HeaderSection,
  MainDownloadButton,
  ContentWrapper,
  MainPdfViewer,
  RecommendedSection,
  RecommendedHeader,
  RecommendedTitle,
  MagazineGrid,
  MagazineCard,
  MagazineImageWrapper,
  MagazineImage,
  DownloadButton,
} from "../magzines-singleview/Modules/MagzineIdview.styles";
import theme from "../../../theme/Theme";
import { FontSizeContext } from "../../../context/FontSizeProvider";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  specialPublications,
  getPublicationById,
} from "../../../config/specialPublicationData";

const translations = {
  Kannada: {
    title: "ಸ್ಪೆಷಲ್ ಪಬ್ಲಿಕೇಶನ್",
    publicationsTitle: "ಪ್ರಕಟಣೆಗಳು",
    download: "ಡೌನ್‌ಲೋಡ್",
    noPdf: "ಯಾವುದೇ PDF ಲಭ್ಯವಿಲ್ಲ",
  },
  English: {
    title: "Special Publication",
    publicationsTitle: "Publications",
    download: "Download",
    noPdf: "No PDF available",
  },
  Hindi: {
    title: "स्पेशल पब्लिकेशन",
    publicationsTitle: "प्रकाशन",
    download: "डाउनलोड",
    noPdf: "कोई PDF उपलब्ध नहीं",
  },
};

const getPublicationTitle = (publication, language) =>
  publication?.title?.[language] || publication?.title?.English || "";

export default function SpecialPublicationDetailView() {
  const { fontSize } = useContext(FontSizeContext);
  const { language } = useContext(LanguageContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const publication = getPublicationById(id);
  const otherPublications = specialPublications.filter((item) => item.id !== id);

  const t = translations[language] || translations.English;
  const publicationTitle = getPublicationTitle(publication, language);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!publication) {
      navigate("/specialpublication", { replace: true });
    }
  }, [publication, navigate]);

  if (!publication) {
    return null;
  }

  const handleDownload = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  const pdfSrc = isMobile
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(publication.pdf)}&embedded=true`
    : publication.pdf;

  return (
    <MagazineViewContainer
      style={{ fontSize: `${fontSize}%` }}
      role="region"
      aria-label={publicationTitle}
    >
      <Helmet>
        <title>{publicationTitle} | {t.title} | Karnataka Varthe</title>
        <meta name="description" content={`${t.title}: ${publicationTitle}`} />
        <meta property="og:title" content={`${publicationTitle} | Karnataka Varthe`} />
        <meta
          property="og:description"
          content={`${t.title}: ${publicationTitle}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={publication.cover} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <SectionHeader style={{ justifyContent: "flex-start" }}>
        <TitleWrapper>
          <PageTitle>{t.title}</PageTitle>
          <Breadcrumb>{publicationTitle}</Breadcrumb>
        </TitleWrapper>
      </SectionHeader>

      <HeaderSection>
        <h1
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 600,
            color: "#000",
            fontFamily: theme.fonts.body,
          }}
        >
          {publicationTitle}
        </h1>
        <MainDownloadButton
          onClick={() => handleDownload(publication.pdf)}
          aria-label={`${t.download} ${publicationTitle}`}
        >
          <MdOutlineFileDownload size={18} aria-hidden="true" />
          {t.download}
        </MainDownloadButton>
      </HeaderSection>

      <ContentWrapper>
        <MainPdfViewer style={{ width: "100%", minHeight: "580px" }}>
          {publication.pdf ? (
            <iframe
              src={pdfSrc}
              width="100%"
              height="100%"
              style={{ border: "none", minHeight: "580px" }}
              title={publicationTitle}
            >
              Your browser does not support PDFs. Please download the PDF to view it.
            </iframe>
          ) : (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#666" }}
              role="status"
              aria-live="polite"
            >
              {t.noPdf}
            </div>
          )}
        </MainPdfViewer>
      </ContentWrapper>

      {otherPublications.length > 0 && (
        <RecommendedSection style={{ paddingLeft: 0, paddingRight: 0 }}>
          <RecommendedHeader style={{ justifyContent: "flex-start" }}>
            <RecommendedTitle>{t.publicationsTitle}</RecommendedTitle>
          </RecommendedHeader>
          <MagazineGrid
            role="list"
            aria-label={t.publicationsTitle}
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              maxWidth: "640px",
              margin: 0,
              padding: 0,
            }}
          >
            {otherPublications.map((item) => {
              const itemTitle = getPublicationTitle(item, language);

              return (
                <MagazineCard
                  key={item.id}
                  role="listitem"
                  onClick={() => navigate(`/specialpublication/${item.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <MagazineImageWrapper>
                    <MagazineImage
                      src={item.cover}
                      alt={itemTitle}
                      loading="lazy"
                    />
                  </MagazineImageWrapper>

                  <DownloadButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item.pdf);
                    }}
                    aria-label={`${t.download} ${itemTitle}`}
                  >
                    <ImFolderDownload aria-hidden="true" />
                    {t.download}
                  </DownloadButton>
                </MagazineCard>
              );
            })}
          </MagazineGrid>
        </RecommendedSection>
      )}
    </MagazineViewContainer>
  );
}
