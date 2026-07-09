import React, { useState, useEffect, useRef, useContext } from 'react';
import { Facebook, Instagram, Search, ChevronDown, LogIn, User, Settings, LogOut } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import Cookies from 'js-cookie';
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
import {
  LoginButton,
  ProfileContainer,
  ProfileButton,
  DropdownMenu,
  DropdownItem,
  DropdownLink,
  UserInfo,
  UserName,
  UserEmail,
} from '../headertabs/Header.styles';
import { navaKarnatakaPdfByLang } from '../../../config/specialPublicationData';

const LanguageNavbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { language, setLanguage, currentMagazineType } = useContext(LanguageContext);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const userId = Cookies.get('userId');
  const username = Cookies.get('UserName');
  const email = Cookies.get('Email');
  const phone = Cookies.get('Phone');
  const cleanPhone = phone ? phone.slice(-10) : null;

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

  const getLoginText = () => {
    const loginTranslations = {
      English: "Login",
      Kannada: "ಲಾಗಿನ್",
      Hindi: "लॉगिन"
    };
    return loginTranslations[language] || "Login";
  };

  const getLogoutText = () => {
    const logoutTranslations = {
      English: "Logout",
      Kannada: "ಲಾಗ್ ಔಟ್",
      Hindi: "लॉगआउट"
    };
    return logoutTranslations[language] || "Logout";
  };

  const getSettingsText = () => {
    const settingsTranslations = {
      English: "Settings",
      Kannada: "ಸೆಟ್ಟಿಂಗ್ಸ್",
      Hindi: "सेटिंग्स"
    };
    return settingsTranslations[language] || "Settings";
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

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('accessToken');
    Cookies.remove('Phone');
    Cookies.remove('UserName');
    Cookies.remove('Email');
    setIsProfileDropdownOpen(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isLanguageOpen || isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen, isProfileDropdownOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLanguageOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    if (isLanguageOpen || isProfileDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isLanguageOpen, isProfileDropdownOpen]);

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

      {userId ? (
        <ProfileContainer ref={profileDropdownRef}>
          <ProfileButton
            onClick={toggleProfileDropdown}
            aria-label="User profile menu"
            aria-expanded={isProfileDropdownOpen}
          >
            <User />
          </ProfileButton>

          <DropdownMenu isOpen={isProfileDropdownOpen}>
            {(username || email || phone) && (
              <UserInfo>
                {username && <UserName>{username}</UserName>}
                {email && <UserEmail>{email}</UserEmail>}
                {!email && phone && <UserEmail>{`+91 ${cleanPhone}`}</UserEmail>}
              </UserInfo>
            )}

            <DropdownLink
              to="/settings"
              onClick={() => setIsProfileDropdownOpen(false)}
              className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
            >
              <Settings />
              {getSettingsText()}
            </DropdownLink>

            <DropdownItem
              onClick={handleLogout}
              className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
            >
              <LogOut />
              {getLogoutText()}
            </DropdownItem>
          </DropdownMenu>
        </ProfileContainer>
      ) : (
        <LoginButton
          to="/signin"
          className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
        >
          <LogIn style={{ width: '16px', height: '16px', marginRight: '4px' }} />
          {getLoginText()}
        </LoginButton>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} />
    </LanguageNavContainer>
  );
};

export default LanguageNavbar;
