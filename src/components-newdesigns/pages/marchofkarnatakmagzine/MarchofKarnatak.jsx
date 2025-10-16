import React, { useEffect, useContext } from 'react'
import MarchKarnataka from '../../components/marchofkarnatakmagzine/MarchKarnataka'
import { LanguageContext } from '../../../context/LanguageContext'

export default function MarchofKarnatakMagzine() {
  const { setPageLanguage } = useContext(LanguageContext);

  useEffect(() => {
    // Automatically set to English when this page loads
    setPageLanguage("magazine2");
  }, []);

  return (
    <div>
        <MarchKarnataka />
    </div>
  )
}

