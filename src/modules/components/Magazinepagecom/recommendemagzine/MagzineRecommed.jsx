import { useState, useEffect, useContext } from "react"
import {
  Container,
  MainContent,
  Content,
  Title,
  MagazineThumbnail,
  MagazineCard,
  MagazineDetails,
  TabsContainer,
  Tab,
  PaginationWrapper,
  SkeletonCard,
  SkeletonThumbnail,
  SkeletonTitle,
  SkeletonMeta,
  ResultsInfo,
  PageWrapper,
  MagazineThumbnailWrapper,
  AuthorInfo,
  PublishTime,
} from "./MagzineRecommed.styles"
import { getRecommendations } from "../../../../services/recommened/RecommenedApis"
import { FontSizeContext } from "../../../../context/FontSizeProvider"
import { LanguageContext } from "../../../../context/LanguageContext"
import { Pagination } from "@mui/material"
import Cookies from "js-cookie"
import { logReadingHistory } from "../../../../services/recommened/RecommenedApis"
import { useNavigate } from "react-router-dom"
// import PDFModal from "../magazinemodalpdf/ModalPdf"

const MagzineRecommed = () => {
  const [magazines, setMagazines] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Topics")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPageDesktop = 10
  const itemsPerPageMobile = 4

  const { fontSize } = useContext(FontSizeContext)
  const { language } = useContext(LanguageContext)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        const userId = Cookies.get("userId")
        if (!userId) {
          setMagazines([])
          setLoading(false)
          return
        }
        const result = await getRecommendations(userId)
        const data = result && Array.isArray(result.magazines) ? result.magazines : []
        setMagazines(data)
      } catch (error) {
        setMagazines([])
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
    setCurrentPage(1)
  }, [activeTab])

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date"
    const date = new Date(dateString)
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
  }

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Unknown time"
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    return formatDate(dateString)
  }

  const handleReadMoreClick = (pdfUrl, title, magazineId) => {
    // Instead of opening modal, navigate to the magazine page by id, with source param
    navigate(`/magazine/${magazineId}?source=${encodeURIComponent(activeTab)}`)
    // Optionally, log reading history as before
    const userId = Cookies.get("userId")
    if (userId && magazineId) {
      const historyData = {
        userId,
        contentId: magazineId, // Correct key for backend
        contentType: "magazine",
      }
      logReadingHistory(historyData)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const getLocalizedContent = (item, field) => {
    if (language === "English") return item[field] || "No content available"
    if (language === "Hindi") return item.hindi?.[field] || item[field] || "No content available"
    if (language === "Kannada") return item.kannada?.[field] || item[field] || "No content available"
    return item[field] || "No content available"
  }

  // Filtering logic for tabs
  const filterMagazines = (tab) => {
    if (tab === "Topics") {
      // Varthajanapada: title or english.title includes 'Vartha Janapada' (case-insensitive)
      return magazines.filter(magazine => {
        const title = (magazine.title || "") + " " + (magazine.english?.title || "")
        return /vartha\s*janapada/i.test(title)
      })
    } else if (tab === "March of Karnataka") {
      // March of Karnataka: title or english.title includes 'March' (case-insensitive)
      return magazines.filter(magazine => {
        const title = (magazine.title || "") + " " + (magazine.english?.title || "")
        return /march/i.test(title)
      })
    }
    return magazines
  }

  // Pagination logic
  const itemsPerPage = isMobile ? itemsPerPageMobile : itemsPerPageDesktop
  const filteredMagazines = filterMagazines(activeTab)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMagazines = filteredMagazines.slice(indexOfFirstItem, indexOfLastItem)
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const renderSkeleton = () => {
    const skeletonCount = isMobile ? itemsPerPageMobile : itemsPerPageDesktop
    return Array.from({ length: skeletonCount }).map((_, index) => (
      <SkeletonCard key={index}>
        <SkeletonThumbnail />
        <MagazineDetails>
          <SkeletonTitle />
          <SkeletonMeta />
          <SkeletonMeta style={{ width: "60%" }} />
        </MagazineDetails>
      </SkeletonCard>
    ))
  }

  const renderMagazines = (magazines) => {
    return magazines.map((magazine) => (
      <MagazineCard
        key={magazine._id}
        onClick={() => handleReadMoreClick(magazine.magazinePdf, getLocalizedContent(magazine, "title"), magazine._id)}
        role="listitem"
        tabIndex="0"
        aria-label={getLocalizedContent(magazine, "title")}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleReadMoreClick(magazine.magazinePdf, getLocalizedContent(magazine, "title"), magazine._id);
          }
        }}
      >
        <MagazineThumbnailWrapper>
          <MagazineThumbnail
            src={magazine.magazineThumbnail || "/placeholder.svg?height=200&width=150&query=magazine thumbnail"}
            alt={getLocalizedContent(magazine, "title")}
          />
        </MagazineThumbnailWrapper>
        <MagazineDetails>
          <Title style={{ fontSize: `${fontSize}%` }}>{getLocalizedContent(magazine, "title")}</Title>
          <AuthorInfo>
            {/* Display editionNumber and time ago */}
            <PublishTime style={{ fontSize: `${fontSize}%` }}>
              {magazine.editionNumber || "N/A"} • {getTimeAgo(magazine.createdTime || magazine.publishedAt)}
            </PublishTime>
          </AuthorInfo>
        </MagazineDetails>
      </MagazineCard>
    ))
  }

  return (
    <PageWrapper>
      <Container style={{ fontSize: `${fontSize}%` }} role="region" aria-label="Recommended magazines">
        <MainContent>
          <TabsContainer role="tablist" aria-label="Magazine categories">
            <Tab active={activeTab === "Topics"} onClick={() => setActiveTab("Topics")}
              role="tab"
              aria-selected={activeTab === "Topics"}
              tabIndex={activeTab === "Topics" ? 0 : -1}
              onKeyDown={e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); setActiveTab("Topics");}}}
            >
              Varthajanapada
            </Tab>
            <Tab active={activeTab === "March of Karnataka"} onClick={() => setActiveTab("March of Karnataka")}
              role="tab"
              aria-selected={activeTab === "March of Karnataka"}
              tabIndex={activeTab === "March of Karnataka" ? 0 : -1}
              onKeyDown={e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); setActiveTab("March of Karnataka");}}}
            >
              March of Karnataka
            </Tab>
          </TabsContainer>
          <ResultsInfo>
            Showing {filteredMagazines.length === 0 ? 0 : indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredMagazines.length)} of {filteredMagazines.length} magazines
          </ResultsInfo>
          <Content style={{ fontSize: `${fontSize}%` }} role="list" aria-label="Recommended magazine list">
            {loading ? renderSkeleton() : renderMagazines(currentMagazines)}
          </Content>
          {!loading && filteredMagazines.length > 0 && (
            <PaginationWrapper role="navigation" aria-label="Recommended magazine pagination">
              <Pagination
                count={Math.ceil(filteredMagazines.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                variant="outlined"
                shape="rounded"
                aria-label="Recommended magazine pages"
                sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%' }} // Ensure right alignment in MUI
              />
            </PaginationWrapper>
          )}
        </MainContent>
      </Container>
      {/* PDF Modal */}
      {/* <PDFModal isOpen={modalOpen} onClose={closeModal} pdfUrl={selectedPdf} title={selectedTitle} /> */}
    </PageWrapper>
  )
}

export default MagzineRecommed
