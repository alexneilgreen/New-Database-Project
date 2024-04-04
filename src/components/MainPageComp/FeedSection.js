import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/MainPageStyles.css";
import Cookies from "js-cookie";

import "ol/ol.css";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import { fromLonLat, toLonLat } from "ol/proj";
import pin from "../../images/pin.png";

function Feed({ addIconToMap, centerMapOn }) {
	const [activeTab, setActiveTab] = useState(1);
	const [modalPost, setModalPost] = useState(null);
	const [selectedHost, setSelectedHost] = useState(null);
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		// Set the default active tab to 1 before the first tab is clicked
		handleTabClick(null, 1);
	}, []); // Run this effect only once, on initial render

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
						<strong onClick={() => handlePostNameClick(post)}>
							{post.hostName}
							{/* Get host name. Uniquely generated variable from API */}
						</strong>
					</p>
					<button onClick={() => goToFeedback(post)}>Feedback</button>

					{/* Conditionally render the "Edit" button */}
					{post.isOwner === 1 && (
						<button onClick={() => editEvent(post)}>Edit</button>
					)}

					<button onClick={() => populateMap(post)}>Map</button>
				</div>
			</div>
		));
	};

	const handleTabClick = async (e, tabNumber) => {
		e && e.preventDefault();
		setActiveTab(tabNumber);
		try {
			let response;
			switch (tabNumber) {
				case 1:
					response = await axios.post(
						"http://localhost:3001/autoload-public-events",
						{ adminID: Cookies.get("aID") }
					);
					break;
				case 2:
					response = await axios.post(
						"http://localhost:3001/autoload-university-events",
						{ university: Cookies.get("uni"), adminID: Cookies.get("aID") }
					);
					break;
				case 3:
					response = await axios.post(
						"http://localhost:3001/autoload-scheduled-events",
						{ userID: Cookies.get("uID"), adminID: Cookies.get("aID") }
					);
					break;
				case 4:
					response = await axios.post(
						"http://localhost:3001/autoload-rso-events",
						{ userID: Cookies.get("uID"), adminID: Cookies.get("aID") }
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

	useEffect(() => {
		console.log("Host JSON: ", selectedHost);

		if (selectedHost !== null) {
			setModalPost(true);
		}
	}, [selectedHost]);

	const handlePostNameClick = async (post) => {
		//Note: "source" is a uniquely generated variable from the autoloading APIs
		//If it is a university event, search by superadmin
		if (post.source == "university") {
			// API to return university info here
			let university = post.hostName;
			try {
				const response = await axios.post(
					"http://localhost:3001/find-superadmin",
					{
						university,
					}
				);

				console.log("Uni info search response: ", response.data);

				let hostInfo = {
					name: null,
					descr: null,
					id: -1,
				};

				if (response.status == 200) {
					hostInfo.name = response.data.superadmin.username;
					hostInfo.descr = response.data.superadmin.uniDescr;
					setSelectedHost(hostInfo);
				}
			} catch (error) {
				console.log("Error: ", error);
			}
		}
		//If it is an rso event, search by rso
		else if (post.source == "RSO") {
			// API to return RSO info here
			let rsoName = post.hostName;
			try {
				const response = await axios.post("http://localhost:3001/find-rso", {
					rsoName,
				});

				console.log("RSO info search response: ", response.data);

				let hostInfo = {
					name: null,
					descr: null,
					id: -1,
				};

				if (response.status == 200) {
					hostInfo.name = response.data.rso.rsoName;
					hostInfo.descr = response.data.rso.rsoDescr;
					hostInfo.id = response.data.rso.rsoID;
					setSelectedHost(hostInfo);
				}
			} catch (error) {
				console.log("Error: ", error);
			}
		}
		//setModalPost(true);
	};

	const goToFeedback = async (post) => {
		console.log(post);
		// Create a Promise to ensure cookies are set
		const setCookiesPromise = new Promise((resolve, reject) => {
			Cookies.set("hName", post.hostName);
			Cookies.set("eName", post.eventName);
			Cookies.set("eID", post.eventID);

			// Resolve the Promise
			resolve();
		});

		// Wait for the Promise to resolve before navigating
		await setCookiesPromise;

		// Navigate to the new page
		navigate("/feedback");
	};

	const followRSO = async (selectedHost) => {
		const userID = Cookies.get("uID");
		const rsoID = selectedHost.id;
		try {
			const response = await axios.post("http://localhost:3001/follow-rso", {
				userID,
				rsoID,
			});

			if (response.status == 200) {
				console.log("User successfully followed RSO");
			}
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	const unfollowRSO = async (selectedHost) => {
		const userID = Cookies.get("uID");
		const rsoID = selectedHost.id;
		try {
			const response = await axios.post("http://localhost:3001/unfollow-rso", {
				userID,
				rsoID,
			});

			if (response.status === 200) {
				console.log("User successfully unfollowed RSO");
				// Call generatePostBoxes() again after unfollowing the RSO
				generatePostBoxes();
			}
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	const editEvent = async (post) => {
		console.log(post);
		// Create a Promise to ensure cookies are set
		const setCookiesPromise = new Promise((resolve, reject) => {
			console.log("Edit event:", post);
			Cookies.set("eID", post.eventID);
			//adminID cookie already set
			Cookies.set("eName", post.eventName);
			Cookies.set("eDescr", post.eventDescr);
			Cookies.set("eTime", post.eventTime);
			Cookies.set("eLat", post.eventLat);
			Cookies.set("eLong", post.eventLong);
			Cookies.set("eAddr", post.eventAddress);
			Cookies.set("ePhone", post.eventPhone);
			Cookies.set("eEmail", post.eventEmail);

			// Resolve the Promise
			resolve();
		});

		// Wait for the Promise to resolve before navigating
		await setCookiesPromise;

		// reoute to "/editEvent"
		navigate("/editEvent");
	};

	const populateMap = (post) => {
		//console.log("Populate map:", post);
		//console.log("Long and Lat: ", post.eventLong, post.eventLat);
		addIconToMap(post.eventLong, post.eventLat);
		centerMapOn(post.eventLong, post.eventLat);

		//Map prop debug
		//console.log("MAP: ", mapRef);
		//console.log("ICON LAYER: ", iconLayer);
	};

	const closeModal = () => {
		setModalPost(false);
		setSelectedHost(null);
	};

	return (
		<div className="feed-section">
			<div className="feed-content-box">
				<div className="tabs">
					{[1, 2, 4].map(
						(
							tabNumber // Removed 3 from the array
						) => (
							<div
								key={tabNumber}
								className={`tab ${activeTab === tabNumber && "active"}`}
								onClick={(e) => handleTabClick(e, tabNumber)}
							>
								{tabNumber === 1
									? "Public Events"
									: tabNumber === 2
									? "University Events"
									: "Followed RSOs"}{" "}
								{/* Removed "Followed Events" */}
							</div>
						)
					)}
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
				<div className="modal-background" onClick={closeModal}>
					<div className="modal">
						<div className="modal-content">
							{selectedHost && (
								<>
									<h2 className="modal-header">{selectedHost.name}</h2>
									<p className="modal-description">{selectedHost.descr}</p>
									{selectedHost.id !== -1 && (
										<div className="modal-buttons">
											<button
												className="modal-follow"
												onClick={() => followRSO(selectedHost)}
											>
												Follow
											</button>
											<button
												className="modal-unfollow"
												onClick={() => unfollowRSO(selectedHost)}
											>
												Unfollow
											</button>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Feed;
