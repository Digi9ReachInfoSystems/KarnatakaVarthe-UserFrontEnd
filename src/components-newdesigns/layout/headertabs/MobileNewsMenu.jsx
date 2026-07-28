import React, { useContext, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  MobileDistrictSubmenu,
  MobileDistrictList,
  MobileDistrictItem,
  MobileDistrictLink,
  MobileSubmenuTrigger,
  ExpandIcon,
} from "./Header.styles";
import MobileDistrictMenu from "./MobileDistrictMenu";
import { NEWS_ITEMS } from "./NewsDropdown";

const MobileNewsMenu = ({ isOpen, onNewsSelect }) => {
  const { language } = useContext(LanguageContext);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const textClass =
    language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

  useEffect(() => {
    if (!isOpen) {
      setIsDistrictOpen(false);
    }
  }, [isOpen]);

  const toggleDistrict = (e) => {
    e.preventDefault();
    setIsDistrictOpen((prev) => !prev);
  };

  const handleDistrictSelect = () => {
    setIsDistrictOpen(false);
    onNewsSelect?.();
  };

  return (
    <MobileDistrictSubmenu isOpen={isOpen}>
      <MobileDistrictList>
        <MobileDistrictItem>
          <MobileDistrictLink
            to={NEWS_ITEMS.state.path}
            end
            onClick={onNewsSelect}
            className={({ isActive }) =>
              [isActive ? "active" : "", textClass].filter(Boolean).join(" ")
            }
          >
            {NEWS_ITEMS.state.translations[language] ||
              NEWS_ITEMS.state.translations.English}
          </MobileDistrictLink>
        </MobileDistrictItem>

        <MobileDistrictItem>
          <MobileSubmenuTrigger
            type="button"
            onClick={toggleDistrict}
            className={textClass}
            aria-expanded={isDistrictOpen}
          >
            <span style={{ textAlign: "center" }}>
              {NEWS_ITEMS.district.translations[language] ||
                NEWS_ITEMS.district.translations.English}
            </span>
            <ExpandIcon
              isOpen={isDistrictOpen}
              style={{ position: "absolute", right: "12px" }}
            >
              <ChevronDown size={16} />
            </ExpandIcon>
          </MobileSubmenuTrigger>
          <MobileDistrictMenu
            isOpen={isDistrictOpen}
            onDistrictSelect={handleDistrictSelect}
          />
        </MobileDistrictItem>
      </MobileDistrictList>
    </MobileDistrictSubmenu>
  );
};

export default MobileNewsMenu;
