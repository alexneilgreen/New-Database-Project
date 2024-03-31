import React, { useEffect } from "react";
import Cookies from "js-cookie";

import Feed from "../components/FeedbackPageComp/Feed.js";

const FeedbackPage = () => {
	//Moved for testing
	/*useEffect(() => {
		// Console log cookies when the component mounts
		console.log("Cookies:", Cookies.get());
	}, []);*/
	
	return (
		<div className="feedback-hero">
			<Feed />
		</div>
	);
};

export default FeedbackPage;
