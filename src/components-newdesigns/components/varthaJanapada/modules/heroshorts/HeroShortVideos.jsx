import { useContext, useEffect, useRef, useState } from "react";
import { fetchHomepageShortVideos } from "../../../../../services/newapis/newapis-services";
import { LanguageContext } from "../../../../../context/LanguageContext";
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
} from "./HeroShortVideos.styles";

const translations = {
  English: {
    failedToLoad: "Failed to load shorts",
    noVideos: "No shorts available",
    video: "Short video",
    play: "Play short video",
  },
  Kannada: {
    failedToLoad: "ಶಾರ್ಟ್ಸ್ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    noVideos: "ಯಾವುದೇ ಶಾರ್ಟ್ಸ್ ಲಭ್ಯವಿಲ್ಲ",
    video: "ಶಾರ್ಟ್ ವೀಡಿಯೋ",
    play: "ಶಾರ್ಟ್ ವೀಡಿಯೋ ಪ್ಲೇ ಮಾಡಿ",
  },
  Hindi: {
    failedToLoad: "शॉर्ट्स लोड करने में विफल",
    noVideos: "कोई शॉर्ट्स उपलब्ध नहीं",
    video: "शॉर्ट वीडियो",
    play: "शॉर्ट वीडियो चलाएं",
  },
};

const HOMEPAGE_LIMIT = 10;

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
  const videoRefs = useRef({});

  const t = translations[language] || translations.English;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchHomepageShortVideos();
        const items = Array.isArray(response?.data) ? response.data : [];
        setVideos(items.slice(0, HOMEPAGE_LIMIT));
        setPlayingId(null);
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

  const handlePlay = (id) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId].play().catch(() => {});
    }
  }, [playingId]);

  return (
    <ShortsPanel aria-label="Hero short videos">
      {loading ? (
        <ShimmerScrollList aria-hidden="true">
          <ShimmerCard />
        </ShimmerScrollList>
      ) : error ? (
        <ErrorText>{t.failedToLoad}</ErrorText>
      ) : videos.length > 0 ? (
        <ShortsScrollList aria-label="Short videos list">
          {videos.map((video, index) => {
            const id = getVideoId(video, index);
            const title = getVideoTitle(video, language, index, t);
            const isPlaying = playingId === id;

            return (
              <ShortCardWrap key={id}>
                <ShortCard
                  role="button"
                  tabIndex={0}
                  aria-label={isPlaying ? title : t.play}
                  onClick={() => !isPlaying && handlePlay(id)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && !isPlaying) {
                      e.preventDefault();
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
      ) : (
        <LoadingText>{t.noVideos}</LoadingText>
      )}
    </ShortsPanel>
  );
}
