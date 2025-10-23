import { useState, useEffect, useContext } from "react"
import { getStateLinks } from "../../../../services/statepagelinks/StateLinks.js"
import { LanguageContext } from "../../../../context/LanguageContext"
import {
  SidebarCard,
  SidebarHeader,
  SidebarList,
  SidebarItem,
  Avatar,
  ItemLabel,
  SkeletonItem,
  SkeletonAvatar,
  SkeletonLabel,
} from "./StateGovernmentWebsites.styles"

const defaultSites = [
  { label: "Departments", image: "/state/sidebar.jpg", url: "#" },
  { label: "Directorates", image: "/state/sidebar2.jpg", url: "#" },
  { label: "Organizations & Boards List", image: "/state/sidebar.jpg", url: "#" },
  { label: "Universities", image: "/state/sidebar2.jpg", url: "#" },
  { label: "Tenders", image: "/state/sidebar.jpg", url: "#" },
  { label: "Covid 19 Home Isolation App", image: "/state/sidebar2.jpg", url: "#" },
]

export default function StateGovernmentWebsites({ sites = [], loading = false }) {
  const { language } = useContext(LanguageContext)
  const [isLoading, setIsLoading] = useState(true)
  const [apiSites, setApiSites] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStateLinks = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getStateLinks()
        setApiSites(response.data || response || [])
      } catch (err) {
        console.error('Error fetching state links:', err)
        setError('Failed to load state links')
        setApiSites([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchStateLinks()
  }, [])

  // Helper function to format API data to match UI structure
  const formatApiData = (apiData) => {
    if (!Array.isArray(apiData)) return []
    
    return apiData.map((item, index) => {
      // Get label based on current language
      let label = `Link ${index + 1}`
      
      if (language === "English") {
        label = item.English || item.staticpageName || item.title || item.name || item.label || label
      } else if (language === "Kannada") {
        label = item.Kannada || item.staticpageName || item.title || item.name || item.label || label
      } else if (language === "Hindi") {
        label = item.Hindi || item.staticpageName || item.title || item.name || item.label || label
      } else {
        label = item.staticpageName || item.English || item.Kannada || item.Hindi || item.title || item.name || item.label || label
      }
      
      return {
        label,
        image: item.staticpageImage || item.image || item.icon || (index % 2 === 0 ? "/state/sidebar.jpg" : "/state/sidebar2.jpg"),
        url: item.staticpageLink || item.url || item.link || item.href || "#"
      }
    })
  }

  // Priority: props sites > API sites > default sites
  // Recalculate when language changes
  const displaySites = sites.length > 0 ? sites : (apiSites.length > 0 ? formatApiData(apiSites) : defaultSites)

  // Skeleton loading component
  const SkeletonLoader = () => (
    <SidebarList aria-label="Loading government websites">
      {[1, 2, 3, 4, 5, 6].map((_, idx) => (
        <SkeletonItem key={idx}>
          <SkeletonAvatar />
          <SkeletonLabel />
        </SkeletonItem>
      ))}
    </SidebarList>
  )

  // Header text based on language
  const getHeaderText = () => {
    if (language === "Kannada") {
      return "ರಾಜ್ಯ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳು"
    } else if (language === "Hindi") {
      return "राज्य सरकार की वेबसाइटें"
    } else {
      return "State Government Websites"
    }
  }
  
  const headerText = getHeaderText()

  return (
    <SidebarCard aria-labelledby="state-sites-heading">
      <SidebarHeader id="state-sites-heading">{headerText}</SidebarHeader>
      {isLoading || loading ? (
        <SkeletonLoader />
      ) : (
        <SidebarList aria-label="Government websites list">
          {displaySites.slice(0, 6).map((s, i) => (
            <SidebarItem 
              key={i} 
              as="a"
              href={s.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${s.label}`}
            >
              <Avatar $src={s.image} aria-hidden="true" />
              <ItemLabel>{s.label}</ItemLabel>
            </SidebarItem>
          ))}
        </SidebarList>
      )}
    </SidebarCard>
  )
}

