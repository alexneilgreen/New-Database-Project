import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";

import MainHeader from "../components/MainPageComp/MainHeader.js";
import Feed from "../components/MainPageComp/FeedSection.js";
import MapSect from "../components/MainPageComp/MapSection.js";
import MapContext from "../components/MainPageComp/MapContext";


const MainPage = () => {
  useEffect(() => {
    // Console log cookies when the component mounts
    console.log("Cookies:", Cookies.get());
  }, []);

  const mapContextValue = { mapRef: null, iconLayer: null };

  return (
    <div>
      <MainHeader />
      <div className="main-container">
        <MapContext.Provider value={{ mapRef: null, iconLayer: null }}>
          <Feed />
          <MapSect />
        </MapContext.Provider>
      </div>
    </div>
  );
};

export default MainPage;
