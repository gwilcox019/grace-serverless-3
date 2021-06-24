const fetch = require('node-fetch')

module.exports = async function (context, req) {
    let resp1 = await fetch("https://251a9d93-8c22-472d-b5c5-c0b013b15125.mock.pstmn.io/bitproject", {
        method: 'GET'
    });

    let resp2 = await fetch("https://251a9d93-8c22-472d-b5c5-c0b013b15125.mock.pstmn.io/bitproject", {
        method: 'GET'
    });

    let data1 = await resp1.arrayBuffer();
    let data2 = await resp2.arrayBuffer();

    var base64data1 = Buffer.from(data1).toString('base64');
    var base64data2 = Buffer.from(data2).toString('base64');

    var name1 = getName();
    var name2 = getName();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: base64data1,
            cat2: base64data2,
            names: [name1, name2]
        }
    };
}

function getName() {
    var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];
    var random_value = Math.floor(names.length * Math.random());
    var resultName = names[random_value];
    return resultName;
}