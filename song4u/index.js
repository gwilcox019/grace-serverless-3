const querystring = require('querystring');

module.exports = async function (context, req) {
    var reqbody = req.body
    context.log(reqbody)

    const queryObject = querystring.parse(req.body);

    context.res = {
        body: queryObject.MediaUrl0
    };
}
