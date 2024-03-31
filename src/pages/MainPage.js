import React, { useEffect } from "react";
import Cookies from "js-cookie";

import MainHeader from "../components/MainPageComp/MainHeader.js";
import Feed from "../components/MainPageComp/FeedSection.js";
import Map from "../components/MainPageComp/MapSection.js";

const MainPage = () => {
	useEffect(() => {
		// Console log cookies when the component mounts
		console.log("Cookies:", Cookies.get());
	}, []);

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
