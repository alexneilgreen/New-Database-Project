-- Insert Superadmin
INSERT INTO Users (username, password, phone, email, university)
VALUES ('superadmin', 'superadminpassword', '012-345-6789','superadmin@example.com', 'Test University');

SET @superadmin_id = LAST_INSERT_ID();

INSERT INTO Superadmins (userID, uniDescr, uniLat, uniLong)
VALUES (@superadmin_id, 'Test University Description', 0.0, 0.0);

-- Insert RSO Admin
INSERT INTO Users (username, password, phone, email, university)
VALUES ('rsoadmin', 'rsoadminpassword', '0987-654-321', 'rsoadmin@example.com', 'Test University');

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
INSERT INTO Users (username, password, phone, email, university)
VALUES ('user1', 'user1password', '111-111-1111', 'user1@example.com', 'Test University');

INSERT INTO Users (username, password, phone, email, university)
VALUES ('user2', 'user2password', '222-222-2222', 'user2@example.com', 'Test University');

INSERT INTO Users (username, password, phone, email, university)
VALUES ('user3', 'user3password', '333-333-3333', 'user3@example.com', 'Test University');

INSERT INTO Users (username, password, phone, email, university)
VALUES ('user4', 'user4password', '444-444-4444', 'user4@example.com', 'Test University');

SET @rso_id = (SELECT rsoID FROM RSOs WHERE rsoCode = 'rso123');

SELECT @rso_id;

-- Insert RSO members
INSERT INTO RSO_Members (rsoID, userID)
VALUES (@rso_id, (SELECT userID FROM Users WHERE username = 'user1')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user2')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user3')),
       (@rso_id, (SELECT userID FROM Users WHERE username = 'user4'));

