var piglatin = require('pig-latin');
var awesomedevjokes = require('awesome-dev-jokes');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var response = "No response";

    try {
        var joke = awesomedevjokes.getRandomJoke();
        context.log(joke);
        var translation = piglatin(joke);
        context.log(translation);
        response = "English joke: " + joke + "\nPig-latin joke: " + translation;
    } catch (error) {
        response = "Error occured";
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
}