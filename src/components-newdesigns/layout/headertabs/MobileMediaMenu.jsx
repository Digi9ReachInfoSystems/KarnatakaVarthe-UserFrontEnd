import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  MobileDistrictSubmenu,
  MobileDistrictList,
  MobileDistrictItem,
  MobileDistrictLink,
} from "./Header.styles";
import { MEDIA_ITEMS } from "./MediaDropdown";

const MobileMediaMenu = ({ isOpen, onMediaSelect }) => {
  const { language } = useContext(LanguageContext);
  const textClass =
    language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

  return (
    <MobileDistrictSubmenu isOpen={isOpen}>
      <MobileDistrictList>
        {MEDIA_ITEMS.map((item) => (
          <MobileDistrictItem key={item.path}>
            {item.path.includes("#") ? (
              <MobileDistrictLink
                as={Link}
                to={item.path}
                end
                onClick={onMediaSelect}
                className={() => textClass}
              >
                {item.translations[language] || item.translations.English}
              </MobileDistrictLink>
            ) : (
              <MobileDistrictLink
                to={item.path}
                end
                onClick={onMediaSelect}
                className={({ isActive }) =>
                  [isActive ? "active" : "", textClass].filter(Boolean).join(" ")
                }
              >
                {item.translations[language] || item.translations.English}
              </MobileDistrictLink>
            )}
          </MobileDistrictItem>
        ))}
      </MobileDistrictList>
    </MobileDistrictSubmenu>
  );
};

export default MobileMediaMenu;
