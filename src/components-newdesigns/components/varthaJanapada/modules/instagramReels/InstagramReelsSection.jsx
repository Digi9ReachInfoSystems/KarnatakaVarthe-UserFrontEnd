import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { fetchInstagramReels } from "../../../../../services/instagram/instagramService"
import { LanguageContext } from "../../../../../context/LanguageContext"
import {
  ReelsAside,
  ReelsHeader,
  HeaderRow,
  ViewMoreLink,
  ReelStage,
  ReelCardShell,
  ShortsPanel,
  ShortsScrollList,
  ShortCardWrap,
  ShortCard,
  VideoPlayer,
  ThumbnailWrap,
  PlayOverlay,
  PlayIcon,
  ReelsBadge,
  ShimmerScrollList,
  ShimmerCard,
  ErrorText,
  NavArrow,
  NavArrowGroup,
} from "./InstagramReelsSection.styles"

const INSTAGRAM_REELS_URL = "https://www.instagram.com/karnatakavarthe/reels/"
const REELS_LIMIT = 5
const AUTO_SCROLL_MS = 6500
/* Keep in sync with FlexContainer / Reels styles stack breakpoint */
const MOBILE_BREAKPOINT = 1026

const translations = {
  English: {
    title: "Reels",
    showMore: "Show More ->",
    failedToLoad: "Failed to load reels",
    noVideos: "No reels available",
    play: "Play reel",
    previous: "Previous reel",
    next: "Next reel",
  },
  Kannada: {
    title: "ರೀಲ್ಸ್",
    showMore: "ಹೆಚ್ಚು ತೋರಿಸಿ ->",
    failedToLoad: "ರೀಲ್ಸ್ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    noVideos: "ಯಾವುದೇ ರೀಲ್ಸ್ ಲಭ್ಯವಿಲ್ಲ",
    play: "ರೀಲ್ ಪ್ಲೇ ಮಾಡಿ",
    previous: "ಹಿಂದಿನ ರೀಲ್",
    next: "ಮುಂದಿನ ರೀಲ್",
  },
  Hindi: {
    title: "रील्स",
    showMore: "और दिखाएँ ->",
    failedToLoad: "रील्स लोड करने में विफल",
    noVideos: "कोई रील्स उपलब्ध नहीं",
    play: "रील चलाएं",
    previous: "पिछली रील",
    next: "अगली रील",
  },
}

function captionTitle(caption, fallbackIndex) {
  const text = String(caption || "").trim()
  if (!text) return `Reel ${fallbackIndex + 1}`
  const firstLine = text.split(/\n+/)[0].trim()
  if (firstLine.length <= 80) return firstLine
  const cut = firstLine.slice(0, 80)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…"
}

export default function InstagramReelsSection() {
  const { language } = useContext(LanguageContext)
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [playingId, setPlayingId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const videoRefs = useRef({})
  const listRef = useRef(null)
  const cardRefs = useRef({})
  const indexRef = useRef(0)
  const pauseUntilRef = useRef(0)
  const isHoveringRef = useRef(false)
  const isAutoScrollingRef = useRef(false)

  const t = translations[language] || translations.English

  useEffect(() => {
    const updateLayout = () => {
      setIsMobileLayout(window.innerWidth <= MOBILE_BREAKPOINT)
    }
    updateLayout()
    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [])

  useEffect(() => {
    const loadReels = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchInstagramReels(REELS_LIMIT)
        const items = Array.isArray(response?.data) ? response.data : []
        setReels(
          items
            .filter((item) => item?.thumbnailUrl || item?.videoUrl)
            .slice(0, REELS_LIMIT)
        )
        setPlayingId(null)
        indexRef.current = 0
        setActiveIndex(0)
      } catch (err) {
        console.error("Error fetching Instagram reels:", err)
        setError("failedToLoad")
        setReels([])
      } finally {
        setLoading(false)
      }
    }
    loadReels()
  }, [])

  const handlePlay = (reel) => {
    if (reel.videoUrl) {
      setPlayingId((prev) => (prev === reel.id ? null : reel.id))
      return
    }
    if (reel.permalink) {
      window.open(reel.permalink, "_blank", "noopener,noreferrer")
    }
  }

  useEffect(() => {
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId].play().catch(() => {})
    }
  }, [playingId])

  const scrollToIndex = useCallback(
    (index) => {
      const list = listRef.current
      const reel = reels[index]
      const card = reel ? cardRefs.current[reel.id] : null
      if (!list || !card) return

      isAutoScrollingRef.current = true
      const isHorizontal = window.innerWidth <= MOBILE_BREAKPOINT
      if (isHorizontal) {
        list.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
      } else {
        list.scrollTo({ top: card.offsetTop, behavior: "smooth" })
      }
      window.setTimeout(() => {
        isAutoScrollingRef.current = false
      }, 1200)
    },
    [reels]
  )

  const goToIndex = useCallback(
    (index) => {
      if (!reels.length) return
      const next = ((index % reels.length) + reels.length) % reels.length
      indexRef.current = next
      setActiveIndex(next)
      setPlayingId(null)
      scrollToIndex(next)
      pauseUntilRef.current = Date.now() + 8000
    },
    [reels.length, scrollToIndex]
  )

  const pauseAutoScroll = useCallback((ms = 6000) => {
    pauseUntilRef.current = Date.now() + ms
  }, [])

  useEffect(() => {
    if (loading || reels.length < 2) return

    const timer = setInterval(() => {
      if (playingId) return
      if (isHoveringRef.current) return
      if (Date.now() < pauseUntilRef.current) return

      const next = (indexRef.current + 1) % reels.length
      indexRef.current = next
      setActiveIndex(next)
      scrollToIndex(next)
    }, AUTO_SCROLL_MS)

    return () => clearInterval(timer)
  }, [loading, reels.length, playingId, scrollToIndex])

  const showArrows = !loading && !error && reels.length > 1 && !playingId
  const PrevIcon = isMobileLayout ? ChevronLeft : ChevronUp
  const NextIcon = isMobileLayout ? ChevronRight : ChevronDown

  return (
    <ReelsAside id="reels" aria-labelledby="instagram-reels-heading">
      <HeaderRow>
        <ReelsHeader id="instagram-reels-heading">{t.title}</ReelsHeader>
        <ViewMoreLink
          href={INSTAGRAM_REELS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.showMore}
        </ViewMoreLink>
      </HeaderRow>

      <ReelStage>
        <ReelCardShell>
          <ShortsPanel aria-label="Instagram reels">
            {loading ? (
              <ShimmerScrollList aria-hidden="true">
                <ShimmerCard />
              </ShimmerScrollList>
            ) : error ? (
              <ErrorText>{t.failedToLoad}</ErrorText>
            ) : reels.length > 0 ? (
              <ShortsScrollList
                ref={listRef}
                aria-label="Instagram reels list"
                onMouseEnter={() => {
                  isHoveringRef.current = true
                }}
                onMouseLeave={() => {
                  isHoveringRef.current = false
                }}
                onWheel={() => pauseAutoScroll()}
                onTouchStart={() => pauseAutoScroll()}
                onScroll={() => {
                  if (!isAutoScrollingRef.current) pauseAutoScroll(4000)
                }}
              >
                {reels.map((reel, index) => {
                  const id = reel.id
                  const title = captionTitle(reel.caption, index)
                  const isPlaying = playingId === id

                  return (
                    <ShortCardWrap
                      key={id}
                      ref={(el) => {
                        if (el) cardRefs.current[id] = el
                      }}
                    >
                      <ShortCard
                        role="button"
                        tabIndex={0}
                        aria-label={isPlaying ? title : t.play}
                        onClick={() => {
                          pauseAutoScroll(8000)
                          if (!isPlaying) handlePlay(reel)
                        }}
                        onKeyDown={(e) => {
                          if (
                            (e.key === "Enter" || e.key === " ") &&
                            !isPlaying
                          ) {
                            e.preventDefault()
                            pauseAutoScroll(8000)
                            handlePlay(reel)
                          }
                        }}
                      >
                        {isPlaying && reel.videoUrl ? (
                          <VideoPlayer>
                            <video
                              ref={(el) => {
                                videoRefs.current[id] = el
                              }}
                              controls
                              autoPlay
                              playsInline
                              loop
                              src={reel.videoUrl}
                              poster={reel.thumbnailUrl || undefined}
                            />
                          </VideoPlayer>
                        ) : (
                          <ThumbnailWrap>
                            <ReelsBadge>Reels</ReelsBadge>
                            <img
                              src={reel.thumbnailUrl}
                              alt=""
                              loading="lazy"
                            />
                            <PlayOverlay aria-hidden="true">
                              <PlayIcon />
                            </PlayOverlay>
                          </ThumbnailWrap>
                        )}
                      </ShortCard>
                    </ShortCardWrap>
                  )
                })}
              </ShortsScrollList>
            ) : (
              <ErrorText>{t.noVideos}</ErrorText>
            )}
          </ShortsPanel>

          {showArrows && (
            <NavArrowGroup>
              <NavArrow
                type="button"
                aria-label={t.previous}
                disabled={activeIndex === 0}
                onClick={() => goToIndex(activeIndex - 1)}
              >
                <PrevIcon aria-hidden="true" />
              </NavArrow>
              <NavArrow
                type="button"
                aria-label={t.next}
                disabled={activeIndex >= reels.length - 1}
                onClick={() => goToIndex(activeIndex + 1)}
              >
                <NextIcon aria-hidden="true" />
              </NavArrow>
            </NavArrowGroup>
          )}
        </ReelCardShell>
      </ReelStage>
    </ReelsAside>
  )
}
