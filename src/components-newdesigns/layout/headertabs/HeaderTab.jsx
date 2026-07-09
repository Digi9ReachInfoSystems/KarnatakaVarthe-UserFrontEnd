import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  HeaderContainer,
  Container,
  HeaderContent,
  MobileMenuButton,
  DesktopNav,
  NavItem,
  NavLinkStyled,
  NavLabel,
  ServiceNavTrigger,
  ActiveIndicator,
  MobileNav,
  MobileNavContent,
  MobileNavItem,
  MobileNavLink,
  MobileNavLabel,
  Overlay,
  SidebarHeader,
  CloseButton,
  ExpandIcon,
} from "./Header.styles";
import DistrictDropdown from "./DistrictDropdown";
import ServiceDropdown from "./ServiceDropdown";
import MobileDistrictMenu from "./MobileDistrictMenu";
import MobileServiceMenu from "./MobileServiceMenu";

const HeaderTab = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isMobileDistrictMenuOpen, setIsMobileDistrictMenuOpen] = useState(false);
  const [isMobileServiceMenuOpen, setIsMobileServiceMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const districtDropdownRef = useRef(null);
  const districtNavItemRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const serviceNavItemRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const serviceHoverTimeoutRef = useRef(null);

  // Navigation items with translations
  const navItems = [
    { 
      name: "Vartha Janapada", 
      path: "/",
      translations: {
        English: "Vartha Janapada",
        Kannada: "ವಾರ್ತಾ ಜನಪದ",
        Hindi: "वार्ता जनपद"
      }
    },
    { 
      name: "March of karnataka", 
      path: "/marchofkarnataka",
      translations: {
        English: "March of Karnataka",
        Kannada: "March of Karnataka", // Keep English by default, translate only when tab is active
        Hindi: "March of Karnataka"
      }
    },   
    
    { 
      name: "CMO Events", 
      path: "/specialnews",
      translations: {
        English: "CMO Events",
        Kannada: "ಸಿಎಮೊ ಇವೆಂಟ್ಸ್",
        Hindi: "सीएमओ इवेंट्स"
      }
    },
    //Article tab
    { 
      name: "Articles",
      path: "/articles",
      translations: {
        English: "Articles",
        Kannada: "ಲೇಖನಗಳು",
        Hindi: "लेख"
      }
    },
    { 
      name: "District news", 
      path: "/district",
      translations: {
        English: "District News",
        Kannada: "ಜಿಲ್ಲಾ ಸುದ್ದಿ",
        Hindi: "जिला समाचार"
      }
    },
    { 
      name: "State", 
      path: "/state",
      translations: {
        English: "State",
        Kannada: "ರಾಜ್ಯ",
        Hindi: "राज्य"
      }
    },
    
 //All News tab
    { 
      name: "All News",
      path: "/news",
      translations: {
        English: "All News",
        Kannada: "ಸುದ್ದಿಗಳು",
        Hindi: "सभी समाचार"
      }
    },
    {
      name: "Our Service",
      path: "/ourservice",
      clickable: false,
      translations: {
        English: "Our Service",
        Kannada: "ಅವರ್ ಸರ್ವಿಸ್",
        Hindi: "आवर सर्विस"
      }
    },
    {
      name: "Special Publication",
      path: "/specialpublication",
      translations: {
        English: "Special Publication",
        Kannada: "ಸ್ಪೆಷಲ್ ಪಬ್ಲಿಕೇಶನ್",
        Hindi: "स्पेशल पब्लिकेशन"
      }
    },
    { 
      name: "Videos", 
      path: "/videos",
      translations: {
        English: "Videos",
        Kannada: "ವೀಡಿಯೋಗಳು",
        Hindi: "वीडियो"
      }
    },
    { 
      name: "Shorts",
      path: "/shorts",
      translations: {
        English: "Shorts",
        Kannada: "ಶಾರ್ಟ್ಸ್",
        Hindi: "शॉर्ट्स"
      }
    },
    { 
      name: "Photos",
      path: "/photos",
      translations: {
        English: "Photos",
        Kannada: "ಫೋಟೋಗಳು",
        Hindi: "फोटो"
      }
    },
    
  ];

  // Get translated name for nav item
  const getTranslatedName = (item) => {
    // For March of Karnataka, only translate when that tab is active
    if (item.path === "/marchofkarnataka" && isTabActive(item.path)) {
      if (language === "Kannada") {
        return "ಮಾರ್ಚ್ ಆಫ್ ಕರ್ನಾಟಕ";
      } else if (language === "Hindi") {
        return "मार्च ऑफ़ कर्नाटक";
      }
    }
    
    // For other items, translate normally
    return item.translations[language] || item.translations.English || item.name;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileDistrictMenuOpen(false);
  };

  // Toggle mobile district menu
  const toggleMobileDistrictMenu = (e) => {
    e.preventDefault();
    setIsMobileDistrictMenuOpen(!isMobileDistrictMenuOpen);
  };

  // Handle district selection in mobile menu
  const handleMobileDistrictSelect = () => {
    setIsMobileDistrictMenuOpen(false);
    closeMobileMenu();
  };

  const handleMobileServiceSelect = () => {
    setIsMobileServiceMenuOpen(false);
    closeMobileMenu();
  };

  const toggleMobileServiceMenu = (e) => {
    e.preventDefault();
    setIsMobileServiceMenuOpen(!isMobileServiceMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Check if tab should be active
  const isTabActive = (itemPath) => {
    if (itemPath === "/") {
      return location.pathname === "/" || location.pathname === "/magazinesvartha";
    }
    if (itemPath === "/marchofkarnataka") {
      return location.pathname === "/marchofkarnataka" || location.pathname === "/marchofkarnatakmagzine";
    }
    return location.pathname === itemPath;
  };

  // Handle district dropdown hover
  const handleDistrictMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsDistrictDropdownOpen(true);
    setIsServiceDropdownOpen(false);
  };

  const handleDistrictMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDistrictDropdownOpen(false);
    }, 200); // Small delay to prevent flickering
  };

  // Handle mobile click for district dropdown
  const handleDistrictClick = (e) => {
    if (window.innerWidth < 1026) {
      e.preventDefault();
      setIsDistrictDropdownOpen(!isDistrictDropdownOpen);
    }
  };

  const handleServiceMouseEnter = () => {
    if (serviceHoverTimeoutRef.current) {
      clearTimeout(serviceHoverTimeoutRef.current);
    }
    setIsServiceDropdownOpen(true);
    setIsDistrictDropdownOpen(false);
  };

  const handleServiceMouseLeave = () => {
    serviceHoverTimeoutRef.current = setTimeout(() => {
      setIsServiceDropdownOpen(false);
    }, 200);
  };

  const handleServiceClick = () => {
    if (window.innerWidth < 1026) {
      setIsServiceDropdownOpen(!isServiceDropdownOpen);
    }
  };

  // Close district dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        districtDropdownRef.current &&
        !districtDropdownRef.current.contains(event.target) &&
        districtNavItemRef.current &&
        !districtNavItemRef.current.contains(event.target)
      ) {
        setIsDistrictDropdownOpen(false);
      }

      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target) &&
        serviceNavItemRef.current &&
        !serviceNavItemRef.current.contains(event.target)
      ) {
        setIsServiceDropdownOpen(false);
      }
    };

    if (isDistrictDropdownOpen || isServiceDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (serviceHoverTimeoutRef.current) {
        clearTimeout(serviceHoverTimeoutRef.current);
      }
    };
  }, [isDistrictDropdownOpen, isServiceDropdownOpen]);

  return (
    <HeaderContainer role="navigation" aria-label="Main navigation">
      <Container>
        <HeaderContent>
          {/* Mobile menu button */}
          <MobileMenuButton
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </MobileMenuButton>

          {/* Desktop Navigation */}
          <DesktopNav aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavItem key={item.path}>
                {item.path === "/district" ? (
                  <div
                    ref={districtNavItemRef}
                    onMouseEnter={handleDistrictMouseEnter}
                    onMouseLeave={handleDistrictMouseLeave}
                    style={{ position: 'relative' }}
                  >
                    <NavLinkStyled
                      to={item.path}
                      onClick={handleDistrictClick}
                      className={`${isTabActive(item.path) ? "active" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                      aria-current={isTabActive(item.path) ? "page" : undefined}
                    >
                      {getTranslatedName(item)}
                      {isTabActive(item.path) && <ActiveIndicator aria-hidden="true" />}
                    </NavLinkStyled>
                    <DistrictDropdown
                      ref={districtDropdownRef}
                      isOpen={isDistrictDropdownOpen}
                      onClose={() => setIsDistrictDropdownOpen(false)}
                      onMouseEnter={handleDistrictMouseEnter}
                      onMouseLeave={handleDistrictMouseLeave}
                    />
                  </div>
                ) : item.path === "/ourservice" ? (
                  <div
                    ref={serviceNavItemRef}
                    onMouseEnter={handleServiceMouseEnter}
                    onMouseLeave={handleServiceMouseLeave}
                    style={{ position: "relative", display: "inline-flex", justifyContent: "center" }}
                  >
                    <ServiceNavTrigger
                      role="button"
                      tabIndex={0}
                      onClick={handleServiceClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleServiceClick();
                        }
                      }}
                      className={`${isServiceDropdownOpen ? "open" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                      aria-expanded={isServiceDropdownOpen}
                      aria-haspopup="true"
                    >
                      {getTranslatedName(item)}
                    </ServiceNavTrigger>
                    <ServiceDropdown
                      ref={serviceDropdownRef}
                      isOpen={isServiceDropdownOpen}
                      onClose={() => setIsServiceDropdownOpen(false)}
                      onMouseEnter={handleServiceMouseEnter}
                      onMouseLeave={handleServiceMouseLeave}
                    />
                  </div>
                ) : item.clickable === false ? (
                  <NavLabel
                    className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                  >
                    {getTranslatedName(item)}
                  </NavLabel>
                ) : (
                  <NavLinkStyled
                    to={item.path}
                    className={`${isTabActive(item.path) ? "active" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                    aria-current={isTabActive(item.path) ? "page" : undefined}
                  >
                    {getTranslatedName(item)}
                    {isTabActive(item.path) && <ActiveIndicator aria-hidden="true" />}
                  </NavLinkStyled>
                )}
              </NavItem>
            ))}
          </DesktopNav>
        </HeaderContent>

          {/* Mobile Navigation Sidebar */}
        <>
          <Overlay isOpen={isMobileMenuOpen} onClick={closeMobileMenu} aria-hidden="true" />
          <MobileNav isOpen={isMobileMenuOpen} aria-label="Mobile navigation">
            <SidebarHeader>
              <CloseButton onClick={closeMobileMenu} aria-label="Close menu">
                <X size={24} aria-hidden="true" />
              </CloseButton>
            </SidebarHeader>
            <MobileNavContent>
              {navItems.map((item) => (
                <MobileNavItem key={item.path}>
                  {item.path === "/district" ? (
                    <>
                      <MobileNavLink
                        to={item.path}
                        onClick={toggleMobileDistrictMenu}
                        className={`${isTabActive(item.path) ? "active" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                        aria-current={isTabActive(item.path) ? "page" : undefined}
                        style={{ position: 'relative', justifyContent: 'center' }}
                      >
                        <span style={{ textAlign: 'center' }}>{getTranslatedName(item)}</span>
                        <ExpandIcon isOpen={isMobileDistrictMenuOpen} style={{ position: 'absolute', right: '16px' }}>
                          <ChevronDown size={18} />
                        </ExpandIcon>
                      </MobileNavLink>
                      <MobileDistrictMenu
                        isOpen={isMobileDistrictMenuOpen}
                        onDistrictSelect={handleMobileDistrictSelect}
                      />
                    </>
                  ) : item.path === "/ourservice" ? (
                    <>
                      <MobileNavLink
                        to="#"
                        onClick={toggleMobileServiceMenu}
                        className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                        style={{ position: "relative", justifyContent: "center" }}
                      >
                        <span style={{ textAlign: "center" }}>{getTranslatedName(item)}</span>
                        <ExpandIcon isOpen={isMobileServiceMenuOpen} style={{ position: "absolute", right: "16px" }}>
                          <ChevronDown size={18} />
                        </ExpandIcon>
                      </MobileNavLink>
                      <MobileServiceMenu
                        isOpen={isMobileServiceMenuOpen}
                        onServiceSelect={handleMobileServiceSelect}
                      />
                    </>
                  ) : item.clickable === false ? (
                    <MobileNavLabel
                      className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                    >
                      {getTranslatedName(item)}
                    </MobileNavLabel>
                  ) : (
                    <MobileNavLink
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`${isTabActive(item.path) ? "active" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                      aria-current={isTabActive(item.path) ? "page" : undefined}
                    >
                      {getTranslatedName(item)}
                    </MobileNavLink>
                  )}
                </MobileNavItem>
              ))}
            </MobileNavContent>
          </MobileNav>
        </>
      </Container>
    </HeaderContainer>
  );
};

export default HeaderTab;
