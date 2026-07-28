import { useMemo, useState, useCallback, useEffect, useContext } from "react"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { fetchInstagramMedia } from "../../../../../services/instagram/instagramService"
import ImagePreviewModal, {
  splitCaption,
} from "../../../common/ImagePreviewModal"
import {
  Section,
  SectionHeader,
  SectionTitle,
  ShowMoreLink,
  GalleryContainer,
  StaticImage,
  CentralCarousel,
  MainCard,
  MainImage,
  NavButton,
  ArrowIcon,
  SkeletonImage,
  SkeletonMainCard,
  SkeletonMainImage,
} from "./GallerySection.styles"

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/karnatakavarthe"

export default function GallerySection() {
  const [index, setIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { language } = useContext(LanguageContext)

  const headerText = {
    English: "Photo Gallery",
    Kannada: "ಫೋಟೋ ಗ್ಯಾಲರಿ",
    Hindi: "फोटो गैलरी",
  }
  const buttonText = {
    English: "Show More ->",
    Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ ->",
    Hindi: "और दिखाएँ ->",
  }

  // Latest 8 Instagram images for homepage gallery
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        const response = await fetchInstagramMedia(8)
        const list = Array.isArray(response?.data) ? response.data : []

        const formattedPhotos = list
          .filter((item) => item?.imageUrl)
          .map((item) => {
            const caption = (item.caption || "Instagram").trim() || "Instagram"
            return {
              id: item.id,
              src: item.imageUrl,
              alt: caption,
              title: caption,
              english: caption,
              kannada: caption,
              hindi: caption,
              permalink: item.permalink || INSTAGRAM_PROFILE_URL,
            }
          })

        setPhotos(formattedPhotos)
        setIndex(0)
        setError(null)
      } catch (err) {
        console.error("Error loading Instagram gallery:", err)
        setError("Failed to load photos")
        setPhotos([])
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const carouselImages = photos.length > 0 ? photos : []
  const total = carouselImages.length

  const next = useCallback(() => {
    setModalOpen(false)
    setIndex((i) => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setModalOpen(false)
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goTo = useCallback((i) => {
    setModalOpen(false)
    setIndex(i)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    if (modalOpen) return undefined
    const onKey = (e) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev, modalOpen])

  const active = useMemo(() => {
    const image = carouselImages[index]
    if (!image) return null

    const langKey =
      language === "English"
        ? "english"
        : language === "Hindi"
          ? "hindi"
          : "kannada"

    return {
      ...image,
      title: image[langKey] || image.title || "Untitled",
    }
  }, [index, carouselImages, language])

  const leftImages = useMemo(() => {
    if (total === 0) return []
    const prevIndex1 = (index - 1 + total) % total
    const prevIndex2 = (index - 2 + total) % total

    const langKey =
      language === "English"
        ? "english"
        : language === "Hindi"
          ? "hindi"
          : "kannada"

    return [carouselImages[prevIndex2], carouselImages[prevIndex1]].map(
      (img) => ({
        ...img,
        alt: img[langKey] || img.title || "Untitled",
      })
    )
  }, [index, total, carouselImages, language])

  const rightImages = useMemo(() => {
    if (total === 0) return []
    const nextIndex1 = (index + 1) % total
    const nextIndex2 = (index + 2) % total

    const langKey =
      language === "English"
        ? "english"
        : language === "Hindi"
          ? "hindi"
          : "kannada"

    return [carouselImages[nextIndex1], carouselImages[nextIndex2]].map(
      (img) => ({
        ...img,
        alt: img[langKey] || img.title || "Untitled",
      })
    )
  }, [index, total, carouselImages, language])

  const modalCopy = useMemo(
    () => splitCaption(active?.title || active?.alt || ""),
    [active]
  )

  const SkeletonLoader = () => (
    <GalleryContainer role="region" aria-label="Loading gallery">
      <SkeletonImage />
      <SkeletonImage />
      <CentralCarousel>
        <SkeletonMainCard>
          <SkeletonMainImage />
        </SkeletonMainCard>
      </CentralCarousel>
      <SkeletonImage />
      <SkeletonImage />
    </GalleryContainer>
  )

  if (loading) {
    return (
      <Section id="photos" aria-label={headerText[language] || "Photo Gallery"}>
        <SectionHeader>
          <SectionTitle>{headerText[language] || "Photo Gallery"}</SectionTitle>
        </SectionHeader>
        <SkeletonLoader />
      </Section>
    )
  }

  if (error) {
    return (
      <Section id="photos" aria-label={headerText[language] || "Photo Gallery"}>
        <SectionHeader />
        <div style={{ textAlign: "center", padding: "2rem", color: "#f44336" }}>
          {language === "English"
            ? error
            : language === "Kannada"
              ? "ಫೋಟೋಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ"
              : language === "Hindi"
                ? "फोटो लोड करने में विफल"
                : error}
        </div>
      </Section>
    )
  }

  if (photos.length === 0) {
    return (
      <Section id="photos" aria-label={headerText[language] || "Photo Gallery"}>
        <SectionHeader>
          <SectionTitle>{headerText[language] || "Photo Gallery"}</SectionTitle>
        </SectionHeader>
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          {language === "English"
            ? "No photos available"
            : language === "Kannada"
              ? "ಯಾವುದೇ ಫೋಟೋಗಳು ಲಭ್ಯವಿಲ್ಲ"
              : language === "Hindi"
                ? "कोई फोटो उपलब्ध नहीं है"
                : "No photos available"}
        </div>
      </Section>
    )
  }

  if (!active) {
    return (
      <Section id="photos" aria-label={headerText[language] || "Photo Gallery"}>
        <SectionHeader>
          <SectionTitle>{headerText[language] || "Photo Gallery"}</SectionTitle>
        </SectionHeader>
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          {language === "English"
            ? "Loading gallery..."
            : language === "Kannada"
              ? "ಗ್ಯಾಲರಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..."
              : language === "Hindi"
                ? "गैलरी लोड हो रही है..."
                : "Loading gallery..."}
        </div>
      </Section>
    )
  }

  return (
    <Section id="photos" aria-label={headerText[language] || "Photo Gallery"}>
      <SectionHeader>
        <SectionTitle>{headerText[language] || "Photo Gallery"}</SectionTitle>
        <ShowMoreLink
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonText[language] || "Show More"}
        </ShowMoreLink>
      </SectionHeader>
      <GalleryContainer role="region" aria-label="Gallery single row layout">
        {total > 2 &&
          leftImages.map((img, i) => (
            <StaticImage
              key={img.id || `left-${index}-${i}`}
              src={img.src}
              alt={img.alt}
              onClick={() => goTo((index - 2 + i + total) % total)}
            />
          ))}

        <CentralCarousel aria-live="polite">
          <MainCard>
            <MainImage
              src={active.src}
              alt={active.alt}
              onClick={() => setModalOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Open image"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setModalOpen(true)
                }
              }}
            />

            {total > 1 && (
              <NavButton
                aria-label="Previous image"
                onClick={prev}
                $position="left"
              >
                <ArrowIcon $position="left" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </ArrowIcon>
              </NavButton>
            )}

            {total > 1 && (
              <NavButton
                aria-label="Next image"
                onClick={next}
                $position="right"
              >
                <ArrowIcon $position="right" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </ArrowIcon>
              </NavButton>
            )}
          </MainCard>
        </CentralCarousel>

        {total > 2 &&
          rightImages.map((img, i) => (
            <StaticImage
              key={img.id || `right-${index}-${i}`}
              src={img.src}
              alt={img.alt}
              onClick={() => goTo((index + 1 + i) % total)}
            />
          ))}
      </GalleryContainer>
      <ImagePreviewModal
        open={modalOpen}
        onClose={closeModal}
        src={active.src}
        alt={active.alt || active.title || ""}
        title={modalCopy.title}
        description={modalCopy.description}
      />
    </Section>
  )
}
