import { Card, Thumb, Title, Excerpt, Meta, Dot, ContentWrapper } from "./styles/Sidebar.stle"

export default function SidebarCard({ title, excerpt, date, author, imageSrc, alt = "Story image", onClick }) {
  // Limit excerpt to 8 words
  const truncatedExcerpt = excerpt.split(' ').slice(0, 8).join(' ') + (excerpt.split(' ').length > 8 ? '...' : '');

  return (
    <Card role="article" aria-label={title} onClick={onClick} style={{ cursor: 'pointer' }}>
      <Thumb src={imageSrc} alt={alt} loading="lazy" />
      <ContentWrapper>
        <Title className="text-pretty">{title}</Title>
        <Excerpt>{truncatedExcerpt}</Excerpt>
        <Meta>
          <time dateTime={date}>{date}</time>
          <Dot aria-hidden="true" />
          <span>{author}</span>
        </Meta>
      </ContentWrapper>
    </Card>
  )
}
