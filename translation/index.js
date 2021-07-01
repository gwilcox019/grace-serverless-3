const querystring = require('querystring');
const fetch = require('node-fetch');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = async function (context, req) {
    var queryObject = req.query.text;

    let data = "no response";

    let resp = await fetch("https://api.funtranslations.com/translate/yoda?text=" + queryObject, {
        method: 'GET'
    });
    
    data = await resp.json();
    let responseMessage = data.contents.translated;

    client.messages
    .create({
      body: `I sent: ${responseMessage}`,
      from: '+12763789573',
      to: '+16146010668'
    })
   .then(message => console.log(message.sid));
    
    context.log(responseMessage);
    context.res = {
        body: responseMessage
    };
}