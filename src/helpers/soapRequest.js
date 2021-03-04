"use strict";
var axios = require("axios-https-proxy-fix");
module.exports = function soapRequest(params) {
  if (params === void 0) {
    params = {
      url: "",
      headers: {},
      xml: "",
      timeout: 10000,
      proxy: false,
    };
  }
  var url = params.url,
    headers = params.headers,
    xml = params.xml,
    timeout = params.timeout,
    proxy = params.proxy;
  return new Promise(function (resolve, reject) {
    // Post request with XML
    axios({
      method: "post",
      url: url,
      headers: headers,
      data: xml,
      timeout: timeout,
      proxy: proxy,
    })
      .then(function (response) {
        // Handling response
        resolve({
          response: {
            headers: response.headers,
            body: response.data,
            statusCode: response.status,
          },
        });
      })
      // Handling exceptions
      .catch(function (error) {
        if (error.response) {
          console.error("SOAP FAIL: " + error);
          reject(error.response.data);
        } else {
          console.error("SOAP FAIL: " + error);
          reject(error);
        }
      });
  });
};
