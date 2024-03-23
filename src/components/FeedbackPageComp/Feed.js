import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
import "../../css/FeedbackPageStyles.css";

const FeedbackPage = () => {
	const [comments, setComments] = useState([]); // State to store comments
	const [rating, setRating] = useState(0); // State to store rating
	const [newComment, setNewComment] = useState(""); // State to store new comment

	const handleCommentChange = (event) => {
		setNewComment(event.target.value); // Update new comment state
	};

	const handleRatingChange = (event) => {
		setRating(event.target.value); // Update rating state
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Add new comment and rating to the comments list
		setComments([...comments, { comment: newComment, rating: rating }]);
		// Reset the input fields
		setNewComment("");
		setRating(0);
	};

	return (
		<div className="feedback-page">
			<Link to="/main" className="link-btn">
				Back to Main
			</Link>
			<div className="feedback-form">
				<div className="feedback-header">
					<h2>Event Name</h2>
					<h3>Host Name</h3>
				</div>
				<form onSubmit={handleSubmit}>
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
							placeholder="Rating (1-5)"
							min="1"
							max="5"
							required
						/>
					</div>
					<button type="submit" className="submit-btn">
						Submit
					</button>
				</form>
			</div>
			<div className="feedback-feed">
				<h3>Feedback from Others</h3>
				<br />
				<ul>
					{comments.map((item, index) => (
						<li key={index}>
							<p>Comment: {item.comment}</p>
							<br />
							<p>Rating: {item.rating}</p>
						</li>
					))}
					{/* <li>
						<p>
							Test yap yap yap Test yap yap yap Test yap yap yap Test yap yap
							yap Test yap yap yap Test yap yap yap
						</p>
						<br />
						<p>Rating: 1</p>
					</li>
					<li>
						<p>
							Test yap yap yap Test yap yap yap Test yap yap yap Test yap yap
							yap Test yap yap yap Test yap yap yap
						</p>
						<br />
						<p>Rating: 1</p>
					</li>
					<li>
						<p>
							Test yap yap yap Test yap yap yap Test yap yap yap Test yap yap
							yap Test yap yap yap Test yap yap yap
						</p>
						<br />
						<p>Rating: 1</p>
					</li>
					<li>
						<p>
							Test yap yap yap Test yap yap yap Test yap yap yap Test yap yap
							yap Test yap yap yap Test yap yap yap
						</p>
						<br />
						<p>Rating: 1</p>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default FeedbackPage;
