const axios = require("axios-https-proxy-fix");

module.exports = function soapRequest(
  params = {
    url: "",
    headers: {},
    xml: "",
    timeout: 10000,
    proxy: false,
  }
) {
  const { url, headers, xml, timeout, proxy } = params;
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      headers,
      data: xml,
      timeout,
      proxy,
    })
      .then((response:any) => {
        resolve({
          response: {
            headers: response.headers,
            body: response.data,
            statusCode: response.status,
          },
        });
      })
      .catch((error:any) => {
        if (error.response) {
          console.error(`SOAP FAIL: ${error}`);
          reject(error.response.data);
        } else {
          console.error(`SOAP FAIL: ${error}`);
          reject(error);
        }
      });
  });
};
