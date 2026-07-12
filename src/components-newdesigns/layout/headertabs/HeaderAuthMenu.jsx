import { useContext, useEffect, useRef, useState } from "react";
import { LogIn, User, Settings, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { LanguageContext } from "../../../context/LanguageContext";
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
  MobileLoginButton,
} from "./Header.styles";

export default function HeaderAuthMenu({ variant = "desktop" }) {
  const { language } = useContext(LanguageContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const userId = Cookies.get("userId");
  const username = Cookies.get("UserName");
  const email = Cookies.get("Email");
  const phone = Cookies.get("Phone");
  const cleanPhone = phone ? phone.slice(-10) : null;

  const getLoginText = () => {
    const loginTranslations = {
      English: "Login",
      Kannada: "ಲಾಗಿನ್",
      Hindi: "लॉगिन",
    };
    return loginTranslations[language] || "Login";
  };

  const getLogoutText = () => {
    const logoutTranslations = {
      English: "Logout",
      Kannada: "ಲಾಗ್ ಔಟ್",
      Hindi: "लॉगआउट",
    };
    return logoutTranslations[language] || "Logout";
  };

  const getSettingsText = () => {
    const settingsTranslations = {
      English: "Settings",
      Kannada: "ಸೆಟ್ಟಿಂಗ್ಸ್",
      Hindi: "सेटिंग्स",
    };
    return settingsTranslations[language] || "Settings";
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("accessToken");
    Cookies.remove("Phone");
    Cookies.remove("UserName");
    Cookies.remove("Email");
    setIsProfileDropdownOpen(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileDropdownOpen]);

  const langClass =
    language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

  if (userId) {
    return (
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
            className={langClass}
          >
            <Settings />
            {getSettingsText()}
          </DropdownLink>

          <DropdownItem onClick={handleLogout} className={langClass}>
            <LogOut />
            {getLogoutText()}
          </DropdownItem>
        </DropdownMenu>
      </ProfileContainer>
    );
  }

  if (variant === "mobile") {
    return (
      <MobileLoginButton to="/signin" className={langClass}>
        <LogIn style={{ width: "16px", height: "16px", marginRight: "4px" }} />
        {getLoginText()}
      </MobileLoginButton>
    );
  }

  return (
    <LoginButton to="/signin" className={langClass}>
      <LogIn style={{ width: "16px", height: "16px", marginRight: "4px" }} />
      {getLoginText()}
    </LoginButton>
  );
}
