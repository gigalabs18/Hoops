const soapRequest = require("./helpers/soapRequest");
var parser = require('xml2json');



// First objective request XML
async function callWebService(firstParam:any,secondParam:any) {
  const firstXml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Body>
    <SayHello xmlns="http://learnwebservices.com/services/hello">
        <HelloRequest>
            <Name>${firstParam}</Name>
        </HelloRequest>
    </SayHello>
</Body>
</Envelope>`;

// Second objective request XML
const secondXml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Body>
    <FahrenheitToCelsiusRequest xmlns="http://learnwebservices.com/services/tempconverter">
            <TemperatureInFahrenheit>${secondParam}</TemperatureInFahrenheit>
    </FahrenheitToCelsiusRequest>
</Body>
</Envelope>`;

//First objective URL
const firstUrl = "http://www.learnwebservices.com/services/hello?WSDL";
//Second objective URL
const secondUrl = "http://www.learnwebservices.com/services/tempconverter?wsdl";
const sampleHeaders = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "",
};
  let firstResult,secondResult;

  //Requesting second SOAP webservice
  const { response:firstResponse } = await soapRequest({
    url: firstUrl,
    headers: sampleHeaders,
    xml: firstXml,
    timeout: 1000,
  });

  //Requesting second SOAP webservice
  const { response:secondResponse } = await soapRequest({
    url: secondUrl,
    headers: sampleHeaders,
    xml: secondXml,
    timeout: 1000,
  });


  firstResult = JSON.parse(parser.toJson(firstResponse.body))
  // Parsing first response
  firstResult = firstResult["soap:Envelope"]["soap:Body"]["SayHelloResponse"]["HelloResponse"]["Message"]

  console.log('First Response: '+firstResult)

  secondResult = JSON.parse(parser.toJson(secondResponse.body))
  //Parsing second response
  secondResult = Math.round(parseFloat(secondResult["soap:Envelope"]["soap:Body"][
    "FahrenheitToCelsiusResponse"
  ]["TemperatureInCelsius"]))

  console.log('Second Response: '+secondResult)


  // Returning the required response.
 return firstParam+' is '+ secondResult +' years old'

};


module.exports = callWebService;