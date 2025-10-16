import LatestCat from "../../components/Latestcat/LatestCat";
import RecomMended from "../../components/Recommended/RecomMended";

const LatestNews = () => {
  return (
    <div role="main" aria-label="Latest news page">
        <>
          <LatestCat />
          <RecomMended />
        </>
    </div>
  );
};

export default LatestNews;