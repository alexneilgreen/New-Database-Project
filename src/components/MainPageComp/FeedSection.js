import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../css/MainPageStyles.css";

function Feed() {
	const [activeTab, setActiveTab] = useState(1);
	const [modalPost, setModalPost] = useState(null); // State to manage modal post-box

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
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
						onClick={() => handleTabClick(1)}
					>
						Public Events
					</div>
					<div
						className={`tab ${activeTab === 2 && "active"}`}
						onClick={() => handleTabClick(2)}
					>
						University Events
					</div>
					<div
						className={`tab ${activeTab === 3 && "active"}`}
						onClick={() => handleTabClick(3)}
					>
						Followed Events
					</div>
					<div
						className={`tab ${activeTab === 4 && "active"}`}
						onClick={() => handleTabClick(4)}
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
				<div className="posts-container">
					<div className="post-box" id="post1">
						<div className="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div className="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div className="post-footer">
							<p>
								Host:{" "}
								<strong onClick={() => handleHostNameClick("post1")}>
									RSO/UNI Name
								</strong>
							</p>
							<Link to="/feedback">
								<button>Feedback</button>
							</Link>
							<button onClick={editEvent}>Edit</button>
							<button onClick={populateMap}>Map</button>
						</div>
					</div>
				</div>
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
