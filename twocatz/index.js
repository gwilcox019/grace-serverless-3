const fetch = require('node-fetch')

module.exports = async function (context, req) {
    let resp = await fetch('https://cataas.com/#/cat', {
        method: 'GET'
    })

    let data = await resp.arrayBuffer()
    base64data = Buffer.from(data).toString('base64')

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: base64data
    };
}