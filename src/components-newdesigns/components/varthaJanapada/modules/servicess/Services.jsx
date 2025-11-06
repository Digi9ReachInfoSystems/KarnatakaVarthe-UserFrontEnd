import { ListLink } from "../LatestNotification.styles";
import {
  Card,
  CardHeader,
  ServiceItem,
  ServiceList,
  CardBody,
  ItemAction,
  CardBodySkeleton,
  ShimmerItem,
  ShimmerContent,
  ShimmerText,
  ShimmerAction,
} from "./service.Style";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { useContext, useEffect, useState ,useRef} from "react";
import { getLatestService } from "../../../../../services/latestnotification/LatestNotification";

const headerText = {
  English: "Our Services",
  Kannada: "ಸೇವೆಗಳು",
  Hindi: "सेवाएं",
};
const showMoreText = {
  English: "Show More",
  Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ",
  Hindi: "और दिखाएं",
};
const languageMap = {
  English: "title",
  Kannada: "kannada",
  Hindi: "hindi",
};
function Services() {
  const { language } = useContext(LanguageContext);
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  //get latest services from api and set to service state
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await getLatestService();
        console.log("Fetched services:", data.data);
        setService(data.data.newarticles || []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
  
  // Auto-scroll effect for the service list
  useEffect(() => {
    if (service.length > 0 && listRef.current && !isHovered) {
      const scrollContainer = listRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      if (scrollHeight > clientHeight) {
        const interval = setInterval(() => {
          if (scrollContainer.scrollTop >= scrollHeight - clientHeight - 10) {
            scrollContainer.scrollTop = 0;
          } else {
            scrollContainer.scrollTop += 1;
          }
        }, 60);
        return () => clearInterval(interval);
      }
    }
  }, [service.length, isHovered]);
  return (
    <Card>
      <CardHeader>{headerText[language]}</CardHeader>
      {loading ? (
        <CardBodySkeleton>
          <ShimmerItem>
            <ShimmerContent>
              <ShimmerText width="70%" />
              <ShimmerText width="50%" />
            </ShimmerContent>
            <ShimmerAction />
          </ShimmerItem>
          <ShimmerItem>
            <ShimmerContent>
              <ShimmerText width="60%" />
              <ShimmerText width="40%" />
            </ShimmerContent>
            <ShimmerAction />
          </ShimmerItem>
          <ShimmerItem>
            <ShimmerContent>
              <ShimmerText width="80%" />
              <ShimmerText width="55%" />
            </ShimmerContent>
            <ShimmerAction />
          </ShimmerItem>
          <ShimmerItem>
            <ShimmerContent>
              <ShimmerText width="65%" />
              <ShimmerText width="45%" />
            </ShimmerContent>
            <ShimmerAction />
          </ShimmerItem>
          <ShimmerItem>
            <ShimmerContent>
              <ShimmerText width="75%" />
              <ShimmerText width="50%" />
            </ShimmerContent>
            <ShimmerAction />
          </ShimmerItem>
        </CardBodySkeleton>
      ) : (
        <CardBody>
          <ServiceList
            ref={listRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Services list"
          >
            {Array.isArray(service) &&
              service.map((item, index) => (
                <ServiceItem key={index}>
                  <span>
                    {item[languageMap[language]] && item[languageMap[language]].length > 100
                      ? item[languageMap[language]].slice(0, 100) + '...'
                      : item[languageMap[language]]}
                  </span>
                  <ListLink
                    as="a"
                    href={
                      /^https?:\/\//.test(item.link)
                        ? item.link
                        : `https://${item.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Service ${index + 1} Actions`}
                  >
                    {showMoreText[language]} {"->"}
                  </ListLink>
                </ServiceItem>
              ))}
          </ServiceList>
        </CardBody>
      )}
    </Card>
  );
}

export default Services;
