import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { LanguageContext } from "../../../context/LanguageContext";
import DistrictDropdown from "./DistrictDropdown";
import {
  NewsDropdownContainer,
  NewsDropdownContent,
  NewsLink,
  DistrictNewsRow,
  DistrictNewsTrigger,
  DistrictHoverBridge,
} from "./NewsDropdown.styles";

export const NEWS_ITEMS = {
  all: {
    name: "All News",
    path: "/news",
    translations: {
      English: "All News",
      Kannada: "ಎಲ್ಲಾ ಸುದ್ದಿ",
      Hindi: "सभी समाचार",
    },
  },
  state: {
    name: "State News",
    path: "/state",
    translations: {
      English: "State News",
      Kannada: "ರಾಜ್ಯ ಸುದ್ದಿ",
      Hindi: "राज्य समाचार",
    },
  },
  district: {
    name: "District News",
    path: "/district",
    translations: {
      English: "District News",
      Kannada: "ಜಿಲ್ಲಾ ಸುದ್ದಿ",
      Hindi: "जिला समाचार",
    },
  },
};

const NewsDropdown = React.forwardRef(
  ({ isOpen, onClose, onMouseEnter, onMouseLeave }, ref) => {
    const { language } = useContext(LanguageContext);
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);
    const [districtSide, setDistrictSide] = useState("right");
    const districtTimeoutRef = useRef(null);
    const rowRef = useRef(null);
    const textClass =
      language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

    const clearDistrictTimeout = () => {
      if (districtTimeoutRef.current) {
        clearTimeout(districtTimeoutRef.current);
        districtTimeoutRef.current = null;
      }
    };

    const handleDistrictEnter = () => {
      clearDistrictTimeout();
      setIsDistrictOpen(true);
    };

    const handleDistrictLeave = () => {
      districtTimeoutRef.current = setTimeout(() => {
        setIsDistrictOpen(false);
      }, 180);
    };

    const handleCloseAll = () => {
      setIsDistrictOpen(false);
      onClose?.();
    };

    useEffect(() => {
      if (!isOpen) {
        clearDistrictTimeout();
        setIsDistrictOpen(false);
      }
    }, [isOpen]);

    useEffect(() => {
      if (!isDistrictOpen || !rowRef.current) return;

      const updateSide = () => {
        const rect = rowRef.current.getBoundingClientRect();
        const spaceRight = window.innerWidth - rect.right - 10 - 16;
        const spaceLeft = rect.left - 10 - 16;
        setDistrictSide(
          spaceRight < 280 && spaceLeft > spaceRight ? "left" : "right"
        );
      };

      updateSide();
      window.addEventListener("resize", updateSide);
      return () => window.removeEventListener("resize", updateSide);
    }, [isDistrictOpen]);

    return (
      <NewsDropdownContainer
        ref={ref}
        isOpen={isOpen}
        onMouseEnter={(e) => {
          clearDistrictTimeout();
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          clearDistrictTimeout();
          districtTimeoutRef.current = setTimeout(() => {
            setIsDistrictOpen(false);
          }, 180);
          onMouseLeave?.(e);
        }}
        aria-label="News menu"
      >
        <NewsDropdownContent>
          <NewsLink
            to={NEWS_ITEMS.state.path}
            onClick={handleCloseAll}
            className={textClass}
          >
            {NEWS_ITEMS.state.translations[language] ||
              NEWS_ITEMS.state.translations.English}
          </NewsLink>

          <DistrictNewsRow
            ref={rowRef}
            onMouseEnter={handleDistrictEnter}
            onMouseLeave={handleDistrictLeave}
          >
            <DistrictNewsTrigger
              to={NEWS_ITEMS.district.path}
              onClick={handleCloseAll}
              className={`${textClass} ${isDistrictOpen ? "open" : ""}`}
              aria-expanded={isDistrictOpen}
              aria-haspopup="true"
            >
              <span>
                {NEWS_ITEMS.district.translations[language] ||
                  NEWS_ITEMS.district.translations.English}
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </DistrictNewsTrigger>

            {isDistrictOpen && (
              <DistrictHoverBridge
                $side={districtSide}
                onMouseEnter={handleDistrictEnter}
                aria-hidden="true"
              />
            )}

            <DistrictDropdown
              variant="flyout"
              isOpen={isDistrictOpen}
              onClose={handleCloseAll}
              onMouseEnter={handleDistrictEnter}
              onMouseLeave={handleDistrictLeave}
            />
          </DistrictNewsRow>
        </NewsDropdownContent>
      </NewsDropdownContainer>
    );
  }
);

NewsDropdown.displayName = "NewsDropdown";

export default NewsDropdown;
