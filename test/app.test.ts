const assert = require("assert");
const testWebserviceCall = require("../src/callWebService");
 
describe("Success Case", () => {
  it("Should return Tony Stark is 38 years old", async () => {
    const result = await testWebserviceCall()
    assert.equal(result,'Tony Stark is 38 years old');
  });
  it("Should return not return Tony Stark is 39 years old", async () => {
    const result = await testWebserviceCall()
    assert.notEqual(result,'Tony Stark is 39 years old');
  });
});
