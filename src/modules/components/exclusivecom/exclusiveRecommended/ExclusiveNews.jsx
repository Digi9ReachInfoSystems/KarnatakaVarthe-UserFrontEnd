import React, { useState, useEffect } from "react";
import {
  ExclusiveNewsContainer,
  ExclusiveNewsTabContainer,
  ExclusiveNewsTab,
  ExclusiveNewsContent,
  ExclusiveNewsCard,
  ExclusiveNewsImage,
  ExclusiveNewsDetails,
  ExclusiveNewsTitle,
  ExclusiveNewsMeta,
  ExclusiveNewsHeader,
  ExclusiveNewsVideoThumbnail,
  ExclusiveNewsVideoTab,
  ExclusiveNewsVideoCard,
  ExclusiveNewsVideoDetails,
  ExclusiveNewsVideoMeta,
  ExclusiveNewsVideoMetacat,
  ExclusiveNewsMeta1,
} from "../exclusiveRecommended/ExclusiveNews.styles";
import TopicImages from "../../../../assets/topic1.png";
import TopicImages2 from "../../../../assets/topic2.png";
import TopicImages3 from "../../../../assets/topic3.png";
import TopicImages4 from "../../../../assets/post1.png";
import videoThumbnail from "../../../../assets/v1.png";

import { VideoApi } from "../../../../services/categoryapi/CategoryApi";

const topicsData = [
  {
    id: 1,
    source: "The Verge • Google AI",
    title: "Now Google’s Bard AI can talk & respond to visual prompts",
    date: "Jul 13, 2023",
    readTime: "2 min read",
    image: TopicImages,
  },
  {
    id: 2,
    source: "Gizmodo • Watch",
    title: "WatchOS 10 preview: widgets all the way down",
    date: "Jul 10, 2023",
    readTime: "4 min read",
    image: TopicImages2,
  },
  {
    id: 3,
    source: "Work Life • Jobs",
    title: "How Gen Z are disrupting the definition of ‘prestigious’ jobs",
    date: "Jul 24, 2023",
    readTime: "8 min read",
    image: TopicImages3,
    trending: true,
  },
  {
    id: 4,
    source: "The Verge • Tech",
    title: "Instagram’s Threads surpasses 100 million users!",
    date: "Jul 24, 2023",
    readTime: "8 min read",
    image: TopicImages4,
    trending: true,
  },
];

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

const ExclusiveNews = () => {
  const [activeTab, setActiveTab] = useState("Topics");
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const result = await VideoApi(); // API already returns response.data, no need for result.data

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

  return (
    <ExclusiveNewsContainer>
      <ExclusiveNewsHeader>Recommended for you</ExclusiveNewsHeader>
      <ExclusiveNewsTabContainer>
        <ExclusiveNewsTab
          active={activeTab === "Topics"}
          onClick={() => setActiveTab("Topics")}
        >
          Topics
        </ExclusiveNewsTab>
        <ExclusiveNewsVideoTab
          active={activeTab === "Video"}
          onClick={() => setActiveTab("Video")}
        >
          Video
        </ExclusiveNewsVideoTab>
      </ExclusiveNewsTabContainer>

      <ExclusiveNewsContent>
        {activeTab === "Topics"
          ? topicsData.map((item) => (
              <ExclusiveNewsCard key={item.id}>
                <ExclusiveNewsImage src={item.image} alt={item.title} />
                <ExclusiveNewsDetails>
                  <ExclusiveNewsMeta1>{item.source}</ExclusiveNewsMeta1>
                  <ExclusiveNewsTitle>{item.title}</ExclusiveNewsTitle>
                  <data style={{ gap: "1%" }}>
                    {item.trending && <span className="trending">Trending</span>}
                    <ExclusiveNewsMeta>
                      {item.date} • {item.readTime}
                    </ExclusiveNewsMeta>
                  </data>
                </ExclusiveNewsDetails>
              </ExclusiveNewsCard>
            ))
          : videosData.map((video) => (
              <ExclusiveNewsVideoCard key={video.id || video._id}>
                <ExclusiveNewsVideoThumbnail
                  src={video.thumbnail}
                  alt={video.title}
                />
                <ExclusiveNewsVideoDetails>
                  <ExclusiveNewsVideoMeta>
                    {new Date(video.date || video.createdAt).toDateString()}
                  </ExclusiveNewsVideoMeta>
                  <ExclusiveNewsTitle
                    style={{ color: "black", fontWeight: "bold", fontSize: "1.3rem" }}
                  >
                    {video.title}
                  </ExclusiveNewsTitle>
                  <ExclusiveNewsVideoMetacat>
                    {video.category}
                  </ExclusiveNewsVideoMetacat>
                </ExclusiveNewsVideoDetails>
              </ExclusiveNewsVideoCard>
            ))}
      </ExclusiveNewsContent>
    </ExclusiveNewsContainer>
  );
};

export default ExclusiveNews;