import React from 'react'
import { PageLayout } from './Magzinesinglepage.styles'
import MagzineIdview from './Modules/MagzineIdview'

export default function Magzineview() {
  return (
    <main aria-label="Magazine single view main content">
      <PageLayout>
       <MagzineIdview/>
      </PageLayout>
    </main>
  )
}
