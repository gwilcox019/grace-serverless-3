var multipart = require('parse-multipart');

module.exports = async function (context, req) {
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body;
    var parts = multipart.Parse(body, boundary);

    var result = await analyzeImage(parts[0].data);
    context.res = {
	    body: {
		    result
	    }
    };
    console.log(result)
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