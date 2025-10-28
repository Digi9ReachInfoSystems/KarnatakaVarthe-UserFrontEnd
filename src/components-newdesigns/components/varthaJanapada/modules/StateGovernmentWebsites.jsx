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
        console.log('API Response:', response) // Debug log
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

  // Debug log for language changes
  useEffect(() => {
    console.log('Current language:', language)
    console.log('API Sites:', apiSites)
  }, [language, apiSites])

  // Helper function to format API data to match UI structure
  const formatApiData = (apiData) => {
    if (!Array.isArray(apiData)) return []
    
    console.log('Formatting API data:', apiData) // Debug log
    
    return apiData.map((item, index) => {
      console.log('Processing item:', item) // Debug log
      
      // Get label based on current language with comprehensive field checking
      let label = `Link ${index + 1}`
      
      // Try multiple possible field names for different languages
      const possibleFields = [
        item[language], // Direct language field (e.g., item.Kannada)
        item[language.toLowerCase()], // Lowercase version (e.g., item.kannada)
        item.staticpageName,
        item.title,
        item.name,
        item.label,
        item.English,
        item.english,
        item.Kannada,
        item.kannada,
        item.Hindi,
        item.hindi
      ]
      
      // Find the first non-empty label
      for (const field of possibleFields) {
        if (field && typeof field === 'string' && field.trim()) {
          label = field.trim()
          console.log(`Found label: ${label} for language: ${language}`)
          break
        }
      }
      
      const formattedItem = {
        label,
        image: item.staticpageImage || item.image || item.icon || (index % 2 === 0 ? "/state/sidebar.jpg" : "/state/sidebar2.jpg"),
        url: item.staticpageLink || item.url || item.link || item.href || "#"
      }
      
      console.log('Formatted item:', formattedItem)
      return formattedItem
    })
  }

  // Use only API data, limit to latest 6 items
  const displaySites = sites.length > 0 
    ? sites.slice(0, 6) 
    : formatApiData(apiSites).slice(0, 6)

  // Debug log for display sites
  console.log('Display sites:', displaySites)

  // Temporary fallback data for testing translations (remove this after API is working)
  const testSites = [
    { 
      label: language === "Kannada" ? "ವಿಭಾಗಗಳು" : language === "Hindi" ? "विभाग" : "Departments", 
      image: "/state/sidebar.jpg", 
      url: "#" 
    },
    { 
      label: language === "Kannada" ? "ನಿರ್ದೇಶನಾಲಯಗಳು" : language === "Hindi" ? "निदेशालय" : "Directorates", 
      image: "/state/sidebar2.jpg", 
      url: "#" 
    },
    { 
      label: language === "Kannada" ? "ವಿಶ್ವವಿದ್ಯಾಲಯಗಳು" : language === "Hindi" ? "विश्वविद्यालय" : "Universities", 
      image: "/state/sidebar.jpg", 
      url: "#" 
    }
  ]

  // Use test data if no API data available
  const finalDisplaySites = displaySites.length > 0 ? displaySites : testSites

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
      ) : finalDisplaySites.length > 0 ? (
        <SidebarList aria-label="Government websites list">
          {finalDisplaySites.map((s, i) => (
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
      ) : (
        <SidebarList aria-label="No government websites available">
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            {language === "Kannada" ? "ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳು ಲಭ್ಯವಿಲ್ಲ" : 
             language === "Hindi" ? "सरकारी वेबसाइटें उपलब्ध नहीं हैं" : 
             "No government websites available"}
          </div>
        </SidebarList>
      )}
    </SidebarCard>
  )
}

