-- Insert Superadmin
INSERT INTO Users (username, password, phone, email, university)
VALUES ('superadmin', 'superadminpassword', '352-123-4567', 'superadmin@uf.edu.net', 'UF');

SET @superadmin_id = LAST_INSERT_ID();

INSERT INTO Superadmins (userID, uniDescr, uniLat, uniLong)
VALUES (@superadmin_id, 'University of Florida Description', 29.6516, -82.3248);

-- Insert RSO Admin
INSERT INTO Users (username, password, phone, email, university)
VALUES ('rsoadmin', 'rsoadminpassword', '407-987-6543', 'rsoadmin@ucf.edu', 'UCF');

SET @rsoadmin_userid = LAST_INSERT_ID();

INSERT INTO RSO_Admins (userID)
VALUES (@rsoadmin_userid);

SET @rsoadmin_id = LAST_INSERT_ID();

-- Create RSO
INSERT INTO RSOs (rsoCode, adminCode, rsoName, rsoDescr, university)
VALUES ('rso123', 'admin123', 'Test RSO', 'Test RSO Description', 'UF');

SET @rso_id = LAST_INSERT_ID();

-- Insert RSO admin into RSO Board
INSERT INTO RSO_Board (rsoID, adminID)
VALUES (@rso_id, @rsoadmin_id);

-- Insert RSO admin into RSO Members
INSERT INTO RSO_Members (rsoID, userID)
VALUES (@rso_id, @rsoadmin_id);

-- Insert Normal Users
INSERT INTO Users (username, password, phone, email, university)
VALUES ('user1', 'user1password', '352-111-2222', 'user1@uf.edu.net', 'UF');

INSERT INTO Users (username, password, phone, email, university)
VALUES ('user2', 'user2password', '407-222-3333', 'user2@ucf.edu', 'UCF');

INSERT INTO Users (username, password, phone, email, university)
VALUES ('user3', 'user3password', '352-333-4444', 'user3@uf.edu.net', 'UF');

INSERT INTO Users (username, password, phone, email, university)
VALUES ('user4', 'user4password', '407-444-5555', 'user4@ucf.edu', 'UCF');

SET @rso_id = (SELECT rsoID FROM RSOs WHERE rsoCode = 'rso123');

SELECT @rso_id;

-- Insert RSO members
INSERT INTO RSO_Members (rsoID, userID)
VALUES (@rso_id, (SELECT userID FROM Users WHERE username = 'user1')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user2')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user3')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user4'));
