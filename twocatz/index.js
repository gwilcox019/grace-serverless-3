const fetch = require('node-fetch')

module.exports = async function (context, req) {
    let resp = await fetch("https://cataas.com/cat/cute/says/Serverless", {
        method: 'GET'
    });

    let data = await resp.arrayBuffer();
    var base64data = Buffer.from(data).toString('base64');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: base64data
    };
}