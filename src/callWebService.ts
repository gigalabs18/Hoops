const soapRequest = require("./helpers/soapRequest");
var parseString = require("xml2js").parseString;
const firstUrl = "http://www.learnwebservices.com/services/hello?WSDL";
const secondUrl = "http://www.learnwebservices.com/services/tempconverter?wsdl";
const sampleHeaders = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "",
};
const firstParam = 'Tony Stark';
const secondParam = 100.1;
const firstXml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Body>
    <SayHello xmlns="http://learnwebservices.com/services/hello">
        <HelloRequest>
            <Name>${firstParam}</Name>
        </HelloRequest>
    </SayHello>
</Body>
</Envelope>`;

const secondXml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Body>
    <FahrenheitToCelsiusRequest xmlns="http://learnwebservices.com/services/tempconverter">
            <TemperatureInFahrenheit>${secondParam}</TemperatureInFahrenheit>
    </FahrenheitToCelsiusRequest>
</Body>
</Envelope>`;
async function callWebService() {
  let firstResult,secondResult;
  const { response:firstResponse } = await soapRequest({
    url: firstUrl,
    headers: sampleHeaders,
    xml: firstXml,
    timeout: 1000,
  });

  const { response:secondResponse } = await soapRequest({
    url: secondUrl,
    headers: sampleHeaders,
    xml: secondXml,
    timeout: 1000,
  });


  parseString(firstResponse.body, function (err:any, result:any) {
    
      firstResult = result["soap:Envelope"]["soap:Body"][0]["SayHelloResponse"][0][
        "HelloResponse"
      ][0]["Message"][0]
    
   
  });

  parseString(secondResponse.body, function (err:any, result:any) {
    
      secondResult = Math.round(parseFloat(result["soap:Envelope"]["soap:Body"][0][
        "FahrenheitToCelsiusResponse"
      ][0]["TemperatureInCelsius"][0]))
    
   
  });
  return firstParam+' is '+ secondResult +' years old'

};


module.exports = callWebService;