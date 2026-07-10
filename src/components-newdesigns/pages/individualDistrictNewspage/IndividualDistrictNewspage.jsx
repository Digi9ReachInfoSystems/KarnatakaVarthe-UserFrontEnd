import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import DistrictNewsSlug from '../../components/news-section/DistrictNewsslg/DistrictNewsSlug'
import { fetchDistrictsList } from '../../../services/newapis/newapis-services'

export default function IndividualDistrictNewspage() {
  const [searchParams] = useSearchParams()
  const districtName = searchParams.get('district')
  const [districtSlug, setDistrictSlug] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDistrictSlug = async () => {
      if (!districtName) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const districts = await fetchDistrictsList()
        const district = districts.find(d => 
          d.name === districtName || 
          d.english === districtName || 
          d.hindi === districtName || 
          d.kannada === districtName
        )
        
        if (district) {
          setDistrictSlug(district.slug)
        } else {
          console.warn(`District "${districtName}" not found`)
        }
      } catch (error) {
        console.error("Error fetching districts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDistrictSlug()
  }, [districtName])

  if (loading) {
    return (
      <main id="main-content" role="main" aria-label="District News Page">
        <h1 style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          District News - Loading
        </h1>
        <DistrictNewsSlug districtSlug={null} />
      </main>
    )
  }

  if (!districtName || !districtSlug) {
    return (
      <main id="main-content" role="main" aria-label="District News Page">
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          District not found
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" role="main" aria-label="District News Page">
      <h1 style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        District News - {districtName}
      </h1>
      <DistrictNewsSlug districtSlug={districtSlug} />
    </main>
  )
}
