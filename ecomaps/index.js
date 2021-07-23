const fetch = require('node-fetch');

module.exports = async function (context, req) {

    const start = req.query.start;
    const destination = req.query.destination;
    const numRoutes = req.query.numRoutes;

    let resp = await fetch("http://www.mapquestapi.com/directions/v2/alternateroutes?key=" + process.env.MAPQUEST_KEY, {
        method: 'POST',
        "locations": [
             start,
             destination
        ],
        "maxRoutes": numRoutes,
        "timeOverage": 100
    });
    
    data = await resp.json();

    context.res = {
        body: data
    };
}