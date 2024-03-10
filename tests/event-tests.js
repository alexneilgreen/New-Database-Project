const axios = require("axios");

let testUserId;
let testAdminId;
let testSuperadminId;
let testUniversityId;

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
      console.log("Event creation API Response:", response.data);

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
      console.log("Event creation API Response:", response.data);

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
    //1

    testCase = testCase + 1;

    console.log("\x1b[32m%s\x1b[0m", "ALL TESTS PASSED");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "TEST CASE FAILED");
    console.error("Test case failed at test: ", testCase);
  }
};

runTests();
