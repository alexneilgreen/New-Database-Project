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
  

let testUserId; // Store the actual user ID
let testSuperadminId; // Store the actual superadmin ID

// Function to test the login API
const testLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      console.log("Login API Response:", response.data);

      // Store the actual user ID
      testUserId = response.data.userInfo.userID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test the register user API
const testRegisterUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/register-user", userData);
      console.log("Register User API Response:", response.data);

      // Store the actual user ID
      console.log("Resistered user data: ", response.data);
      testUserId = response.data.userID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test the register superadmin API
const testRegisterSuperadmin = (superadminData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/register-superadmin", superadminData);
      console.log("Register Superadmin API Response:", response.data);

      // Store the actual superadmin ID
      console.log("Resistered useradmin data: ", response.data);
      testSuperadminId = response.data.userID;

      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test the add university API
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

// Function to test the delete user API
const testDeleteUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`http://localhost:3001/delete-user/${userID}`);
      console.log("Delete User API Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Chain the API calls
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
    // Use the stored IDs for testing deletion
    await testDeleteUser(testUserId);
    testCase = testCase+1;
    await testDeleteUser(testSuperadminId);
  } catch (error) {
    console.error("Test case failed at test: ", testCase);
  }
};

// Run the tests
runTests();
