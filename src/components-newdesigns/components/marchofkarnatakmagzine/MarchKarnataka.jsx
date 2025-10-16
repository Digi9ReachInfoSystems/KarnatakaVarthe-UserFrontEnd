import React from 'react'
import MarchKarnatakaGallery from './modules/MarchKarnatakaGallery'
import { PageLayout } from './MarchKarnataka.styles'

export default function MarchKarnataka() {
  return (
    <main aria-label="March of Karnataka magazines main content">
      <PageLayout>
        <MarchKarnatakaGallery />
      </PageLayout>
    </main>
  )
}

