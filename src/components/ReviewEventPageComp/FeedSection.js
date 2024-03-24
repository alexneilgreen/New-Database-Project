import React, { useState, useEffect } from "react";
import "../../css/ReviewEventPageStyles.css";

function Feed() {
	const [activeTab, setActiveTab] = useState(1);

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	const approveEvent = () => {};

	const throwOutEvent = () => {};

	return (
		<div className="rev-feed-section">
			<div className="rev-feed-content-box">
				<div className="rev-tabs">
					<div
						className={`rev-tab ${activeTab === 1 && "active"}`}
						onClick={() => handleTabClick(1)}
					>
						Public Events
					</div>
					<div
						className={`rev-tab ${activeTab === 2 && "active"}`}
						onClick={() => handleTabClick(2)}
					>
						University Events
					</div>
					<div
						className={`rev-tab ${activeTab === 3 && "active"}`}
						onClick={() => handleTabClick(3)}
					>
						Followed Events
					</div>
					<div
						className={`rev-tab ${activeTab === 4 && "active"}`}
						onClick={() => handleTabClick(4)}
					>
						Followed RSOs
					</div>
				</div>
				<div className="rev-search-bar">
					<input
						className="rev-search-bar-text"
						type="text"
						placeholder="Search..."
					/>
					<button type="rev-search-bar-button">Search</button>
				</div>
				<div className="rev-posts-container">
					<div className="rev-post-box" id="post1">
						<div className="rev-post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div className="rev-post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div className="rev-post-footer">
							<p>
								Host: <strong>RSO/UNI Name</strong>
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
				</div>
			</div>
		</div>
	);
}

export default Feed;
