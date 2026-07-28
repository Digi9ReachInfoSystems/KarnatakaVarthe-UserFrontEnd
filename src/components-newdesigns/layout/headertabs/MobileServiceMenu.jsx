import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { getLatestService } from "../../../services/latestnotification/LatestNotification";
import {
  MobileDistrictSubmenu,
  MobileDistrictList,
  MobileDistrictItem,
} from "./Header.styles";
import {
  ServiceRow,
  ServiceTitle,
  ServiceLink,
} from "./ServiceDropdown.styles";

const languageMap = {
  English: "title",
  Kannada: "kannada",
  Hindi: "hindi",
};

const viewLinkText = {
  English: "View Link",
  Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ",
  Hindi: "लिंक देखें",
};

const MobileServiceMenu = ({ isOpen, onServiceSelect }) => {
  const { language } = useContext(LanguageContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getServiceTitle = (item) =>
    item?.[languageMap[language]] || item?.title || "";

  const getServiceUrl = (link) =>
    /^https?:\/\//.test(link || "") ? link : `https://${link || ""}`;

  const textClass =
    language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

  return (
    <MobileDistrictSubmenu isOpen={isOpen}>
      <MobileDistrictList>
        {loading ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Loading services...
          </div>
        ) : services.length > 0 ? (
          services.map((item, index) => (
            <MobileDistrictItem key={item._id || `${getServiceTitle(item)}-${index}`}>
              <ServiceRow style={{ margin: 0 }}>
                <ServiceTitle className={textClass}>
                  {getServiceTitle(item)}
                </ServiceTitle>
                <ServiceLink
                  href={getServiceUrl(item.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={textClass}
                  onClick={onServiceSelect}
                >
                  {viewLinkText[language] || viewLinkText.English} {"->"}
                </ServiceLink>
              </ServiceRow>
            </MobileDistrictItem>
          ))
        ) : (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            No services available
          </div>
        )}
      </MobileDistrictList>
    </MobileDistrictSubmenu>
  );
};

export default MobileServiceMenu;
