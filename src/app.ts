const webServiceCall = require("./callWebService");

// Main app called from script 'npm run start'
(async () => {
  const result = await webServiceCall('Tony Stark',100.1);
  console.log(result)
})();