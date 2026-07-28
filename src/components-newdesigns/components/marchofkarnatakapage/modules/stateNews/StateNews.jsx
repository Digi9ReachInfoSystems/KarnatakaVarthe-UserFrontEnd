


import React from 'react'
import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { LanguageContext } from "../../../../../context/LanguageContext.jsx"
import { Section, HeaderRow, Title, SeeMore, ArrowIcon, PageLayout, FeaturedCard, FeaturedImage, Overlay, FeaturedContent, Badge, FeaturedTitle, FeaturedExcerpt, MetaBar, MetaBarSmall, MetaItem, MiddleCol, SmallCard, Thumb, SmallContent, SmallBadge, SmallTitle, SkeletonFeaturedCard, SkeletonFeaturedImage, SkeletonMetaBar, SkeletonText, SkeletonSmallCard, SkeletonThumb } from "./StateNews.Styles.js"
import { fetchHomepageStateNews } from "../../../../../services/newapis/newapis-services"
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
    const [imageErrors, setImageErrors] = useState({}) // Track failed images

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

    // Fetch latest state news for homepage (Vartha + March combined — no magazineType filter)
    useEffect(() => {
        const fetchStateNews = async () => {
            try {
                setLoading(true)
                const response = await fetchHomepageStateNews()
                setRawData(Array.isArray(response?.data) ? response.data : [])
            } catch (error) {
                console.error("Error fetching state news:", error)
                setRawData([])
            } finally {
                setLoading(false)
            }
        }

        fetchStateNews()
    }, [language])

    useEffect(() => {
        if (rawData.length > 0) {
            // Process data based on current language (Kannada by default)
            const langKey = language === "English" ? "English" :
                           language === "Hindi" ? "hindi" : "kannada"

            const processedData = rawData.map((item) => {
                const newsId = item._id?.$oid || item._id
                const publishedDate = item.publishedAt?.$date || item.publishedAt

                // Get title and limit to 70 characters
                const fullTitle = item[langKey]?.title || item.title || ""
                const limitedTitle = fullTitle.length > 70 ? fullTitle.substring(0, 70) + "..." : fullTitle

                // Get excerpt and limit to 120 characters
                const fullExcerpt = item[langKey]?.description || item.description || ""
                const limitedExcerpt = fullExcerpt.length > 120 ? fullExcerpt.substring(0, 120) + "..." : fullExcerpt

                // Handle category being either an object, a string ID, or null
                let categoryId = null
                if (item.category) {
                    categoryId = typeof item.category === "object" ? item.category._id : item.category
                }
                const category = categoryId ? categories.find((cat) => cat._id === categoryId) : null
                const categoryName = category
                    ? (language === "English" ? category.name : language === "Hindi" ? category.hindi : category.kannada)
                    : ""

                // Validate and clean image URL
                let imageUrl = item.newsImage || "/placeholder.svg";
                // Ensure image URL is valid and not empty
                if (!imageUrl || imageUrl.trim() === "" || imageUrl === "null" || imageUrl === "undefined") {
                    imageUrl = "/placeholder.svg";
                }
                // Ensure URL is absolute if it's a full URL, or relative if it's a path
                if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
                    // Keep full URL as is
                } else if (!imageUrl.startsWith("/")) {
                    // If relative path doesn't start with /, add it
                    imageUrl = "/" + imageUrl;
                }

                return {
                    id: newsId,
                    title: limitedTitle,
                    excerpt: limitedExcerpt,
                    image: imageUrl,
                    category: categoryName,
                    date: publishedDate ? new Date(publishedDate).toLocaleDateString() : "",
                    author: item.author || "Admin",
                    meta: [item.author || "Admin", publishedDate ? new Date(publishedDate).toLocaleDateString() : ""],
                    publishedAt: publishedDate
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
        } else {
            setFeatured(emptyFeatured)
            setList(emptyList)
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
                <Title id="state-news-heading">{headerText[language] || "State News"}</Title>
                <SeeMore
                    as={Link}
                    to="/news"
                    aria-label={`${seeMoreText[language] || "See more"} ${headerText[language] || "State news"}`}
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
                                <FeaturedImage $src={imageErrors[featured.id] ? "/placeholder.svg" : featured.image}>
                                    {/* Hidden img tag to detect image load errors */}
                                    <img
                                        src={featured.image}
                                        alt=""
                                        style={{ display: 'none' }}
                                        onError={() => {
                                            if (!imageErrors[featured.id]) {
                                                console.error("Featured image failed to load:", featured.image);
                                                setImageErrors(prev => ({ ...prev, [featured.id]: true }));
                                            }
                                        }}
                                        onLoad={() => {
                                            // Image loaded successfully, remove error if exists
                                            if (imageErrors[featured.id]) {
                                                setImageErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors[featured.id];
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    />
                                    <Overlay />
                                    <FeaturedContent>
                                        {/* <Badge>{featured.category}</Badge> */}
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
                                        <Thumb $src={imageErrors[item.id] ? "/placeholder.svg" : item.image} role="img" aria-label={item.title}>
                                            {/* Hidden img tag to detect image load errors */}
                                            <img
                                                src={item.image}
                                                alt=""
                                                style={{ display: 'none' }}
                                                onError={() => {
                                                    if (!imageErrors[item.id]) {
                                                        console.error("Thumbnail image failed to load:", item.image);
                                                        setImageErrors(prev => ({ ...prev, [item.id]: true }));
                                                    }
                                                }}
                                                onLoad={() => {
                                                    // Image loaded successfully, remove error if exists
                                                    if (imageErrors[item.id]) {
                                                        setImageErrors(prev => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors[item.id];
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            />
                                        </Thumb>
                                        <SmallContent>
                                            {/* <SmallBadge>{item.category}</SmallBadge> */}
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
