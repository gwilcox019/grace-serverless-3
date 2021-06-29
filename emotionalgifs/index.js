var multipart = require('parse-multipart');
var fetch = require('node-fetch');

module.exports = async function (context, req) {
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body;
    var parts = multipart.Parse(body, boundary);

    var result = await analyzeImage(parts[0].data);

    let emotions = result[0].faceAttributes.emotion;
    let objects = Object.values(emotions);
    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    var gif = await findGifs(main_emotion);

    context.res = {
        body: gif
    };
    console.log(result);
    context.done();
}

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'    
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: img,  
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();
    
    return data; 
}

async function findGifs(emotion) {
    const giphykey = process.env.giphykey;
    let gifresponse = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=" + giphykey + "&s=" + emotion);
    let gifresp = await gifresponse.json();
    return gifresp.data.url;
}