import React from 'react'
import DistrictNews from '../../components/districtnews/DistrictNews'

export default function DistrictNewspage() {
  return (
    <main id="main-content" role="main" aria-label="District News Page">
      <h1 style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        District News - Karnataka
      </h1>
      <DistrictNews />
    </main>
  )
}
