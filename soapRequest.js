"use strict";
var axios = require("axios-https-proxy-fix");
module.exports = function soapRequest(opts) {
    if (opts === void 0) { opts = {
        url: "",
        headers: {},
        xml: "",
        timeout: 10000,
        proxy: false,
    }; }
    var url = opts.url, headers = opts.headers, xml = opts.xml, timeout = opts.timeout, proxy = opts.proxy;
    return new Promise(function (resolve, reject) {
        axios({
            method: "post",
            url: url,
            headers: headers,
            data: xml,
            timeout: timeout,
            proxy: proxy,
        })
            .then(function (response) {
            resolve({
                response: {
                    headers: response.headers,
                    body: response.data,
                    statusCode: response.status,
                },
            });
        })
            .catch(function (error) {
            if (error.response) {
                console.error("SOAP FAIL: " + error);
                reject(error.response.data);
            }
            else {
                console.error("SOAP FAIL: " + error);
                reject(error);
            }
        });
    });
};
