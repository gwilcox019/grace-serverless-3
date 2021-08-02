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
    
    // get arrays for distances, session IDs, times
    const distances = [];
    const sessionIDs = [];
    const times = []

    distances[0] = data.route.distance;
    sessionIDs[0] = data.route.sessionId;
    times[0] = data.route.realTime;
    for (i = 0; i < data.route.alternateRoutes.length; i++) {
        distances[i + 1] = data.route.alternateRoutes[i].route.distance;
        sessionIDs[i + 1] = data.route.alternateRoutes[i].route.sessionId;
        times[i + 1] = data.route.alternateRoutes[i].route.realTime;
    }

    // get arrays of estimates for each route
    let estimates = [];
    for (i = 0; i < distances.length; i++) {
        estimates[i] = await carbonEstimate(distances[i], req.query.modelID);
    }

    context.res = {
        body: { estimates,
            times,
            sessionIDs
        }
    };
}

// gets carbon estimate in lbs of CO2 for given distance, car model from Carbon Interface API
async function carbonEstimate(distance, modelID) {

    let resp = await fetch("https://www.carboninterface.com/api/v1/estimates", {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + process.env.CARBONINTERFACE_KEY,
            "Content-Type": "application/json"},
        body: JSON.stringify({
            "type": "vehicle",
            "distance_unit": "mi",
            "distance_value": distance,
            "vehicle_model_id": modelID
        })
    })

    estimateData = await resp.json();
    return estimateData.data.attributes.carbon_lb;
}