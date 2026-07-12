import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
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
import {
  fetchPhotoCategories,
  fetchPhotosPage,
} from "../../../services/newapis/newapis-services";
import LoadMoreSpinner from "../common/LoadMoreSpinner/LoadMoreSpinner";

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

const PAGE_LIMIT = 20;

function ShowPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { language } = useContext(LanguageContext);
  const sentinelRef = useRef(null);
  const loadingMoreRef = useRef(false);

  const formatPhoto = (photo) => {
    const langKey =
      language === "English"
        ? "English"
        : language === "Hindi"
          ? "hindi"
          : "kannada";
    const title =
      photo[langKey] ||
      photo.english ||
      photo.English ||
      photo.title ||
      "Untitled";
    const id = photo._id?.$oid || photo._id;

    return {
      src: photo.photoImage,
      alt: title,
      title,
      id,
      english: photo.English || photo.english,
      kannada: photo.kannada,
      hindi: photo.hindi,
      categoryId:
        typeof photo.category === "object"
          ? photo.category?._id || photo.category?.$oid
          : photo.category,
    };
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetchPhotoCategories();
        setCategories(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error fetching photo categories:", err);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      setPage(1);
      setHasNextPage(false);
      setSelectedPhoto(null);
      try {
        const response = await fetchPhotosPage(1, {
          limit: PAGE_LIMIT,
          category: activeCategory || undefined,
        });
        if (cancelled) return;
        if (response?.success && Array.isArray(response.data)) {
          setPhotos(response.data.map(formatPhoto));
          setHasNextPage(Boolean(response.pagination?.hasNextPage));
          setPage(1);
        } else {
          setPhotos([]);
          setHasNextPage(false);
          setError("Failed to load photos");
        }
      } catch (err) {
        console.error("Error loading gallery photos:", err);
        if (!cancelled) {
          setPhotos([]);
          setHasNextPage(false);
          setError("Failed to load photos");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPhotos();
    return () => {
      cancelled = true;
    };
  }, [language, activeCategory]);

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasNextPage || loading) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const response = await fetchPhotosPage(nextPage, {
        limit: PAGE_LIMIT,
        category: activeCategory || undefined,
      });
      if (response?.success && Array.isArray(response.data)) {
        setPhotos((prev) => [...prev, ...response.data.map(formatPhoto)]);
        setHasNextPage(Boolean(response.pagination?.hasNextPage));
        setPage(nextPage);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      console.error("Error loading more photos:", err);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [hasNextPage, loading, page, activeCategory, language]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore, loading, hasNextPage]);

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

  const getLocalizedCategoryName = (category) => {
    if (!category) return "";
    if (language === "English") {
      return category.english || category.name || "";
    }
    if (language === "Hindi") {
      return category.hindi || category.name || "";
    }
    return category.kannada || category.name || "";
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
  }, [selectedPhoto, currentIndex, photos]);

  return (
    <Container>
      <SectionHeader>
        <Title>{titleText[language]}</Title>
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
              {language === "English"
                ? "Filter:"
                : language === "Hindi"
                  ? "फ़िल्टर:"
                  : "ಫಿಲ್ಟರ್:"}
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
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#666",
              fontSize: "18px",
            }}
          >
            {error || noPhotosText[language]}
          </div>
        </Photos>
      )}

      {hasNextPage && (
        <div
          ref={sentinelRef}
          aria-hidden="true"
          style={{ height: 1, width: "100%" }}
        />
      )}
      {loadingMore && <LoadMoreSpinner />}

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
