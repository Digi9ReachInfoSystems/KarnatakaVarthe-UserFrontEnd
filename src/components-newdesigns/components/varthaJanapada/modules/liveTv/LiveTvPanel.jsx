import { useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { fetchLiveTv } from "../../../../../services/liveTv/liveTvService";
import {
  MEDIA_SOURCES,
  announceMediaPlay,
  onOtherMediaPlay,
} from "../mediaPlaybackEvents";
import {
  LiveCard,
  Thumbnail,
  LiveBadge,
  PlayButton,
  PlayerFrame,
  ComingSoon,
  ComingSoonLabel,
  ComingSoonTitle,
  ComingSoonHint,
  ShimmerCard,
  ModalOverlay,
  ModalShell,
  ModalClose,
  ModalPlayerFrame,
} from "./LiveTvPanel.styles";

const POLL_MS = 60000;
const DESKTOP_MQ = "(min-width: 851px)";

const translations = {
  English: {
    live: "Live",
    play: "Play Live TV",
    close: "Close Live TV",
    titleFallback: "Live TV",
    comingSoonLabel: "Coming Soon",
    comingSoonTitle: "Live TV Coming Soon",
    comingSoonHint: "Stay tuned — the live stream will appear here when it starts.",
  },
  Kannada: {
    live: "ಲೈವ್",
    play: "ಲೈವ್ ಟಿವಿ ಪ್ಲೇ ಮಾಡಿ",
    close: "ಲೈವ್ ಟಿವಿ ಮುಚ್ಚಿ",
    titleFallback: "ಲೈವ್ ಟಿವಿ",
    comingSoonLabel: "ಶೀಘ್ರದಲ್ಲೇ",
    comingSoonTitle: "ಲೈವ್ ಟಿವಿ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ",
    comingSoonHint: "ಲೈವ್ ಪ್ರಾರಂಭವಾದಾಗ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",
  },
  Hindi: {
    live: "लाइव",
    play: "लाइव टीवी चलाएं",
    close: "लाइव टीवी बंद करें",
    titleFallback: "लाइव टीवी",
    comingSoonLabel: "जल्द आ रहा है",
    comingSoonTitle: "लाइव टीवी जल्द आ रहा है",
    comingSoonHint: "लाइव शुरू होने पर यहाँ दिखेगा।",
  },
};

function getThumbnail(data) {
  const id = data?.youtubeVideoId;
  if (data?.thumbnail && data.thumbnail !== "null") {
    return data.thumbnail.replace("hqdefault.jpg", "maxresdefault.jpg");
  }
  if (id) {
    return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  }
  return "/placeholder.svg";
}

function getEmbedSrc(data) {
  const base =
    data?.embedUrl ||
    (data?.youtubeVideoId
      ? `https://www.youtube.com/embed/${data.youtubeVideoId}`
      : null);
  if (!base) return null;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

function isStreamOnline(data) {
  return (
    Boolean(data?.isOnline) &&
    Boolean(data?.youtubeVideoId || data?.embedUrl || data?.playbackUrl)
  );
}

export default function LiveTvPanel() {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;

  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(DESKTOP_MQ).matches : true
  );

  const loadLiveTv = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) setLoading(true);
      const result = await fetchLiveTv();
      const data = result?.data || null;
      setLiveData(data);
      if (!isStreamOnline(data)) {
        setPlaying(false);
        setModalOpen(false);
      }
    } catch (err) {
      console.error("LiveTvPanel load error:", err);
      setLiveData(null);
      setPlaying(false);
      setModalOpen(false);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLiveTv();
  }, [loadLiveTv]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (!desktop) setModalOpen(false);
      if (desktop) setPlaying(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Poll while not actively playing so an open homepage picks up go-live.
  useEffect(() => {
    if (playing || modalOpen) return undefined;
    const timer = setInterval(() => {
      loadLiveTv({ silent: true });
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [playing, modalOpen, loadLiveTv]);

  const stopPlayback = useCallback(() => {
    setModalOpen(false);
    setPlaying(false);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Stop Live TV when a hero short (or other media) starts.
  useEffect(() => {
    return onOtherMediaPlay(MEDIA_SOURCES.LIVE_TV, () => {
      stopPlayback();
    });
  }, [stopPlayback]);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, closeModal]);

  const startPlayback = useCallback(() => {
    announceMediaPlay(MEDIA_SOURCES.LIVE_TV);
    if (isDesktop) {
      setModalOpen(true);
      setPlaying(false);
    } else {
      setPlaying(true);
      setModalOpen(false);
    }
  }, [isDesktop]);

  if (loading) {
    return <ShimmerCard aria-hidden="true" />;
  }

  const online = isStreamOnline(liveData);

  // Offline / no URL — show Coming Soon placeholder
  if (!online) {
    return (
      <LiveCard
        as="div"
        $offline
        role="region"
        aria-label={t.comingSoonTitle}
      >
        <ComingSoon>
          <ComingSoonLabel>{t.comingSoonLabel}</ComingSoonLabel>
          <ComingSoonTitle>{t.comingSoonTitle}</ComingSoonTitle>
          <ComingSoonHint>{t.comingSoonHint}</ComingSoonHint>
        </ComingSoon>
      </LiveCard>
    );
  }

  const title = liveData.title || t.titleFallback;
  const thumb = getThumbnail(liveData);
  const embedSrc = getEmbedSrc(liveData);

  const modal =
    modalOpen &&
    embedSrc &&
    typeof document !== "undefined" &&
    createPortal(
      <ModalOverlay
        role="presentation"
        onClick={closeModal}
      >
        <ModalShell
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => e.stopPropagation()}
        >
          <LiveBadge>{t.live}</LiveBadge>
          <ModalClose type="button" aria-label={t.close} onClick={closeModal}>
            ×
          </ModalClose>
          <ModalPlayerFrame
            src={embedSrc}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </ModalShell>
      </ModalOverlay>,
      document.body
    );

  // Mobile / tablet: inline player inside the card
  if (playing && embedSrc && !isDesktop) {
    return (
      <>
        <LiveCard as="div" role="region" aria-label={title}>
          <LiveBadge>{t.live}</LiveBadge>
          <PlayerFrame
            src={embedSrc}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </LiveCard>
        {modal}
      </>
    );
  }

  return (
    <>
      <LiveCard
        role="button"
        tabIndex={0}
        aria-label={t.play}
        onClick={startPlayback}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            startPlayback();
          }
        }}
      >
        <LiveBadge>{t.live}</LiveBadge>
        <Thumbnail src={thumb} alt={title} draggable={false} />
        <PlayButton aria-hidden="true" />
      </LiveCard>
      {modal}
    </>
  );
}
