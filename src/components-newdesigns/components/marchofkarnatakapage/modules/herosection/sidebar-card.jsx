import { Link } from "react-router-dom"
import { Card, Thumb, Title, Excerpt, Meta, Dot } from "./sidebar-card.styles"

export default function SidebarCard({ id, title, excerpt, date, author, imageSrc, alt = "March of Karnataka story image" }) {
  // Limit excerpt to 12 words
  const truncatedExcerpt = excerpt.split(' ').slice(0, 8).join(' ') + (excerpt.split(' ').length > 12 ? '...' : '');
  
  return (
    <Link 
      to={`/newsdetails/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card role="article" aria-label={title}>
        <Thumb src={imageSrc} alt={alt} loading="lazy" />
        <Title className="text-pretty">{title}</Title>
        <Excerpt>{truncatedExcerpt}</Excerpt>
        <Meta>
          <time dateTime={date}>{date}</time>
          <Dot aria-hidden="true" />
          <span>{author}</span>
        </Meta>
      </Card>
    </Link>
  )
}
