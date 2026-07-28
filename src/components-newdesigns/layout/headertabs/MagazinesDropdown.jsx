import React, { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  MediaDropdownContainer,
  MediaDropdownContent,
  MediaLink,
} from "./MediaDropdown.styles";

export const MAGAZINES_ITEMS = [
  {
    name: "Vartha Janapada",
    path: "/magazinesvartha",
    translations: {
      English: "Vartha Janapada",
      Kannada: "ವಾರ್ತಾ ಜನಪದ",
      Hindi: "वार्ता जनपद",
    },
  },
  {
    name: "March of karnataka",
    path: "/marchofkarnatakmagzine",
    translations: {
      English: "March of karnataka",
      Kannada: "March of Karnataka",
      Hindi: "March of Karnataka",
    },
  },
  {
    name: "Special Publication",
    path: "/specialpublication",
    translations: {
      English: "Special Publication",
      Kannada: "ವಿಶೇಷ ಪ್ರಕಟಣೆ",
      Hindi: "विशेष प्रकाशन",
    },
  },
];

const MagazinesDropdown = React.forwardRef(
  ({ isOpen, onClose, onMouseEnter, onMouseLeave }, ref) => {
    const { language } = useContext(LanguageContext);
    const textClass =
      language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

    return (
      <MediaDropdownContainer
        ref={ref}
        isOpen={isOpen}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label="Magazines menu"
      >
        <MediaDropdownContent>
          {MAGAZINES_ITEMS.map((item) => (
            <MediaLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={textClass}
            >
              {item.translations[language] || item.translations.English}
            </MediaLink>
          ))}
        </MediaDropdownContent>
      </MediaDropdownContainer>
    );
  }
);

MagazinesDropdown.displayName = "MagazinesDropdown";

export default MagazinesDropdown;
