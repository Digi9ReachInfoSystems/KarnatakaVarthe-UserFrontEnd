import { useState, useEffect, useRef } from "react"
import { X, Download } from "react-feather"
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalContent,
  PDFFrame,
  IconButton,
  DownloadButton,
  ButtonGroup,
  SkeletonLoader,
  SkeletonHeader,
  SkeletonContent,
} from "../ToolBar/Searchmodal.styles"

const PDFModal = ({ isOpen, onClose, pdfUrl, title }) => {
  const [loading, setLoading] = useState(true)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previouslyFocusedElement = useRef(null) // Ref to store the element that had focus before modal opened

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element before opening the modal
      previouslyFocusedElement.current = document.activeElement

      // Focus management: Focus the close button when modal opens
      if (closeButtonRef.current) {
        closeButtonRef.current.focus()
      }

      // Trap focus within modal
      const handleTabKey = (e) => {
        if (e.key === "Tab") {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          )

          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.shiftKey) {
              // If Shift + Tab and focus is on the first element, move to the last
              if (document.activeElement === firstElement) {
                e.preventDefault()
                lastElement.focus()
              }
            } else {
              // If Tab and focus is on the last element, move to the first
              if (document.activeElement === lastElement) {
                e.preventDefault()
                firstElement.focus()
              }
            }
          }
        }
      }

      document.addEventListener("keydown", handleTabKey)
      return () => document.removeEventListener("keydown", handleTabKey)
    } else {
      // Restore focus to the previously focused element when modal closes
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus()
        previouslyFocusedElement.current = null // Clear the ref
      }
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <ModalOverlay
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <ModalContainer
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="document" // role="document" is appropriate for the content container within a dialog
      >
        <ModalHeader>
          <ModalTitle id="modal-title">{title || "Magazine PDF"}</ModalTitle>
          <ButtonGroup>
            <DownloadButton
              href={pdfUrl}
              download
              target="_blank"
              aria-label={`Download ${title || "PDF file"}`}
              role="button" // Explicitly define role as button for a link that acts like a button
            >
              <Download size={16} aria-hidden="true" />
              Download
            </DownloadButton>
            <IconButton ref={closeButtonRef} onClick={onClose} aria-label="Close modal">
              <X size={24} aria-hidden="true" />
            </IconButton>
          </ButtonGroup>
        </ModalHeader>
        <ModalContent id="modal-content">
          {loading && (
            <SkeletonLoader aria-live="polite" aria-label="Loading PDF content">
              <SkeletonHeader />
              <SkeletonContent />
            </SkeletonLoader>
          )}
          <PDFFrame
            src={pdfUrl}
            title={title || "Magazine PDF"}
            onLoad={() => setLoading(false)}
            style={{ display: loading ? "none" : "block" }}
            aria-label={`PDF content: ${title || "Magazine"}`}
          />
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default PDFModal
