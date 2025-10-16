import { useEffect, useState } from "react";
import AboutUsText from "../../components/aboutuscom/aboutustexts/AboutUsTextpage";
import {
  PageContainer,
} from "../aboutuspage/AboutUspage.styles";
import Loader from "../../../components/loder/Loder"; 

const AboutUspage = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Simulate a 3-second loading time
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Display the Loader while isLoading is true
  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageContainer role="main" aria-label="About us page">
      <AboutUsText />
    </PageContainer>
  );
};

export default AboutUspage;