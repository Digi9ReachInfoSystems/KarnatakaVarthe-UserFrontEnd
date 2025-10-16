import React, { useState, useEffect } from "react";
import LatestCat from "../../components/Latestcat/LatestCat";
import RecomMended from "../../components/Recommended/RecomMended";
import LatestTab from "../../components/Latesttab/LatestTab";
import Loader from "../../../components/loder/Loder"; 

const LatestNews1 = () => {
  return (
    <div role="main" aria-label="Recommended news page">
        <>
          <LatestCat />
          <RecomMended />
          {/* <LatestTab /> */}
        </>
    </div>
  );
};

export default LatestNews1;