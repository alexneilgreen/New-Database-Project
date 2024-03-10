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

const runTests = async () => {
    let testCase = 1;
    try {
      //1
      
      testCase = testCase + 1;

  
      console.log('\x1b[32m%s\x1b[0m', 'ALL TESTS PASSED');
      } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', 'TEST CASE FAILED');
        console.error("Test case failed at test: ", testCase);
    }
  };
  
  runTests();