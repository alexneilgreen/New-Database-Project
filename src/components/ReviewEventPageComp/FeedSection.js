import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/ReviewEventPageStyles.css";
import Cookies from "js-cookie";

//TODO: Check API validity

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadUnapprovedEvents();
  }, []); // Run this effect only once, on initial render

  const loadUnapprovedEvents = async () => {
    let adminID = Cookies.get("aID");
    let superID = Cookies.get("sID");
    let university = Cookies.get("uni");
    try {
      const response = await axios.post("http://localhost:3001/load-unapproved-events", {
        university: university,
        superID: superID,
        adminID: adminID,
      });
      response.data.unapprovedEvents;

      //Populate posts
      setPosts(response.data.events || []);

    } catch (error) {
      console.error("Error loading unapproved events:", error);
    }
  };

  const approveEvent = async (post) => {
    let superID = Cookies.get("sID");
    let eventID = post.eventID;
    try {
      const response = await axios.post(
        "http://localhost:3001/approve-university-event",
        { superID, eventID }
      );
      console.log(response.data);
      if (response.status == 200) {
        console.log("Event approved successfully");
      }
    } catch (error) {
      console.error("Error approving university event:", error);
    }
  };

  const throwOutEvent = async (post) => {
    let adminID = Cookies.get("aID");
    let superID = Cookies.get("sID");
    let eventID = post.eventID;
    try {
      //Only a valid adminID or a superID is needed
      const response = await axios.put(
        "http://localhost:3001/delete-university-event",
        eventID,
        adminID,
        superID
      );
      console.log(response.data);
      if (response.status == 200) {
        console.log("Event deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting university event:", error);
    }
  };

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
            <button className="approve-btn" onClick={() => approveEvent(post)}>
              Approve
            </button>
            <button
              className="throw-out-btn"
              onClick={() => throwOutEvent(post)}
            >
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
