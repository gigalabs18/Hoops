const webServiceCall = require("./callWebService");


(async () => {
  const result = await webServiceCall();
  console.log(result)
})();