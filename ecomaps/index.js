const fetch = require('node-fetch');

module.exports = async function (context, req) {

    let params = new URLSearchParams({
        "locations" : [
            req.query.destination,
            req.query.start
        ],
        "numRoutes" : req.query.numRoutes,
        "timeOverage" : 100
    })

    let resp = await fetch("http://www.mapquestapi.com/directions/v2/alternateroutes?key=" + process.env.MAPQUEST_KEY + '&' + params.toString(), {
        method: 'POST',
    });
    
    data = await resp.json();

    context.res = {
        body: data
    };
}