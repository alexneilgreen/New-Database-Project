-- Find the RSO adminID
SET @rso_admin_id = (SELECT adminID FROM RSO_Admins LIMIT 1);

-- Create RSO event
INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail)
VALUES ('SU Meetup', 'Student Body Meetup at the UCF Student Union', '2024-03-06 13:00:00', 28.6016, -81.2005, 'UCF Student Union', '123-456-7890', 'rso@example.com');

SET @rso_event_id = LAST_INSERT_ID();

-- Create RSO_Events entry
INSERT INTO RSO_Events (eventID, rsoID)
VALUES (@rso_event_id, (SELECT rsoID FROM RSOs WHERE rsoCode = 'rso123'));

set @rso_admin_userID = (SELECT userID FROM RSO_Admins WHERE adminID = @rso_admin_id);

INSERT INTO Event_Reviews (userID, eventID, comment, reviewRating)
VALUES (@rso_admin_userID, @rso_event_id, 'Great Event!', 5);

-- Create two university events (isApproved = false initially)
INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail)
VALUES ('UCF Meet and Greet', 'Meet and Greet the Leading Staff at UCF!', '2024-03-06 15:00:00', 28.6016, -81.2005, 'UCF Main Campus', '407-123-4567', 'UCF@ucf.edu');

SET @uni_event1_id = LAST_INSERT_ID();

INSERT INTO University_Events (eventID, adminID, university, isPrivate, isApproved)
VALUES (@uni_event1_id, @rso_admin_id, 'UCF', TRUE, FALSE);

INSERT INTO Events (eventName, eventDescr, eventTime, eventLat, eventLong, eventAddress, eventPhone, eventEmail)
VALUES ('UF Meet and Greet', 'Meet and Greet the Leading Staff at UF!', '2024-03-06 15:00:00', 29.6516, -82.3248, 'UF Main Campus', '352-123-4567', 'UCF@ucf.edu');

SET @uni_event2_id = LAST_INSERT_ID();

INSERT INTO University_Events (eventID, adminID, university, isPrivate, isApproved)
VALUES (@uni_event2_id, 2, 'UF', FALSE, FALSE);

-- Change isApproved values for university events to true
UPDATE University_Events SET isApproved = TRUE WHERE eventID = @uni_event1_id;
UPDATE University_Events SET isApproved = TRUE WHERE eventID = @uni_event2_id;

-- Add RSO event to Scheduled_Events for second and third RSO members
INSERT INTO Scheduled_Events (userID, eventID)
SELECT userID, @rso_event_id 
FROM RSO_Members 
WHERE rsoID = @rso_id
LIMIT 2 OFFSET 1;
