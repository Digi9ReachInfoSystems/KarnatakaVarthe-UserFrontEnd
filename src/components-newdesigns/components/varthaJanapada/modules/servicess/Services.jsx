import { ListLink } from "../LatestNotification.styles";
import {
  Card,
  CardHeader,
  ServiceItem,
  ServiceList,
  CardBody,
  ItemAction,
  CardBodySkeleton,
  SkeletonLine,
} from "./service.Style";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { useContext, useEffect, useState } from "react";
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
  return (
    // Placeholder for Services component
    <Card>
      <CardHeader>{headerText[language]}</CardHeader>
      {loading ? (
        <CardBodySkeleton>
          <SkeletonLine width="80%" />
          <SkeletonLine width="60%" />
          <SkeletonLine width="90%" />
          <SkeletonLine width="70%" />
          <SkeletonLine width="50%" />
        </CardBodySkeleton>
      ) : (
        <CardBody>
          <ServiceList>
            {Array.isArray(service) &&
              service.map((item, index) => (
                <ServiceItem key={index}>
                  <span>{item[languageMap[language]]}</span>
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
