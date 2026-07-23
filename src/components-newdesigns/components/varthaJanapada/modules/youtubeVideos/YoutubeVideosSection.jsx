import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { fetchYoutubeLatestVideos } from "../../../../../services/youtube/youtubeVideosService";
import {
  Section,
  Header,
  Heading,
  MoreLink,
  Grid,
  MainCard,
  SmallGrid,
  SmallCard,
  Thumbnail,
  PlayButton,
  PlayerFrame,
  Skeleton,
  Empty,
} from "./YoutubeVideosSection.styles";

const headingText = {
  English: "Latest Videos",
  Kannada: "ಲೆಟೆಸ್ಟ್ ವಿಡಿಯೋಸ್",
  Hindi: "लेटेस्ट वीडियोज़",
};

const moreText = {
  English: "Show More ->",
  Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ ->",
  Hindi: "और दिखाएँ ->",
};

function YoutubeVideoCard({ video, main = false, playing, onPlay }) {
  const Card = main ? MainCard : SmallCard;
  const videoId = video?.videoId;
  const title = video?.title || "YouTube video";

  if (playing && videoId) {
    return (
      <Card as="div" role="region" aria-label={`Playing: ${title}`}>
        <PlayerFrame
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </Card>
    );
  }

  return (
    <Card
      type="button"
      onClick={() => videoId && onPlay?.(videoId)}
      aria-label={`Play video: ${title}`}
    >
      <Thumbnail
        src={
          video.thumbnail?.replace(/hqdefault\.jpg$/, "maxresdefault.jpg") ||
          `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        }
        alt=""
        loading={main ? "eager" : "lazy"}
      />
      <PlayButton $small={!main} aria-hidden="true" />
    </Card>
  );
}

export default function YoutubeVideosSection() {
  const { language } = useContext(LanguageContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetchYoutubeLatestVideos(5);
        if (!cancelled) {
          setVideos(Array.isArray(response?.data) ? response.data : []);
        }
      } catch (loadError) {
        console.error("Error fetching YouTube videos:", loadError);
        if (!cancelled) {
          setVideos([]);
          setError("Failed to load videos");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section id="videos" aria-labelledby="youtube-videos-heading">
      <Header>
        <Heading id="youtube-videos-heading">
          {headingText[language] || headingText.English}
        </Heading>
        <MoreLink
          href="https://www.youtube.com/channel/UCED9mQG47OfrV8lFTkTgX9g/videos"
          target="_blank"
          rel="noopener noreferrer"
        >
          {moreText[language] || moreText.English}
        </MoreLink>
      </Header>

      {loading ? (
        <Grid>
          <Skeleton $main />
          <SmallGrid>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </SmallGrid>
        </Grid>
      ) : videos.length ? (
        <Grid>
          <YoutubeVideoCard
            video={videos[0]}
            main
            playing={playingId === videos[0]?.videoId}
            onPlay={setPlayingId}
          />
          <SmallGrid>
            {videos.slice(1, 5).map((video) => (
              <YoutubeVideoCard
                key={video.videoId}
                video={video}
                playing={playingId === video.videoId}
                onPlay={setPlayingId}
              />
            ))}
          </SmallGrid>
        </Grid>
      ) : (
        <Empty>{error || "No videos available"}</Empty>
      )}
    </Section>
  );
}
