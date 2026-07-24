import { useCallback, useEffect, useId, useRef } from "react"
import { createPortal } from "react-dom"
import {
  Overlay,
  Dialog,
  CloseButton,
  ImageStage,
  PreviewImage,
  ContentPanel,
  Title,
  Description,
  SrOnly,
} from "./ImagePreviewModal.styles"

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Image preview modal matching poster/lightbox reference.
 * Keeps original aspect ratio — never crops, stretches, or zooms.
 * @param {{ open: boolean, onClose: () => void, src?: string, alt?: string, title?: string, description?: string }} props
 */
export default function ImagePreviewModal({
  open,
  onClose,
  src,
  alt = "",
  title = "",
  description = "",
}) {
  const titleId = useId()
  const descId = useId()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restoreFocusRef = useRef(null)

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined

    restoreFocusRef.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = "hidden"
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`
    }

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus()
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
      const el = restoreFocusRef.current
      if (el && typeof el.focus === "function") {
        el.focus()
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
        handleClose()
        return
      }

      if (e.key !== "Tab" || !dialogRef.current) return

      const nodes = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE)).filter(
        (node) =>
          !node.hasAttribute("disabled") &&
          node.getAttribute("aria-hidden") !== "true"
      )
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === last || !dialogRef.current.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown, true)
    return () => window.removeEventListener("keydown", onKeyDown, true)
  }, [open, handleClose])

  if (!open || !src || typeof document === "undefined") return null

  const hasTitle = Boolean(title?.trim())
  const hasDescription = Boolean(description?.trim())
  const showContent = hasTitle || hasDescription

  return createPortal(
    <Overlay role="presentation" onClick={handleClose} data-image-preview-modal>
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDescription ? descId : undefined}
        aria-label={!hasTitle ? alt || "Image preview" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          ref={closeRef}
          type="button"
          aria-label="Close image preview"
          onClick={handleClose}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
          <SrOnly>Close</SrOnly>
        </CloseButton>

        <ImageStage>
          <PreviewImage
            src={src}
            alt={alt || title || "Preview"}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </ImageStage>

        {showContent ? (
          <ContentPanel>
            {hasTitle ? <Title id={titleId}>{title.trim()}</Title> : null}
            {hasDescription ? (
              <Description id={descId}>{description.trim()}</Description>
            ) : null}
          </ContentPanel>
        ) : null}
      </Dialog>
    </Overlay>,
    document.body
  )
}

/**
 * Split a long Instagram-style caption into title + body for the modal.
 */
export function splitCaption(caption = "") {
  const text = String(caption || "").trim()
  if (!text) return { title: "", description: "" }

  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length > 1) {
    return {
      title: lines[0],
      description: lines.slice(1).join("\n"),
    }
  }

  if (text.length <= 72) {
    return { title: text, description: "" }
  }

  const cut = text.slice(0, 72)
  const lastSpace = cut.lastIndexOf(" ")
  const title = (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…"
  return { title, description: text }
}
