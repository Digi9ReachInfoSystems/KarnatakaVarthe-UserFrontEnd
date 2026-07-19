import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchHomepageShortVideos } from "../../../../../services/newapis/newapis-services";
import { LanguageContext } from "../../../../../context/LanguageContext";
import {
  MEDIA_SOURCES,
  announceMediaPlay,
  onOtherMediaPlay,
} from "../mediaPlaybackEvents";
import {
  ShortsPanel,
  ShortsScrollList,
  ShortCardWrap,
  ShortCard,
  VideoPlayer,
  ThumbnailWrap,
  PlayOverlay,
  PlayIcon,
  ShimmerScrollList,
  ShimmerCard,
  LoadingText,
  ErrorText,
  NavArrow,
  NavArrowGroup,
} from "./HeroShortVideos.styles";

const translations = {
  English: {
    failedToLoad: "Failed to load shorts",
    noVideos: "No shorts available",
    video: "Short video",
    play: "Play short video",
    previous: "Previous short",
    next: "Next short",
  },
  Kannada: {
    failedToLoad: "ಶಾರ್ಟ್ಸ್ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    noVideos: "ಯಾವುದೇ ಶಾರ್ಟ್ಸ್ ಲಭ್ಯವಿಲ್ಲ",
    video: "ಶಾರ್ಟ್ ವೀಡಿಯೋ",
    play: "ಶಾರ್ಟ್ ವೀಡಿಯೋ ಪ್ಲೇ ಮಾಡಿ",
    previous: "ಹಿಂದಿನ ಶಾರ್ಟ್",
    next: "ಮುಂದಿನ ಶಾರ್ಟ್",
  },
  Hindi: {
    failedToLoad: "शॉर्ट्स लोड करने में विफल",
    noVideos: "कोई शॉर्ट्स उपलब्ध नहीं",
    video: "शॉर्ट वीडियो",
    play: "शॉर्ट वीडियो चलाएं",
    previous: "पिछला शॉर्ट",
    next: "अगला शॉर्ट",
  },
};

const HOMEPAGE_LIMIT = 10;
const AUTO_SCROLL_MS = 6500;
const MOBILE_BREAKPOINT = 850;

function getVideoId(video, index) {
  return video._id?.$oid || video._id || String(index);
}

function getVideoTitle(video, language, fallbackIndex, t) {
  const langKey =
    language === "English"
      ? "English"
      : language === "Hindi"
        ? "hindi"
        : "kannada";

  return (
    video?.[langKey]?.title ||
    video?.English?.title ||
    video?.kannada?.title ||
    video?.hindi?.title ||
    video?.title ||
    `${t.video} ${fallbackIndex + 1}`
  );
}

function getThumbnail(video) {
  const thumb = video?.thumbnail;
  if (!thumb || thumb === "null" || thumb === "undefined") {
    return "/placeholder.svg";
  }
  if (
    thumb.startsWith("http://") ||
    thumb.startsWith("https://") ||
    thumb.startsWith("/")
  ) {
    return thumb;
  }
  return `/${thumb}`;
}

function getVideoUrl(video) {
  return video?.video_url || video?.videoUrl || "";
}

export default function HeroShortVideos() {
  const { language } = useContext(LanguageContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const videoRefs = useRef({});
  const listRef = useRef(null);
  const cardRefs = useRef({});
  const indexRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isAutoScrollingRef = useRef(false);

  const t = translations[language] || translations.English;

  useEffect(() => {
    const updateLayout = () => {
      setIsMobileLayout(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchHomepageShortVideos();
        const items = Array.isArray(response?.data) ? response.data : [];
        setVideos(items.slice(0, HOMEPAGE_LIMIT));
        setPlayingId(null);
        indexRef.current = 0;
        setActiveIndex(0);
      } catch (err) {
        console.error("Error fetching hero shorts:", err);
        setError("failedToLoad");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const stopShortPlayback = useCallback(() => {
    Object.values(videoRefs.current).forEach((el) => {
      if (el && typeof el.pause === "function") {
        el.pause();
      }
    });
    setPlayingId(null);
  }, []);

  const handlePlay = (id) => {
    setPlayingId((prev) => {
      if (prev === id) return null;
      announceMediaPlay(MEDIA_SOURCES.HERO_SHORTS);
      return id;
    });
  };

  // Stop shorts when Live TV (or other media) starts.
  useEffect(() => {
    return onOtherMediaPlay(MEDIA_SOURCES.HERO_SHORTS, () => {
      stopShortPlayback();
    });
  }, [stopShortPlayback]);

  useEffect(() => {
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId].play().catch(() => {});
    }
  }, [playingId]);

  const scrollToIndex = useCallback((index) => {
    const list = listRef.current;
    const id = videos[index] ? getVideoId(videos[index], index) : null;
    const card = id ? cardRefs.current[id] : null;
    if (!list || !card) return;

    isAutoScrollingRef.current = true;
    const isHorizontal = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isHorizontal) {
      list.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    } else {
      list.scrollTo({ top: card.offsetTop, behavior: "smooth" });
    }
    window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 1200);
  }, [videos]);

  const goToIndex = useCallback(
    (index) => {
      if (!videos.length) return;
      const next = ((index % videos.length) + videos.length) % videos.length;
      indexRef.current = next;
      setActiveIndex(next);
      setPlayingId(null);
      scrollToIndex(next);
      pauseUntilRef.current = Date.now() + 8000;
    },
    [videos.length, scrollToIndex]
  );

  const pauseAutoScroll = useCallback((ms = 6000) => {
    pauseUntilRef.current = Date.now() + ms;
  }, []);

  // Auto-scroll through shorts (shared by Vartha + March hero)
  useEffect(() => {
    if (loading || videos.length < 2) return;

    const timer = setInterval(() => {
      if (playingId) return;
      if (isHoveringRef.current) return;
      if (Date.now() < pauseUntilRef.current) return;

      const next = (indexRef.current + 1) % videos.length;
      indexRef.current = next;
      setActiveIndex(next);
      scrollToIndex(next);
    }, AUTO_SCROLL_MS);

    return () => clearInterval(timer);
  }, [loading, videos.length, playingId, scrollToIndex]);

  const showArrows = !loading && !error && videos.length > 1 && !playingId;
  const PrevIcon = isMobileLayout ? ChevronLeft : ChevronUp;
  const NextIcon = isMobileLayout ? ChevronRight : ChevronDown;

  return (
    <ShortsPanel aria-label="Hero short videos">
      {loading ? (
        <ShimmerScrollList aria-hidden="true">
          <ShimmerCard />
        </ShimmerScrollList>
      ) : error ? (
        <ErrorText>{t.failedToLoad}</ErrorText>
      ) : videos.length > 0 ? (
        <>
          <ShortsScrollList
            ref={listRef}
            aria-label="Short videos list"
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
            onWheel={() => pauseAutoScroll()}
            onTouchStart={() => pauseAutoScroll()}
            onScroll={() => {
              if (!isAutoScrollingRef.current) pauseAutoScroll(4000);
            }}
          >
            {videos.map((video, index) => {
              const id = getVideoId(video, index);
              const title = getVideoTitle(video, language, index, t);
              const isPlaying = playingId === id;

              return (
                <ShortCardWrap
                  key={id}
                  ref={(el) => {
                    if (el) cardRefs.current[id] = el;
                  }}
                >
                  <ShortCard
                    role="button"
                    tabIndex={0}
                    aria-label={isPlaying ? title : t.play}
                    onClick={() => {
                      pauseAutoScroll(8000);
                      if (!isPlaying) handlePlay(id);
                    }}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && !isPlaying) {
                        e.preventDefault();
                        pauseAutoScroll(8000);
                        handlePlay(id);
                      }
                    }}
                  >
                    {isPlaying ? (
                      <VideoPlayer>
                        <video
                          ref={(el) => {
                            videoRefs.current[id] = el;
                          }}
                          controls
                          autoPlay
                          playsInline
                          loop
                          src={getVideoUrl(video)}
                          aria-label={title}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </VideoPlayer>
                    ) : (
                      <ThumbnailWrap>
                        <img src={getThumbnail(video)} alt={title} draggable={false} />
                        <PlayOverlay aria-hidden="true">
                          <PlayIcon />
                        </PlayOverlay>
                      </ThumbnailWrap>
                    )}
                  </ShortCard>
                </ShortCardWrap>
              );
            })}
          </ShortsScrollList>

          {showArrows && (
            <NavArrowGroup>
              <NavArrow
                type="button"
                aria-label={t.previous}
                onClick={(e) => {
                  e.stopPropagation();
                  goToIndex(activeIndex - 1);
                }}
              >
                <PrevIcon aria-hidden="true" />
              </NavArrow>
              <NavArrow
                type="button"
                aria-label={t.next}
                onClick={(e) => {
                  e.stopPropagation();
                  goToIndex(activeIndex + 1);
                }}
              >
                <NextIcon aria-hidden="true" />
              </NavArrow>
            </NavArrowGroup>
          )}
        </>
      ) : (
        <LoadingText>{t.noVideos}</LoadingText>
      )}
    </ShortsPanel>
  );
}
