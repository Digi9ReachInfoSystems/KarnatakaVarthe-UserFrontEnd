import { Card, Thumb, Title, Excerpt, Meta, Dot, ContentWrapper } from "./sidebar-card.styles"

export default function SidebarCard({ title, excerpt, date, author, imageSrc, alt = "Story image", index, onClick }) {
  // Limit excerpt to 8 words
  const truncatedExcerpt = excerpt.split(' ').slice(0, 8).join(' ') + (excerpt.split(' ').length > 8 ? '...' : '');
  
  // Parse date for datetime attribute
  const parseDateTimeAttr = (dateStr) => {
    try {
      const parsed = new Date(dateStr);
      return parsed.toISOString();
    } catch {
      return '';
    }
  };
  
  return (
    <Card 
      as="article" 
      role="article" 
      aria-labelledby={`sidebar-card-title-${index}`}
      tabIndex="0"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Thumb 
        src={imageSrc} 
        alt={alt || `Thumbnail for ${title}`}
        loading="lazy"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      />
      <ContentWrapper>
      <Title id={`sidebar-card-title-${index}`} as="h4" className="text-pretty">
        {title}
      </Title>
      <Excerpt>{truncatedExcerpt}</Excerpt>
      <Meta>
        <time dateTime={parseDateTimeAttr(date)}>{date}</time>
        <Dot aria-hidden="true" />
        <span aria-label={`Author: ${author}`}>{author}</span>
      </Meta></ContentWrapper>
    </Card>
  )
}

