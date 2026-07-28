import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { fetchDistrictsList } from "../../../services/newapis/newapis-services";
import {
  DistrictDropdownContainer,
  DistrictDropdownContent,
  DistrictGrid,
  DistrictItem,
  DistrictLink,
} from "./DistrictDropdown.styles";

const EDGE_PAD = 16;
const GAP = 10;
const PREFERRED_WIDTH = 900;
const MIN_WIDTH = 280;

const DistrictDropdown = React.forwardRef(
  ({ isOpen, onClose, onMouseEnter, onMouseLeave, variant = "default" }, ref) => {
    const { language } = useContext(LanguageContext);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [side, setSide] = useState("right");
    const [panelWidth, setPanelWidth] = useState(PREFERRED_WIDTH);
    const [panelTop, setPanelTop] = useState(0);
    const [panelMaxHeight, setPanelMaxHeight] = useState("70vh");
    const containerRef = useRef(null);

    const setRefs = useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    useEffect(() => {
      const fetchDistricts = async () => {
        try {
          setLoading(true);
          const response = await fetchDistrictsList();
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

    // Position flyout beside parent row; flip left if needed; keep in viewport
    useLayoutEffect(() => {
      if (!isOpen || variant !== "flyout") return;

      const updatePosition = () => {
        const el = containerRef.current;
        const parent = el?.parentElement;
        if (!parent) return;

        const parentRect = parent.getBoundingClientRect();
        const spaceRight =
          window.innerWidth - parentRect.right - GAP - EDGE_PAD;
        const spaceLeft = parentRect.left - GAP - EDGE_PAD;

        let nextSide = "right";
        if (spaceRight < MIN_WIDTH && spaceLeft > spaceRight) {
          nextSide = "left";
        }

        const available = nextSide === "right" ? spaceRight : spaceLeft;
        const width = Math.min(
          PREFERRED_WIDTH,
          Math.max(MIN_WIDTH, available)
        );

        // Align top with District News item; shift up if it would clip bottom
        const maxHeightPx = Math.min(
          window.innerHeight * 0.7,
          window.innerHeight - EDGE_PAD - Math.max(EDGE_PAD, parentRect.top)
        );

        // Measure after width applied on next frame if needed
        const panelHeight = el.offsetHeight || Math.min(480, maxHeightPx);
        let top = 0;
        if (parentRect.top + panelHeight > window.innerHeight - EDGE_PAD) {
          top =
            window.innerHeight - EDGE_PAD - panelHeight - parentRect.top;
        }
        if (parentRect.top + top < EDGE_PAD) {
          top = EDGE_PAD - parentRect.top;
        }

        setSide(nextSide);
        setPanelWidth(Math.floor(width));
        setPanelTop(top);
        setPanelMaxHeight(`${Math.floor(maxHeightPx)}px`);
      };

      updatePosition();
      // Re-measure after content paints
      const raf = requestAnimationFrame(updatePosition);

      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [isOpen, variant, districts.length, loading]);

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
      <DistrictDropdownContainer
        ref={setRefs}
        isOpen={isOpen}
        $variant={variant}
        $side={side}
        $panelWidth={variant === "flyout" ? panelWidth : undefined}
        $panelMaxHeight={variant === "flyout" ? panelMaxHeight : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label="District list"
        style={
          variant === "flyout" && isOpen
            ? { top: `${panelTop}px` }
            : undefined
        }
      >
        <DistrictDropdownContent>
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
              Loading districts...
            </div>
          ) : districts.length > 0 ? (
            <DistrictGrid $variant={variant}>
              {districts.map((district) => (
                <DistrictItem
                  key={district._id || district.name}
                  $variant={variant}
                >
                  <DistrictLink
                    to={`/district?district=${encodeURIComponent(district.name)}`}
                    onClick={onClose}
                    className={
                      language === "Kannada" || language === "Hindi"
                        ? "kannada-text"
                        : ""
                    }
                  >
                    {getDistrictName(district)}
                  </DistrictLink>
                </DistrictItem>
              ))}
            </DistrictGrid>
          ) : (
            <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
              No districts available
            </div>
          )}
        </DistrictDropdownContent>
      </DistrictDropdownContainer>
    );
  }
);

DistrictDropdown.displayName = "DistrictDropdown";

export default DistrictDropdown;
