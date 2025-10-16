import CategoryNews from "../../components/Latestnews/allrecommended/CategoryNews";
import styled from "styled-components";
import LatestTrending from "../../components/Latestnews/latesnewsapi/LatestTrending";
import LatestDataSection from "../../components/Latestnews/latestdatasection/LatestData";
import LatestRecomMended from "../../components/Latestnews/Latestrecommened/LatestRecommed";

const Container = styled.div`
  width: 100%;
  max-width: 94%;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const LatestData = () => {

  return (
    <Container role="main" aria-label="Latest news page">
      <LatestTrending />
      <CategoryNews />
      <LatestDataSection/>
      <LatestRecomMended />
    </Container>
  );
};

export default LatestData;