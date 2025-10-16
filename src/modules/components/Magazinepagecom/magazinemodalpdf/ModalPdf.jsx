import { useState } from "react"
import { FaDownload, FaTimes } from "react-icons/fa"
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
  LoadingContainer,
  SkeletonLoader,
  SkeletonHeader,
  SkeletonContent
} from "../magazinemodalpdf/PdfModaldesign.styles"

const PDFModal = ({ isOpen, onClose, pdfUrl, title }) => {
  const [loading, setLoading] = useState(true)

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title" aria-describedby="pdf-modal-desc">
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle id="pdf-modal-title">{title || "Magazine PDF"}</ModalTitle>
          <ButtonGroup>
            <DownloadButton href={pdfUrl} download target="_blank" aria-label="Download PDF" tabIndex="0" role="button" onKeyDown={e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); window.open(pdfUrl, '_blank');}}}>
              <FaDownload size={16} aria-hidden="true" /> Download
            </DownloadButton>
            <IconButton onClick={onClose} aria-label="Close" tabIndex="0" role="button" onKeyDown={e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); onClose();}}}>
              <FaTimes size={20} aria-hidden="true" />
            </IconButton>
          </ButtonGroup>
        </ModalHeader>
        <ModalContent id="pdf-modal-desc">
          {loading && (
            <SkeletonLoader aria-hidden="true">
              <SkeletonHeader />
              <SkeletonContent />
            </SkeletonLoader>
          )}
          <PDFFrame
            src={pdfUrl}
            title={title || "Magazine PDF"}
            onLoad={() => setLoading(false)}
            style={{ display: loading ? "none" : "block" }}
          />
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  )
}
export default PDFModal