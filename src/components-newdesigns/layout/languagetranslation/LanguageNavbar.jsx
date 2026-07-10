import React, { useState, useEffect, useRef, useContext } from 'react';
import { Facebook, Instagram, Search, ChevronDown } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { LanguageContext } from '../../../context/LanguageContext';
import SearchModal from '../searchsection/SearchModal';
import {
  LanguageNavContainer,
  PdfLink,
  SocialIcons,
  SocialIcon,
  LanguageSelector,
  LanguageDropdown,
  Overlay,
  SearchContainer,
  SearchIcon,
  SearchText,
} from './Language.styles';
import { TopBarAuth } from '../headertabs/Header.styles';
import HeaderAuthMenu from '../headertabs/HeaderAuthMenu';
import { navaKarnatakaPdfByLang } from '../../../config/specialPublicationData';

const LanguageNavbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, setLanguage, currentMagazineType } = useContext(LanguageContext);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'kn', name: 'Kannada' },
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' }
  ];

  const getSearchText = () => {
    const searchTranslations = {
      English: "Search",
      Kannada: "ಹುಡುಕಿ",
      Hindi: "खोजें"
    };
    return searchTranslations[language] || "Search";
  };

  const pdf = navaKarnatakaPdfByLang[language] || navaKarnatakaPdfByLang.English;

  const handleLanguageSelect = (selectedLang) => {
    setLanguage(selectedLang.name, currentMagazineType);
    setIsLanguageOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const closeDropdown = () => {
    setIsLanguageOpen(false);
  };

  const openSearchModal = () => {
    setIsSearchOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isLanguageOpen]);

  return (
    <LanguageNavContainer>
      <PdfLink
        href={pdf.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Nava Karnataka 3 Years report (PDF)"
        className={language === "Kannada" || language === "Hindi" ? "kannada-text" : "english-text"}
      >
        {pdf.label}
      </PdfLink>

      <SocialIcons aria-label="Social media links">
        <SocialIcon href="https://www.instagram.com/karnatakavarthe" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
          <Instagram size={22} aria-hidden="true" />
        </SocialIcon>
        <SocialIcon href="https://www.facebook.com/KarnatakaVarthe.Official/" aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
          <Facebook size={22} aria-hidden="true" />
        </SocialIcon>
        <SocialIcon href="https://x.com/KarnatakaVarthe" aria-label="Follow us on X (Twitter)" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={22} aria-hidden="true" />
        </SocialIcon>
      </SocialIcons>

      <LanguageSelector ref={dropdownRef}>
        <button 
          className={`language-button ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""} ${language === "English" ? "english-text" : ""}`}
          onClick={toggleLanguageDropdown}
          aria-label={`Current language: ${language}. Click to change`}
          aria-expanded={isLanguageOpen}
          aria-haspopup="true"
        >
          {language}
          <ChevronDown size={16} className="arrow" aria-hidden="true" />
        </button>
        {isLanguageOpen && (
          <>
            <Overlay onClick={closeDropdown} aria-hidden="true" />
            <LanguageDropdown role="menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`${language === lang.name ? 'active' : ''} ${lang.name === "Kannada" || lang.name === "Hindi" ? 'kannada-text' : ''} ${lang.name === "English" ? 'english-text' : ''}`}
                  role="menuitem"
                  aria-label={`Select ${lang.name}`}
                >
                  {lang.name}
                </button>
              ))}
            </LanguageDropdown>
          </>
        )}
      </LanguageSelector>

      <SearchContainer 
        aria-label="Search" 
        role="button" 
        tabIndex={0}
        onClick={openSearchModal}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openSearchModal();
          }
        }}
      >
        <SearchIcon>
          <Search size={20} />
        </SearchIcon>
        <SearchText className={language === "Kannada" || language === "Hindi" ? "kannada-text" : language === "English" ? "english-text" : ""}>
          {getSearchText()}
        </SearchText>
      </SearchContainer>

      <TopBarAuth>
        <HeaderAuthMenu />
      </TopBarAuth>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} />
    </LanguageNavContainer>
  );
};

export default LanguageNavbar;
