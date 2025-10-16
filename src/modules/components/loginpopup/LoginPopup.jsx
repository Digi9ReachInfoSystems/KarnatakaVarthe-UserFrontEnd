import { Overlay, PopupContainer, Title, Subtitle, SignInButton, CloseButton } from "./LoginPopup.styles"
import { useNavigate } from "react-router-dom"
import { IoClose } from "react-icons/io5"

const LoginPopup = ({ isOpen, onClose, onCloseOnly, title = "Like this content?", subtitle = "Login to access this content." }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleLoginClick = () => {
    onClose() // Close the popup
    navigate('/login') // Redirect to login page
  }

  const handleClose = () => {
    // Use onCloseOnly if provided, otherwise try to call onClose safely
    if (onCloseOnly) {
      onCloseOnly() // This should only close the popup
    } else {
      // Fallback: try to close without navigation
      try {
        onClose()
      } catch (error) {
      }
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      // Use onCloseOnly if provided, otherwise use onClose
      if (onCloseOnly) {
        onCloseOnly()
      } else {
        onClose()
      }
    }
  }

  return (
    <Overlay 
      role="dialog" 
      aria-modal="true" 
      aria-label="Sign in to access content"
      onClick={handleOverlayClick}
    >
      <PopupContainer>
        <CloseButton onClick={handleClose} aria-label="Close popup">
          <IoClose />
        </CloseButton>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <SignInButton onClick={handleLoginClick} aria-label="Sign in to your account">
          Login
        </SignInButton>
      </PopupContainer>
    </Overlay>
  )
}

export default LoginPopup
