import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getLatestNotification } from '../../../../services/latestnotification/LatestNotification.js'
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

export default function LatestNotification({ notifications = [] }) {
  const [apiNotifications, setApiNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getLatestNotification()
        setApiNotifications(response.data || response || [])
      } catch (err) {
        console.error('Error fetching notifications:', err)
        setError('Failed to load notifications')
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
        }, 30)

        return () => clearInterval(interval)
      }
    }
  }, [notificationData.length, loading, error, isHovered])

  // Helper function to get notification text and link
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
    
    // If notification is an object with properties
    const fullText = notification.title || notification.message || notification.text || notification.content || `Notification ${index + 1}`;
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
      <PanelHeader id="notifications-heading">Latest notifications</PanelHeader>
      <NotificationList 
        aria-label="Notifications list"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <ShimmerLoader />
        ) : error ? (
          <ErrorText>{error}</ErrorText>
        ) : notificationData.length > 0 ? (
          notificationData.map((notification, i) => {
            const { text, link } = getNotificationContent(notification, i)
            return (
              <ListItem key={i}>
                <ListIndex aria-hidden="true">{i + 1}.</ListIndex>
                <ListBody>
                  {text}
                  <ListLink as={Link} to={link} aria-label={`See more about notification ${i + 1}`}>
                    See more <span aria-hidden="true">→</span>
                  </ListLink>
                </ListBody>
              </ListItem>
            )
          })
        ) : (
          <LoadingText>No notifications available</LoadingText>
        )}
      </NotificationList>
    </NotificationPanel>
  )
}
