CREATE DATABASE cop4710db;

use cop4710db;

-- Users table
CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    university VARCHAR(100) NOT NULL
);

-- RSO_Admins table
CREATE TABLE RSO_Admins (
    adminID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Superadmins table
CREATE TABLE Superadmins (
    superID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    uniDescr VARCHAR(100),
    uniLat DECIMAL(10, 8),
    uniLong DECIMAL(11, 8),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- University table
CREATE TABLE Universities (
    uniID INT AUTO_INCREMENT PRIMARY KEY,
    university VARCHAR(100) NOT NULL
);

-- RSOs table
CREATE TABLE RSOs (
    rsoID INT AUTO_INCREMENT PRIMARY KEY,
    rsoCode VARCHAR(50) NOT NULL,
    adminCode VARCHAR(50) NOT NULL,
    rsoName VARCHAR(100) NOT NULL,
    rsoDescr VARCHAR(200),
    university VARCHAR(100) NOT NULL,
    isActive TINYINT NOT NULL DEFAULT 0
);

-- RSO_Board table
CREATE TABLE RSO_Board (
    rsoID INT,
    adminID INT,
    FOREIGN KEY (rsoID) REFERENCES RSOs(rsoID) ON DELETE CASCADE,
    FOREIGN KEY (adminID) REFERENCES RSO_Admins(adminID) ON DELETE CASCADE,
    PRIMARY KEY (rsoID, adminID)
);

-- RSO_Members table
CREATE TABLE RSO_Members (
    rsoID INT,
    userID INT,
    FOREIGN KEY (rsoID) REFERENCES RSOs(rsoID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    PRIMARY KEY (rsoID, userID)
);

-- Events table (parent table)
CREATE TABLE Events (
    eventID INT AUTO_INCREMENT PRIMARY KEY,
    eventName VARCHAR(100) NOT NULL,
    eventDescr VARCHAR(200),
    eventTime VARCHAR(50),
    eventLat DECIMAL(10, 8),
    eventLong DECIMAL(11, 8),
    eventAddress VARCHAR(255),
    eventPhone VARCHAR(20),
    eventEmail VARCHAR(100)
);

-- RSO_Events table (child table)
CREATE TABLE RSO_Events (
    eventID INT PRIMARY KEY,
    rsoID INT,
    FOREIGN KEY (eventID) REFERENCES Events(eventID) ON DELETE CASCADE,
    FOREIGN KEY (rsoID) REFERENCES RSOs(rsoID) ON DELETE CASCADE
);

-- University_Events table (child table)
CREATE TABLE University_Events (
    eventID INT PRIMARY KEY,
    university VARCHAR(100),
    isPrivate TINYINT NOT NULL,
    isApproved TINYINT DEFAULT 0,
    FOREIGN KEY (eventID) REFERENCES Events(eventID) ON DELETE CASCADE
);

-- Scheduled_Events table
CREATE TABLE Scheduled_Events (
    userID INT,
    eventID INT,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (eventID) REFERENCES Events(eventID) ON DELETE CASCADE,
    PRIMARY KEY (userID, eventID)
);

-- Event_Reviews table
CREATE TABLE Event_Reviews (
    reviewID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    eventID INT NOT NULL,
    comment VARCHAR(200),
    reviewRating INT CHECK (reviewRating >= 1 AND reviewRating <= 5),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (eventID) REFERENCES Events(eventID) ON DELETE CASCADE
);

DELIMITER //
CREATE TRIGGER SetRSOActive AFTER INSERT ON RSO_Members
FOR EACH ROW
BEGIN
    DECLARE member_count INT;
    SELECT COUNT(*) INTO member_count FROM RSO_Members WHERE rsoID = NEW.rsoID;
    IF member_count >= 5 THEN
        UPDATE RSOs SET isActive = TRUE WHERE rsoID = NEW.rsoID;
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER SetRSOInactive AFTER DELETE ON RSO_Members
FOR EACH ROW
BEGIN
    DECLARE member_count INT;
    SELECT COUNT(*) INTO member_count FROM RSO_Members WHERE rsoID = OLD.rsoID;
    IF member_count < 5 THEN
        UPDATE RSOs SET isActive = FALSE WHERE rsoID = OLD.rsoID;
    END IF;
END;
//
DELIMITER ;