const fetch = require('node-fetch')

module.exports = async function (context, req) {
    let resp = await fetch("https://251a9d93-8c22-472d-b5c5-c0b013b15125.mock.pstmn.io/bitproject", {
        method: 'GET'
    });

    let data = await resp.arrayBuffer();
    var base64data = Buffer.from(data).toString('base64');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {base64data}
    };
}