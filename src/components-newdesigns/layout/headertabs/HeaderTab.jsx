import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  HeaderContainer,
  Container,
  HeaderContent,
  MobileMenuButton,
  DesktopNav,
  NavItem,
  NavLinkStyled,
  ActiveIndicator,
  LoginButton,
  MobileNav,
  MobileNavContent,
  MobileNavItem,
  MobileNavLink,
  Overlay,
  SidebarHeader,
  CloseButton,
} from "./Header.styles";
import Cookies from "js-cookie";

const HeaderTab = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const userId = Cookies.get("userId");

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
      name: "State", 
      path: "/state",
      translations: {
        English: "State",
        Kannada: "ರಾಜ್ಯ",
        Hindi: "राज्य"
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
      name: "Special news", 
      path: "/specialnews",
      translations: {
        English: "Special News",
        Kannada: "ವಿಶೇಷ ಸುದ್ದಿ",
        Hindi: "विशेष समाचार"
      }
    },
    { 
      name: "News", 
      path: "/news",
      translations: {
        English: "News",
        Kannada: "ಸುದ್ದಿ",
        Hindi: "समाचार"
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
    }
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

  // Get translated Login text
  const getLoginText = () => {
    const loginTranslations = {
      English: "Login",
      Kannada: "ಲಾಗಿನ್",
      Hindi: "लॉगिन"
    };
    return loginTranslations[language] || "Login";
  };
  const handleLogout = () => {
    Cookies.remove("userId");
    window.location.href = "/";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
                <NavLinkStyled
                  to={item.path}
                  className={`${isTabActive(item.path) ? "active" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                  aria-current={isTabActive(item.path) ? "page" : undefined}
                >
                  {getTranslatedName(item)}
                  {isTabActive(item.path) && <ActiveIndicator aria-hidden="true" />}
                </NavLinkStyled>
              </NavItem>
            ))}
          </DesktopNav>

          {/* Login Button */}
            {userId ? (
          <LoginButton as="button" onClick={handleLogout}>
            Logout
          </LoginButton>
        ) : (
          <LoginButton 
            to="/signin"
            className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
          >
            {getLoginText()}
          </LoginButton>
        )}
          
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
                  <MobileNavLink
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`${isTabActive(item.path) ? "active" : ""} ${language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}`}
                    aria-current={isTabActive(item.path) ? "page" : undefined}
                  >
                    {getTranslatedName(item)}
                  </MobileNavLink>
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
