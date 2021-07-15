const fetch = require('node-fetch')

module.exports = async function (context, req) {

    let resp1 = await fetch("https://cataas.com/cat/says/" + req.query.name1, {
        method: 'GET'
    });

    let resp2 = await fetch("https://cataas.com/cat/says/" + req.query.name2, {
        method: 'GET'
    });

    let resp3 = await fetch("https://cataas.com/cat/says/" + req.query.name3, {
        method: 'GET'
    });

    let resp4 = await fetch("https://cataas.com/cat/says/" + req.query.name4, {
        method: 'GET'
    });

    let data1 = await resp1.arrayBuffer();
    let data2 = await resp2.arrayBuffer();
    let data3 = await resp3.arrayBuffer();
    let data4 = await resp4.arrayBuffer();

    var base64data1 = Buffer.from(data1).toString('base64');
    var base64data2 = Buffer.from(data2).toString('base64');
    var base64data3 = Buffer.from(data3).toString('base64');
    var base64data4 = Buffer.from(data4).toString('base64');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: base64data1,
            cat2: base64data2,
            cat3: base64data3,
            cat4: base64data4
        }
    };
}
