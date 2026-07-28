import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  HeaderContainer,
  Container,
  HeaderContent,
  MobileMenuButton,
  MobileHeaderAuth,
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
  MobileNavTrigger,
  MobileNavLabel,
  Overlay,
  SidebarHeader,
  CloseButton,
  ExpandIcon,
} from "./Header.styles";
import ServiceDropdown from "./ServiceDropdown";
import MediaDropdown from "./MediaDropdown";
import MagazinesDropdown from "./MagazinesDropdown";
import NewsDropdown from "./NewsDropdown";
import MobileServiceMenu from "./MobileServiceMenu";
import MobileMediaMenu from "./MobileMediaMenu";
import MobileMagazinesMenu from "./MobileMagazinesMenu";
import MobileNewsMenu from "./MobileNewsMenu";
import HeaderAuthMenu from "./HeaderAuthMenu";

const HeaderTab = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const [isMagazinesDropdownOpen, setIsMagazinesDropdownOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const [isMobileServiceMenuOpen, setIsMobileServiceMenuOpen] = useState(false);
  const [isMobileMediaMenuOpen, setIsMobileMediaMenuOpen] = useState(false);
  const [isMobileMagazinesMenuOpen, setIsMobileMagazinesMenuOpen] = useState(false);
  const [isMobileNewsMenuOpen, setIsMobileNewsMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const serviceDropdownRef = useRef(null);
  const serviceNavItemRef = useRef(null);
  const mediaDropdownRef = useRef(null);
  const mediaNavItemRef = useRef(null);
  const magazinesDropdownRef = useRef(null);
  const magazinesNavItemRef = useRef(null);
  const newsDropdownRef = useRef(null);
  const newsNavItemRef = useRef(null);
  const serviceHoverTimeoutRef = useRef(null);
  const mediaHoverTimeoutRef = useRef(null);
  const magazinesHoverTimeoutRef = useRef(null);
  const newsHoverTimeoutRef = useRef(null);

  // Navigation items with translations
  const navItems = [
    { 
      name: "Home", 
      path: "/",
      translations: {
        English: "Home",
        Kannada: "ಹೋಮ್",
        Hindi: "होम"
      }
    },
    { 
      name: "CM Events", 
      path: "/specialnews",
      translations: {
        English: "CM Events",
        Kannada: "ಸಿಎಂ ಕಾರ್ಯಕ್ರಮಗಳು",
        Hindi: "सीएम कार्यक्रम"
      }
    },
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
      name: "News",
      path: "/news-menu",
      clickable: false,
      translations: {
        English: "News",
        Kannada: "ಸುದ್ದಿ",
        Hindi: "समाचार"
      }
    },
    {
      name: "Magazines",
      path: "/magazines",
      clickable: false,
      translations: {
        English: "Magazines",
        Kannada: "ಮ್ಯಾಗಜೀನ್‌ಗಳು",
        Hindi: "पत्रिकाएँ"
      }
    },
    {
      name: "Our Services",
      path: "/ourservice",
      clickable: false,
      translations: {
        English: "Our Services",
        Kannada: "ನಮ್ಮ ಸೇವೆಗಳು",
        Hindi: "हमारी सेवाएँ"
      }
    },
    {
      name: "Media",
      path: "/media",
      clickable: false,
      translations: {
        English: "Media",
        Kannada: "ಮೀಡಿಯಾ",
        Hindi: "मीडिया"
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
    setIsMobileServiceMenuOpen(false);
    setIsMobileMediaMenuOpen(false);
    setIsMobileMagazinesMenuOpen(false);
    setIsMobileNewsMenuOpen(false);
  };

  const handleMobileServiceSelect = () => {
    setIsMobileServiceMenuOpen(false);
    closeMobileMenu();
  };

  const handleMobileMediaSelect = () => {
    setIsMobileMediaMenuOpen(false);
    closeMobileMenu();
  };

  const handleMobileMagazineSelect = () => {
    setIsMobileMagazinesMenuOpen(false);
    closeMobileMenu();
  };

  const handleMobileNewsSelect = () => {
    setIsMobileNewsMenuOpen(false);
    closeMobileMenu();
  };

  const toggleMobileServiceMenu = (e) => {
    e.preventDefault();
    setIsMobileServiceMenuOpen(!isMobileServiceMenuOpen);
    setIsMobileMediaMenuOpen(false);
    setIsMobileMagazinesMenuOpen(false);
    setIsMobileNewsMenuOpen(false);
  };

  const toggleMobileMediaMenu = (e) => {
    e.preventDefault();
    setIsMobileMediaMenuOpen(!isMobileMediaMenuOpen);
    setIsMobileServiceMenuOpen(false);
    setIsMobileMagazinesMenuOpen(false);
    setIsMobileNewsMenuOpen(false);
  };

  const toggleMobileMagazinesMenu = (e) => {
    e.preventDefault();
    setIsMobileMagazinesMenuOpen(!isMobileMagazinesMenuOpen);
    setIsMobileServiceMenuOpen(false);
    setIsMobileMediaMenuOpen(false);
    setIsMobileNewsMenuOpen(false);
  };

  const toggleMobileNewsMenu = (e) => {
    e.preventDefault();
    setIsMobileNewsMenuOpen(!isMobileNewsMenuOpen);
    setIsMobileServiceMenuOpen(false);
    setIsMobileMediaMenuOpen(false);
    setIsMobileMagazinesMenuOpen(false);
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
    // Hash section links (Videos / Shorts) should never show active styling
    if (typeof itemPath === "string" && itemPath.includes("#")) {
      return false;
    }
    if (itemPath === "/news-menu") {
      return (
        location.pathname === "/news" ||
        location.pathname.startsWith("/newsdetails") ||
        location.pathname === "/state" ||
        location.pathname.startsWith("/district")
      );
    }
    if (itemPath === "/magazines") {
      return (
        location.pathname === "/magazinesvartha" ||
        location.pathname === "/marchofkarnatakmagzine" ||
        location.pathname.startsWith("/specialpublication")
      );
    }
    if (itemPath === "/ourservice") {
      return false;
    }
    if (itemPath === "/") {
      return location.pathname === "/";
    }
    if (itemPath === "/marchofkarnataka") {
      return location.pathname === "/marchofkarnataka";
    }
    return location.pathname === itemPath;
  };

  // Avoid React Router NavLink auto-active on to="#" dropdown triggers
  const getMobileLinkClassName = (itemPath) => () =>
    [
      isTabActive(itemPath) ? "active" : "",
      language === "Kannada" || language === "Hindi" ? "kannada-text" : "",
    ]
      .filter(Boolean)
      .join(" ");

  const handleServiceMouseEnter = () => {
    if (serviceHoverTimeoutRef.current) {
      clearTimeout(serviceHoverTimeoutRef.current);
    }
    setIsServiceDropdownOpen(true);
    setIsMediaDropdownOpen(false);
    setIsMagazinesDropdownOpen(false);
    setIsNewsDropdownOpen(false);
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

  const handleMediaMouseEnter = () => {
    if (mediaHoverTimeoutRef.current) {
      clearTimeout(mediaHoverTimeoutRef.current);
    }
    setIsMediaDropdownOpen(true);
    setIsServiceDropdownOpen(false);
    setIsMagazinesDropdownOpen(false);
    setIsNewsDropdownOpen(false);
  };

  const handleMediaMouseLeave = () => {
    mediaHoverTimeoutRef.current = setTimeout(() => {
      setIsMediaDropdownOpen(false);
    }, 200);
  };

  const handleMediaClick = () => {
    if (window.innerWidth < 1026) {
      setIsMediaDropdownOpen(!isMediaDropdownOpen);
    }
  };

  const handleMagazinesMouseEnter = () => {
    if (magazinesHoverTimeoutRef.current) {
      clearTimeout(magazinesHoverTimeoutRef.current);
    }
    setIsMagazinesDropdownOpen(true);
    setIsServiceDropdownOpen(false);
    setIsMediaDropdownOpen(false);
    setIsNewsDropdownOpen(false);
  };

  const handleMagazinesMouseLeave = () => {
    magazinesHoverTimeoutRef.current = setTimeout(() => {
      setIsMagazinesDropdownOpen(false);
    }, 200);
  };

  const handleMagazinesClick = () => {
    if (window.innerWidth < 1026) {
      setIsMagazinesDropdownOpen(!isMagazinesDropdownOpen);
    }
  };

  const handleNewsMouseEnter = () => {
    if (newsHoverTimeoutRef.current) {
      clearTimeout(newsHoverTimeoutRef.current);
    }
    setIsNewsDropdownOpen(true);
    setIsServiceDropdownOpen(false);
    setIsMediaDropdownOpen(false);
    setIsMagazinesDropdownOpen(false);
  };

  const handleNewsMouseLeave = () => {
    newsHoverTimeoutRef.current = setTimeout(() => {
      setIsNewsDropdownOpen(false);
    }, 200);
  };

  const handleNewsClick = () => {
    if (window.innerWidth < 1026) {
      setIsNewsDropdownOpen(!isNewsDropdownOpen);
    } else {
      setIsNewsDropdownOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target) &&
        serviceNavItemRef.current &&
        !serviceNavItemRef.current.contains(event.target)
      ) {
        setIsServiceDropdownOpen(false);
      }

      if (
        mediaDropdownRef.current &&
        !mediaDropdownRef.current.contains(event.target) &&
        mediaNavItemRef.current &&
        !mediaNavItemRef.current.contains(event.target)
      ) {
        setIsMediaDropdownOpen(false);
      }

      if (
        magazinesDropdownRef.current &&
        !magazinesDropdownRef.current.contains(event.target) &&
        magazinesNavItemRef.current &&
        !magazinesNavItemRef.current.contains(event.target)
      ) {
        setIsMagazinesDropdownOpen(false);
      }

      if (
        newsDropdownRef.current &&
        !newsDropdownRef.current.contains(event.target) &&
        newsNavItemRef.current &&
        !newsNavItemRef.current.contains(event.target)
      ) {
        setIsNewsDropdownOpen(false);
      }
    };

    if (
      isServiceDropdownOpen ||
      isMediaDropdownOpen ||
      isMagazinesDropdownOpen ||
      isNewsDropdownOpen
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (serviceHoverTimeoutRef.current) {
        clearTimeout(serviceHoverTimeoutRef.current);
      }
      if (mediaHoverTimeoutRef.current) {
        clearTimeout(mediaHoverTimeoutRef.current);
      }
      if (magazinesHoverTimeoutRef.current) {
        clearTimeout(magazinesHoverTimeoutRef.current);
      }
      if (newsHoverTimeoutRef.current) {
        clearTimeout(newsHoverTimeoutRef.current);
      }
    };
  }, [
    isServiceDropdownOpen,
    isMediaDropdownOpen,
    isMagazinesDropdownOpen,
    isNewsDropdownOpen,
  ]);

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

          <MobileHeaderAuth>
            <HeaderAuthMenu variant="mobile" />
          </MobileHeaderAuth>

          {/* Desktop Navigation */}
          <DesktopNav aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavItem key={item.path}>
                {item.path === "/news-menu" ? (
                  <div
                    ref={newsNavItemRef}
                    onMouseEnter={handleNewsMouseEnter}
                    onMouseLeave={handleNewsMouseLeave}
                    style={{ position: "relative", display: "inline-flex", justifyContent: "center" }}
                  >
                    <ServiceNavTrigger
                      as={Link}
                      to="/news"
                      onClick={handleNewsClick}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                          handleNewsClick();
                        }
                      }}
                      className={`${isNewsDropdownOpen || isTabActive(item.path) ? "open" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                      aria-expanded={isNewsDropdownOpen}
                      aria-haspopup="true"
                    >
                      {getTranslatedName(item)}
                      {isTabActive(item.path) && <ActiveIndicator aria-hidden="true" />}
                    </ServiceNavTrigger>
                    <NewsDropdown
                      ref={newsDropdownRef}
                      isOpen={isNewsDropdownOpen}
                      onClose={() => setIsNewsDropdownOpen(false)}
                      onMouseEnter={handleNewsMouseEnter}
                      onMouseLeave={handleNewsMouseLeave}
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
                ) : item.path === "/magazines" ? (
                  <div
                    ref={magazinesNavItemRef}
                    onMouseEnter={handleMagazinesMouseEnter}
                    onMouseLeave={handleMagazinesMouseLeave}
                    style={{ position: "relative", display: "inline-flex", justifyContent: "center" }}
                  >
                    <ServiceNavTrigger
                      role="button"
                      tabIndex={0}
                      onClick={handleMagazinesClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleMagazinesClick();
                        }
                      }}
                      className={`${isMagazinesDropdownOpen || isTabActive(item.path) ? "open" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                      aria-expanded={isMagazinesDropdownOpen}
                      aria-haspopup="true"
                    >
                      {getTranslatedName(item)}
                      {isTabActive(item.path) && <ActiveIndicator aria-hidden="true" />}
                    </ServiceNavTrigger>
                    <MagazinesDropdown
                      ref={magazinesDropdownRef}
                      isOpen={isMagazinesDropdownOpen}
                      onClose={() => setIsMagazinesDropdownOpen(false)}
                      onMouseEnter={handleMagazinesMouseEnter}
                      onMouseLeave={handleMagazinesMouseLeave}
                    />
                  </div>
                ) : item.path === "/media" ? (
                  <div
                    ref={mediaNavItemRef}
                    onMouseEnter={handleMediaMouseEnter}
                    onMouseLeave={handleMediaMouseLeave}
                    style={{ position: "relative", display: "inline-flex", justifyContent: "center" }}
                  >
                    <ServiceNavTrigger
                      role="button"
                      tabIndex={0}
                      onClick={handleMediaClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleMediaClick();
                        }
                      }}
                      className={`${isMediaDropdownOpen || isTabActive(item.path) ? "open" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                      aria-expanded={isMediaDropdownOpen}
                      aria-haspopup="true"
                    >
                      {getTranslatedName(item)}
                      {isTabActive(item.path) && <ActiveIndicator aria-hidden="true" />}
                    </ServiceNavTrigger>
                    <MediaDropdown
                      ref={mediaDropdownRef}
                      isOpen={isMediaDropdownOpen}
                      onClose={() => setIsMediaDropdownOpen(false)}
                      onMouseEnter={handleMediaMouseEnter}
                      onMouseLeave={handleMediaMouseLeave}
                    />
                  </div>
                ) : item.clickable === false ? (
                  <NavLabel
                    className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                  >
                    {getTranslatedName(item)}
                  </NavLabel>
                ) : item.external ? (
                  <NavLinkStyled
                    as="a"
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                  >
                    {getTranslatedName(item)}
                  </NavLinkStyled>
                ) : item.path.includes("#") ? (
                  <NavLinkStyled
                    as={Link}
                    to={item.path}
                    className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                  >
                    {getTranslatedName(item)}
                  </NavLinkStyled>
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
                  {item.path === "/news-menu" ? (
                    <>
                      <MobileNavTrigger
                        type="button"
                        onClick={toggleMobileNewsMenu}
                        className={
                          language === "Kannada" || language === "Hindi" ? "kannada-text" : ""
                        }
                        aria-expanded={isMobileNewsMenuOpen}
                        style={{ position: "relative", justifyContent: "center" }}
                      >
                        <span style={{ textAlign: "center" }}>{getTranslatedName(item)}</span>
                        <ExpandIcon isOpen={isMobileNewsMenuOpen} style={{ position: "absolute", right: "12px" }}>
                          <ChevronDown size={18} />
                        </ExpandIcon>
                      </MobileNavTrigger>
                      <MobileNewsMenu
                        isOpen={isMobileNewsMenuOpen}
                        onNewsSelect={handleMobileNewsSelect}
                      />
                    </>
                  ) : item.path === "/ourservice" ? (
                    <>
                      <MobileNavTrigger
                        type="button"
                        onClick={toggleMobileServiceMenu}
                        className={
                          language === "Kannada" || language === "Hindi" ? "kannada-text" : ""
                        }
                        aria-expanded={isMobileServiceMenuOpen}
                        style={{ position: "relative", justifyContent: "center" }}
                      >
                        <span style={{ textAlign: "center" }}>{getTranslatedName(item)}</span>
                        <ExpandIcon isOpen={isMobileServiceMenuOpen} style={{ position: "absolute", right: "12px" }}>
                          <ChevronDown size={18} />
                        </ExpandIcon>
                      </MobileNavTrigger>
                      <MobileServiceMenu
                        isOpen={isMobileServiceMenuOpen}
                        onServiceSelect={handleMobileServiceSelect}
                      />
                    </>
                  ) : item.path === "/magazines" ? (
                    <>
                      <MobileNavTrigger
                        type="button"
                        onClick={toggleMobileMagazinesMenu}
                        className={
                          language === "Kannada" || language === "Hindi" ? "kannada-text" : ""
                        }
                        aria-expanded={isMobileMagazinesMenuOpen}
                        style={{ position: "relative", justifyContent: "center" }}
                      >
                        <span style={{ textAlign: "center" }}>{getTranslatedName(item)}</span>
                        <ExpandIcon isOpen={isMobileMagazinesMenuOpen} style={{ position: "absolute", right: "12px" }}>
                          <ChevronDown size={18} />
                        </ExpandIcon>
                      </MobileNavTrigger>
                      <MobileMagazinesMenu
                        isOpen={isMobileMagazinesMenuOpen}
                        onMagazineSelect={handleMobileMagazineSelect}
                      />
                    </>
                  ) : item.path === "/media" ? (
                    <>
                      <MobileNavTrigger
                        type="button"
                        onClick={toggleMobileMediaMenu}
                        className={
                          language === "Kannada" || language === "Hindi" ? "kannada-text" : ""
                        }
                        aria-expanded={isMobileMediaMenuOpen}
                        style={{ position: "relative", justifyContent: "center" }}
                      >
                        <span style={{ textAlign: "center" }}>{getTranslatedName(item)}</span>
                        <ExpandIcon isOpen={isMobileMediaMenuOpen} style={{ position: "absolute", right: "12px" }}>
                          <ChevronDown size={18} />
                        </ExpandIcon>
                      </MobileNavTrigger>
                      <MobileMediaMenu
                        isOpen={isMobileMediaMenuOpen}
                        onMediaSelect={handleMobileMediaSelect}
                      />
                    </>
                  ) : item.clickable === false ? (
                    <MobileNavLabel
                      className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                    >
                      {getTranslatedName(item)}
                    </MobileNavLabel>
                  ) : item.external ? (
                    <MobileNavLink
                      as="a"
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                    >
                      {getTranslatedName(item)}
                    </MobileNavLink>
                  ) : item.path.includes("#") ? (
                    <MobileNavLink
                      as={Link}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={getMobileLinkClassName(item.path)}
                      aria-current={undefined}
                    >
                      {getTranslatedName(item)}
                    </MobileNavLink>
                  ) : (
                    <MobileNavLink
                      to={item.path}
                      end
                      onClick={closeMobileMenu}
                      className={getMobileLinkClassName(item.path)}
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
