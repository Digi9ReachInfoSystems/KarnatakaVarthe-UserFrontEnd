import React, { useContext, useState, useEffect } from "react"
import { MdOutlineFileDownload } from "react-icons/md"
import { IoChevronDownOutline } from "react-icons/io5"
import { IoArrowForwardOutline } from "react-icons/io5"
import { useParams, useNavigate } from "react-router-dom"
import {
  MagazineViewContainer,
  SectionHeader,
  TitleWrapper,
  PageTitle,
  Breadcrumb,
  HeaderSection,
  MainDownloadButton,
  YearFilterWrapper,
  YearFilterIcon,
  YearFilter,
  ContentWrapper,
  MainPdfViewer,
  RecommendedSection,
  RecommendedHeader,
  RecommendedTitle,
  SeeMoreButton,
  MagazineGrid,
  MagazineCard,
  MagazineImageWrapper,
  MagazineImage,
  DownloadButton,
  ShimmerWrapper,
  ShimmerCard,
  ShimmerImageBox,
  ShimmerButton,
  ShimmerTitle,
  ShimmerPdfBox,
  ShimmerHeaderBox
} from "./MagzineIdview.styles"
import { Helmet } from "react-helmet"
import { ImFolderDownload } from "react-icons/im"
import theme from "../../../../theme/Theme"
import { getMagazine2ById, MarchMagazines } from "../../../../services/magazineApi/magazineService"
import { FontSizeContext } from "../../../../context/FontSizeProvider"
import { LanguageContext } from "../../../../context/LanguageContext"

// Translations
const translations = {
  Kannada: {
    title: "ಮಾರ್ಚ್ ಆಫ್ ಕರ್ನಾಟಕ ನಿಯತಕಾಲಿಕೆಗಳು",
    selectYear: "ವರ್ಷ ಆಯ್ಕೆಮಾಡಿ",
    download: "ಡೌನ್‌ಲೋಡ್",
    recommendedTitle: "ಶಿಫಾರಸು ಮಾಡಲಾದ ನಿಯತಕಾಲಿಕೆ",
    seeMore: "ಇನ್ನಷ್ಟು ನೋಡಿ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    noPdf: "ಯಾವುದೇ PDF ಲಭ್ಯವಿಲ್ಲ"
  },
  English: {
    title: "March of Karnataka Magazines",
    selectYear: "Select Year",
    download: "Download",
    recommendedTitle: "Recommended Magazine",
    seeMore: "See more",
    loading: "Loading...",
    noPdf: "No PDF available"
  },
  Hindi: {
    title: "मार्च ऑफ कर्नाटक पत्रिकाएँ",
    selectYear: "वर्ष चुनें",
    download: "डाउनलोड",
    recommendedTitle: "अनुशंसित पत्रिका",
    seeMore: "और देखें",
    loading: "लोड हो रहा है...",
    noPdf: "कोई PDF उपलब्ध नहीं"
  }
}

export default function MarchKarnatakIdview() {
  const { fontSize } = useContext(FontSizeContext)
  const { language, setPageLanguage } = useContext(LanguageContext)
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [magazine, setMagazine] = useState(null)
  const [recommendedMagazines, setRecommendedMagazines] = useState([])
  const [loading, setLoading] = useState(true)
  const [availableYears, setAvailableYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  
  // Get translations
  const t = translations[language] || translations.English

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Helper function to get localized magazine data
  const getLocalizedMagazineData = (magazine, field) => {
    if (!magazine) return '';
    const langKey = language.toLowerCase(); // Convert "Kannada" to "kannada"
    if (magazine[langKey] && magazine[langKey][field]) {
      return magazine[langKey][field];
    }
    // Fallback to default field
    return magazine[field] || '';
  };

  useEffect(() => {
    setPageLanguage('magazine2')
    return () => {
      setPageLanguage(null)
    }
  }, [setPageLanguage])

  useEffect(() => {
    if (id) {
      fetchMagazineById()
      fetchRecommendedMagazines()
    }
  }, [id])

  const fetchMagazineById = async () => {
    try {
      setLoading(true)
      const response = await getMagazine2ById(id)
      if (response && response.data) {
        setMagazine(response.data)
        setSelectedYear(response.data.publishedYear)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching magazine:', error)
      setLoading(false)
    }
  }

  const fetchRecommendedMagazines = async () => {
    try {
      // Fetch ONLY March of Karnataka magazines (magazine type 2)
      const response = await MarchMagazines()
      if (response && response.data) {
        // Get latest 4 March of Karnataka magazines excluding current one
        const latest = response.data
          .filter(mag => mag.status === 'approved' && mag._id !== id)
          .sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated))
          .slice(0, 4)
        setRecommendedMagazines(latest)
        
        // Get unique years for March of Karnataka filter
        const years = [...new Set(response.data.map(mag => mag.publishedYear))].sort((a, b) => b - a)
        setAvailableYears(years)
      }
    } catch (error) {
      console.error('Error fetching recommended magazines:', error)
    }
  }

  const handleDownload = () => {
    if (magazine && magazine.magazinePdf) {
      window.open(magazine.magazinePdf, '_blank')
    } else {
      alert("No PDF URL available for download.")
    }
  }

  const handleYearChange = (e) => {
    const year = e.target.value
    setSelectedYear(year)
    // Navigate to magazines page with year filter if needed
  }

  const handleRecommendedDownload = (magazinePdf) => {
    if (magazinePdf) {
      window.open(magazinePdf, '_blank')
    }
  }

  const handleRecommendedClick = (magazineId) => {
    navigate(`/marchofkarnatakview/${magazineId}`)
  }

  if (loading) {
    return (
      <ShimmerWrapper>
        <MagazineViewContainer style={{ fontSize: `${fontSize}%` }} role="region" aria-label={t.loading}>
          <SectionHeader>
            <TitleWrapper>
              <ShimmerTitle style={{ width: '300px' }} />
              <ShimmerTitle style={{ width: '200px', height: '16px' }} />
            </TitleWrapper>
            <YearFilterWrapper>
              <ShimmerTitle style={{ width: '150px', height: '40px' }} />
            </YearFilterWrapper>
          </SectionHeader>

          <ShimmerHeaderBox />

          <ContentWrapper>
            <ShimmerPdfBox />
          </ContentWrapper>

          <RecommendedSection>
            <RecommendedHeader>
              <ShimmerTitle style={{ width: '250px' }} />
            </RecommendedHeader>
            <MagazineGrid>
              {[...Array(4)].map((_, index) => (
                <ShimmerCard key={index}>
                  <ShimmerImageBox />
                  <ShimmerButton />
                </ShimmerCard>
              ))}
            </MagazineGrid>
          </RecommendedSection>
        </MagazineViewContainer>
      </ShimmerWrapper>
    )
  }

  return (
    <MagazineViewContainer style={{ fontSize: `${fontSize}%` }} role="region" aria-label="Magazine PDF viewer">
      <Helmet>
        <title>{getLocalizedMagazineData(magazine, 'title') || t.title} | Karnataka Varthe</title>
        <meta
          name="description"
          content={`Read the latest edition: ${getLocalizedMagazineData(magazine, 'title') || t.title}`}
        />
        <meta property="og:title" content={getLocalizedMagazineData(magazine, 'title') || t.title} />
        <meta
          property="og:description"
          content={getLocalizedMagazineData(magazine, 'description') || `Digital magazine: ${getLocalizedMagazineData(magazine, 'title')}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={magazine?.magazineThumbnail || "/default-magazine-cover.jpg"}
        />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      
      <SectionHeader>
        <TitleWrapper>
          <PageTitle>{t.title}</PageTitle>
          <Breadcrumb>{selectedYear} / {getLocalizedMagazineData(magazine, 'title')}</Breadcrumb>
        </TitleWrapper>
        <YearFilterWrapper>
          <YearFilter value={selectedYear} onChange={handleYearChange} aria-label={t.selectYear}>
            <option value="">{t.selectYear}</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </YearFilter>
          <YearFilterIcon aria-hidden="true">
            <IoChevronDownOutline />
          </YearFilterIcon>
        </YearFilterWrapper>
      </SectionHeader>

      <HeaderSection>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#000', fontFamily: theme.fonts.body }}>
          {/* {getLocalizedMagazineData(magazine, 'title')} */}
        </h1>
        <MainDownloadButton onClick={handleDownload} aria-label={`${t.download} ${getLocalizedMagazineData(magazine, 'title')}`}>
          <MdOutlineFileDownload size={18} aria-hidden="true" />
          {t.download}
        </MainDownloadButton>
      </HeaderSection>

      <ContentWrapper>
        <MainPdfViewer>
          {magazine?.magazinePdf ? (
            <iframe
              src={isMobile 
                ? `https://docs.google.com/viewer?url=${encodeURIComponent(magazine.magazinePdf)}&embedded=true`
                : magazine.magazinePdf
              }
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title={getLocalizedMagazineData(magazine, 'title')}
            >
              Your browser does not support PDFs. Please download the PDF to view it.
            </iframe>
          ) : (
            <div style={{ textAlign: "center", padding: "20px", color: "#666" }} role="status" aria-live="polite">
              {t.noPdf}
            </div>
          )}
        </MainPdfViewer>
      </ContentWrapper>

      <RecommendedSection>
        <RecommendedHeader>
          <RecommendedTitle>{t.recommendedTitle}</RecommendedTitle>
          <SeeMoreButton onClick={() => navigate('/marchofkarnatakmagzine')} aria-label={t.seeMore}>
            {t.seeMore}
            <IoArrowForwardOutline aria-hidden="true" />
          </SeeMoreButton>
        </RecommendedHeader>
        <MagazineGrid role="list" aria-label="Recommended magazines">
          {recommendedMagazines.map((mag) => (
            <MagazineCard key={mag._id} role="listitem" onClick={() => handleRecommendedClick(mag._id)} style={{ cursor: 'pointer' }}>
              <MagazineImageWrapper>
                <MagazineImage src={mag.magazineThumbnail} alt={getLocalizedMagazineData(mag, 'title')} loading="lazy" />
              </MagazineImageWrapper>
              
              <DownloadButton 
                onClick={(e) => {
                  e.stopPropagation()
                  handleRecommendedDownload(mag.magazinePdf)
                }} 
                aria-label={`${t.download} ${getLocalizedMagazineData(mag, 'title')}`}
              >
                <ImFolderDownload aria-hidden="true" />
                {t.download}
              </DownloadButton>
            </MagazineCard>
          ))}
        </MagazineGrid>
      </RecommendedSection>
    </MagazineViewContainer>
  )
}

