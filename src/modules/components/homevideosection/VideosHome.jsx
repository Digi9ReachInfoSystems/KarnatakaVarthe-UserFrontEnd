import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {
  PageContainer,
  VideoLayout,
  VideoPlayerSection,
  VideoHeader,
  VideoTitle,
  ChevronRight,
  VideoPlayer,
  VideoElement,
  VideoControls,
  ControlButton,
  ProgressBar,
  Progress,
  VideoInfo,
  CurrentVideoTitle,
  VideoMeta,
  WatchNextSection,
  WatchNextHeader,
  VideoList,
  VideoItem,
  ThumbnailContainer,
  Thumbnail,
  NowPlaying,
  PlayButton,
  VideoItemInfo,
  VideoItemTitle,
  VideoItemMeta,
  ShimmerContainer,
  ShimmerThumbnail,
  ShimmerTitle,
  ShimmerMeta,
  Viewall,
  VideoOverlay,
  LargePlayButton,
} from "../homevideosection/VideosHome.styles.js";
import { getLongVideos } from "../../../services/videoApi/videoApi.js";
import { Link } from "react-router-dom";

const Videos = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await getLongVideos();
        if (response.success && Array.isArray(response.data)) {
          setVideos(response.data);
          setActiveVideo(response.data[0]?._id || null);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Handle video play/pause when isPlaying state changes
  useEffect(() => {
    if (!videoRef.current) return;
    
    const playPromise = isPlaying ? videoRef.current.play() : videoRef.current.pause();

    if (isPlaying && playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Error attempting to play:", error);
        setIsPlaying(false);
      });
    }
  }, [isPlaying, activeVideo]);

  // Handle mute/unmute when isMuted state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Update progress bar as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!isSeeking && video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [activeVideo, isSeeking]);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);

  const handleVideoSelect = (id) => {
    setActiveVideo(id);
    setIsPlaying(true);
    setShowControls(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
    resetControlsTimeout();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current || !progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.pageX - rect.left) / progressBar.offsetWidth;
    
    videoRef.current.currentTime = pos * videoRef.current.duration;
    setProgress(pos * 100);
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleProgressMouseDown = () => {
    setIsSeeking(true);
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleProgressMouseUp = () => {
    setIsSeeking(false);
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    setShowControls(true);
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Find the currently active video
  const currentVideo = videos.find((video) => video._id === activeVideo) || videos[0];

  return (
    <PageContainer role="region" aria-label="Video section">
      <VideoLayout>
        {/* Left side - Fixed video player */}
        <VideoPlayerSection>
          <VideoHeader>
            <VideoTitle>
              Karnataka Varthe <ChevronRight><IoIosArrowForward aria-hidden="true" /></ChevronRight>
            </VideoTitle>
            <Link to="/gallery" style={{ textDecoration: 'none', marginLeft: "auto" }} aria-label="View all videos">
              <Viewall>
                View All <ChevronRight><IoIosArrowForward aria-hidden="true" /></ChevronRight>
              </Viewall>
            </Link>
          </VideoHeader>

          {/* Video Player */}
          {loading ? (
            <ShimmerContainer aria-hidden="true">
              <ShimmerThumbnail />
              <ShimmerTitle />
              <ShimmerMeta />
            </ShimmerContainer>
          ) : (
            <>
              <VideoPlayer 
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShowControls(false)}
                role="application"
                aria-label="Video player"
              >
                <VideoElement
                  ref={videoRef}
                  src={currentVideo?.video_url}
                  poster={currentVideo?.thumbnail}
                  controls={false}
                  loop={false}
                  onClick={handleVideoClick}
                  onEnded={handleVideoEnd}
                  aria-label={currentVideo?.title || "Video content"}
                />
                
                {!isPlaying && (
                  <VideoOverlay>
                    <LargePlayButton 
                      onClick={togglePlay}
                      aria-label="Play video"
                      tabIndex="0"
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          togglePlay()
                        }
                      }}
                    >
                      <FaPlay aria-hidden="true" />
                    </LargePlayButton>
                  </VideoOverlay>
                )}
                
                {showControls && (
                  <VideoControls role="group" aria-label="Video controls">
                    <ControlButton 
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          togglePlay()
                        }
                      }}
                    >
                      {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
                    </ControlButton>
                    <ProgressBar 
                      ref={progressBarRef}
                      onClick={handleProgressClick}
                      onMouseDown={handleProgressMouseDown}
                      onMouseUp={handleProgressMouseUp}
                      role="slider"
                      aria-label="Video progress"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                          e.preventDefault()
                          const change = e.key === 'ArrowLeft' ? -5 : 5
                          const newProgress = Math.max(0, Math.min(100, progress + change))
                          setProgress(newProgress)
                          if (videoRef.current) {
                            videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration
                          }
                        }
                      }}
                    >
                      <Progress $width={`${progress}%`} />
                    </ProgressBar>
                    <ControlButton 
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggleMute()
                        }
                      }}
                    >
                      {isMuted ? <FaVolumeMute aria-hidden="true" /> : <FaVolumeUp aria-hidden="true" />}
                    </ControlButton>
                    <ControlButton 
                      onClick={handleFullscreen}
                      aria-label="Enter fullscreen"
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleFullscreen()
                        }
                      }}
                    >
                      <FaExpand aria-hidden="true" />
                    </ControlButton>
                  </VideoControls>
                )}
              </VideoPlayer>
              <VideoInfo>
                <CurrentVideoTitle>{currentVideo?.title}</CurrentVideoTitle>
                <VideoMeta>
                  <span>{new Date(currentVideo?.createdAt).toLocaleDateString()}</span>
                </VideoMeta>
              </VideoInfo>
            </>
          )}
        </VideoPlayerSection>

        {/* Right side - Video list */}
        <WatchNextSection>
          <WatchNextHeader>Watch Next</WatchNextHeader>
          <VideoList role="list" aria-label="Video playlist">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <VideoItem key={index} role="listitem" aria-hidden="true">
                    <ShimmerThumbnail />
                    <ShimmerTitle />
                    <ShimmerMeta />
                  </VideoItem>
                ))
              : videos.map((video) => (
                  <VideoItem 
                    key={video._id}
                    $isActive={video._id === activeVideo}
                    onClick={() => handleVideoSelect(video._id)}
                    role="listitem"
                    tabIndex="0"
                    aria-label={`${video.title}${video._id === activeVideo ? ' - Now playing' : ''}`}
                    aria-current={video._id === activeVideo ? "true" : "false"}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleVideoSelect(video._id)
                      }
                    }}
                  >
                    <ThumbnailContainer>
                      <Thumbnail src={video.thumbnail} alt={video.title} />
                      {video._id === activeVideo ? (
                        <NowPlaying>NOW PLAYING</NowPlaying>
                      ) : (
                        <PlayButton aria-hidden="true">
                          <FaPlay />
                        </PlayButton>
                      )}
                    </ThumbnailContainer>
                    <VideoItemInfo>
                      <VideoItemTitle>{video.title}</VideoItemTitle>
                      <VideoItemMeta>
                        <div>{new Date(video.createdAt).toLocaleDateString()}</div>
                        <div>{video.duration}</div>
                      </VideoItemMeta>
                    </VideoItemInfo>
                  </VideoItem>
                ))}
          </VideoList>
        </WatchNextSection>
      </VideoLayout>
    </PageContainer>
  );
};

export default Videos;