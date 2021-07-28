const fetch = require('node-fetch');

module.exports = async function (context, req) {

    // parameters from user input: start and ending points, number of routes to search for
    let params = new URLSearchParams({
        "from" : req.query.start,
        "to" : req.query.destination,
        "maxRoutes" : req.query.maxRoutes,
        "timeOverage" : 100
    })

    // request routes from mapquest
    let resp = await fetch("http://www.mapquestapi.com/directions/v2/alternateroutes?key=" + process.env.MAPQUEST_KEY + '&' + params.toString(), {
        method: 'POST',
    });
    
    data = await resp.json();
    
    // get arrays for distances, session IDs
    const distances = [];
    const sessionIDs = [];

    distances[0] = data.route.distance;
    sessionIDs[0] = data.route.sessionId;
    for (i = 0; i < req.query.maxRoutes - 1; i++) {
        distances[i + 1] = data.route.alternateRoutes[i].route.distance;
        sessionIDs[i + 1] = data.route.alternateRoutes[i].route.sessionId;
    }

    context.res = {
        body: data
    };
}