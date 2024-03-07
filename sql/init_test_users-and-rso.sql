-- Insert Superadmin
INSERT INTO Users (username, password, email, university)
VALUES ('superadmin', 'superadminpassword', 'superadmin@example.com', 'Test University');

SET @superadmin_id = LAST_INSERT_ID();

INSERT INTO Superadmins (userID, uniDescr, uniLat, uniLong)
VALUES (@superadmin_id, 'Test University Description', 0.0, 0.0);

-- Insert RSO Admin
INSERT INTO Users (username, password, email, university)
VALUES ('rsoadmin', 'rsoadminpassword', 'rsoadmin@example.com', 'Test University');

SET @rsoadmin_userid = LAST_INSERT_ID();

INSERT INTO RSO_Admins (userID)
VALUES (@rsoadmin_userid);

SET @rsoadmin_id = LAST_INSERT_ID();

-- Create RSO
INSERT INTO RSOs (rsoCode, adminCode, rsoName, rsoDescr, university)
VALUES ('rso123', 'admin123', 'Test RSO', 'Test RSO Description', 'Test University');

SET @rso_id = LAST_INSERT_ID();

-- Insert RSO admin into RSO Board
INSERT INTO RSO_Board (rsoID, adminID)
VALUES (@rso_id, @rsoadmin_id);

-- Insert RSO admin into RSO Members
INSERT INTO RSO_Members (rsoID, userID)
VALUES (@rso_id, @rsoadmin_id);

-- Insert Normal Users
INSERT INTO Users (username, password, email, university)
VALUES ('user1', 'user1password', 'user1@example.com', 'Test University');

INSERT INTO Users (username, password, email, university)
VALUES ('user2', 'user2password', 'user2@example.com', 'Test University');

INSERT INTO Users (username, password, email, university)
VALUES ('user3', 'user3password', 'user3@example.com', 'Test University');

INSERT INTO Users (username, password, email, university)
VALUES ('user4', 'user4password', 'user4@example.com', 'Test University');

SET @rso_id = (SELECT rsoID FROM RSOs WHERE rsoCode = 'rso123');

SELECT @rso_id;

-- Insert RSO members
INSERT INTO RSO_Members (rsoID, userID)
VALUES (@rso_id, (SELECT userID FROM Users WHERE username = 'user1')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user2')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user3')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user4'));

