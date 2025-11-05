import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useContext } from 'react'
import { getLatestNotification } from '../../../../services/latestnotification/LatestNotification.js'
import { LanguageContext } from '../../../../context/LanguageContext'
import {
  NotificationPanel,
  PanelHeader,
  NotificationList,
  ListItem,
  ListIndex,
  ListBody,
  ListLink,
  LoadingText,
  ErrorText,
  ShimmerContainer,
  ShimmerItem,
  ShimmerIndex,
  ShimmerContent,
  ShimmerText,
  ShimmerLink,
  ShimmerAnimation
} from "./LatestNotification.styles.js"

// Translations for UI text
const translations = {
  English: {
    header: "Latest notifications",
    seeMore: "See more",
    failedToLoad: "Failed to load notifications",
    noNotifications: "No notifications available",
    notification: "Notification",
    ariaLabel: "See more about notification"
  },
  Kannada: {
    header: "ಇತ್ತೀಚಿನ ಅಧಿಸೂಚನೆಗಳು",
    seeMore: "ಹೆಚ್ಚು ನೋಡಿ",
    failedToLoad: "ಅಧಿಸೂಚನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    noNotifications: "ಯಾವುದೇ ಅಧಿಸೂಚನೆಗಳು ಲಭ್ಯವಿಲ್ಲ",
    notification: "ಅಧಿಸೂಚನೆ",
    ariaLabel: "ಅಧಿಸೂಚನೆಯ ಬಗ್ಗೆ ಹೆಚ್ಚು ನೋಡಿ"
  },
  Hindi: {
    header: "नवीनतम सूचनाएं",
    seeMore: "और देखें",
    failedToLoad: "सूचनाएं लोड करने में विफल",
    noNotifications: "कोई सूचनाएं उपलब्ध नहीं",
    notification: "सूचना",
    ariaLabel: "सूचना के बारे में और देखें"
  }
}

export default function LatestNotification({ notifications = [] }) {
  const { language } = useContext(LanguageContext)
  const [apiNotifications, setApiNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const scrollRef = useRef(null)
  
  // Get translations for current language
  const t = translations[language] || translations.English

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getLatestNotification()
        setApiNotifications(response.data || response || [])
      } catch (err) {
        setError('failedToLoad')
        setApiNotifications([])
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  // Priority: props notifications > API notifications
  const notificationData = notifications.length > 0 ? notifications : apiNotifications

  // Auto-scroll effect
  useEffect(() => {
    if (notificationData.length > 0 && !loading && !error && scrollRef.current && !isHovered) {
      const scrollContainer = scrollRef.current
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      
      // Only auto-scroll if content is taller than container
      if (scrollHeight > clientHeight) {
        const interval = setInterval(() => {
          if (scrollContainer.scrollTop >= scrollHeight - clientHeight - 10) {
            // Near the bottom, scroll back to top
            scrollContainer.scrollTop = 0
          } else {
            // Scroll down by 1 pixel for smooth scrolling
            scrollContainer.scrollTop += 1
          }
        }, 60)

        return () => clearInterval(interval)
      }
    }
  }, [notificationData.length, loading, error, isHovered])

  // Helper function to get notification text and link based on current language
  const getNotificationContent = (notification, index) => {
    const maxLength = 100; // Character limit for notification text
    
    if (typeof notification === 'string') {
      const truncatedText = notification.length > maxLength 
        ? notification.substring(0, maxLength) + '...'
        : notification;
      return {
        text: truncatedText,
        link: '#'
      }
    }
    
    // Get the appropriate language field from notification
    // Map language from context to API field names (case-sensitive)
    let fullText = null;
    if (language === 'Kannada' && notification.kannada) {
      fullText = notification.kannada;
    } else if (language === 'Hindi' && notification.hindi) {
      fullText = notification.hindi;
    } else if (language === 'English' && notification.English) {
      fullText = notification.English;
    } else {
      // Fallback: try all language fields or use title/message/text/content
      fullText = notification.kannada || notification.hindi || notification.English || 
                 notification.title || notification.message || notification.text || 
                 notification.content || `${t.notification} ${index + 1}`;
    }
    
    const truncatedText = fullText.length > maxLength 
      ? fullText.substring(0, maxLength) + '...'
      : fullText;
    
    return {
      text: truncatedText,
      link: notification.link || notification.url || notification.href || '#'
    }
  }

  // Shimmer loader component
  const ShimmerLoader = () => (
    <ShimmerContainer>
      <ShimmerAnimation />
      {[1, 2, 3, 4, 5].map((item) => (
        <ShimmerItem key={item}>
          <ShimmerIndex />
          <ShimmerContent>
            <ShimmerText width="90%" />
            <ShimmerText width="75%" marginBottom="8px" />
            <ShimmerLink />
          </ShimmerContent>
        </ShimmerItem>
      ))}
    </ShimmerContainer>
  )

  return (
    <NotificationPanel aria-labelledby="notifications-heading">
      <PanelHeader id="notifications-heading">{t.header}</PanelHeader>
      <NotificationList 
        aria-label="Notifications list"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <ShimmerLoader />
        ) : error ? (
          <ErrorText>{t.failedToLoad}</ErrorText>
        ) : notificationData.length > 0 ? (
          notificationData.map((notification, i) => {
            const { text, link } = getNotificationContent(notification, i)
            // Check if link is external (starts with http:// or https://)
            const isExternalLink = link && (link.startsWith('http://') || link.startsWith('https://'))
            
            return (
              <ListItem key={i}>
                <ListIndex aria-hidden="true">{i + 1}.</ListIndex>
                <ListBody>
                  {text}
                  {isExternalLink ? (
                    <ListLink 
                      as="a" 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${t.ariaLabel} ${i + 1}`}
                    >
                      {t.seeMore} <span aria-hidden="true">→</span>
                    </ListLink>
                  ) : (
                    <ListLink as={Link} to={link} aria-label={`${t.ariaLabel} ${i + 1}`}>
                      {t.seeMore} <span aria-hidden="true">→</span>
                    </ListLink>
                  )}
                </ListBody>
              </ListItem>
            )
          })
        ) : (
          <LoadingText>{t.noNotifications}</LoadingText>
        )}
      </NotificationList>
    </NotificationPanel>
  )
}
