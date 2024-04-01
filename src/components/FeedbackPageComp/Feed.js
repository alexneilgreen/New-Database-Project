import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/FeedbackPageStyles.css";
import Cookies from "js-cookie";

const FeedbackPage = () => {
	const [comments, setComments] = useState([]);
	const [rating, setRating] = useState(0);
	const [newComment, setNewComment] = useState("");
	const [editIndex, setEditIndex] = useState(null);

	const loadReviews = async () => {
		try {
			const eventID = Cookies.get("eID");
			const response = await axios.post(
				"http://localhost:3001/load-event-reviews",
				{
					eventID: eventID,
				}
			);

			console.log(response.data);
			setComments(response.data.eventReviews || []);
		} catch (error) {
			console.error("Error loading reviews:", error);
		}
	};

	const handleCommentChange = (event) => {
		setNewComment(event.target.value);
	};

	const handleRatingChange = (event) => {
		setRating(event.target.value);
	};

	const submitReview = async (event) => {
		event.preventDefault();
		const userID = Cookies.get("uID");
		setComments([...comments, { comment: newComment, rating: rating }]);
		setNewComment("");
		setRating(0);

		try {
			const eventID = Cookies.get("eID");
			const response = await axios.post("http://localhost:3001/review-event", {
				userID: userID,
				eventID: eventID,
				comment: newComment,
				reviewRating: rating,
			});
			console.log(response.data);
			loadReviews(); // Reload comments after submitting a review
		} catch (error) {
			console.error("Error submitting review:", error);
		}
	};

	const handleEdit = (index) => {
		setEditIndex(index);
	};

	const handleEditSubmit = async (index) => {
		const userID = Cookies.get("uID");
		const eventID = Cookies.get("eID");
		const updatedComment = comments[index].comment;
		const updatedRating = comments[index].rating;

		try {
			const response = await axios.put("http://localhost:3001/edit-review", {
				userID: userID,
				eventID: eventID,
				comment: updatedComment,
				reviewRating: updatedRating,
			});
			console.log(response.data);
			setEditIndex(null);
			loadReviews(); // Reload comments after editing
		} catch (error) {
			console.error("Error editing review:", error);
		}
	};

	const handleDeleteReview = async () => {
		const userID = Cookies.get("uID");
		const eventID = Cookies.get("eID");

		try {
			const response = await axios.put("http://localhost:3001/delete-review", {
				userID: userID,
				eventID: eventID,
			});
			console.log(response.data);
			loadReviews(); // Reload comments after deletion
		} catch (error) {
			console.error("Error deleting review:", error);
		}
	};

	useEffect(() => {
		loadReviews();
	}, []);

	return (
		<div className="feedback-page">
			<Link to="/main" className="link-btn">
				Back to Main
			</Link>
			<div className="feedback-form">
				<div className="feedback-header">
					<h2>{Cookies.get("eName")}</h2>
					<h3>{Cookies.get("hName")}</h3>
				</div>
				<form>
					<div className="form-group">
						<textarea
							value={newComment}
							onChange={handleCommentChange}
							className="feedback-input"
							placeholder="Add your comment (200 characters max)"
							maxLength="200"
							required
						></textarea>
						<input
							type="number"
							value={rating}
							onChange={handleRatingChange}
							className="feedback-rating"
							placeholder="Rating (0-5)"
							min="0"
							max="5"
							required
						/>
					</div>
					<button type="submit" className="submit-btn" onClick={submitReview}>
						Submit
					</button>
				</form>
			</div>
			<div className="feedback-feed">
				<h3>Feedback from Others</h3>
				<br />
				<ul>
					{comments.map((item, index) => {
						return (
							<li key={index}>
								<div className="review-item">
									{editIndex === index ? (
										<>
											<input
												type="text"
												value={item.comment}
												onChange={(e) => {
													const newComments = [...comments];
													newComments[index].comment = e.target.value;
													setComments(newComments);
												}}
											/>
											<input
												type="number"
												value={item.rating}
												onChange={(e) => {
													const newComments = [...comments];
													newComments[index].rating = e.target.value;
													setComments(newComments);
												}}
											/>
											<button
												className="edit-button"
												onClick={() => handleEditSubmit(index)}
											>
												Save
											</button>
										</>
									) : (
										<>
											<div className="review-comment">{item.comment}</div>
											<div className="review-rating">Rating: {item.rating}</div>
											<button
												className="edit-button"
												onClick={() => handleEdit(index)}
											>
												Edit
											</button>
										</>
									)}
									<button
										className="delete-button"
										onClick={handleDeleteReview}
									>
										Delete
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default FeedbackPage;
