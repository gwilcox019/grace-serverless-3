const fetch = require('node-fetch');

module.exports = async function (context, req) {

    let distances = req.body;

    console.log(distances);

    // get arrays of estimates for each route
    let estimates = [];
    for (i = 0; i < distances.length; i++) {
        estimates[i] = await carbonEstimate(distances[i], req.headers['modelid']);
    }

    context.res = {
        body: { estimates }
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

    return estimateData;
}