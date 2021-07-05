var multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {

    // get image from POST request
    var body = req.body;
    var responseMessage = "";

    // check that body has image
    if (body == null) { // body is empty
        responseMessage = "Sorry! No image attached.";
    } else { // body has image
        // get codename for image
        var password = req.headers['codename'];
        // use parse-multipart to parse the body
        var boundary = multipart.getBoundary(req.headers['content-type']);
        var parsedBody = multipart.Parse(body, boundary);
        // determine filetype for extension
        var filetype = parsedBody[0].type;
        if (filetype == "image/png") {
         ext = "png";
        } else if (filetype == "image/jpeg") {
            ext = "jpg";
        } else {
            username = "invalidimage"
            ext = "";
        }
        // upload file
        responseMessage = await uploadFile(parsedBody, ext, password);
    }

    context.res = {
        body: responseMessage
    };
}

// upload given file (parsedBody) to given extension undergiven name
async function uploadFile(parsedBody, ext, password) {
    // get access to existing container
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = process.env.CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container

    // create container with given extension
    const blobName = password + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    // upload data
    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return "file saved";
}
