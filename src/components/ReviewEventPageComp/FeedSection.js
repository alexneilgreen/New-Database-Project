import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/ReviewEventPageStyles.css";
import Cookies from "js-cookie";

function Feed() {
	const [activeTab, setActiveTab] = useState(1);
	const [posts, setPosts] = useState([]);

	const handleTabClick = async (e, tabNumber) => {
		e && e.preventDefault();
		setActiveTab(tabNumber);
		try {
			let response;
			switch (tabNumber) {
				case 1:
					response = await axios.post(
						"http://localhost:3001/autoload-public-events",
						{}
					);
					break;
				case 2:
					response = await axios.post(
						"http://localhost:3001/autoload-university-events",
						{}
					);
					break;
				case 3:
					const userID = Cookies.get("uID");
					response = await axios.post(
						"http://localhost:3001/autoload-scheduled-events",
						{ userID }
					);
					break;
				case 4:
					response = await axios.post(
						"http://localhost:3001/autoload-rso-events",
						{}
					);
					break;
				default:
					console.error("Unidentified tab value active: ", activeTab);
					return;
			}
			console.log(`Loaded results Tab ${tabNumber}: `, response.data);
			setPosts(response.data.events || []);
		} catch (error) {
			console.log("API error:", error.response);
		}
	};

	const approveEvent = () => {};

	const throwOutEvent = () => {};

	const generatePostBoxes = () => {
		if (!Array.isArray(posts) || posts.length === 0) {
			return <div>No posts found.</div>;
		}
		return posts.map((post) => (
			<div className="post-box" key={post.eventID}>
				<div className="post-header">
					<h4>{post.eventName}</h4>
					<h4>{post.eventTime}</h4>
					<h4>{post.eventAddress}</h4>
				</div>
				<div className="post-description">
					<p>{post.eventDescr}</p>
				</div>
				<div className="post-footer">
					<p>
						Host:{" "}
						<strong>
							{post.hostName}
							{/* Get host name. Uniquely generated varaible from API */}
						</strong>
					</p>
					<div>
						<button className="approve-btn" onClick={approveEvent}>
							Approve
						</button>
						<button className="throw-out-btn" onClick={throwOutEvent}>
							Throw Out
						</button>
					</div>
				</div>
			</div>
		));
	};

	return (
		<div className="rev-feed-section">
			<div className="rev-feed-content-box">
				<div className="rev-tabs">
					{[1, 2, 3, 4].map((tabNumber) => (
						<div
							key={tabNumber}
							className={`rev-tab ${activeTab === tabNumber && "active"}`}
							onClick={(e) => handleTabClick(e, tabNumber)}
						>
							{tabNumber === 1
								? "Public Events"
								: tabNumber === 2
								? "University Events"
								: tabNumber === 3
								? "Followed Events"
								: "Followed RSOs"}
						</div>
					))}
				</div>
				<div className="rev-search-bar">
					<input
						className="rev-search-bar-text"
						type="text"
						placeholder="Search..."
					/>
					<button type="rev-search-bar-button">Search</button>
				</div>
				<div className="rev-posts-container">{generatePostBoxes()}</div>
			</div>
		</div>
	);
}

export default Feed;
