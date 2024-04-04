const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

const TESTING = false;

let db = null;

if (!TESTING) {
	// MySQL connection configuration
	db = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "admin",
		database: "cop4710db",
	});
} else {
	// MySQL connection configuration
	db = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "admin",
		database: "cop4710db_test",
	});
}

db.connect((err) => {
	if (err) {
		console.error("Error connecting to MySQL:", err);
	} else {
		console.log("Connected to MySQL database");
	}
});

// Use cors middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

//=======================================

//////////////////////////////
// Login API//////////////////
//////////////////////////////
app.post("/login", (req, res) => {
	const { username, password } = req.body;

	console.log("User logging in: ", username, password);
	let userFound = false;
	let userID = -1;
	let userInfo = {};

	// Check if user exists with the given username and password
	const query = "SELECT * FROM Users WHERE username = ? AND password = ?";
	db.query(query, [username, password], (err, userResults) => {
		if (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
			return;
		} else if (userResults.length > 0) {
			// User found and password is correct
			userFound = true;
			userID = userResults[0].userID;
			userInfo = {
				userID: userID,
				username: userResults[0].username,
				phone: userResults[0].phone,
				email: userResults[0].email,
				university: userResults[0].university,
			};
		} else {
			userFound = false;
			res.status(404).json({ message: "Invalid username/password" });
			return;
		}

		if (userFound) {
			let isAdmin = false;
			let isSuperadmin = false;
			let rsoAdminID = -1;
			let superAdminID = -1;

			const rsoAdminQuery = "SELECT adminID FROM RSO_Admins WHERE userID = ?";
			const rsoAdminPromise = new Promise((resolve, reject) => {
				db.query(rsoAdminQuery, [userID], (rsoErr, rsoAdminResults) => {
					if (rsoErr) {
						reject(rsoErr);
					} else {
						if (rsoAdminResults.length > 0) {
							console.log(rsoAdminResults);
							isAdmin = true;
							rsoAdminID = rsoAdminResults[0].adminID;
							console.log("RSO admin found: ", rsoAdminID);
						}
						resolve();
					}
				});
			});

			const superAdminQuery =
				"SELECT superID FROM Superadmins WHERE userID = ?";
			const superAdminPromise = new Promise((resolve, reject) => {
				db.query(superAdminQuery, [userID], (superErr, superAdminResults) => {
					if (superErr) {
						reject(superErr);
					} else {
						if (superAdminResults.length > 0) {
							console.log(superAdminResults);
							isSuperadmin = true;
							superAdminID = superAdminResults[0].superID;
							console.log("Superadmin found: ", superAdminID);
						}
						resolve();
					}
				});
			});

			Promise.all([rsoAdminPromise, superAdminPromise])
				.then(() => {
					console.log(
						"Is admin: " + isAdmin + " Is superadmin: " + isSuperadmin
					);

					if (isAdmin && isSuperadmin) {
						res.status(203).json({
							userInfo: userInfo,
							adminID: rsoAdminID,
							superID: superAdminID,
						});
					} else if (!isAdmin && isSuperadmin) {
						res.status(202).json({ userInfo: userInfo, superID: superAdminID });
					} else if (isAdmin && !isSuperadmin) {
						res.status(201).json({ userInfo: userInfo, adminID: rsoAdminID });
					} else {
						res.status(200).json({ userInfo: userInfo });
					}
				})
				.catch((error) => {
					console.error(error);
					res.status(500).send("Internal Server Error");
				});
			return;
		}
	});
});

//////////////////////////////
//Basic User Register API/////
//////////////////////////////
app.post("/register-user", (req, res) => {
	const { username, password, phone, email, university } = req.body;

	console.log(
		"User registering: ",
		username,
		password,
		phone,
		email,
		university
	);

	// Check if username and email already exist
	const checkQuery = "SELECT * FROM Users WHERE username = ? OR email = ?";
	db.query(checkQuery, [username, email], (err, checkResults) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (checkResults.length > 0) {
			// User with the given username or email already exists
			res.status(409).json({ message: "Username or email already exists" });
			return;
		} else {
			// Insert the new user into the database
			const insertQuery =
				"INSERT INTO Users (username, password, phone, email, university) VALUES (?, ?, ?, ?, ?)";
			db.query(
				insertQuery,
				[username, password, phone, email, university],
				(insertErr, insertResults) => {
					if (insertErr) {
						console.error(insertErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						const userID = insertResults.insertId;
						res.status(200).json({
							message: "User registered successfully",
							userID: userID,
						});
						return;
					}
				}
			);
		}
	});
});

//////////////////////////////
//Superadmin Register API/////
//////////////////////////////
app.post("/register-superadmin", (req, res) => {
	const {
		username,
		password,
		phone,
		email,
		university,
		uniDescr,
		uniLat,
		uniLong,
	} = req.body;

	console.log(
		"Superadmin registering: ",
		username,
		password,
		phone,
		email,
		university,
		uniDescr,
		uniLat,
		uniLong
	);

	// Check if username and email already exist
	const checkQuery = "SELECT * FROM Users WHERE username = ? OR email = ?";
	db.query(checkQuery, [username, email], (err, checkResults) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (checkResults.length > 0) {
			// User with the given username or email already exists
			res.status(409).json({ message: "Username or email already exists" });
			return;
		} else {
			// Insert the new user into the Users table
			const insertUserQuery =
				"INSERT INTO Users (username, password, phone, email, university) VALUES (?, ?, ?, ?, ?)";
			db.query(
				insertUserQuery,
				[username, password, phone, email, university],
				(insertUserErr, insertUserResults) => {
					if (insertUserErr) {
						console.error(insertUserErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						// Get the userID of the newly registered user
						const userID = insertUserResults.insertId;

						// Insert the superadmin into the Superadmins table
						const insertSuperadminQuery =
							"INSERT INTO Superadmins (userID, uniDescr, uniLat, uniLong) VALUES (?, ?, ?, ?)";
						db.query(
							insertSuperadminQuery,
							[userID, uniDescr, uniLat, uniLong],
							(insertSuperadminErr, insertSuperadminResults) => {
								if (insertSuperadminErr) {
									console.error(insertSuperadminErr);
									res.status(500).json({ message: "Internal Server Error" });
									return;
								} else {
									const superID = insertSuperadminResults.insertId;
									res.status(200).json({
										message: "Superadmin registered successfully",
										userID: userID,
										superID: superID,
									});
									return;
								}
							}
						);
					}
				}
			);
		}
	});
});

// For maintenance use only
app.post("/add-university", (req, res) => {
	const { universityName } = req.body;

	console.log("Inserting university: ", universityName);

	// Check if the university already exists
	const checkQuery = "SELECT * FROM Universities WHERE university = ?";
	db.query(checkQuery, [universityName], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (checkResults.length > 0) {
			// University already exists
			res.status(409).json({ message: "University already exists" });
			return;
		} else {
			// Insert the new university into the Universities table
			const insertQuery = "INSERT INTO Universities (university) VALUES (?)";
			db.query(insertQuery, [universityName], (insertErr, insertResults) => {
				if (insertErr) {
					console.error(insertErr);
					res.status(500).json({ message: "Internal Server Error" });
					return;
				} else {
					// University successfully inserted
					const uniID = insertResults.insertId;
					res.status(200).json({
						message: "University inserted successfully",
						uniID: uniID,
					});
					return;
				}
			});
		}
	});
});

// For maintenance use only
app.put("/delete-university", (req, res) => {
	const { uniID } = req.body;

	console.log("Deleting university with ID: ", uniID);

	// Check if the university exists
	const checkQuery = "SELECT * FROM Universities WHERE uniID = ?";
	db.query(checkQuery, [uniID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (checkResults.length === 0) {
			// University not found
			res.status(404).json({ message: "University not found" });
			return;
		} else {
			// Delete the university from the Universities table
			const deleteQuery = "DELETE FROM Universities WHERE uniID = ?";
			db.query(deleteQuery, [uniID], (deleteErr, deleteResults) => {
				if (deleteErr) {
					console.error(deleteErr);
					res.status(500).json({ message: "Internal Server Error" });
					return;
				} else {
					// University successfully deleted
					res.status(200).json({ message: "University deleted successfully" });
					return;
				}
			});
		}
	});
});

//////////////////////////////
// User Deletion API//////////
//////////////////////////////
app.put("/delete-user", (req, res) => {
	const { userID } = req.body; // Assuming userID is sent in the request body

	console.log("Deleting user with userID: ", userID);

	// Check if the user exists
	const checkQuery = "SELECT * FROM Users WHERE userID = ?";
	db.query(checkQuery, [userID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (checkResults.length === 0) {
			// User not found
			res.status(404).json({ message: "User not found" });
			return;
		} else {
			// Delete the user from the Users table
			const deleteQuery = "DELETE FROM Users WHERE userID = ?";
			db.query(deleteQuery, [userID], (deleteErr, deleteResults) => {
				if (deleteErr) {
					console.error(deleteErr);
					res.status(500).json({ message: "Internal Server Error" });
					return;
				} else {
					// User successfully deleted
					res
						.status(200)
						.json({ message: "User deleted successfully", userID: userID });
					return;
				}
			});
		}
	});
});

//////////////////////////////
//GET USER UNIVERSITY API/////
//////////////////////////////
app.post("/get-user-university", (req, res) => {
	const { userID } = req.body; // Assuming userId is sent in the request body

	// Query to fetch the user's university based on their ID
	const query = "SELECT university FROM Users WHERE userID = ?";

	db.query(query, [userID], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		}

		if (results.length === 0) {
			// User not found
			res.status(404).json({ message: "User not found" });
			return;
		}

		const university = results[0].university;
		res.status(200).json({ university: university });
	});
});

//////////////////////////////
// RSO CREATION API///////////
//////////////////////////////
app.post("/create-rso", (req, res) => {
	const { rsoCode, adminCode, rsoName, rsoDescr, university } = req.body;

	console.log("Creating RSO: ", rsoName);

	// Insert the RSO into the RSOs table
	const insertQuery =
		"INSERT INTO RSOs (rsoCode, adminCode, rsoName, rsoDescr, university) VALUES (?, ?, ?, ?, ?)";
	db.query(
		insertQuery,
		[rsoCode, adminCode, rsoName, rsoDescr, university],
		(insertErr, insertResults) => {
			if (insertErr) {
				console.error(insertErr);
				res.status(500).json({ message: "Internal Server Error" });
				return;
			} else {
				// RSO successfully created
				const rsoID = insertResults.insertId;
				res
					.status(200)
					.json({ message: "RSO created successfully", rsoID: rsoID });
				return;
			}
		}
	);
});

//////////////////////////////
// RSO EDIT API///////////////
//////////////////////////////
app.put("/edit-rso", (req, res) => {
	const { adminID, rsoID, rsoName, rsoDescr } = req.body;

	console.log("Admin editing RSO with ID: ", rsoID);

	// Check if the admin is a member of the RSO's board
	const checkOwnershipQuery =
		"SELECT * FROM RSO_Board WHERE rsoID = ? AND adminID = ?";
	db.query(
		checkOwnershipQuery,
		[rsoID, adminID],
		(checkOwnershipErr, checkOwnershipResults) => {
			if (checkOwnershipErr) {
				console.error(checkOwnershipErr);
				res.status(500).json({ message: "Internal Server Error" });
				return;
			} else {
				if (checkOwnershipResults.length === 0) {
					res
						.status(403)
						.json({ message: "You are not authorized to edit this RSO" });
					return;
				} else {
					// Admin is a member of the RSO's board, proceed to edit the RSO
					const updateRsoQuery =
						"UPDATE RSOs SET rsoName = ?, rsoDescr = ? WHERE rsoID = ?";
					db.query(
						updateRsoQuery,
						[rsoName, rsoDescr, rsoID],
						(updateErr, updateResults) => {
							if (updateErr) {
								console.error(updateErr);
								res.status(500).json({ message: "Internal Server Error" });
								return;
							} else {
								// RSO successfully edited
								res.status(200).json({ message: "RSO edited successfully" });
								return;
							}
						}
					);
				}
			}
		}
	);
});

//////////////////////////////
// RSO DELETION API///////////
//////////////////////////////
app.put("/delete-rso", (req, res) => {
	const { adminID, rsoID } = req.body;

	console.log("Deleting RSO: ", rsoID);

	// Check if the admin "owns" the RSO
	const checkOwnershipQuery =
		"SELECT * FROM RSO_Board WHERE rsoID = ? AND adminID = ?";
	db.query(checkOwnershipQuery, [rsoID, adminID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (checkResults.length > 0) {
			// Admin "owns" the RSO, proceed to delete RSO
			const deleteQuery = "DELETE FROM RSOs WHERE rsoID = ?";
			db.query(deleteQuery, [rsoID], (deleteErr, deleteResults) => {
				if (deleteErr) {
					console.error(deleteErr);
					res.status(500).json({ message: "Internal Server Error" });
					return;
				} else {
					// RSO deleted successfully
					res.status(200).json({ message: "RSO deleted successfully" });
					return;
				}
			});
		} else {
			// Admin does not "own" the RSO
			res
				.status(403)
				.json({ message: "You are not authorized to delete this RSO" });
			return;
		}
	});
});

//////////////////////////////
// ADD RSO ADMIN API//////////
//////////////////////////////
app.post("/add-rso-admin", (req, res) => {
	const { userID } = req.body;

	console.log("Making user an RSO admin: ", userID);

	// Insert the user into the RSO_Admins table
	const insertQuery = "INSERT INTO RSO_Admins (userID) VALUES (?)";
	db.query(insertQuery, [userID], (insertErr, insertResults) => {
		if (insertErr) {
			console.error(insertErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			// User successfully added as an RSO admin
			const adminID = insertResults.insertId;
			res.status(200).json({
				message: "User successfully added as RSO admin",
				adminID: adminID,
			});
			return;
		}
	});
});

//////////////////////////////
// REMOVE RSO ADMIN API///////
//////////////////////////////
app.put("/remove-rso-admin", (req, res) => {
	const { adminID } = req.body;

	console.log("Removing user from RSO admins: ", adminID);

	// Delete the user from the RSO_Admins table
	const deleteQuery = "DELETE FROM RSO_Admins WHERE adminID = ?";
	db.query(deleteQuery, [adminID], (deleteErr, deleteResults) => {
		if (deleteErr) {
			console.error(deleteErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (deleteResults.affectedRows === 0) {
			res.status(404).json({ message: "RSO admin not found" });
			return;
		} else {
			// User successfully removed from RSO admins
			res
				.status(200)
				.json({ message: "User successfully removed from RSO admins" });
			return;
		}
	});
});

//////////////////////////////
// JOIN RSO BOARD API/////////
//////////////////////////////
app.post("/join-rso-board", (req, res) => {
	const { adminID, rsoID, adminCode } = req.body;

	console.log("Admin joining RSO board: ", adminID, rsoID, adminCode);

	// Check if the provided admin code matches the admin code for the given RSO
	const codeQuery = "SELECT adminCode FROM RSOs WHERE rsoID = ?";
	db.query(codeQuery, [rsoID], (codeErr, codeResults) => {
		if (codeErr) {
			console.error(codeErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else if (codeResults.length === 0) {
			res.status(404).json({ message: "RSO not found" });
			return;
		} else {
			const correctCode = codeResults[0].adminCode;
			if (adminCode === correctCode) {
				// Provided admin code matches the RSO's admin code
				// Add the admin to the RSO board
				const insertQuery =
					"INSERT INTO RSO_Board (rsoID, adminID) VALUES (?, ?)";
				db.query(insertQuery, [rsoID, adminID], (insertErr, insertResults) => {
					if (insertErr) {
						console.error(insertErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						// Admin successfully added to the RSO board
						res
							.status(200)
							.json({ message: "Admin successfully joined RSO board" });
						return;
					}
				});
			} else {
				// Provided admin code does not match the RSO's admin code
				res.status(403).json({ message: "Incorrect admin code" });
				return;
			}
		}
	});
});

// API endpoint to check if an admin code exists
app.post("/check-admin-code", (req, res) => {
	const { adminCode } = req.body;

	// Check if the provided admin code exists in the RSOs table
	const query = "SELECT * FROM RSOs WHERE adminCode = ?";
	db.query(query, [adminCode], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
		} else {
			if (results.length > 0) {
				res.status(200).json({ exists: true, rsoID: results[0].rsoID });
			} else {
				res.status(404).json({ exists: false });
			}
		}
	});
});

// API call to check if an admin is the last admin of the RSO
// Used when leaving RSO
app.post("/check-last-admin", (req, res) => {
	const { adminID, rsoID } = req.body;

	console.log(
		"Checking if admin is the last admin of the RSO: ",
		adminID,
		rsoID
	);

	// Count the number of admins for the given RSO
	const countQuery =
		"SELECT COUNT(*) AS adminCount FROM RSO_Board WHERE rsoID = ?";
	db.query(countQuery, [rsoID], (countErr, countResults) => {
		if (countErr) {
			console.error(countErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			const adminCount = countResults[0].adminCount;

			// Check if the provided admin is the last admin of the RSO
			if (adminCount === 1) {
				// The provided admin is the last admin of the RSO
				res.status(200).json({ lastAdmin: true });
				return;
			} else {
				// There are other admins for the RSO
				res.status(200).json({ lastAdmin: false });
				return;
			}
		}
	});
});

//////////////////////////////
// LEAVE RSO BOARD API////////
//////////////////////////////
app.put("/leave-rso-board", (req, res) => {
	const { adminID, rsoID } = req.body;

	console.log("Admin leaving RSO board: ", adminID, rsoID);

	// Delete the admin from the RSO_Board table
	const deleteQuery = "DELETE FROM RSO_Board WHERE adminID = ? AND rsoID = ?";
	db.query(deleteQuery, [adminID, rsoID], (deleteErr, deleteResults) => {
		if (deleteErr) {
			console.error(deleteErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (deleteResults.affectedRows > 0) {
				// Admin successfully left the RSO board
				res
					.status(200)
					.json({ message: "Admin successfully left the RSO board" });
				return;
			} else {
				// Admin not found on the RSO board
				res.status(404).json({ message: "Admin not found on the RSO board" });
				return;
			}
		}
	});
});

//////////////////////////////
// FOLLOW RSO API/////////////
//////////////////////////////
app.post("/follow-rso", (req, res) => {
	const { userID, rsoID } = req.body;

	console.log("User following RSO: ", userID, rsoID);

	// Check if the user is already following the RSO
	const checkFollowQuery =
		"SELECT * FROM RSO_Members WHERE rsoID = ? AND userID = ?";
	db.query(checkFollowQuery, [rsoID, userID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkResults.length > 0) {
				// User is already following the RSO, send a message indicating that
				res.status(400).json({ message: "User is already following the RSO" });
				return;
			} else {
				// User is not following the RSO, insert the user into RSO_Members table
				const insertQuery =
					"INSERT INTO RSO_Members (rsoID, userID) VALUES (?, ?)";
				db.query(insertQuery, [rsoID, userID], (insertErr, insertResults) => {
					if (insertErr) {
						console.error(insertErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						res
							.status(200)
							.json({ message: "User successfully followed the RSO" });
						return;
					}
				});
			}
		}
	});
});

//////////////////////////////
// UNFOLLOW RSO API///////////
//////////////////////////////
app.post("/unfollow-rso", (req, res) => {
	const { userID, rsoID } = req.body;

	console.log("User unfollowing RSO: ", userID, rsoID);

	// Delete the user from the RSO_Members table
	const deleteQuery = "DELETE FROM RSO_Members WHERE userID = ? AND rsoID = ?";
	db.query(deleteQuery, [userID, rsoID], (deleteErr, deleteResults) => {
		if (deleteErr) {
			console.error(deleteErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (deleteResults.affectedRows > 0) {
				// User successfully unfollowed the RSO
				res
					.status(200)
					.json({ message: "User successfully unfollowed the RSO" });
				return;
			} else {
				// User not found in the RSO
				res.status(404).json({ message: "User not found in the RSO" });
				return;
			}
		}
	});
});

//////////////////////////////
// CREATE RSO EVENT API///////
//////////////////////////////
app.post("/create-rso-event", (req, res) => {
	const {
		adminID,
		adminCode,
		eventName,
		eventDescr,
		eventTime,
		eventLat,
		eventLong,
		eventAddress,
		eventPhone,
		eventEmail,
	} = req.body;

	console.log(
		"RSO board member creating RSO event: ",
		adminID,
		adminCode,
		eventName,
		eventDescr,
		eventTime,
		eventLat,
		eventLong,
		eventAddress,
		eventPhone,
		eventEmail
	);

	// Query to retrieve the rsoID based on the provided adminCode
	const getRSOIDQuery = "SELECT rsoID FROM RSOs WHERE adminCode = ?";
	db.query(getRSOIDQuery, [adminCode], (rsoidErr, rsoidResults) => {
		if (rsoidErr) {
			console.error(rsoidErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (rsoidResults.length === 0) {
				// No RSO found for the provided adminCode
				res
					.status(404)
					.json({ message: "RSO not found for the provided adminCode" });
				return;
			}
			const rsoID = rsoidResults[0].rsoID;

			// Check if the provided admin ID is an RSO admin and board member
			const checkAdminQuery =
				"SELECT * FROM RSO_Admins WHERE adminID = ? AND EXISTS (SELECT * FROM RSO_Board WHERE rsoID = ? AND adminID = ?)";
			db.query(
				checkAdminQuery,
				[adminID, rsoID, adminID],
				(checkErr, checkResults) => {
					if (checkErr) {
						console.error(checkErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						if (checkResults.length > 0) {
							// Admin is an RSO admin and board member, proceed to create the RSO event
							const insertEventQuery =
								"INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
							db.query(
								insertEventQuery,
								[
									eventName,
									eventDescr,
									eventTime,
									eventLat,
									eventLong,
									eventAddress,
									eventPhone,
									eventEmail,
								],
								(insertErr, insertResults) => {
									if (insertErr) {
										console.error(insertErr);
										res.status(500).json({ message: "Internal Server Error" });
										return;
									} else {
										const eventID = insertResults.insertId;
										// Insert the event into the RSO_Events table
										const insertRsoEventQuery =
											"INSERT INTO RSO_Events (eventID, rsoID) VALUES (?, ?)";
										db.query(
											insertRsoEventQuery,
											[eventID, rsoID],
											(insertRsoErr, insertRsoResults) => {
												if (insertRsoErr) {
													console.error(insertRsoErr);
													// Rollback the event creation in the Events table if the RSO event insertion fails
													const deleteEventQuery =
														"DELETE FROM Events WHERE eventID = ?";
													db.query(
														deleteEventQuery,
														[eventID],
														(deleteErr, deleteResults) => {
															if (deleteErr) {
																console.error(deleteErr);
															}
														}
													);
													res
														.status(500)
														.json({ message: "Internal Server Error" });
													return;
												} else {
													res.status(200).json({
														message: "RSO event created successfully",
														eventID: eventID,
													});
													return;
												}
											}
										);
									}
								}
							);
						} else {
							// Admin is not an RSO admin or board member
							res.status(403).json({
								message:
									"You are not authorized to create an RSO event for this RSO",
							});
							return;
						}
					}
				}
			);
		}
	});
});

//////////////////////////////
// EDIT EVENT API/////////////
//////////////////////////////
app.put("/edit-event", (req, res) => {
	const {
		eventID,
		adminID,
		eventName,
		eventDescr,
		eventTime,
		eventLat,
		eventLong,
		eventAddress,
		eventPhone,
		eventEmail,
	} = req.body;

	console.log("Admin editing event with ID: ", eventID);

	// Check if the provided admin ID matches the admin associated with the event in RSO_Events table
	const checkRSOQuery = "SELECT rsoID FROM RSO_Events WHERE eventID = ?";
	db.query(checkRSOQuery, [eventID], (checkRSOErr, checkRSOResults) => {
		if (checkRSOErr) {
			console.error(checkRSOErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkRSOResults.length !== 0) {
				// If it's an RSO event, check if the provided admin is a board member of the associated RSO
				const rsoID = checkRSOResults[0].rsoID;
				const checkAdminBoardQuery =
					"SELECT * FROM RSO_Board WHERE rsoID = ? AND adminID = ?";
				db.query(
					checkAdminBoardQuery,
					[rsoID, adminID],
					(checkAdminBoardErr, checkAdminBoardResults) => {
						if (checkAdminBoardErr) {
							console.error(checkAdminBoardErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							if (checkAdminBoardResults.length === 0) {
								res.status(403).json({
									message: "You are not authorized to edit this event",
								});
								return;
							} else {
								// Update the event details in the Events table
								const updateEventQuery =
									"UPDATE Events SET eventName = ?, eventDescr = ?, eventTime = ?, eventLat = ?, eventLong = ?, eventAddress = ?, eventPhone = ?, eventEmail = ? WHERE eventID = ?";
								db.query(
									updateEventQuery,
									[
										eventName,
										eventDescr,
										eventTime,
										eventLat,
										eventLong,
										eventAddress,
										eventPhone,
										eventEmail,
										eventID,
									],
									(updateEventErr, updateEventResults) => {
										if (updateEventErr) {
											console.error(updateEventErr);
											res
												.status(500)
												.json({ message: "Internal Server Error" });
											return;
										} else {
											// Event successfully updated
											res
												.status(200)
												.json({ message: "Event updated successfully" });
											return;
										}
									}
								);
							}
						}
					}
				);
			} else {
				// If it's not an RSO event, update the event details including setting isApproved to false in University_Events table
				const updateUniEventQuery =
					"UPDATE University_Events SET isApproved = ? WHERE eventID = ?";
				db.query(
					updateUniEventQuery,
					[0, eventID], // Set isApproved to false (or 0)
					(updateUniEventErr, updateUniEventResults) => {
						if (updateUniEventErr) {
							console.error(updateUniEventErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							// University event is unapproved
							// Now, update the event details in the Events table
							const updateEventDetailsQuery =
								"UPDATE Events SET eventName = ?, eventDescr = ?, eventTime = ?, eventLat = ?, eventLong = ?, eventAddress = ?, eventPhone = ?, eventEmail = ? WHERE eventID = ?";
							db.query(
								updateEventDetailsQuery,
								[
									eventName,
									eventDescr,
									eventTime,
									eventLat,
									eventLong,
									eventAddress,
									eventPhone,
									eventEmail,
									eventID,
								],
								(updateEventDetailsErr, updateEventDetailsResults) => {
									if (updateEventDetailsErr) {
										console.error(updateEventDetailsErr);
										res.status(500).json({ message: "Internal Server Error" });
										return;
									} else {
										// Event details successfully updated
										res.status(200).json({
											message: "University event updated successfully",
										});
										return;
									}
								}
							);
						}
					}
				);
			}
		}
	});
});

//////////////////////////////
// DELETE RSO EVENT API///////
//////////////////////////////
app.put("/delete-rso-event", (req, res) => {
	const { adminID, eventID } = req.body;

	console.log("RSO board member deleting RSO event: ", eventID, adminID);

	// Check if the provided admin ID is an RSO admin and board member
	const checkAdminQuery =
		"SELECT * FROM RSO_Admins WHERE adminID = ? AND EXISTS (SELECT * FROM RSO_Board WHERE rsoID = (SELECT rsoID FROM RSO_Events WHERE eventID = ?) AND adminID = ?)";
	db.query(
		checkAdminQuery,
		[adminID, eventID, adminID],
		(checkErr, checkResults) => {
			if (checkErr) {
				console.error(checkErr);
				res.status(500).json({ message: "Internal Server Error" });
				return;
			} else {
				if (checkResults.length > 0) {
					// Admin is an RSO admin and board member, proceed to delete the RSO event
					const deleteEventQuery = "DELETE FROM Events WHERE eventID = ?";
					db.query(deleteEventQuery, [eventID], (deleteErr, deleteResults) => {
						if (deleteErr) {
							console.error(deleteErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							res
								.status(200)
								.json({ message: "RSO event deleted successfully" });
							return;
						}
					});
				} else {
					// Admin is not an RSO admin or board member
					res.status(403).json({
						message: "You are not authorized to delete this RSO event",
					});
					return;
				}
			}
		}
	);
});

//////////////////////////////
// GENERAL EVENT DELETION API/
//////////////////////////////
app.put("/delete-event", (req, res) => {
	const { adminID, eventID } = req.body;

	console.log("Admin deleting event: ", eventID, adminID);

	// Check if the event is an RSO event
	const checkRSOEventQuery = "SELECT * FROM RSO_Events WHERE eventID = ?";
	db.query(checkRSOEventQuery, [eventID], (checkRSOErr, checkRSOResults) => {
		if (checkRSOErr) {
			console.error(checkRSOErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkRSOResults.length > 0) {
				// Event is an RSO event, check if the admin is in the RSO that owns the event
				const rsoID = checkRSOResults[0].rsoID;
				const checkRSOAdminQuery = `
          SELECT * FROM RSO_Admins 
          WHERE adminID = ? 
          AND EXISTS (SELECT * FROM RSO_Board WHERE rsoID = ? AND adminID = ?)
        `;
				db.query(
					checkRSOAdminQuery,
					[adminID, rsoID, adminID],
					(checkRSOAdminErr, checkRSOAdminResults) => {
						if (checkRSOAdminErr) {
							console.error(checkRSOAdminErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							if (checkRSOAdminResults.length > 0) {
								// Admin is in the RSO that owns the event, proceed to delete the event
								const deleteRSOEventQuery =
									"DELETE FROM Events WHERE eventID = ?";
								db.query(
									deleteRSOEventQuery,
									[eventID],
									(deleteRSOErr, deleteRSOResults) => {
										if (deleteRSOErr) {
											console.error(deleteRSOErr);
											res
												.status(500)
												.json({ message: "Internal Server Error" });
											return;
										} else {
											res
												.status(200)
												.json({ message: "RSO event deleted successfully" });
											return;
										}
									}
								);
							} else {
								// Admin is not in the RSO that owns the event
								res.status(403).json({
									message: "You are not authorized to delete this RSO event",
								});
								return;
							}
						}
					}
				);
			} else {
				// Event is not an RSO event, check if the admin is associated with the event (assuming it's a university event)
				const checkUniEventQuery =
					"SELECT * FROM University_Events WHERE eventID = ?";
				db.query(
					checkUniEventQuery,
					[eventID],
					(checkUniErr, checkUniResults) => {
						if (checkUniErr) {
							console.error(checkUniErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							if (checkUniResults.length > 0) {
								// Admin is associated with the university event, proceed to delete the event
								const deleteUniEventQuery =
									"DELETE FROM Events WHERE eventID = ?";
								db.query(
									deleteUniEventQuery,
									[eventID],
									(deleteUniErr, deleteUniResults) => {
										if (deleteUniErr) {
											console.error(deleteUniErr);
											res
												.status(500)
												.json({ message: "Internal Server Error" });
											return;
										} else {
											res.status(200).json({
												message: "University event deleted successfully",
											});
											return;
										}
									}
								);
							} else {
								// Event not found or not associated with any type of event
								res.status(404).json({ message: "Event not found" });
								return;
							}
						}
					}
				);
			}
		}
	});
});

//////////////////////////////
// PROPOSE UNI EVENT API//////
//////////////////////////////
app.post("/propose-university-event", (req, res) => {
	const {
		adminID,
		eventName,
		eventDescr,
		eventTime,
		eventLat,
		eventLong,
		eventAddress,
		eventPhone,
		eventEmail,
		university,
		isPrivate,
	} = req.body;

	console.log(
		"RSO board member proposing university event: ",
		adminID,
		eventName,
		eventDescr,
		eventTime,
		eventLat,
		eventLong,
		eventAddress,
		eventPhone,
		eventEmail,
		university,
		isPrivate
	);

	// Check if the provided admin ID is an RSO admin and board member
	const checkAdminQuery =
		"SELECT * FROM RSO_Admins WHERE adminID = ? AND EXISTS (SELECT * FROM RSO_Board WHERE adminID = ?)";
	db.query(checkAdminQuery, [adminID, adminID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkResults.length > 0) {
				// Admin is an RSO admin and board member, proceed to propose the university event
				const insertEventQuery =
					"INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
				db.query(
					insertEventQuery,
					[
						eventName,
						eventDescr,
						eventTime,
						eventLat,
						eventLong,
						eventAddress,
						eventPhone,
						eventEmail,
					],
					(insertErr, insertResults) => {
						if (insertErr) {
							console.error(insertErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							const eventID = insertResults.insertId;
							// Insert the proposed university event into the University_Events table
							const insertUniversityEventQuery =
								"INSERT INTO University_Events (eventID, adminID, university, isPrivate) VALUES (?, ?, ?, ?)";
							db.query(
								insertUniversityEventQuery,
								[eventID, adminID, university, isPrivate],
								(universityInsertErr, universityInsertResults) => {
									if (universityInsertErr) {
										console.error(universityInsertErr);
										res.status(500).json({ message: "Internal Server Error" });
										return;
									} else {
										res.status(200).json({
											message: "University event proposed successfully",
											eventID: eventID,
										});
										return;
									}
								}
							);
						}
					}
				);
			} else {
				// Admin is not an RSO admin or board member
				res.status(403).json({
					message: "You are not authorized to propose a university event",
				});
				return;
			}
		}
	});
});

//////////////////////////////
// APPROVE UNI EVENT API//////
//////////////////////////////
app.post("/approve-university-event", (req, res) => {
	const { superID, eventID } = req.body;

	console.log("Superadmin approving university event: ", eventID);

	// Check if the provided superadmin ID exists and is a superadmin
	const checkSuperadminQuery = "SELECT * FROM Superadmins WHERE superID = ?";
	db.query(checkSuperadminQuery, [superID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkResults.length > 0) {
				// Superadmin found, proceed to check the university of the superadmin
				const superadminUniversityQuery =
					"SELECT university FROM Users WHERE userID = ?";
				db.query(superadminUniversityQuery, [superID], (uniErr, uniResults) => {
					if (uniErr) {
						console.error(uniErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						const superadminUniversity = uniResults[0].university;
						// Check if the university of the superadmin matches the university of the event
						const eventUniversityQuery =
							"SELECT university FROM University_Events WHERE eventID = ?";
						db.query(
							eventUniversityQuery,
							[eventID],
							(eventUniErr, eventUniResults) => {
								if (eventUniErr) {
									console.error(eventUniErr);
									res.status(500).json({ message: "Internal Server Error" });
									return;
								} else {
									const eventUniversity = eventUniResults[0].university;
									if (superadminUniversity === eventUniversity) {
										// Superadmin's university matches, proceed to approve the university event
										const updateEventQuery =
											"UPDATE University_Events SET isApproved = 1 WHERE eventID = ?";
										db.query(
											updateEventQuery,
											[eventID],
											(updateErr, updateResults) => {
												if (updateErr) {
													console.error(updateErr);
													res
														.status(500)
														.json({ message: "Internal Server Error" });
													return;
												} else {
													res.status(200).json({
														message: "University event approved successfully",
													});
													return;
												}
											}
										);
									} else {
										// Superadmin's university does not match the event's university
										res.status(403).json({
											message:
												"Superadmin's university does not match the event's university",
										});
										return;
									}
								}
							}
						);
					}
				});
			} else {
				// Superadmin not found or unauthorized
				res.status(403).json({
					message: "You are not authorized to approve university events",
				});
				return;
			}
		}
	});
});

//////////////////////////////
// DELETE UNI EVENT API///////
//////////////////////////////
app.put("/delete-university-event", (req, res) => {
	const { eventID, adminID, superID } = req.body;

	console.log("Admin or superadmin deleting university event: ", eventID);

	// Determine user type
	const isSuperadmin = superID !== null && superID > 0;
	const isAdmin = adminID !== null && adminID > 0;

	// Main logic
	if (isSuperadmin) {
		// Superadmin logic
		const getSuperadminUniQuery =
			"SELECT university FROM Users WHERE userID = ?";
		db.query(
			getSuperadminUniQuery,
			[superID],
			(superadminUniErr, superadminUniResults) => {
				if (superadminUniErr) {
					console.error(superadminUniErr);
					res.status(500).json({ message: "Internal Server Error" });
					return;
				}

				if (superadminUniResults.length > 0) {
					const superadminUniversity = superadminUniResults[0].university;

					// Get university of the event
					const getEventUniQuery =
						"SELECT university FROM University_Events WHERE eventID = ?";
					db.query(
						getEventUniQuery,
						[eventID],
						(eventUniErr, eventUniResults) => {
							if (eventUniErr) {
								console.error(eventUniErr);
								res.status(500).json({ message: "Internal Server Error" });
								return;
							}

							if (eventUniResults.length > 0) {
								const eventUniversity = eventUniResults[0].university;

								// Check if universities match
								if (superadminUniversity === eventUniversity) {
									const deleteEventQuery =
										"DELETE FROM Events WHERE eventID = ?";
									db.query(
										deleteEventQuery,
										[eventID],
										(deleteErr, deleteResults) => {
											if (deleteErr) {
												console.error(deleteErr);
												res
													.status(500)
													.json({ message: "Internal Server Error" });
												return;
											} else {
												res.status(200).json({
													message: "University event deleted successfully",
												});
												return;
											}
										}
									);
								} else {
									res.status(403).json({
										message:
											"Superadmin is not permitted to delete the university event",
									});
									return;
								}
							} else {
								res.status(404).json({ message: "Event not found" });
								return;
							}
						}
					);
				} else {
					res.status(404).json({ message: "Superadmin university not found" });
					return;
				}
			}
		);
	} else if (isAdmin) {
		// Admin logic
		const checkProposerQuery =
			"SELECT COUNT(*) AS isProposer FROM University_Events WHERE eventID = ? AND adminID = ?";
		db.query(
			checkProposerQuery,
			[eventID, adminID],
			(proposerErr, proposerResults) => {
				if (proposerErr) {
					console.error(proposerErr);
					res.status(500).json({ message: "Internal Server Error" });
					return;
				}

				if (proposerResults.length > 0 && proposerResults[0].isProposer > 0) {
					// Admin is the proposer, proceed to delete the event
					const deleteEventQuery = "DELETE FROM Events WHERE eventID = ?";
					db.query(deleteEventQuery, [eventID], (deleteErr, deleteResults) => {
						if (deleteErr) {
							console.error(deleteErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							res
								.status(200)
								.json({ message: "University event deleted successfully" });
							return;
						}
					});
				} else {
					res.status(403).json({
						message: "Admin is not the proposer of the university event",
					});
					return;
				}
			}
		);
	} else {
		// Unauthorized user
		res
			.status(403)
			.json({ message: "You are not authorized to delete university events" });
		return;
	}
});

//////////////////////////////
// UNAPPROVED EVENT LOAD API//
//////////////////////////////
app.post("/load-unapproved-events", (req, res) => {
	const { university, superID, adminID } = req.body;

	// Check if the provided superadmin ID is valid
	const checkSuperadminQuery = "SELECT * FROM Superadmins WHERE superID = ?";
	db.query(checkSuperadminQuery, [superID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkResults.length > 0) {
				// Superadmin found, load unapproved events for the university
				const loadUnapprovedQuery = `
          SELECT ue.*, e.*, u.username AS adminUsername
          FROM University_Events ue
          INNER JOIN Events e ON ue.eventID = e.eventID
          INNER JOIN RSO_Admins ra ON ue.adminID = ra.adminID
          INNER JOIN Users u ON ra.userID = u.userID
          WHERE ue.university = ? AND ue.isApproved = 0
        `;
				db.query(loadUnapprovedQuery, [university], (loadErr, loadResults) => {
					if (loadErr) {
						console.error(loadErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						res.status(200).json({ unapprovedEvents: loadResults });
						return;
					}
				});
			} else {
				// Check if the provided admin ID is an RSO admin
				const checkRSOAdminQuery = "SELECT * FROM RSO_Admins WHERE adminID = ?";
				db.query(checkRSOAdminQuery, [adminID], (adminErr, adminResults) => {
					if (adminErr) {
						console.error(adminErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						if (adminResults.length > 0) {
							// Admin is an RSO admin, load university events proposed by the admin
							const loadProposedQuery = `
              SELECT ue.*, e.*, u.username AS adminUsername
              FROM University_Events ue
              INNER JOIN Events e ON ue.eventID = e.eventID
              LEFT JOIN RSO_Admins ra ON ue.adminID = ra.adminID
              LEFT JOIN Users u ON ra.userID = u.userID
              WHERE (ue.adminID = ? AND ue.isApproved = 0)
              `;
							db.query(
								loadProposedQuery,
								[adminID, adminID],
								(loadProposedErr, loadProposedResults) => {
									if (loadProposedErr) {
										console.error(loadProposedErr);
										res.status(500).json({ message: "Internal Server Error" });
										return;
									} else {
										res
											.status(200)
											.json({ unapprovedEvents: loadProposedResults });
										return;
									}
								}
							);
						} else {
							// Invalid superadmin and not an RSO admin
							res.status(403).json({ message: "Unauthorized access" });
							return;
						}
					}
				});
			}
		}
	});
});

//////////////////////////////
// SCHEDULE EVENT API/////////
//////////////////////////////
app.post("/schedule-event", (req, res) => {
	const { userID, eventID } = req.body;

	console.log("Scheduling event for user: ", eventID);

	// Check if the provided user ID exists
	const checkUserQuery = "SELECT * FROM Users WHERE userID = ?";
	db.query(checkUserQuery, [userID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkResults.length > 0) {
				// User found, proceed to schedule the event for the user
				const scheduleEventQuery =
					"INSERT INTO Scheduled_Events (userID, eventID) VALUES (?, ?)";
				db.query(
					scheduleEventQuery,
					[userID, eventID],
					(scheduleErr, scheduleResults) => {
						if (scheduleErr) {
							console.error(scheduleErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							res
								.status(200)
								.json({ message: "Event scheduled successfully for user" });
							return;
						}
					}
				);
			} else {
				// User not found
				res.status(404).json({ message: "User not found" });
				return;
			}
		}
	});
});

//////////////////////////////
// UNSCHEDULE EVENT API///////
//////////////////////////////
app.post("/unschedule-event", (req, res) => {
	const { userID, eventID } = req.body;

	console.log("Unscheduling event for user: ", eventID);

	// Check if the provided user ID exists
	const checkUserQuery = "SELECT * FROM Users WHERE userID = ?";
	db.query(checkUserQuery, [userID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkResults.length > 0) {
				// User found, proceed to unschedule the event for the user
				const unscheduleEventQuery =
					"DELETE FROM Scheduled_Events WHERE userID = ? AND eventID = ?";
				db.query(
					unscheduleEventQuery,
					[userID, eventID],
					(unscheduleErr, unscheduleResults) => {
						if (unscheduleErr) {
							console.error(unscheduleErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							res
								.status(200)
								.json({ message: "Event unscheduled successfully for user" });
							return;
						}
					}
				);
			} else {
				// User not found
				res.status(404).json({ message: "User not found" });
				return;
			}
		}
	});
});

//////////////////////////////
// WRITE REVIEW API///////////
//////////////////////////////
app.post("/review-event", (req, res) => {
	const { userID, eventID, comment, reviewRating } = req.body;

	console.log("User writing review for event with ID: ", eventID);

	// Check if the event exists
	const checkEventQuery = "SELECT * FROM Events WHERE eventID = ?";
	db.query(checkEventQuery, [eventID], (checkEventErr, checkEventResults) => {
		if (checkEventErr) {
			console.error(checkEventErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkEventResults.length === 0) {
				res.status(404).json({ message: "Event not found" });
				return;
			} else {
				// Event found, proceed to check if the user already has a review for the event
				const checkReviewQuery =
					"SELECT * FROM Event_Reviews WHERE userID = ? AND eventID = ?";
				db.query(
					checkReviewQuery,
					[userID, eventID],
					(checkReviewErr, checkReviewResults) => {
						if (checkReviewErr) {
							console.error(checkReviewErr);
							res.status(500).json({ message: "Internal Server Error" });
							return;
						} else {
							// If a review exists, delete the old review
							if (checkReviewResults.length > 0) {
								const deleteReviewQuery =
									"DELETE FROM Event_Reviews WHERE userID = ? AND eventID = ?";
								db.query(
									deleteReviewQuery,
									[userID, eventID],
									(deleteErr, deleteResults) => {
										if (deleteErr) {
											console.error(deleteErr);
											res
												.status(500)
												.json({ message: "Internal Server Error" });
											return;
										} else {
											// Proceed to insert the new review
											const insertReviewQuery =
												"INSERT INTO Event_Reviews (userID, eventID, comment, reviewRating) VALUES (?, ?, ?, ?)";
											db.query(
												insertReviewQuery,
												[userID, eventID, comment, reviewRating],
												(insertReviewErr, insertReviewResults) => {
													if (insertReviewErr) {
														console.error(insertReviewErr);
														res
															.status(500)
															.json({ message: "Internal Server Error" });
														return;
													} else {
														// Review successfully written
														res
															.status(200)
															.json({ message: "Review written successfully" });
														return;
													}
												}
											);
										}
									}
								);
							} else {
								// No old review found, proceed to insert the new review
								const insertReviewQuery =
									"INSERT INTO Event_Reviews (userID, eventID, comment, reviewRating) VALUES (?, ?, ?, ?)";
								db.query(
									insertReviewQuery,
									[userID, eventID, comment, reviewRating],
									(insertReviewErr, insertReviewResults) => {
										if (insertReviewErr) {
											console.error(insertReviewErr);
											res
												.status(500)
												.json({ message: "Internal Server Error" });
											return;
										} else {
											// Review successfully written
											res
												.status(200)
												.json({ message: "Review written successfully" });
											return;
										}
									}
								);
							}
						}
					}
				);
			}
		}
	});
});

//////////////////////////////
// EDIT REVIEW API////////////
//////////////////////////////
app.put("/edit-review", (req, res) => {
	const { userID, eventID, comment, reviewRating } = req.body;

	console.log("User editing review for event with ID: ", eventID);

	// Check if the user "owns" the review
	const checkOwnershipQuery =
		"SELECT * FROM Event_Reviews WHERE userID = ? AND eventID = ?";
	db.query(
		checkOwnershipQuery,
		[userID, eventID],
		(checkOwnershipErr, checkOwnershipResults) => {
			if (checkOwnershipErr) {
				console.error(checkOwnershipErr);
				res.status(500).json({ message: "Internal Server Error" });
				return;
			} else {
				if (checkOwnershipResults.length === 0) {
					res
						.status(403)
						.json({ message: "You are not authorized to edit this review" });
					return;
				} else {
					// User owns the review, proceed to update the review
					const updateReviewQuery =
						"UPDATE Event_Reviews SET comment = ?, reviewRating = ? WHERE userID = ? AND eventID = ?";
					db.query(
						updateReviewQuery,
						[comment, reviewRating, userID, eventID],
						(updateReviewErr, updateReviewResults) => {
							if (updateReviewErr) {
								console.error(updateReviewErr);
								res.status(500).json({ message: "Internal Server Error" });
								return;
							} else {
								// Review successfully updated
								res
									.status(200)
									.json({ message: "Review updated successfully" });
								return;
							}
						}
					);
				}
			}
		}
	);
});

//////////////////////////////
// DELETE REVIEW API//////////
//////////////////////////////
app.put("/delete-review", (req, res) => {
	const { userID, eventID } = req.body;

	console.log("User deleting review for event with ID: ", eventID);

	// Check if the user "owns" the review
	const checkOwnershipQuery =
		"SELECT * FROM Event_Reviews WHERE userID = ? AND eventID = ?";
	db.query(
		checkOwnershipQuery,
		[userID, eventID],
		(checkOwnershipErr, checkOwnershipResults) => {
			if (checkOwnershipErr) {
				console.error(checkOwnershipErr);
				res.status(500).json({ message: "Internal Server Error" });
				return;
			} else {
				if (checkOwnershipResults.length === 0) {
					res
						.status(403)
						.json({ message: "You are not authorized to delete this review" });
					return;
				} else {
					// User owns the review, proceed to delete the review
					const deleteReviewQuery =
						"DELETE FROM Event_Reviews WHERE userID = ? AND eventID = ?";
					db.query(
						deleteReviewQuery,
						[userID, eventID],
						(deleteReviewErr, deleteReviewResults) => {
							if (deleteReviewErr) {
								console.error(deleteReviewErr);
								res.status(500).json({ message: "Internal Server Error" });
								return;
							} else {
								// Review successfully deleted
								res
									.status(200)
									.json({ message: "Review deleted successfully" });
								return;
							}
						}
					);
				}
			}
		}
	);
});

//////////////////////////////
//AUTOLOAD EVENT REVIEWS API//
//////////////////////////////
app.post("/load-event-reviews", (req, res) => {
	const { eventID } = req.body;

	const query = "SELECT * FROM Event_Reviews WHERE eventID = ?";
	db.query(query, [eventID], (err, results) => {
		if (err) {
			console.error("Error fetching event reviews:", err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		}
		res.status(200).json({ eventReviews: results });
	});
});

//////////////////////////////
//AUTOLOAD PUBLIC EVENTS API//
//////////////////////////////
app.post("/autoload-public-events", (req, res) => {
	const { adminID } = req.body;
	console.log("Loading public events with admin ID: ", adminID);
	const query = `
    SELECT 
      events.*, university_events.isPrivate, university_events.isApproved, 'university' AS source, universities.university AS hostName,
      (CASE
        WHEN EXISTS (
          SELECT 1 FROM University_Events WHERE eventID = events.eventID AND adminID = ?
        ) THEN 1
        ELSE 0
      END) AS isOwner
    FROM Events events
    INNER JOIN University_Events university_events ON events.eventID = university_events.eventID
    INNER JOIN Universities universities ON university_events.university = universities.university
    WHERE university_events.isPrivate = 0 AND university_events.isApproved = 1
  `;
	db.query(query, [adminID], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		}
		console.log(results);
		res.status(200).json({ events: results });
	});
});
//////////////////////////////
//AUTOLOAD UNI EVENTS API/////
//////////////////////////////
app.post("/autoload-university-events", (req, res) => {
	const { university, adminID } = req.body;
	console.log("Loading uni events with details: ", university, adminID);
	const query = `
    SELECT 
      events.*, 'university' AS source, Universities.university AS hostName,
      (CASE
        WHEN EXISTS (
          SELECT 1 FROM University_Events WHERE eventID = events.eventID AND adminID = ?
        ) THEN 1
        ELSE 0
      END) AS isOwner
    FROM Events events
    INNER JOIN University_Events university_events ON events.eventID = university_events.eventID
    INNER JOIN Universities ON university_events.university = Universities.university
    WHERE university_events.university = ? AND university_events.isApproved = 1
    UNION
    SELECT 
      events.*, 'RSO' AS source, RSOs.rsoName AS hostName,
      (CASE
        WHEN EXISTS (
          SELECT 1 FROM RSO_Events WHERE eventID = events.eventID AND EXISTS (SELECT 1 FROM RSO_Members WHERE rsoID = RSOs.rsoID AND userID = ?)
        ) THEN 1
        ELSE 0
      END) AS isOwner
    FROM Events events
    INNER JOIN RSO_Events rso_events ON events.eventID = rso_events.eventID
    INNER JOIN RSOs ON rso_events.rsoID = RSOs.rsoID
    WHERE RSOs.university = ?
  `;
	db.query(
		query,
		[adminID, university, adminID, university],
		(err, results) => {
			if (err) {
				console.error(err);
				res.status(500).json({ message: "Internal Server Error" });
				return;
			}
			console.log(results);
			res.status(200).json({ events: results });
		}
	);
});

//////////////////////////////
//AUTOLOAD RSO EVENTS API/////
//////////////////////////////
app.post("/autoload-rso-events", (req, res) => {
	const { userID, adminID } = req.body;
	//   console.log("Loading rso events with details: ", university, adminID);
	const query = `
    SELECT 
      e.*, 'RSO' AS source, rso.rsoName AS hostName,
      (CASE
        WHEN EXISTS (
          SELECT 1 FROM RSO_Board WHERE rsoID IN (SELECT rsoID FROM RSO_Events WHERE eventID = e.eventID) AND adminID = ?
        ) THEN 1
        ELSE 0
      END) AS isOwner
    FROM Events e
    INNER JOIN RSO_Events rsoe ON e.eventID = rsoe.eventID
    INNER JOIN RSOs rso ON rsoe.rsoID = rso.rsoID
    INNER JOIN RSO_Members rsm ON rso.rsoID = rsm.rsoID
    WHERE rsm.userID = ?
  `;
	db.query(query, [adminID, userID], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		}
		console.log(results);
		res.status(200).json({ events: results });
	});
});

//////////////////////////////
//AUTOLOAD SCHEDULED EVENT API
//////////////////////////////
app.post("/autoload-scheduled-events", (req, res) => {
	const { userID, adminID } = req.body;
	console.log("Loading scheduled events with details: ", userID, adminID);
	// Check if the provided user ID exists
	const checkUserQuery = "SELECT * FROM Users WHERE userID = ?";
	db.query(checkUserQuery, [userID], (checkErr, checkResults) => {
		if (checkErr) {
			console.error(checkErr);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		} else {
			if (checkResults.length > 0) {
				// User found, proceed to load scheduled events within the specified range
				const loadEventsQuery = `
          SELECT 
            s.*, e.*, 
            CASE 
              WHEN e.eventID IN (SELECT eventID FROM University_Events) THEN 'university'
              WHEN e.eventID IN (SELECT eventID FROM RSO_Events) THEN 'RSO'
            END AS source,
            CASE 
              WHEN e.eventID IN (SELECT eventID FROM University_Events) THEN (SELECT university FROM University_Events WHERE eventID = e.eventID)
              WHEN e.eventID IN (SELECT eventID FROM RSO_Events) THEN (SELECT rsoName FROM RSOs JOIN RSO_Events ON RSOs.rsoID = RSO_Events.rsoID WHERE RSO_Events.eventID = e.eventID)
            END AS hostName,
            (CASE
              WHEN EXISTS (
                SELECT 1 FROM RSO_Board WHERE rsoID IN (SELECT rsoID FROM RSO_Events WHERE eventID = e.eventID) AND adminID = ?
              ) THEN 1
              ELSE 0
            END) AS isOwner
          FROM Scheduled_Events s
          INNER JOIN events e ON s.eventID = e.eventID
          WHERE s.userID = ?
        `;
				db.query(loadEventsQuery, [adminID, userID], (loadErr, results) => {
					if (loadErr) {
						console.error(loadErr);
						res.status(500).json({ message: "Internal Server Error" });
						return;
					} else {
						console.log(results);
						res.status(200).json({ events: results });
						return;
					}
				});
			} else {
				// User not found
				res.status(404).json({ message: "User not found" });
				return;
			}
		}
	});
});

//////////////////////////////
/////////SEARCH SUPERADMIN API
//////////////////////////////
app.post("/find-superadmin", (req, res) => {
	const { university } = req.body;

	// SQL query to retrieve superadmin information based on the provided university name
	const query = `
        SELECT u.username, u.email, s.uniDescr, s.uniLat, s.uniLong
        FROM Superadmins s
        INNER JOIN Users u ON s.userID = u.userID
        WHERE u.university = ?
    `;

	// Execute the SQL query
	db.query(query, [university], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		}
		if (results.length === 0) {
			res
				.status(404)
				.json({ message: "Superadmin not found for the specified university" });
			return;
		}
		res.status(200).json({ superadmin: results[0] });
	});
});

//////////////////////////////
////////////////SEARCH RSO API
//////////////////////////////
app.post("/find-rso", (req, res) => {
	const { rsoName } = req.body;

	// SQL query to retrieve RSO information based on the provided rsoName
	const query = `
        SELECT *
        FROM RSOs
        WHERE rsoName = ?
    `;

	// Execute the SQL query
	db.query(query, [rsoName], (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Internal Server Error" });
			return;
		}
		if (results.length === 0) {
			res
				.status(404)
				.json({ message: "RSO not found for the specified rsoName" });
			return;
		}
		res.status(200).json({ rso: results[0] });
	});
});

//////////////////////////////
////////////GENERAL SEARCH API
//////////////////////////////
app.post("/search-events", (req, res) => {
	const { userID, searchString } = req.body;

	// SQL query to search events
	const query = `
    SELECT *
    FROM (
        SELECT e.*, ue.university, 'RSO' AS eventType, re.rsoID, re.rsoName, re.rsoDescr
        FROM RSO_Events re
        JOIN Events e ON re.eventID = e.eventID
        JOIN University_Events ue ON e.eventID = ue.eventID
        WHERE ue.university = (SELECT university FROM Users WHERE userID = ?)
        UNION ALL
        SELECT e.*, ue.university, 'University' AS eventType, NULL AS rsoID, NULL AS rsoName, NULL AS rsoDescr
        FROM University_Events ue
        JOIN Events e ON ue.eventID = e.eventID
        WHERE ue.isPrivate = 0 AND ue.isApproved = 1
    ) AS CombinedEvents
    WHERE (
        eventName LIKE ? OR
        eventDescr LIKE ? OR
        rsoName LIKE ? OR
        rsoDescr LIKE ? OR
        university LIKE ?
    )
  `;
	const searchStr = `%${searchString}%`;

	db.query(
		query,
		[userID, searchStr, searchStr, searchStr, searchStr],
		(err, results) => {
			if (err) {
				console.error(err);
				res.status(500).json({ message: "Internal Server Error" });
				return;
			}
			res.status(200).json({ events: results });
		}
	);
});

//=======================================

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
