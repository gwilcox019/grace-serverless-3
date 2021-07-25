const fetch = require('node-fetch');

module.exports = async function (context, req) {

    // parameters from user input: start and ending points, number of routes to search for
    let params = new URLSearchParams({
        "from" : req.query.start,
        "to" : req.query.destination, //change from params to body
        "maxRoutes" : req.query.maxRoutes,
        "timeOverage" : 100
    })

    // request routes from mapquest
    let resp = await fetch("http://www.mapquestapi.com/directions/v2/alternateroutes?key=" + process.env.MAPQUEST_KEY + '&' + params.toString(), {
        method: 'POST',
    });
    
    data = await resp.json();
    
    // get array of distances back
    console.log(data.route.distance);
    console.log(data.route.alternateRoutes[0].route.distance);
    console.log(data.route.alternateRoutes[1].route.distance);

    context.res = {
        body: data
    };
}