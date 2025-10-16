import React from 'react'
import MagazineGallery from './modules/MagazineGallery'
import { PageLayout } from './VarthaJanapada.styles'

export default function DistrictNews() {
  return (
    <main aria-label="Vartha Janapada magazines main content">
      <PageLayout>
        <MagazineGallery />
      </PageLayout>
    </main>
  )
}
