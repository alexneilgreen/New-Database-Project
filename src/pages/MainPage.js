import React from "react";

import MainHeader from "../components/MainPageComp/MainHeader.js";
import Feed from "../components/MainPageComp/FeedSection.js";
import Map from "../components/MainPageComp/MapSection.js";

const MainPage = () => {
	return (
		<div>
			<MainHeader />
			<div className="main-container">
				<Feed />
				<Map />
			</div>
		</div>
	);
};

export default MainPage;
