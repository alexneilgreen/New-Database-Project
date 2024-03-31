import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/MainPageStyles.css";
import Cookies from "js-cookie";

function Feed() {
  const [activeTab, setActiveTab] = useState(1);
  const [modalPost, setModalPost] = useState(null);
  const [selectedHost, setSelectedHost] = useState(null);
  const [posts, setPosts] = useState([]);

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
              {/* Get host name. Uniquely generated varaible from API */}
            </strong>
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

  const followRSO = async () => {
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

  const editEvent = (post) => {
    console.log("Edit event:", post);
  };

  const populateMap = (post) => {
    console.log("Populate map:", post);
  };

  const closeModal = () => {
    setModalPost(false);
    setSelectedHost(null);
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
              {selectedHost && (
                <>
                  <h2 className="modal-header">{selectedHost.name}</h2>
                  <p className="modal-description">{selectedHost.descr}</p>
                  {selectedHost.id !== -1 && (
                    <div className="modal-buttons">
                      <button className="modal-follow">Follow</button>
                      <button className="modal-unfollow">Unfollow</button>
                    </div>
                  )}
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
