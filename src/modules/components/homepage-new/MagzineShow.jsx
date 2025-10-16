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
  SkeletonCard,
  SkeletonThumbnail,
  SkeletonTitle,
  SkeletonMeta,
  PageWrapper,
  MagazineThumbnailWrapper,
  AuthorInfo,
  PublishTime,
  SeeMoreButton, 
} from "./MagzineShow.styles"
import { getMagazines, MarchMagazines } from "../../../services/magazineApi/magazineService" 
import { FontSizeContext } from "../../../context/FontSizeProvider"
import { LanguageContext } from "../../../context/LanguageContext"
import Cookies from "js-cookie"
import { logReadingHistory } from "../../../services/recommened/RecommenedApis"
import { useNavigate } from "react-router-dom"
import PDFModal from "../magzinemodal/PDFModal"
import theme from "../../../theme/Theme"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import LoginPopup from "../loginpopup/LoginPopup"

const Magzinehome = () => {
  const [activeTab, setActiveTab] = useState("Topics")
  const [magazinesData, setMagazinesData] = useState([])
  const [marchMagazinesData, setMarchMagazinesData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPdf, setSelectedPdf] = useState("")
  const [selectedTitle, setSelectedTitle] = useState("")
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const itemsPerPageDesktop = 8
  const itemsPerPageMobile = 4

  const { fontSize } = useContext(FontSizeContext)
  const { language } = useContext(LanguageContext)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()

  // Check if user is logged in
  const isUserLoggedIn = () => {
    const userId = Cookies.get("userId")
    return !!userId
  }

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
    const fetchMagazines = async () => {
      setLoading(true)
      try {
        const result = activeTab === "Topics" ? await getMagazines() : await MarchMagazines()
        const data = result.success && Array.isArray(result.data) ? result.data : []
        if (activeTab === "Topics") {
          setMagazinesData(data)
        } else {
          setMarchMagazinesData(data)
        }
      } catch (error) {
        console.error("Error fetching magazines:", error)
        if (activeTab === "Topics") {
          setMagazinesData([])
        } else {
          setMarchMagazinesData([])
        }
      } finally {
        setLoading(false)
      }
    }
    fetchMagazines()
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
    // Check if user is logged in
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }

    // If user is logged in, proceed with navigation
    navigate(`/magazine/${magazineId}?source=${encodeURIComponent(activeTab)}`)
    
    // Log reading history
    const userId = Cookies.get("userId")
    if (userId && magazineId) {
      const historyData = {
        userId,
        contentId: magazineId,
        contentType: "magazine",
      }
      logReadingHistory(historyData)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const closeLoginPopup = () => {
    setShowLoginPopup(false)
  }

  const handleLoginRedirect = () => {
    // Store current page URL in cookie for redirect after login
    const currentUrl = window.location.pathname + window.location.search
    Cookies.set("redirectUrl", currentUrl, { expires: 1 }) // Expires in 1 day
    closeLoginPopup()
    navigate('/login')
  }

  const getLocalizedContent = (item, field) => {
    if (language === "English") return item[field] || "No content available"
    if (language === "Hindi") return item.hindi?.[field] || item[field] || "No content available"
    if (language === "Kannada") return item.kannada?.[field] || item[field] || "No content available"
    return item[field] || "No content available"
  }

  // Pagination logic
  const itemsPerPage = isMobile ? itemsPerPageMobile : itemsPerPageDesktop
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMagazines =
    activeTab === "Topics"
      ? magazinesData.slice(indexOfFirstItem, indexOfLastItem)
      : marchMagazinesData.slice(indexOfFirstItem, indexOfLastItem)

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
      <Container style={{ fontSize: `${fontSize}%` }} role="region" aria-label="Magazine PDF section">
              <Title style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>Magazine</Title>
    
        <MainContent>
          <TabsContainer role="tablist" aria-label="Magazine categories" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: theme.spacing(2) }}>
              <Tab
                active={activeTab === "Topics"}
                onClick={() => setActiveTab("Topics")}
                role="tab"
                aria-selected={activeTab === "Topics"}
                tabIndex={activeTab === "Topics" ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveTab("Topics")
                  }
                }}
              >
                Varthajanapada
              </Tab>
              <Tab
                active={activeTab === "March of Karnataka"}
                onClick={() => setActiveTab("March of Karnataka")}
                role="tab"
                aria-selected={activeTab === "March of Karnataka"}
                tabIndex={activeTab === "March of Karnataka" ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveTab("March of Karnataka")
                  }
                }}
              >
                March of Karnataka
              </Tab>
            </div>
            <SeeMoreButton onClick={() => navigate('/magazinepages')}>
              View All <MdOutlineKeyboardDoubleArrowRight style={{ fontSize: "1.5rem" }} />
            </SeeMoreButton>
          </TabsContainer>
          <Content style={{ fontSize: `${fontSize}%` }} role="list" aria-label="Magazine list">
            {loading ? renderSkeleton() : renderMagazines(currentMagazines)}
          </Content>
          {/* PaginationWrapper removed as per new design */}
        </MainContent>
      </Container>
      {/* PDF Modal */}
      <PDFModal isOpen={modalOpen} onClose={closeModal} pdfUrl={selectedPdf} title={selectedTitle} />
      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={handleLoginRedirect} 
        onCloseOnly={closeLoginPopup}
        title="Access Magazine?"
        subtitle="Login to read this magazine content."
      />
    </PageWrapper>
  )
}

export default Magzinehome
