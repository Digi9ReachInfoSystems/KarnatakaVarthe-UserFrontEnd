import React, { useEffect, useContext } from 'react'
import VarthaJanapadasection from '../../components/varthaJanapada/VarthaJanapadasection'
import { LanguageContext } from '../../../context/LanguageContext'

export default function VarthaJanapada() {
  const { setPageLanguage } = useContext(LanguageContext);

  useEffect(() => {
    // Automatically set to Kannada when this page loads
    setPageLanguage("magazine");
    
    // Clean up when component unmounts
    return () => {
      // Reset to global language when leaving this page
      setPageLanguage(null);
    };
  }, [setPageLanguage]);

  return (
    <div>
        <VarthaJanapadasection />
    </div>
  )
}
