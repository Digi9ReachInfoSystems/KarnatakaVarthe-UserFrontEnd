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
  CategoryDropdownContainer,
  CategorySelect,
  CategorySelectWrapper,
  FilterLabel,
} from "./ShowPhotos.Styles";
import { LanguageContext } from "../../../context/LanguageContext";
import { useContext, useEffect, useState } from "react";
import { PhotosApi } from "../../../services/gallery/GalleryApi";
const titleText = {
  English: "Photos",
  Kannada: "ಫೋಟೋಗಳು",
  Hindi: "फोटो",
};

const allTabText = {
  English: "All",
  Kannada: "ಎಲ್ಲಾ",
  Hindi: "सभी",
};

const noPhotosText = {
  English: "No photos available",
  Kannada: "ಯಾವುದೇ ಫೋಟೋಗಳು ಲಭ್ಯವಿಲ್ಲ",
  Hindi: "कोई फोटो उपलब्ध नहीं",
};

function ShowPhotos() {
  const [photos, setPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await PhotosApi.getPhotoCategories();
        if (response && Array.isArray(response) && response.length > 0) {
          setCategories(response);
        } else {
          console.warn("Empty photo category API response.");
        }
      } catch (error) {
        console.error("Error fetching photo categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch photos
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

            // Handle category - support both string ID and object format
            let categoryId = null;
            if (photo.category) {
              // Handle MongoDB ObjectId format ($oid) or plain string
              if (typeof photo.category === "object") {
                categoryId = photo.category.$oid || photo.category._id;
              } else {
                categoryId = photo.category;
              }
            }

            return {
              src: photo.photoImage,
              alt: title,
              title: title,
              id: photo._id,
              english: photo.english,
              kannada: photo.kannada,
              hindi: photo.hindi,
              categoryId: categoryId,
            };
          });

        setAllPhotos(formattedPhotos);
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

  // Filter photos based on active category
  useEffect(() => {
    if (activeCategory === null) {
      // Show all photos
      setPhotos(allPhotos);
    } else {
      // Filter by category ID
      const filtered = allPhotos.filter((photo) => {
        return photo.categoryId === activeCategory;
      });
      setPhotos(filtered);
    }
    // Reset lightbox when category changes
    setSelectedPhoto(null);
  }, [activeCategory, allPhotos]);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const showNext = () => {
    if (photos.length === 0) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const showPrevious = () => {
    if (photos.length === 0) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  // Get localized category name
  const getLocalizedCategoryName = (category) => {
    if (!category) return "";
    if (language === "English") {
      return category.name || category.english || "";
    } else if (language === "Hindi") {
      return category.hindi || category.name || "";
    } else {
      return category.kannada || category.name || "";
    }
  };

  const handleTabClick = (categoryId) => {
    setActiveCategory(categoryId);
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
        {/* Category Dropdown Filter */}
        {!categoriesLoading && categories.length > 0 && (
          <CategoryDropdownContainer>
            <FilterLabel>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              {language === "English" ? "Filter:" : language === "Hindi" ? "फ़िल्टर:" : "ಫಿಲ್ಟರ್:"}
            </FilterLabel>
            <CategorySelectWrapper>
              <CategorySelect
                value={activeCategory || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleTabClick(value === "" ? null : value);
                }}
                aria-label="Filter photos by category"
              >
                <option value="">{allTabText[language]}</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {getLocalizedCategoryName(category)}
                  </option>
                ))}
              </CategorySelect>
            </CategorySelectWrapper>
          </CategoryDropdownContainer>
        )}
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
        <Photos>
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#666",
            fontSize: "18px",
          }}>
            {noPhotosText[language]}
          </div>
        </Photos>
      )}

      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
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
