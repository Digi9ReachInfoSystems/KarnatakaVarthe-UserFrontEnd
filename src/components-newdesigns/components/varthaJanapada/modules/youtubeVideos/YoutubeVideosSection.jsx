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

function YoutubeVideoCard({ video, main = false }) {
  const Card = main ? MainCard : SmallCard;
  const openVideo = () => {
    const url =
      video.url ||
      (video.videoId
        ? `https://www.youtube.com/watch?v=${video.videoId}`
        : "");
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      type="button"
      onClick={openVideo}
      aria-label="Open video on YouTube"
    >
      <Thumbnail
        src={
          video.thumbnail?.replace(/hqdefault\.jpg$/, "maxresdefault.jpg") ||
          `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
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
    <Section aria-labelledby="youtube-videos-heading">
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
          <YoutubeVideoCard video={videos[0]} main />
          <SmallGrid>
            {videos.slice(1, 5).map((video) => (
              <YoutubeVideoCard key={video.videoId} video={video} />
            ))}
          </SmallGrid>
        </Grid>
      ) : (
        <Empty>{error || "No videos available"}</Empty>
      )}
    </Section>
  );
}
