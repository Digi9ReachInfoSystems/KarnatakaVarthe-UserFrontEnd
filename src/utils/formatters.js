// Format view count (e.g., 1000 -> 1K, 1000000 -> 1M)
export const formatViewCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`
  }
  return count.toString()
}

// Format subscriber count (similar to view count)
export const formatSubscriberCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`
  }
  return count.toString()
}

// Format time ago (e.g., "2 hours ago", "3 days ago")
export const formatTimeAgo = (dateString) => {
  if (!dateString) return "Unknown time"

  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (isNaN(seconds)) {
    return "Invalid date"
  }

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`
  }

  const years = Math.floor(days / 365)
  return `${years} year${years !== 1 ? "s" : ""} ago`
}

// Format duration (ensure it's in MM:SS format)
export const formatDuration = (duration) => {
  if (!duration) return "0:00"

  // If it's already in MM:SS format, return as is
  if (/^\d+:\d{2}$/.test(duration)) {
    return duration
  }

  // If it's in seconds, convert to MM:SS
  if (!isNaN(duration)) {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return duration
}

// Format date to readable format (e.g., "11 Oct 2025")
export const formatDate = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    return ""
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}