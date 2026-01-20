import React from 'react'
import { useSearchParams } from 'react-router-dom'
import DistrictNews from '../../components/districtnews/DistrictNews'
import IndividualDistrictNewspage from '../individualDistrictNewspage/IndividualDistrictNewspage'

export default function DistrictNewspage() {
  const [searchParams] = useSearchParams()
  const districtParam = searchParams.get('district')

  // If district query parameter exists, show individual district news
  if (districtParam) {
    return <IndividualDistrictNewspage />
  }

  // Otherwise, show all district news (existing behavior)
  return (
    <main id="main-content" role="main" aria-label="District News Page">
      <h1 style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        District News - Karnataka
      </h1>
      <DistrictNews />
    </main>
  )
}
