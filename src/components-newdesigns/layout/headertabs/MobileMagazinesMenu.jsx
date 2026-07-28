import React, { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  MobileDistrictSubmenu,
  MobileDistrictList,
  MobileDistrictItem,
  MobileDistrictLink,
} from "./Header.styles";
import { MAGAZINES_ITEMS } from "./MagazinesDropdown";

const MobileMagazinesMenu = ({ isOpen, onMagazineSelect }) => {
  const { language } = useContext(LanguageContext);
  const textClass =
    language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

  return (
    <MobileDistrictSubmenu isOpen={isOpen}>
      <MobileDistrictList>
        {MAGAZINES_ITEMS.map((item) => (
          <MobileDistrictItem key={item.path}>
            <MobileDistrictLink
              to={item.path}
              end
              onClick={onMagazineSelect}
              className={({ isActive }) =>
                [isActive ? "active" : "", textClass].filter(Boolean).join(" ")
              }
            >
              {item.translations[language] || item.translations.English}
            </MobileDistrictLink>
          </MobileDistrictItem>
        ))}
      </MobileDistrictList>
    </MobileDistrictSubmenu>
  );
};

export default MobileMagazinesMenu;
