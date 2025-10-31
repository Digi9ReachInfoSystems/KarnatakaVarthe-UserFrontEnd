import React from 'react'
import {
  Section,
  Container,
  LeftImageWrap,
  MainContent,
  MetaRow,
  Tag,
  DateText,
  Sidebar,
  SideCard,
  SkeletonImageWrap,
  SkeletonContent,
  SkeletonTag,
  SkeletonTitle,
  SkeletonText,
  SkeletonSideCard,
  SkeletonThumb,
} from "./styles/FeaturedNews.atyle"
import { LanguageContext } from '../../../../context/LanguageContext'
import { getNewsByTypeArticles } from '../../../../services/newsApi/NewsApi'
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

// Define initial states
const initialFeatured = {
  image: "/placeholder.svg",
  category: "",
  date: "",
  title: "",
  excerpt: "",
}

const initialSideItems = [
  {
    image: "/placeholder.svg",
    category: "",
    date: "",
    title: "",
    excerpt: "",
  },
  {
    image: "/placeholder.svg",
    category: "",
    date: "",
    title: "",
    excerpt: "",
  },
]
function Featurednews() {
    //Featured news for articles page
    const [rawData, setRawData] = useState([])
      const [loading, setLoading] = useState(true)
      const [featuredNews, setFeaturedNews] = useState(initialFeatured)
      const [sideItems, setSideItems] = useState(initialSideItems)
     
      const { language } = useContext(LanguageContext)
      const navigate = useNavigate()
    
    

      useEffect(() => {
        const fetchFeaturedNews = async () => {
          try {
            const response = await getNewsByTypeArticles()
            if (response?.success && Array.isArray(response.data)) {
              setRawData(response.data)
       
            } else {
             
            }
          } catch (error) {
            console.error("Error fetching news data:", error)
          } finally {
            setLoading(false)
          }
        }
        fetchFeaturedNews()
      }, [language])
    
      useEffect(() => {
        if (rawData.length > 0) {
          const normalized = rawData.map((item) => {
            const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
          
     
       

            return {
              _id: item._id,
              image: item.newsImage || "/placeholder.svg",
              date: item[langKey]?.date || "",
              title: item[langKey]?.title || "",
              excerpt: item[langKey]?.description || "",
            }
          })
    
          const shuffled = [...normalized].sort(() => Math.random() - 0.5)
          const randomOne = shuffled[0] || initialFeatured
          const randomTwo = shuffled.slice(1, 3) || initialSideItems
          setFeaturedNews(randomOne)
          setSideItems(randomTwo)
        }
      }, [language, rawData])
    
      // Shimmer loading component
      if (loading || rawData.length === 0) {
        return (
          <Section aria-label="Featured news">
            <Container>
              <SkeletonImageWrap />
              <SkeletonContent>
                <MetaRow>
                  <SkeletonTag />
                  <SkeletonText width="120px" height="14px" />
                </MetaRow>
                <SkeletonTitle />
                <SkeletonTitle style={{ width: "70%" }} />
                <SkeletonText width="95%" />
                <SkeletonText width="80%" />
              </SkeletonContent>
              <Sidebar aria-label="More top stories" role="complementary">
                {[1, 2].map((idx) => (
                  <SkeletonSideCard key={idx}>
                    <SkeletonThumb />
                    <div style={{ width: "100%" }}>
                      <MetaRow style={{ marginBottom: "12px" }}>
                        <SkeletonTag />
                        <SkeletonText width="100px" height="14px" />
                      </MetaRow>
                      <SkeletonText width="95%" height="18px" />
                      <SkeletonText width="85%" height="18px" />
                      <SkeletonText width="90%" height="14px" />
                      <SkeletonText width="70%" height="14px" />
                    </div>
                  </SkeletonSideCard>
                ))}
              </Sidebar>
            </Container>
          </Section>
        )
      }
  return (
      <Section aria-label="Featured news">
         <Container>
           <LeftImageWrap onClick={() => navigate(`/newsdetails/${featuredNews._id}`)} style={{ cursor: 'pointer' }}>
             <img src={featuredNews.image || "/placeholder.svg"} alt="Lead story image" loading="eager" />
           </LeftImageWrap>
           <MainContent onClick={() => navigate(`/newsdetails/${featuredNews._id}`)} style={{ cursor: 'pointer' }}>
             <MetaRow>
               {/* <Tag aria-label={`Category: ${featuredNews.category}`}>{featuredNews.category}</Tag> */}
               <DateText dateTime="2025-03-20">{featuredNews.date}</DateText>
             </MetaRow>
             <h2>{featuredNews.title.slice(0, 50) + "..."}</h2>
             <p>{featuredNews.excerpt.slice(0, 150) + "..."}</p>
           </MainContent>
           <Sidebar aria-label="More top stories" role="complementary">
             {sideItems.map((item, idx) => (
               <SideCard key={idx} role="article" aria-label={item.title} onClick={() => navigate(`/newsdetails/${item._id}`)} style={{ cursor: 'pointer' }}>
                 <div className="thumb">
                   <img src={item.image || "/placeholder.svg"} alt="Story thumbnail" loading="lazy" />
                 </div>
                 <div>
                   <MetaRow>
                     {/* <Tag aria-label={`Category: ${item.category}`}>{item.category}</Tag> */}
                     <DateText dateTime="2025-03-20">{item.date}</DateText>
                   </MetaRow>
                   <h3>{item.title.slice(0, 50) + "..."}</h3>
                   <p>{item.excerpt.slice(0, 150) + "..."}</p>
                 </div>
               </SideCard>
             ))}
           </Sidebar>
         </Container>
       </Section>
  )
}

export default Featurednews
