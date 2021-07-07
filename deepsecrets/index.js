const querystring = require('querystring');

module.exports = async function (context, req) {
    const queryObject = querystring.parse(req.body);
    context.res = {
        body: queryObject.Body
     };
}