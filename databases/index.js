const fetch = require('node-fetch');
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = {
    endpoint: process.env["COSMOS_ENDPOINT"],
    key: process.env["COSMOS_KEY"],
    databaseId: "CatStorage",
    containerId: "cats",
    partitionKey: {kind: "Hash", paths: ["/cats"]}
  };

module.exports = async function (context, myTimer) {
    context.log("function starting");

    // get images from CataaS
    let resp = await fetch("https://cataas.com/cat", {
        method: 'GET'
    });
    const catImage = await resp.buffer()
    let x = { "cat1": catImage};

    context.log("sent request to CataaS");

    // save image to blob
    await createDocument(x);

    context.log("added to blob storage");

    // show image on HTML page?
};

// creates database and container if they do not already exist
async function create(client) {
    // make database
    const { database } = await client.databases.createIfNotExists({
        id: config.databaseId
    });
    
    // make container
    const { container } = await client.database(config.databaseId).containers.createIfNotExists(
            { id: config.containerId, key: config.partitionKey },
            { offerThroughput: 400 }
    );
}

// makes new document with newItem in database container 
async function createDocument(newItem) {
    var { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({endpoint, key});
    await create(client);
    const database = client.database(databaseId);
    const container = database.container(containerId);


    const {resource: createdItem} = await container.items.create(newItem);
    // need to return that item to be uploaded to HTML webpage
}