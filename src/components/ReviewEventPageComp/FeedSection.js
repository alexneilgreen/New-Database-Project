import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/ReviewEventPageStyles.css";
import Cookies from "js-cookie";

function Feed() {
	const [posts, setPosts] = useState([]);

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
