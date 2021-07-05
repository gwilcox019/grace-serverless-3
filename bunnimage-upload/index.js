var multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {

    // get image from POST request
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body;
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
    var responseMessage = await uploadFile(parsedBody, ext);
    context.res = {
        body: responseMessage
    };
}

// upload given file (parsedBody) to given extension
async function uploadFile(parsedBody, ext) {
    // get access to existing container
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = process.env.CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container

    // create container with given extension
    const blobName = 'test.' + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    // upload data
    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return "file saved";
}
