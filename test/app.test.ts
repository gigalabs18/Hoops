const assert = require("assert");
const testWebserviceCall = require("../src/callWebService");
 
describe("Success Case", () => {
  it("Should return Tony Stark is 38 years old", async () => {
    const result = await testWebserviceCall('Tony Stark',100.1)
    assert.equal(result,'Tony Stark is 38 years old');
  });
});

describe("Faliure Case", () => {
  it("Should return not return Tony Stark is 39 years old", async () => {
    const result = await testWebserviceCall('Tony Stark',100.1)
    assert.notEqual(result,'Tony Stark is 39 years old');
  });
});
