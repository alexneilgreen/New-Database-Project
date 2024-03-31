import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/MainPageStyles.css";
import Cookies from "js-cookie";

function Feed() {
	const [activeTab, setActiveTab] = useState(1);
	const [modalPost, setModalPost] = useState(null);
	const [selectedPost, setSelectedPost] = useState(null);
	const [posts, setPosts] = useState([]);

	const generatePostBoxes = () => {
		if (!Array.isArray(posts) || posts.length === 0) {
			return <div>No posts found.</div>;
		}
		return posts.map((post) => (
			<div className="post-box" key={post.eventID}>
				<div className="post-header">
					<h4 onClick={() => handlePostNameClick(post)}>{post.eventName}</h4>
					<h4>{post.eventTime}</h4>
					<h4>{post.eventAddress}</h4>
				</div>
				<div className="post-description">
					<p>{post.eventDescr}</p>
				</div>
				<div className="post-footer">
					<p>
						<strong>{post.eventEmail}</strong>
					</p>
					<Link to="/feedback">
						<button>Feedback</button>
					</Link>
					<button onClick={() => editEvent(post)}>Edit</button>
					<button onClick={() => populateMap(post)}>Map</button>
				</div>
			</div>
		));
	};

	const handleTabClick = async (e, tabNumber) => {
		e.preventDefault();
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

	const handlePostNameClick = (post) => {
		setSelectedPost(post);
		setModalPost(true);
	};

	const editEvent = (post) => {
		console.log("Edit event:", post);
	};

	const populateMap = (post) => {
		console.log("Populate map:", post);
	};

	const closeModal = () => {
		setModalPost(false);
		setSelectedPost(null);
	};

	return (
		<div className="feed-section">
			<div className="feed-content-box">
				<div className="tabs">
					{[1, 2, 3, 4].map((tabNumber) => (
						<div
							key={tabNumber}
							className={`tab ${activeTab === tabNumber && "active"}`}
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
				<div className="search-bar">
					<input
						className="search-bar-text"
						type="text"
						placeholder="Search..."
					/>
					<button type="search-bar-button">Search</button>
				</div>
				<div className="posts-container">{generatePostBoxes()}</div>
			</div>
			{modalPost && (
				<div className="modal-background">
					<div className="modal">
						<div className="modal-content">
							{selectedPost && (
								<>
									<h2 className="modal-header">{selectedPost.eventName}</h2>
									<p className="modal-description">{selectedPost.eventDescr}</p>
									<div className="modal-buttons">
										<button className="modal-follow">Follow</button>
									</div>
								</>
							)}
							<button className="modal-close" onClick={closeModal}>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Feed;
