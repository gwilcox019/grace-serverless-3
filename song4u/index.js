const querystring = require('querystring');
const fetch = require('node-fetch');

// interacts with phone number
module.exports = async function (context, req) {
    // get image from text
    var reqbody = req.body
    context.log(reqbody)

    const queryObject = querystring.parse(req.body);

    // convert image to url
    let resp = await fetch(queryObject.MediaUrl0,{
        method: 'GET',
    })

    let data = await resp.arrayBuffer();

    // analyze image to get age
    let result = await analyzeImage(data);

    // get age back from analysis
    let age = result[0].faceAttributes.age;

    // determine generation based on age
    var id = "generation";

    if (age > 5 && age < 25) 
        id = "GenZ";
    else if (age < 41)
        id = "GenY";
    else if (age < 57)
        id = "GenX";
    else if (age < 76)
        id = "BabyBoomers";
    else    
        id = "Unkown";

    // corresponding songs with generations
    const songs = {"GenZ":"https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf", 
        "GenY":"https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9", 
        "GenX":"https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d", 
        "BabyBoomers":"https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50", 
        "Unknown":"https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"}

    let song = songs[id];
    let message = `We guessed you're part of this generation: ${id}! Happy listening! ${song}`;
    
    // send song and generation via text
    context.res = {
        body: message
    };
}

// analyzes an image with face API, returns data in JSON format
async function analyzeImage(img){
    // keys needed to access face API
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    // parameters to be returned by API
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'    
    })

    // send post request to API for the above parameters
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: img,  
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    // store info from API in json format and return
    let data = await resp.json();
    
    return data; 
}
