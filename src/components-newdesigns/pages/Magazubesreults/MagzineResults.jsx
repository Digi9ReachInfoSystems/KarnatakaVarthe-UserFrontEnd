import React, { useEffect, useContext } from 'react'
import VarthaJanapada from '../../components/magazinesvarthapage/VarthaJanapada'
import { LanguageContext } from '../../../context/LanguageContext'

export default function MagazinesVartha() {
  const { setPageLanguage } = useContext(LanguageContext);

  useEffect(() => {
    // Automatically set to Kannada when this page loads
    setPageLanguage("magazine");
  }, []);

  return (
    <div>
        <VarthaJanapada />
    </div>
  )
}
