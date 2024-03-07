-- Find the RSO adminID
SET @rso_admin_id = (SELECT adminID FROM RSO_Admins LIMIT 1);

-- Create RSO event
INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail)
VALUES ('RSO Event', 'Test RSO Event Description', '2024-03-06 13:00:00', 0.0, 0.0, 'RSO Event Address', '123456789', 'rso@example.com');

SET @rso_event_id = LAST_INSERT_ID();

-- Create RSO_Events entry
INSERT INTO RSO_Events (eventID, rsoID)
VALUES (@rso_event_id, (SELECT rsoID FROM RSOs WHERE rsoCode = 'rso123'));

-- Create two university events (isApproved = false initially)
INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail)
VALUES ('University Event 1', 'Test University Event Description 1', '2024-03-06 13:00:00', 0.0, 0.0, 'University Event Address 1', '123456789', 'uni1@example.com');

SET @uni_event1_id = LAST_INSERT_ID();

INSERT INTO University_Events (eventID, university, isPrivate, isApproved)
VALUES (@uni_event1_id, 'Test University', TRUE, FALSE);

INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail)
VALUES ('University Event 2', 'Test University Event Description 2', '2024-03-06 13:00:00', 0.0, 0.0, 'University Event Address 2', '123456789', 'uni2@example.com');

SET @uni_event2_id = LAST_INSERT_ID();

INSERT INTO University_Events (eventID, university, isPrivate, isApproved)
VALUES (@uni_event2_id, 'Test University', FALSE, FALSE);

-- Change isApproved values for university events to true
UPDATE University_Events SET isApproved = TRUE WHERE eventID = @uni_event1_id;
UPDATE University_Events SET isApproved = TRUE WHERE eventID = @uni_event2_id;

-- Add RSO event to Scheduled_Events for second and third RSO members
INSERT INTO Scheduled_Events (userID, eventID)
SELECT userID, @rso_event_id 
FROM RSO_Members 
WHERE rsoID = @rso_id
LIMIT 2 OFFSET 1;
