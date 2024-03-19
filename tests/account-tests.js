const axios = require("axios");

const handleError = (error) => {
  if (error.response && error.response.data) {
    console.error("Error:", error.response.data);
  } else if (error.message) {
    console.error("Error:", error.message);
  } else {
    console.error("An unknown error occurred");
  }
};

let testUserId;
let testSuperadminUserId;
let testUniversityId;

const testLoginBase = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      console.log("Login API Response:", response.data);
      testUserId = response.data.userInfo.userID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testLoginAdmin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      console.log("Superadmin login API Response:", response.data);
      console.log("Superadmin login status:", response.status);

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
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
      testSuperadminUserId = response.data.userID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testAddUniversity = (universityData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/add-university",
        universityData
      );
      console.log("Add University API Response:", response.data);

      console.log("university ID:", response.data.uniID);

      testUniversityId = response.data.uniID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

const testDeleteUniversity = (universityData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/delete-university",
        universityData
      );
      console.log("Add University API Response:", response.data);

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

const runTests = async () => {
  let testCase = 1;
  try {
    //1
    await testRegisterUser({
      username: "new_user",
      password: "testpassword",
      phone: "1234567890",
      email: "new_user@example.com",
      university: "Test University",
    });
    testCase = testCase + 1;

    //2
    await testLoginBase("new_user", "testpassword");
    testCase = testCase + 1;

    //3
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
    testCase = testCase + 1;

    //4
    await testLoginAdmin("new_superadmin", "testpassword");
    testCase = testCase + 1;

    //5
    await testAddUniversity({
      universityName: "Test University",
    });
    testCase = testCase + 1;

    //6
    await testDeleteUniversity({
      uniID: testUniversityId,
    });
    testCase = testCase + 1;

    //7
    await testDeleteUser({ userID: testUserId });
    testCase = testCase + 1;

    //8
    await testDeleteUser({ userID: testSuperadminUserId });

    console.log("\x1b[32m%s\x1b[0m", "ALL TESTS PASSED");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "TEST CASE FAILED");
    console.error("Test case failed at test: ", testCase);
  }
};

runTests();
