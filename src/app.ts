const webServiceCall = require("./callWebService");


(async () => {
  const result = await webServiceCall('Tony Stark',100.1);
  console.log(result)
})();