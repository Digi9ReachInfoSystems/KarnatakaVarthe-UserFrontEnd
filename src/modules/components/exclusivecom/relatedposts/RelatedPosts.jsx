import React, { useEffect, useState } from 'react';
import { 
  RelatedPostsContainer, 
  RelatedPostsNewsCardWrapper,
  RelatedPostsNewsImageWrapper,
  RelatedPostsNewsContentWrapper,
  RelatedPostsNewsHeaderWrapper,
  RelatedPostsNewsTitleWrapper,
  RelatedPostsTrendingTagWrapper,
  RelatedPostsNewsMetaWrapper,
  RelatedPostsIconWrapper
} from '../relatedposts/RelatedPosts.styles';
import { FaRegHeart, FaRegComment, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import Image1 from "../../../../assets/v1.png";
import ComMents from '../../comments/ComMents';

const dummyNews = [
  {
    _id: "fallback1",
    title: "Breaking News: AI Revolution",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvv Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvvvvvLorem ipsum dolor sit amet, consectetur adipiscing elit...",
    newsImage: Image1,
    category: "Technology",
    author: "John Doe",
    createdTime: "2023-07-24T10:00:00.000Z",
    readTime: "8 min read",
    isTrending: true,
    url: "https://example.com"
  },
  {
      _id: "fallback1",
      title: "Breaking News: AI Revolution",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvv Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvvvvvLorem ipsum dolor sit amet, consectetur adipiscing elit...",
      newsImage: Image1,
      category: "Technology",
      author: "John Doe",
      createdTime: "2023-07-24T10:00:00.000Z",
      readTime: "8 min read",
      isTrending: true,
      url: "https://example.com"
    },
    {
      _id: "fallback1",
      title: "Breaking News: AI Revolution",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvv Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvvvvvLorem ipsum dolor sit amet, consectetur adipiscing elit...",
      newsImage: Image1,
      category: "Technology",
      author: "John Doe",
      createdTime: "2023-07-24T10:00:00.000Z",
      readTime: "8 min read",
      isTrending: true,
      url: "https://example.com"
    },
    {
      _id: "fallback1",
      title: "Breaking News: AI Revolution",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvv Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitvvvvvvLorem ipsum dolor sit amet, consectetur adipiscing elit...",
      newsImage: Image1,
      category: "Technology",
      author: "John Doe",
      createdTime: "2023-07-24T10:00:00.000Z",
      readTime: "8 min read",
      isTrending: true,
      url: "https://example.com"
    }
];

const RelatedPosts = () => {
  const [news, setNews] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setNews(dummyNews);
  }, []);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };



  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <RelatedPostsContainer>
      {news.map((newsItem) => (
        <RelatedPostsNewsCardWrapper key={newsItem._id}>

          <RelatedPostsNewsContentWrapper>
    

            <RelatedPostsNewsTitleWrapper>
              {newsItem.title || "Untitled News"}
              <RelatedPostsNewsHeaderWrapper>
              {newsItem.author || "Unknown Author"} • {newsItem.category || "General"}
            </RelatedPostsNewsHeaderWrapper>
              <RelatedPostsIconWrapper>
                <FaRegHeart />
                <FaRegComment onClick={toggleComments} style={{ cursor: "pointer" }} />
                <FaPaperPlane />
              </RelatedPostsIconWrapper>
            </RelatedPostsNewsTitleWrapper>

            {/* Smoothly Animated Comments Section */}
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <ComMents />
                </motion.div>
              )}
            </AnimatePresence>

        

            <RelatedPostsNewsMetaWrapper>
              {newsItem.isTrending && <RelatedPostsTrendingTagWrapper>{newsItem.author || "Unknown Author"} • {newsItem.category || "General"}</RelatedPostsTrendingTagWrapper>}
              <span>{formatDate(newsItem.createdTime)} • {newsItem.readTime || "N/A"}</span>
            </RelatedPostsNewsMetaWrapper>

      

            {/* <RelatedPostsNewsTextWrapper>
              {newsItem.description || "No description available."}
            </RelatedPostsNewsTextWrapper> */}
          </RelatedPostsNewsContentWrapper>
          <RelatedPostsNewsImageWrapper>
            <img src={newsItem.newsImage || "https://via.placeholder.com/300"} alt={newsItem.title || "News Image"} />
          </RelatedPostsNewsImageWrapper>
          
        </RelatedPostsNewsCardWrapper>
      ))}
    </RelatedPostsContainer>
  );
};

export default RelatedPosts;