import { Outlet } from "react-router-dom";
import Header from "../components-newdesigns/layout/Header/Header";
import HeaderTab from "../components-newdesigns/layout/headertabs/HeaderTab";
import LanguageNavbar from "../components-newdesigns/layout/languagetranslation/LanguageNavbar";
import SiteFooter from "../components-newdesigns/layout/new-sitefooter/site-footer";
import TrendingBar from "../components-newdesigns/layout/trendingbar/TrendingBar";


const Applayout = () => {
  return (
      <div role="application" aria-label="DIPR Website">
        <Header />
        <LanguageNavbar />
        <HeaderTab />
        <TrendingBar />
        <main role="main" aria-label="Main content">
        <Outlet />
        </main>
        <SiteFooter />
      </div>
  );
};

export default Applayout;