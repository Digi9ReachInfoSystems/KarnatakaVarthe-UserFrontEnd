// import React from 'react'
// import { Link } from "react-router-dom"
// import { useState, useEffect, useContext } from "react"
// import { LanguageContext } from "../../../../../context/LanguageContext.jsx"
// import { Section, HeaderRow, Title, SeeMore, ArrowIcon, PageLayout, FeaturedCard, FeaturedImage, Overlay, FeaturedContent, Badge, FeaturedTitle, FeaturedExcerpt, MetaBar, MetaBarSmall, MetaItem, MiddleCol, SmallCard, Thumb, SmallContent, SmallBadge, SmallTitle, SkeletonFeaturedCard, SkeletonFeaturedImage, SkeletonMetaBar, SkeletonText, SkeletonSmallCard, SkeletonThumb } from "./StateNews.Styles.js"
// import { getNews } from "../../../../../services/newsApi/NewsApi"
// import { CategoryApi } from "../../../../../services/categoryapi/CategoryApi"

// const emptyFeatured = {
//     category: "",
//     title: "",
//     excerpt: "",
//     image: "/placeholder.svg",
//     meta: ["", "", ""],
//   }
  
//   const emptyList = []
  
// function StateNews() {
//     const { language } = useContext(LanguageContext)
//     const [rawData, setRawData] = useState([])
//     const [featured, setFeatured] = useState(emptyFeatured)
//     const [list, setList] = useState(emptyList)
//     const [loading, setLoading] = useState(true)
//     const [categories, setCategories] = useState([])

//     useEffect(() => {
//         const fetchCategories = async () => {
//             const response = await CategoryApi()
//             if (response?.success && Array.isArray(response.data)) {
//                 setCategories(response.data)
//             }
//         }
//         fetchCategories()
//     }, [])
//     useEffect(() => {
// const fetchNews = async () => {

//     try {
//         setLoading(true)
//         const response = await getNews()
//         if (response?.success && Array.isArray(response.data)) {
//             const filteredData = response.data.filter(item => 
//                 item.magazineType === "magazine2"
//               )
       
//             setRawData(filteredData)
//         }
//     } catch (error) {
//         console.error("Error fetching news:", error)
//     } finally {
//         setLoading(false)
//     }
// }
//     fetchNews()
//     }, [language])

//   // Process data based on language
//   useEffect(() => {
//     if (rawData.length > 0 && categories.length > 0) {
//       const normalized = rawData.map((item) => {
//         const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
      
//         // Handle category being either an object, a string ID, or null
//         let categoryId = null
//         if (item.category) {
//           categoryId = typeof item.category === "object" ? item.category._id : item.category
//         }
//         console.log("March Featured - Category ID:", categoryId, "Type:", typeof item.category)
        
//         // Find the category name based on the category ID
//         const category = categoryId ? categories.find((cat) => cat._id === categoryId) : null
//         console.log("March Featured - Found category:", category)
        
//         const categoryName = category ? (language === "English" ? category.name : language === "Hindi" ? category.hindi : category.kannada) : "Uncategorized"

//         return {
//           id: item._id,
//           image: item.newsImage || "/placeholder.svg",
//           category: categoryName || "General",
//           date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "",
//           title: item[langKey]?.title || "",
//           excerpt: item[langKey]?.description || "",
//         }
//       })

//       const shuffled = [...normalized].sort(() => Math.random() - 0.5)
//       const randomOne = shuffled[0] || initialFeatured
//       const randomTwo = shuffled.slice(1, 3) || emptyList
//       setFeatured(randomOne)
//       setList(randomTwo)
//     }
//   }, [language, rawData, categories])
//   return (
//     <Section aria-label="Featured March of Karnataka news">
//       <HeaderRow>
//         <Title>Featured March of Karnataka news</Title>
//         <SeeMore as={Link} to="/news">
//         {seeMoreText[language] || "See more"}
//           <ArrowIcon aria-hidden="true">
//             <svg 
//               width="20" 
//               height="20" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               xmlns="http://www.w3.org/2000/svg"
//               aria-hidden="true"
//             >
//               <path 
//                 d="M5 12H19M19 12L12 5M19 12L12 19" 
//                 stroke="currentColor" 
//                 strokeWidth="2" 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </ArrowIcon></SeeMore>
//       </HeaderRow>
//       {loading ? ( <SkeletonLoader />):(<PageLayout>

//       </PageLayout>)}
//     </Section>
//   )
// }

// export default StateNews;


import React from 'react'
import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { LanguageContext } from "../../../../../context/LanguageContext.jsx"
import { Section, HeaderRow, Title, SeeMore, ArrowIcon, PageLayout, FeaturedCard, FeaturedImage, Overlay, FeaturedContent, Badge, FeaturedTitle, FeaturedExcerpt, MetaBar, MetaBarSmall, MetaItem, MiddleCol, SmallCard, Thumb, SmallContent, SmallBadge, SmallTitle, SkeletonFeaturedCard, SkeletonFeaturedImage, SkeletonMetaBar, SkeletonText, SkeletonSmallCard, SkeletonThumb } from "./StateNews.Styles.js"
import { getNews } from "../../../../../services/newsApi/NewsApi"
import { CategoryApi } from "../../../../../services/categoryapi/CategoryApi"

const emptyFeatured = {
    category: "",
    title: "",
    excerpt: "",
    image: "/placeholder.svg",
    meta: ["", "", ""],
}

const emptyList = []

function StateNewsOfMarchOfKarnataka() {
    const { language } = useContext(LanguageContext)
    const [rawData, setRawData] = useState([])
    const [featured, setFeatured] = useState(emptyFeatured)
    const [list, setList] = useState(emptyList)
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    // Header text translations
    const headerText = {
        English: "State News",
        Kannada: "ರಾಜ್ಯ ಸುದ್ದಿ",
        Hindi: "राज्य समाचार"
    }

    const seeMoreText = {
        English: "See more",
        Kannada: "ಇನ್ನಷ್ಟು ನೋಡಿ",
        Hindi: "और देखें"
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryApi()
                if (response?.success && Array.isArray(response.data)) {
                    setCategories(response.data)
                }
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true)
                const response = await getNews()
                console.log("State news API response:", response)

                if (response?.success && Array.isArray(response.data)) {
                    // Filter only by magazineType
                    const filteredData = response.data.filter(item =>
                        item.magazineType === "magazine2"
                    )
                    console.log("Filtered state news:", filteredData)
                    setRawData(filteredData)
                } else {
                    setRawData([])
                }
            } catch (error) {
                console.error("Error fetching state news:", error)
                setRawData([])
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [language])

    useEffect(() => {
        if (rawData.length > 0 && categories.length > 0) {
            // Process data based on current language (Kannada by default)
            const langKey = language === "English" ? "English" :
                           language === "Hindi" ? "hindi" : "kannada"

            const processedData = rawData.map((item) => {
                // Get title and limit to 70 characters
                const fullTitle = item[langKey]?.title || item.title || ""
                const limitedTitle = fullTitle.length > 70 ? fullTitle.substring(0, 70) + "..." : fullTitle

                // Get excerpt and limit to 120 characters
                const fullExcerpt = item[langKey]?.description || item.description || ""
                const limitedExcerpt = fullExcerpt.length > 120 ? fullExcerpt.substring(0, 120) + "..." : fullExcerpt

                // Get category ID and find matching category name from API
                const categoryId = item.category
                const category = categories.find((cat) => cat._id === categoryId)
                const categoryName = category
                    ? (language === "English" ? category.name : language === "Hindi" ? category.hindi : category.kannada)
                    : ""

                return {
                    id: item._id,
                    title: limitedTitle,
                    excerpt: limitedExcerpt,
                    image: item.newsImage || "/placeholder.svg",
                    category: categoryName,
                    date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "",
                    author: item.author || "Admin",
                    meta: [item.author || "Admin", item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ""],
                    publishedAt: item.publishedAt
                }
            })

            // Sort by latest published date (newest first)
            const sortedByLatest = [...processedData].sort((a, b) => {
                const dateA = new Date(a.publishedAt || 0)
                const dateB = new Date(b.publishedAt || 0)
                return dateB - dateA // Descending order (latest first)
            })

            // Set featured news (latest item)
            if (sortedByLatest.length > 0) {
                setFeatured(sortedByLatest[0])
            } else {
                setFeatured(emptyFeatured)
            }

            // Set list items (next 3 latest items)
            const listItems = sortedByLatest.slice(1, 4)
            setList(listItems)
        }
    }, [rawData, language, categories])

    // Skeleton loading component
    const SkeletonLoader = () => (
        <PageLayout>
            {/* Left: Featured Skeleton */}
            <SkeletonFeaturedCard>
                <SkeletonFeaturedImage />
                <SkeletonMetaBar>
                    <SkeletonText $width="80%" $height="20px" />
                    <SkeletonText $width="100%" $height="16px" />
                    <SkeletonText $width="60%" $height="14px" />
                </SkeletonMetaBar>
            </SkeletonFeaturedCard>
            {/* Right: Small Cards Skeleton */}
            <MiddleCol>
                {[1, 2, 3].map((_, idx) => (
                    <SkeletonSmallCard key={idx}>
                        <SkeletonThumb />
                    </SkeletonSmallCard>
                ))}
            </MiddleCol>
        </PageLayout>
    )

    return (
        <Section aria-labelledby="state-news-heading">
            <HeaderRow>
                <Title id="state-news-heading">{headerText[language] || " News"}</Title>
                <SeeMore
                    as={Link}
                    to="/news"
                    aria-label={`${seeMoreText[language] || "See more"} ${headerText[language] || " news"}`}
                >
                    {seeMoreText[language] || "See more"}
                    <ArrowIcon aria-hidden="true">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </ArrowIcon>
                </SeeMore>
            </HeaderRow>
            {loading ? (
                <SkeletonLoader />
            ) : (
                <PageLayout>
                    {/* Left: Featured */}
                    {featured.title && (
                        <Link
                            to={`/newsdetails/${featured.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <FeaturedCard>
                                <FeaturedImage $src={featured.image}>
                                    <Overlay />
                                    <FeaturedContent>
                                        <Badge>{featured.category}</Badge>
                                        <FeaturedTitle>{featured.title}</FeaturedTitle>
                                    </FeaturedContent>
                                </FeaturedImage>
                                {featured.excerpt && (
                                    <MetaBar>
                                        <FeaturedExcerpt>{featured.excerpt}</FeaturedExcerpt>
                                    </MetaBar>
                                )}
                                {featured.meta?.length > 0 && (
                                    <MetaBarSmall>
                                        {featured.meta.filter(m => m).map((m, i) => (
                                            <MetaItem key={i}>{m}</MetaItem>
                                        ))}
                                    </MetaBarSmall>
                                )}
                            </FeaturedCard>
                        </Link>
                    )}
                    {/* Middle: Stacked list */}
                    {list.length > 0 && (
                        <MiddleCol>
                            {list.map((item, idx) => (
                                <Link
                                    to={`/newsdetails/${item.id}`}
                                    key={idx}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <SmallCard>
                                        <Thumb $src={item.image} role="img" aria-label={item.title} />
                                        <SmallContent>
                                            <SmallBadge>{item.category}</SmallBadge>
                                            <SmallTitle>{item.title}</SmallTitle>
                                        </SmallContent>
                                    </SmallCard>
                                </Link>
                            ))}
                        </MiddleCol>
                    )}
                </PageLayout>
            )}
        </Section>
    )
}

export default StateNewsOfMarchOfKarnataka
