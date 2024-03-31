import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import "../../css/MainPageStyles.css";
import Cookies from "js-cookie";

function Feed() {
	const [activeTab, setActiveTab] = useState(1);
	const [modalPost, setModalPost] = useState(null);
	const [posts, setPosts] = useState([]);

	const generatePostBoxes = () => {
		return posts.map((post, index) => (
			<div className="post-box" key={index}>
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
						<strong onClick={() => handleHostNameClick(post.eventID)}>
							{post.eventEmail}
						</strong>
					</p>
					<Link to="/feedback">
						<button>Feedback</button>
					</Link>
					<button onClick={editEvent}>Edit</button>
					<button onClick={populateMap}>Map</button>
				</div>
			</div>
		));
	};

	const handleTabClick = async (e, tabNumber) => {
		e.preventDefault();
		setActiveTab(tabNumber);
		console.log("Passed tab value: ", tabNumber);
		console.log("Active tab: ", tabNumber);
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
					response = await axios.post(
						"http://localhost:3001/autoload-scheduled-events",
						{}
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
			}
			if (response && response.data) {
				setPosts(response.data.events);
			}
		} catch (error) {
			console.log("API error:", error.response);
		}
	};

	const handleHostNameClick = (postId) => {
		setModalPost(postId); // Store the post-box ID when RSO name is clicked
		console.log("Modal of " + postId);
	};

	const editEvent = () => {};

	const populateMap = () => {};

	const closeModal = () => {
		setModalPost(null); // Reset the modal post-box ID
	};

	useEffect(() => {
		// Add event listener to close the modal when clicking outside of the white div
		const handleClickOutsideModal = (event) => {
			const modal = document.querySelector(".modal");
			if (modal && !modal.contains(event.target)) {
				closeModal();
			}
		};

		document.addEventListener("mousedown", handleClickOutsideModal);

		return () => {
			document.removeEventListener("mousedown", handleClickOutsideModal);
		};
	}, []);

	return (
		<div className="feed-section">
			<div className="feed-content-box">
				<div className="tabs">
					<div
						className={`tab ${activeTab === 1 && "active"}`}
						onClick={(e) => handleTabClick(e, 1)}
					>
						Public Events
					</div>
					<div
						className={`tab ${activeTab === 2 && "active"}`}
						onClick={(e) => handleTabClick(e, 2)}
					>
						University Events
					</div>
					<div
						className={`tab ${activeTab === 3 && "active"}`}
						onClick={(e) => handleTabClick(e, 3)}
					>
						Followed Events
					</div>
					<div
						className={`tab ${activeTab === 4 && "active"}`}
						onClick={(e) => handleTabClick(e, 4)}
					>
						Followed RSOs
					</div>
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
							<h2 className="modal-header">RSO/UNI Name</h2>
							<p className="modal-description">
								Description of the host goes here. Description of the host goes
								here. Description of the host goes here. Description of the host
								goes here. Description of the host goes here. Description of the
								host goes here. Description of the host goes here. Description
								of the host goes here.
							</p>
							<div className="modal-buttons">
								<button className="modal-follow">Follow</button>
								{/* <button className="modal-join">Join as Admin</button> */}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Feed;
