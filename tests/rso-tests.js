const axios = require("axios");

let testUserId_1;
let testAdminId_1;
let testUserId_2;
let testAdminId_2;
let testRSOId; // Store RSO ID

let SecondUser = false;
let SecondAdmin = false;

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
      if (!SecondUser) {
        testUserId_1 = response.data.userID;
        SecondUser = true;
      } else {
        testUserId_2 = response.data.userID;
      }

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

const testMakeRSOAdmin = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/add-rso-admin",
        userData
      );
      console.log("RSO admin creation API response:", response.data);
      if (!SecondAdmin) {
        testAdminId_1 = response.data.adminID;
        SecondAdmin = true;
      } else {
        testAdminId_2 = response.data.adminID;
      }

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

const testLeaveRSO = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/leave-rso-board",
        data
      );
      console.log("Leave RSO API response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testEditRSO = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("http://localhost:3001/edit-rso", data);
      console.log("Edit RSO API response:", response.data);

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

const testFollowRSO = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/follow-rso",
        data
      );
      console.log("Follow RSO API response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testUnfollowRSO = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/unfollow-rso",
        data
      );
      console.log("Unfollow RSO API response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testRemoveAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/remove-rso-admin",
        data
      );
      console.log("Admin removal API response:", response.data);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testLastAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/check-last-admin",
        data
      );
      console.log("Check last admin API response:", response.data);

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
    await testRegisterUser({
      username: "new_user_1",
      password: "testpassword",
      phone: "1234567890",
      email: "new_user_1@example.com",
      university: "Test University",
    });
    testCase = testCase + 1;

    //2
    await testRegisterUser({
      username: "new_user_2",
      password: "testpassword",
      phone: "0987654321",
      email: "new_user_2@example.com",
      university: "Test University",
    });
    testCase = testCase + 1;

    //3
    await testMakeRSOAdmin({ userID: testUserId_1 });
    testCase = testCase + 1;

    //4
    await testCreateRSO({
      rsoCode: "rso123",
      adminCode: "admin123",
      rsoName: "Test_RSO",
      rsoDescr: "Test RSO description",
      university: "Test univserity",
    });
    testCase = testCase + 1;

    //5
    await testJoinRSO({
      adminID: testAdminId_1,
      rsoID: testRSOId,
      adminCode: "admin123",
    });
    testCase = testCase + 1;

    //6
    await testMakeRSOAdmin({ userID: testUserId_2 });
    testCase = testCase + 1;

    //7
    await testJoinRSO({
      adminID: testAdminId_2,
      rsoID: testRSOId,
      adminCode: "admin123",
    });
    testCase = testCase + 1;

    //8
    await testEditRSO({
      adminID: testAdminId_1,
      rsoID: testRSOId,
      rsoName: "NEW_RSO_Name",
      rsoDescr: "Test RSO description",
    });
    testCase = testCase + 1;

    //9
    await testFollowRSO({
      userID: testUserId_1,
      rsoID: testRSOId,
      rsoCode: "rso123",
    });
    testCase = testCase + 1;

    //10
    await testUnfollowRSO({
      userID: testUserId_1,
      rsoID: testRSOId,
    });
    testCase = testCase + 1;

    //11: Should report no
    await testLastAdmin({
      adminID: testUserId_1,
      rsoID: testRSOId,
    });
    testCase = testCase + 1;

    //12
    await testLeaveRSO({
      adminID: testUserId_2,
      rsoID: testRSOId,
    });
    testCase = testCase + 1;

    //13
    await testRemoveAdmin({
      adminID: testUserId_2,
    });
    testCase = testCase + 1;

    //14: Should report yes
    await testLastAdmin({
      adminID: testUserId_1,
      rsoID: testRSOId,
    });
    testCase = testCase + 1;

    //15
    await testDeleteRSO({
      adminID: testAdminId_1,
      rsoID: testRSOId,
    });
    testCase = testCase + 1;

    //16
    await testDeleteUser({ userID: testUserId_1 });
    testCase = testCase + 1;

    //17
    await testDeleteUser({ userID: testUserId_2 });

    console.log("\x1b[32m%s\x1b[0m", "ALL TESTS PASSED");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "TEST CASE FAILED");
    console.error("Test case failed at test: ", testCase);
  }
};

runTests();
