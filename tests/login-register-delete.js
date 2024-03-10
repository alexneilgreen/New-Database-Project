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

const testLogin = (username, password) => {
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

const testRegisterUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/register-user", userData);
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
      const response = await axios.post("http://localhost:3001/register-superadmin", superadminData);
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
      const response = await axios.post("http://localhost:3001/add-university", universityData);
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
      const response = await axios.delete("http://localhost:3001/delete-user", userID);
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
    await testRegisterUser({
      username: "new_user",
      password: "testpassword",
      phone: "1234567890",
      email: "new_user@example.com",
      university: "Test University",
    });
    testCase = testCase+1;
    await testLogin("new_user", "testpassword");
    testCase = testCase+1;
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
    testCase = testCase+1;
    await testAddUniversity({
      universityName: "Test University",
    });
    testCase = testCase+1;
    await testDeleteUser({UserID: testUserId});
    testCase = testCase+1;
    await testDeleteUser({UserID: testSuperadminUserId});
  } catch (error) {
    console.error("Test case failed at test: ", testCase);
  }
};

runTests();