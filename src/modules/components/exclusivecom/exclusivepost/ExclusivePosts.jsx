import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  Title,
  Header,
  VideoThumbnail,
  VideoCard1,
  VideoDetails,
  NewsMeta,
  VideoMetacat,
  BookmarkIconWrapper,
} from "../exclusivepost/ExclusivePosts.styles";
import videoThumbnail from "../../../../assets/v1.png";
import { CiBookmark } from "react-icons/ci";

const fallbackVideosData = [
  {
    id: "fallback-1",
    category: "The Verge",
    readTime: "2 min read",
    title: "OpenAI will use Associated Press news stories",
    date: "Jul 13, 2023",
    thumbnail: videoThumbnail,
  },
  {
    id: "fallback-2",
    category: "The Verge",
    readTime: "3 min read",
    title: "Nothing Phone 2 review: the vibes abide",
    date: "Jul 13, 2023",
    thumbnail: videoThumbnail,
  },
  
];

const ExclusivePosts = () => {
  const [videosData, setVideosData] = useState([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set());

  useEffect(() => {
    const fetchVideos = async () => {
      try {
      //   const result = await NewsApi();

        console.log("Received videos data:", result);

        if (result && Array.isArray(result) && result.length > 0) {
          setVideosData(result);
        } else {
          console.warn("No video data found, using fallback data.");
          setVideosData(fallbackVideosData);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideosData(fallbackVideosData);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const handleBookmarkClick = (videoId) => {
    const newBookmarkedVideos = new Set(bookmarkedVideos);
    if (newBookmarkedVideos.has(videoId)) {
      newBookmarkedVideos.delete(videoId);
    } else {
      newBookmarkedVideos.add(videoId);
    }
    setBookmarkedVideos(newBookmarkedVideos);
  };

  return (
    <Container>
      
      <Content>
        {videosData.map((video) => (
          <VideoCard1 key={video.id || video._id}>
            <VideoThumbnail src={video.thumbnail} alt={video.title} />
            <VideoDetails>
              <NewsMeta>
                {video.isTrending && <span>Trending</span>}
                <span>
                  {formatDate(video.createdTime)} • {video.readTime || "N/A"}
                </span>
              </NewsMeta>
              <Title>{video.title}</Title>
              <VideoMetacat>
                {video.category}
                <BookmarkIconWrapper
                  onClick={() => handleBookmarkClick(video.id || video._id)}
                  isBookmarked={bookmarkedVideos.has(video.id || video._id)}
                >
                  <CiBookmark />
                </BookmarkIconWrapper>
              </VideoMetacat>
            </VideoDetails>
          </VideoCard1>
        ))}
      </Content>
    </Container>
  );
};

export default ExclusivePosts;