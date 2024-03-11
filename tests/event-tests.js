const axios = require("axios");

let testUserId;
let testAdminId;
let testSuperadminId;
let testProposedEventId;
let testEventId;

const handleError = (error) => {
  if (error.response && error.response.data) {
    console.error("Error:", error.response.data);
  } else if (error.message) {
    console.error("Error:", error.message);
  } else {
    console.error("An unknown error occurred");
  }
};

const testRegisterUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/register-user",
        userData
      );
      console.log("Register User API Response:", response.data);
      testUserId = response.data.userID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testDeleteUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/delete-user",
        userID
      );
      console.log("Delete User API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testRegisterSuperadmin = (superadminData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/register-superadmin",
        superadminData
      );
      console.log("Register Superadmin API Response:", response.data);
      testSuperadminId = response.data.superID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testCreateRSO = (rsoData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/create-rso",
        rsoData
      );
      console.log("RSO creation API response:", response.data);
      testRSOId = response.data.rsoID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testDeleteRSO = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/delete-rso",
        data
      );
      console.log("Delete RSO API response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testJoinRSO = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/join-rso-board",
        data
      );
      console.log("Join RSO API response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testMakeRSOAdmin = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/add-rso-admin",
        userData
      );
      console.log("RSO admin creation API response:", response.data);
      testAdminId = response.data.adminID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testCreateRSOEvent = (eventData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/create-rso-event",
        eventData
      );
      console.log("RSO event creation API Response:", response.data);
      testEventId = response.data.eventID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testDeleteRSOEvent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/delete-rso-event",
        data
      );
      console.log("Event deletion API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testProposeEvent = (eventData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/propose-university-event",
        eventData
      );
      console.log("RSO event creation API Response:", response.data);
      testProposedEventId = response.data.eventID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testApproveEvent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/approve-university-event",
        data
      );
      console.log("Event approval API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testDeleteUniEvent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/delete-university-event",
        data
      );
      console.log("Event deletion API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testEditEvent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/edit-event",
        data
      );
      console.log("Event edit API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testScheduleEvent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/schedule-event",
        data
      );
      console.log("Event scheduling API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testUnscheduleEvent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/unschedule-event",
        data
      );
      console.log("Event unscheduling API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testReviewEvent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/review-event",
        data
      );
      console.log("Event review API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testEditReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/edit-review",
        data
      );
      console.log("Review edit API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testDeleteReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/delete-review",
        data
      );
      console.log("Review deletion API Response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const runTests = async () => {
  let testCase = 1;
  try {
    // 1
    await testRegisterUser({
      username: "new_user",
      password: "testpassword",
      phone: "1234567890",
      email: "new_user@example.com",
      university: "Test University",
    });
    testCase++;

    // 2
    await testRegisterSuperadmin({
      username: "new_superadmin",
      password: "testpassword",
      phone: "1112223333",
      email: "new_superadmin@example.com",
      university: "Test University",
      uniDescr: "Test University Description",
      uniLat: -78.901,
      uniLong: 123.456,
    });
    testCase++;

    // 3
    await testCreateRSO({
      rsoCode: "rso123",
      adminCode: "admin123",
      rsoName: "Test RSO",
      description: "Test RSO Description",
      university: "Test University",
    });
    testCase++;

    // 4
    await testMakeRSOAdmin({
      userID: testUserId,
    });
    testCase++;

    // 5
    await testJoinRSO({
      adminID: testAdminId,
      rsoID: testRSOId,
      adminCode: "admin123",
    });
    testCase++;

    // 6
    await testCreateRSOEvent({
      adminID: testAdminId,
      rsoID: testRSOId,
      eventName: "Test RSO event",
      eventDescr: "Unit testing event",
      eventTime: "19:00 12-1-24",
      eventLat: 10,
      eventLong: 10,
      eventAddress: "123 Test Street",
      eventPhone: "0120120123",
      eventEmail: "RSO_Event@example.com",
    });
    testCase++;

    // 7
    await testProposeEvent({
      adminID: testAdminId,
      eventName: "Test event",
      eventDescr: "Unit testing event",
      eventTime: "19:00 12-1-24",
      eventLat: 10,
      eventLong: 10,
      eventAddress: "123 Test Street",
      eventPhone: "0120120123",
      eventEmail: "RSO_Event@example.com",
      university: "Test University",
      isPrivate: 1,
    });
    testCase++;

    // 8
    await testApproveEvent({
      superID: testSuperadminId,
      eventID: testProposedEventId,
    });
    testCase++;

    // 9
    await testEditEvent({
      eventID: testEventId,
      adminID: testAdminId,
      eventName: "New test event name",
      eventDescr: "Unit testing event",
      eventTime: "19:00 12-1-24",
      eventLat: 10,
      eventLong: 10,
      eventAddress: "123 Test Street",
      eventPhone: "0120120123",
      eventEmail: "RSO_Event@example.com",
      university: "Test University",
    });
    testCase++;

    // 10
    await testDeleteUniEvent({
      eventID: testProposedEventId,
      adminID: testAdminId,
      superID: null,
    });
    testCase++;

    // 11
    await testScheduleEvent({
      userID: testUserId,
      eventID: testEventId,
    });
    testCase++;

    // 12
    await testUnscheduleEvent({
      userID: testUserId,
      eventID: testEventId,
    });
    testCase++;

    // 13
    await testReviewEvent({
      userID: testUserId,
      eventID: testEventId,
      comment: "Test comment",
      reviewRating: 1,
    });
    testCase++;

    // 14
    await testEditReview({
      userID: testUserId,
      eventID: testEventId,
      comment: "New test comment",
      reviewRating: 5,
    });
    testCase++;

    // 15
    await testDeleteReview({
      userID: testUserId,
      eventID: testEventId,
    });
    testCase++;

    // 16
    await testDeleteRSOEvent({
      adminID: testAdminId,
      eventID: testEventId,
    });
    testCase++;

    // 17
    await testDeleteRSO({
      adminID: testAdminId,
      rsoID: testRSOId,
    });
    testCase++;

    // 18
    await testDeleteUser({
      userID: testUserId,
    });

    console.log("\x1b[32m%s\x1b[0m", "ALL TESTS PASSED");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "TEST CASE FAILED");
    console.error("Test case failed at test: ", testCase);
  }
};

runTests();
