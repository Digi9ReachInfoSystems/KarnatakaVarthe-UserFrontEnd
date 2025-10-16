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
  const [currentIndex, setCurrentIndex] = useState(0)
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

  // Auto-scroll effect for more than 5 notifications
  useEffect(() => {
    if (notificationData.length > 5 && !loading && !error && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= notificationData.length - 1 ? 0 : prevIndex + 1
        )
      }, 3000) // Change notification every 3 seconds

      return () => clearInterval(interval)
    }
  }, [notificationData.length, loading, error, isHovered])

  // Get visible notifications for smooth vertical scrolling
  const getVisibleNotifications = () => {
    if (notificationData.length <= 5) {
      return notificationData
    }
    
    // For smooth vertical scrolling, show all notifications multiple times
    const allVisible = []
    
    // Create 3 complete sets of all notifications for continuous scrolling
    for (let set = 0; set < 3; set++) {
      notificationData.forEach((notification, index) => {
        allVisible.push({
          ...notification,
          displayIndex: index + 1 + (set * notificationData.length), // Continue numbering across sets
          setIndex: set
        })
      })
    }
    
    return allVisible
  }

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

  const visibleNotifications = getVisibleNotifications()

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
        ) : visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification, i) => {
            const { text, link } = getNotificationContent(notification, i)
            const displayNumber = notification.displayIndex || (i + 1)
            const keySuffix = notification.setIndex !== undefined ? `-set${notification.setIndex}` : ''
            return (
              <ListItem key={`${i}${keySuffix}`}>
                <ListIndex aria-hidden="true">{displayNumber}.</ListIndex>
                <ListBody>
                  {text}
                  <ListLink as={Link} to={link} aria-label={`See more about notification ${displayNumber}`}>
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
