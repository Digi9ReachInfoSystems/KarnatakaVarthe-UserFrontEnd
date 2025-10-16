import { useEffect, useState, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { 
  ModalOverlay, 
  ModalContent, 
  CloseButton, 
  ModalImage, 
  ImageInfo,
  NavigationArrow
} from "./ImagePreviewModal.styles";

const ImagePreviewModal = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Home") setCurrentIndex(0);
      if (e.key === "End") setCurrentIndex(images.length - 1);
    };
    
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    
    // Focus management
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    
    // Trap focus within modal
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [onClose, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <ModalOverlay 
      className="open" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <ModalContent 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <CloseButton 
          ref={closeButtonRef}
          onClick={onClose} 
          aria-label="Close modal"
        >
          <FiX size={24} aria-hidden="true" />
        </CloseButton>
        
        <ModalImage 
          src={images[currentIndex].imageUrl} 
          alt={images[currentIndex].title} 
          id="modal-content"
        />
        
        <ImageInfo id="modal-title">{images[currentIndex].title}</ImageInfo>
        
        {/* Left Navigation Arrow */}
        <NavigationArrow 
          ref={prevButtonRef}
          position="left" 
          onClick={prevSlide}
          aria-label="Previous image"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              prevSlide();
            }
          }}
        >
          <FiChevronLeft size={24} aria-hidden="true" />
        </NavigationArrow>
        
        {/* Right Navigation Arrow */}
        <NavigationArrow 
          ref={nextButtonRef}
          position="right" 
          onClick={nextSlide}
          aria-label="Next image"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              nextSlide();
            }
          }}
        >
          <FiChevronRight size={24} aria-hidden="true" />
        </NavigationArrow>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImagePreviewModal;
