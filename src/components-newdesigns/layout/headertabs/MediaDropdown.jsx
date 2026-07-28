import React, { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import {
  MediaDropdownContainer,
  MediaDropdownContent,
  MediaLink,
} from "./MediaDropdown.styles";

export const MEDIA_ITEMS = [
  {
    name: "Videos",
    path: "/#videos",
    translations: {
      English: "Videos",
      Kannada: "ವೀಡಿಯೋಗಳು",
      Hindi: "वीडियो",
    },
  },
  {
    name: "Shorts",
    path: "/#shorts",
    translations: {
      English: "Shorts",
      Kannada: "ಶಾರ್ಟ್ಸ್",
      Hindi: "शॉर्ट्स",
    },
  },
  {
    name: "Photos",
    path: "/photos",
    translations: {
      English: "Photos",
      Kannada: "ಫೋಟೋಗಳು",
      Hindi: "फोटो",
    },
  },
];

const MediaDropdown = React.forwardRef(
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
        aria-label="Media menu"
      >
        <MediaDropdownContent>
          {MEDIA_ITEMS.map((item) => (
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

MediaDropdown.displayName = "MediaDropdown";

export default MediaDropdown;
