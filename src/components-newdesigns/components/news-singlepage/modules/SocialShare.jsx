import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaCopy } from "react-icons/fa"
import {
  SocialShareContainer,
  ShareTitle,
  ShareButtons,
  ShareButton,
  ShareIcon,
  ShareText
} from './SocialShare.styles'

const SocialShare = () => {
  const shareUrl = window.location.href
  const shareTitle = "The land of Bisala, Raichur, is now adorned with lush greenery, beckoning nature lovers."

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank')
  }

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      // Use a more accessible notification method
      const notification = document.createElement('div')
      notification.setAttribute('role', 'status')
      notification.setAttribute('aria-live', 'polite')
      notification.textContent = 'Link copied to clipboard!'
      notification.style.position = 'absolute'
      notification.style.left = '-9999px'
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 3000)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <SocialShareContainer as="nav" role="navigation" aria-labelledby="share-heading">
      <ShareTitle id="share-heading" as="h3">Share this article</ShareTitle>
      <ShareButtons role="group" aria-label="Social sharing options">
        <ShareButton onClick={shareToFacebook} style={{ backgroundColor: '#1877F2' }} aria-label="Share on Facebook">
          <ShareIcon>
            <FaFacebookF aria-hidden="true" />
          </ShareIcon>
          <ShareText>Facebook</ShareText>
        </ShareButton>
        
        <ShareButton onClick={shareToTwitter} style={{ backgroundColor: '#1DA1F2' }} aria-label="Share on Twitter">
          <ShareIcon>
            <FaTwitter aria-hidden="true" />
          </ShareIcon>
          <ShareText>Twitter</ShareText>
        </ShareButton>
        
        <ShareButton onClick={shareToLinkedIn} style={{ backgroundColor: '#0077B5' }} aria-label="Share on LinkedIn">
          <ShareIcon>
            <FaLinkedinIn aria-hidden="true" />
          </ShareIcon>
          <ShareText>LinkedIn</ShareText>
        </ShareButton>
        
        <ShareButton onClick={shareToWhatsApp} style={{ backgroundColor: '#25D366' }} aria-label="Share on WhatsApp">
          <ShareIcon>
            <FaWhatsapp aria-hidden="true" />
          </ShareIcon>
          <ShareText>WhatsApp</ShareText>
        </ShareButton>
        
        <ShareButton onClick={copyToClipboard} style={{ backgroundColor: '#6B7280' }} aria-label="Copy article link">
          <ShareIcon>
            <FaCopy aria-hidden="true" />
          </ShareIcon>
          <ShareText>Copy Link</ShareText>
        </ShareButton>
      </ShareButtons>
    </SocialShareContainer>
  )
}

export default SocialShare
