import React from "react";
import {
  Container,
  PhotoCard,
  PhotoGrid,
  Photos,
  SectionHeader,
  Title,
  PhotoImage,
  PhotoLabel,
  ShimmerContainer,
  ShimmerThumbnail,
} from "./ShowPhotos.Styles";
import { LanguageContext } from "../../../context/LanguageContext";
import { useContext, useEffect, useState } from "react";
import { PhotosApi } from "../../../services/gallery/GalleryApi";
const titleText = {
  English: "Photos",
  Kannada: "ಫೋಟೋಗಳು",
  Hindi: "फोटो",
};

function ShowPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await PhotosApi.getAllPhotos();
        console.log("Fetched photos:", response);
        // Filter only approved photos and map to the format we need
        const formattedPhotos = response
          .filter((photo) => photo.status === "approved")
          .map((photo) => {
            // Get title based on language
            const langKey =
              language === "English"
                ? "english"
                : language === "Hindi"
                ? "hindi"
                : "kannada";

            const title = photo[langKey] || photo.title || "Untitled";

            return {
              src: photo.photoImage,
              alt: title,
              title: title,
              id: photo._id,
              english: photo.english,
              kannada: photo.kannada,
              hindi: photo.hindi,
            };
          });

        setPhotos(formattedPhotos);

        setError(null);
      } catch (err) {
        console.error("Error loading gallery photos:", err);
        setError("Failed to load photos");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [language]);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const showPrevious = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrevious();
  };

  useEffect(() => {
    if (selectedPhoto) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedPhoto, currentIndex]);

  return (
    <Container>
      <SectionHeader>
        <Title>{titleText[language]}</Title>
      </SectionHeader>
      {loading ? (
        <Photos>
          <PhotoGrid>
            {[...Array(8)].map((_, index) => (
              <ShimmerContainer key={index}>
                <ShimmerThumbnail />
              </ShimmerContainer>
            ))}
          </PhotoGrid>
        </Photos>
      ) : photos.length > 0 ? (
        <Photos>
          <PhotoGrid>
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                onClick={() => openLightbox(photo, index)}
              >
                <PhotoImage
                  src={photo.src}
                  alt={photo.alt}
                  onError={(e) => {
                    console.error("Image failed to load:", photo.src);
                    e.target.style.display = "none";
                  }}
                />
                <PhotoLabel>{photo.title}</PhotoLabel>
              </PhotoCard>
            ))}
          </PhotoGrid>
        </Photos>
      ) : (
        <p>No photos available</p>
      )}

      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              fontSize: "30px",
              cursor: "pointer",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s",
              zIndex: 10001,
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.2)")
            }
          >
            ×
          </button>

          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
              style={{
                position: "absolute",
                left: "20px",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                fontSize: "30px",
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.3s",
                zIndex: 10001,
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255, 255, 255, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255, 255, 255, 0.2)")
              }
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              style={{
                position: "absolute",
                right: "20px",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                fontSize: "30px",
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.3s",
                zIndex: 10001,
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255, 255, 255, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255, 255, 255, 0.2)")
              }
            >
              ›
            </button>
          )}

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                color: "white",
                marginTop: "20px",
                fontSize: "18px",
                textAlign: "center",
                maxWidth: "600px",
              }}
            >
              {selectedPhoto.title}
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default ShowPhotos;
