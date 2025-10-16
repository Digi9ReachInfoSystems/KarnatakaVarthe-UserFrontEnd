import React from 'react'
import { PageLayout } from './Specialnewssecion.styles'
import LatestNews from './modules/LatestNews'
import TabSpecialNews from './modules/TabSpecialNews'
import Recommrednews from './modules/RecommedNews'

export default function Specialnewssecion() {
  return (
    <>
      <PageLayout as="div" role="region" aria-label="Special news sections">
        <LatestNews />
        <TabSpecialNews />
        <Recommrednews />
      </PageLayout>
    </>
  )
}
