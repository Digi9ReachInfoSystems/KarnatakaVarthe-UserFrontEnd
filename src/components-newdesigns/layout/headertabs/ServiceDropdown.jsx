import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { getLatestService } from "../../../services/latestnotification/LatestNotification";
import {
  ServiceDropdownContainer,
  ServiceDropdownContent,
  ServiceList,
  ServiceRow,
  ServiceTitle,
  ServiceLink,
  ServiceLoading,
} from "./ServiceDropdown.styles";

const VISIBLE_COUNT = 5;

const viewLinkText = {
  English: "View Link",
  Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ",
  Hindi: "लिंक देखें",
};

const languageMap = {
  English: "title",
  Kannada: "kannada",
  Hindi: "hindi",
};

const ServiceDropdown = React.forwardRef(
  ({ isOpen, onClose, onMouseEnter, onMouseLeave }, ref) => {
    const { language } = useContext(LanguageContext);
    const [services, setServices] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [offsetX, setOffsetX] = React.useState(0);
    const containerRef = useRef(null);
    const listRef = useRef(null);

    const setRefs = (node) => {
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (!isOpen) return;

      const fetchServices = async () => {
        try {
          setLoading(true);
          const data = await getLatestService();
          setServices(data?.data?.newarticles || []);
        } catch (error) {
          console.error("Error fetching services:", error);
          setServices([]);
        } finally {
          setLoading(false);
        }
      };

      fetchServices();
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen && listRef.current) {
        listRef.current.scrollTop = 0;
      }
    }, [isOpen]);

    useLayoutEffect(() => {
      if (!isOpen || !containerRef.current) {
        setOffsetX(0);
        return;
      }

      const updatePosition = () => {
        const el = containerRef.current;
        if (!el) return;

        setOffsetX(0);

        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const edgePadding = 16;
          let nextOffset = 0;

          if (rect.left < edgePadding) {
            nextOffset = edgePadding - rect.left;
          } else if (rect.right > window.innerWidth - edgePadding) {
            nextOffset = window.innerWidth - edgePadding - rect.right;
          }

          setOffsetX(nextOffset);
        });
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => window.removeEventListener("resize", updatePosition);
    }, [isOpen, services.length]);

    const getServiceTitle = (item) =>
      item?.[languageMap[language]] || item?.title || "";

    const getServiceUrl = (link) =>
      /^https?:\/\//.test(link || "") ? link : `https://${link || ""}`;

    const textClass =
      language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

    const hasScroll = services.length > VISIBLE_COUNT;

    return (
      <ServiceDropdownContainer
        ref={setRefs}
        isOpen={isOpen}
        $offsetX={offsetX}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label="Our services list"
      >
        <ServiceDropdownContent>
          {loading ? (
            <ServiceLoading>Loading services...</ServiceLoading>
          ) : services.length > 0 ? (
            <ServiceList ref={listRef} $hasMore={hasScroll}>
              {services.map((item, index) => (
                <ServiceRow key={item._id || `${getServiceTitle(item)}-${index}`}>
                  <ServiceTitle className={textClass}>
                    {getServiceTitle(item)}
                  </ServiceTitle>
                  <ServiceLink
                    href={getServiceUrl(item.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={textClass}
                    onClick={onClose}
                  >
                    {viewLinkText[language] || viewLinkText.English} {"->"}
                  </ServiceLink>
                </ServiceRow>
              ))}
            </ServiceList>
          ) : (
            <ServiceLoading>No services available</ServiceLoading>
          )}
        </ServiceDropdownContent>
      </ServiceDropdownContainer>
    );
  }
);

ServiceDropdown.displayName = "ServiceDropdown";

export default ServiceDropdown;
