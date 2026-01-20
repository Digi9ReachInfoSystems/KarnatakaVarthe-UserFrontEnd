import React, { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { PhotosApi } from "../../../services/gallery/GalleryApi";
import {
  MobileDistrictSubmenu,
  MobileDistrictList,
  MobileDistrictItem,
  MobileDistrictLink,
} from "./Header.styles";

const MobileDistrictMenu = ({ isOpen, onDistrictSelect }) => {
  const { language } = useContext(LanguageContext);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch districts from API
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true);
        const response = await PhotosApi.getDistricts();
        if (response && Array.isArray(response) && response.length > 0) {
          setDistricts(response);
        } else {
          console.warn("Empty districts API response.");
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  // Get translated district name
  const getDistrictName = (district) => {
    if (language === "English") {
      return district.english || district.name;
    } else if (language === "Hindi") {
      return district.hindi || district.name;
    } else {
      return district.kannada || district.name;
    }
  };

  return (
    <MobileDistrictSubmenu isOpen={isOpen}>
      <MobileDistrictList>
        {loading ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Loading districts...
          </div>
        ) : districts.length > 0 ? (
          districts.map((district) => (
            <MobileDistrictItem key={district._id || district.name}>
              <MobileDistrictLink
                to={`/district?district=${encodeURIComponent(district.name)}`}
                onClick={onDistrictSelect}
                className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
              >
                {getDistrictName(district)}
              </MobileDistrictLink>
            </MobileDistrictItem>
          ))
        ) : (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            No districts available
          </div>
        )}
      </MobileDistrictList>
    </MobileDistrictSubmenu>
  );
};

export default MobileDistrictMenu;
